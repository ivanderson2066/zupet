import React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  firstName?: string
  checkoutUrl?: string
  couponCode?: string
  totalAmount?: number
  currency?: string
}

const formatPrice = (amount?: number, currency = 'BRL') => {
  if (typeof amount !== 'number') return ''
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(amount)
  } catch {
    return `R$ ${amount.toFixed(2)}`
  }
}

const Email = ({
  firstName,
  checkoutUrl = 'https://zupet.store/cart',
  couponCode = 'ZUPET10',
  totalAmount,
  currency = 'BRL',
}: Props) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Seu pet ficou esperando 🐾 — use {couponCode} e ganhe 10% OFF</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brand}>
          <Text style={brandText}>ZUPET</Text>
        </Section>

        <Heading style={h1}>Esqueceu algo no carrinho? 🐾</Heading>

        <Text style={text}>
          {firstName ? `Oi, ${firstName}!` : 'Oi!'} Notamos que você deixou alguns produtos
          esperando no seu carrinho. Seu pet merece, e a gente quer ajudar a finalizar.
        </Text>

        {totalAmount ? (
          <Text style={totalText}>
            Total do carrinho: <strong>{formatPrice(totalAmount, currency)}</strong>
          </Text>
        ) : null}

        <Section style={couponBox}>
          <Text style={couponLabel}>Cupom exclusivo para você</Text>
          <Text style={couponCodeStyle}>{couponCode}</Text>
          <Text style={couponSub}>10% OFF na sua primeira compra</Text>
        </Section>

        <Section style={ctaWrap}>
          <Button href={checkoutUrl} style={cta}>
            Finalizar minha compra
          </Button>
        </Section>

        <Hr style={hr} />
        <Text style={small}>
          Estoque limitado — os itens podem acabar. Frete grátis em pedidos acima de R$ 199.
        </Text>
        <Text style={small}>Com carinho, equipe Zupet 🧡</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Esqueceu algo no carrinho? 🐾 10% OFF te esperando',
  displayName: 'Recuperação de carrinho abandonado',
  previewData: {
    firstName: 'Ana',
    checkoutUrl: 'https://zupet.store/cart',
    couponCode: 'ZUPET10',
    totalAmount: 189.9,
    currency: 'BRL',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 24px' }
const brand = { textAlign: 'center' as const, marginBottom: '24px' }
const brandText = {
  fontSize: '22px',
  fontWeight: 800 as const,
  letterSpacing: '4px',
  color: '#FF6B35',
  margin: 0,
}
const h1 = { fontSize: '26px', color: '#0F172A', textAlign: 'center' as const, margin: '8px 0 16px' }
const text = { fontSize: '16px', color: '#1f2937', lineHeight: '24px' }
const totalText = { fontSize: '15px', color: '#1f2937', marginTop: '8px' }
const couponBox = {
  backgroundColor: '#FFF4ED',
  border: '2px dashed #FF6B35',
  borderRadius: '12px',
  padding: '20px',
  textAlign: 'center' as const,
  margin: '24px 0',
}
const couponLabel = { fontSize: '12px', color: '#6B7280', textTransform: 'uppercase' as const, margin: 0, letterSpacing: '1.5px' }
const couponCodeStyle = { fontSize: '28px', fontWeight: 800 as const, color: '#FF6B35', margin: '8px 0' }
const couponSub = { fontSize: '13px', color: '#374151', margin: 0 }
const ctaWrap = { textAlign: 'center' as const, margin: '24px 0' }
const cta = {
  backgroundColor: '#FF6B35',
  color: '#ffffff',
  padding: '14px 28px',
  borderRadius: '999px',
  fontSize: '16px',
  fontWeight: 700 as const,
  textDecoration: 'none',
  display: 'inline-block',
}
const hr = { borderColor: '#e5e7eb', margin: '24px 0' }
const small = { fontSize: '12px', color: '#6B7280', textAlign: 'center' as const, margin: '6px 0' }
