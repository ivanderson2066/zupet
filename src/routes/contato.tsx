import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/zupet/PageShell";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Instagram, Clock } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Zupet" },
      { name: "description", content: "Fale com a equipe Zupet via WhatsApp, e-mail ou redes sociais. Atendimento humano em até 1h." },
      { property: "og:title", content: "Contato — Zupet" },
      { property: "og:description", content: "Atendimento premium, humano e rápido." },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <PageShell title="Fale com a gente" subtitle="Atendimento humano, premium e rápido. Estamos aqui para ajudar você e o seu pet.">
      <div className="not-prose grid md:grid-cols-2 gap-4">
        <a href="https://wa.me/5598991891675" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition-all">
          <div className="h-12 w-12 rounded-xl bg-success/15 grid place-items-center mb-4">
            <MessageCircle className="h-6 w-6 text-success" />
          </div>
          <h3 className="font-black text-lg mb-1">WhatsApp</h3>
          <p className="text-sm text-muted-foreground mb-3">Resposta em até 1h útil. O canal mais rápido.</p>
          <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">Abrir conversa</Button>
        </a>

        <a href="mailto:ola@zupet.com.br" className="rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition-all">
          <div className="h-12 w-12 rounded-xl bg-primary/15 grid place-items-center mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-black text-lg mb-1">E-mail</h3>
          <p className="text-sm text-muted-foreground mb-3">ola@zupet.com.br — respostas em até 24h.</p>
          <Button size="sm" variant="outline">Enviar e-mail</Button>
        </a>

        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition-all">
          <div className="h-12 w-12 rounded-xl bg-accent/15 grid place-items-center mb-4">
            <Instagram className="h-6 w-6 text-accent" />
          </div>
          <h3 className="font-black text-lg mb-1">Instagram</h3>
          <p className="text-sm text-muted-foreground mb-3">@zupet — bastidores, dicas e novidades.</p>
          <Button size="sm" variant="outline">Seguir</Button>
        </a>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="h-12 w-12 rounded-xl bg-secondary grid place-items-center mb-4">
            <Clock className="h-6 w-6 text-foreground" />
          </div>
          <h3 className="font-black text-lg mb-1">Horário de atendimento</h3>
          <p className="text-sm text-muted-foreground">Seg a Sex: 9h–19h<br />Sábados: 9h–14h<br />Domingo: fechado</p>
        </div>
      </div>
    </PageShell>
  );
}
