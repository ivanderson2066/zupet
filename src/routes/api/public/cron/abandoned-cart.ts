import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'zupet'
const SENDER_DOMAIN = 'notify.notificar.zupet.store'
const FROM_DOMAIN = 'notify.notificar.zupet.store'
const TEMPLATE_NAME = 'abandoned-cart'
const COUPON_CODE = 'ZUPET10'
const DELAY_MINUTES = 60
const BATCH_LIMIT = 50

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const Route = createFileRoute('/api/public/cron/abandoned-cart')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        const anonKey =
          import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
          process.env.SUPABASE_PUBLISHABLE_KEY
        if (!supabaseUrl || !supabaseServiceKey || !anonKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        // Verify caller via anon key in apikey header (pg_cron pattern)
        const apikey = request.headers.get('apikey')
        if (apikey !== anonKey) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const template = TEMPLATES[TEMPLATE_NAME]
        if (!template) {
          return Response.json({ error: 'Template missing' }, { status: 500 })
        }

        const cutoff = new Date(Date.now() - DELAY_MINUTES * 60 * 1000).toISOString()

        const { data: carts, error } = await supabase
          .from('abandoned_carts')
          .select('id,email,checkout_url,total_amount,currency')
          .is('reminder_sent_at', null)
          .is('recovered_at', null)
          .lte('created_at', cutoff)
          .order('created_at', { ascending: true })
          .limit(BATCH_LIMIT)

        if (error) {
          console.error('[cron/abandoned-cart] query', error)
          return Response.json({ error: 'Query failed' }, { status: 500 })
        }

        let enqueued = 0
        let skipped = 0

        for (const cart of carts ?? []) {
          const email = (cart.email as string).toLowerCase()

          // Skip suppressed recipients
          const { data: sup } = await supabase
            .from('suppressed_emails')
            .select('email')
            .eq('email', email)
            .maybeSingle()
          if (sup) {
            await supabase
              .from('abandoned_carts')
              .update({ reminder_sent_at: new Date().toISOString() })
              .eq('id', cart.id)
            skipped++
            continue
          }

          // Reuse or create unsubscribe token
          let unsubscribeToken: string
          const { data: existing } = await supabase
            .from('email_unsubscribe_tokens')
            .select('token')
            .eq('email', email)
            .maybeSingle()
          if (existing?.token) {
            unsubscribeToken = existing.token as string
          } else {
            unsubscribeToken = generateToken()
            await supabase
              .from('email_unsubscribe_tokens')
              .insert({ email, token: unsubscribeToken })
          }

          const templateData = {
            checkoutUrl: cart.checkout_url,
            couponCode: COUPON_CODE,
            totalAmount: cart.total_amount ?? undefined,
            currency: cart.currency ?? 'BRL',
          }
          const element = React.createElement(template.component, templateData)
          const html = await render(element)
          const plainText = await render(element, { plainText: true })
          const subject =
            typeof template.subject === 'function'
              ? template.subject(templateData)
              : template.subject

          const messageId = crypto.randomUUID()
          const idempotencyKey = `abandoned-cart-${cart.id}`

          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: TEMPLATE_NAME,
            recipient_email: email,
            status: 'pending',
          })

          const { error: enqError } = await supabase.rpc('enqueue_email', {
            queue_name: 'transactional_emails',
            payload: {
              message_id: messageId,
              to: email,
              from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
              sender_domain: SENDER_DOMAIN,
              subject,
              html,
              text: plainText,
              purpose: 'transactional',
              label: TEMPLATE_NAME,
              idempotency_key: idempotencyKey,
              unsubscribe_token: unsubscribeToken,
              queued_at: new Date().toISOString(),
            },
          })

          if (enqError) {
            console.error('[cron/abandoned-cart] enqueue', enqError)
            continue
          }

          await supabase
            .from('abandoned_carts')
            .update({ reminder_sent_at: new Date().toISOString() })
            .eq('id', cart.id)

          enqueued++
        }

        return Response.json({ processed: carts?.length ?? 0, enqueued, skipped })
      },
    },
  },
})
