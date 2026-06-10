import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/unsubscribe')({
  component: UnsubscribePage,
  validateSearch: (s: Record<string, unknown>) => ({ token: (s.token as string) ?? '' }),
})

function UnsubscribePage() {
  const { token } = Route.useSearch()
  const [state, setState] = useState<'loading' | 'valid' | 'already' | 'invalid' | 'done' | 'error'>('loading')

  useEffect(() => {
    if (!token) return setState('invalid')
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.valid) setState('valid')
        else if (d.reason === 'already_unsubscribed') setState('already')
        else setState('invalid')
      })
      .catch(() => setState('error'))
  }, [token])

  const confirm = async () => {
    try {
      const r = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const d = await r.json()
      if (d.success) setState('done')
      else if (d.reason === 'already_unsubscribed') setState('already')
      else setState('error')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8 border">
        <h1 className="text-2xl font-bold mb-2 text-foreground">Zupet — Preferências de email</h1>
        {state === 'loading' && <p className="text-muted-foreground">Verificando…</p>}
        {state === 'invalid' && <p className="text-destructive">Link inválido ou expirado.</p>}
        {state === 'error' && <p className="text-destructive">Algo deu errado. Tente novamente.</p>}
        {state === 'already' && <p className="text-muted-foreground">Você já foi descadastrado. 🐾</p>}
        {state === 'done' && (
          <p className="text-foreground">Pronto! Você não receberá mais nossos emails. Sentiremos sua falta. 🧡</p>
        )}
        {state === 'valid' && (
          <>
            <p className="text-muted-foreground mb-6">
              Confirme que deseja deixar de receber os emails da Zupet.
            </p>
            <button
              onClick={confirm}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              Confirmar descadastro
            </button>
          </>
        )}
      </div>
    </div>
  )
}
