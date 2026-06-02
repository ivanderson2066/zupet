import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/zupet/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/rastreio")({
  head: () => ({
    meta: [
      { title: "Rastrear Pedido — Zupet" },
      { name: "description", content: "Acompanhe o status do seu pedido Zupet em tempo real." },
    ],
    links: [{ rel: "canonical", href: "/rastreio" }],
  }),
  component: RastreioPage,
});

function RastreioPage() {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell title="Rastrear pedido" subtitle="Digite o número do pedido ou código de rastreio que você recebeu por e-mail.">
      <div className="not-prose">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="flex flex-col sm:flex-row gap-2 mb-6"
        >
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ex: ZP123456 ou BR123456789"
            className="rounded-full"
          />
          <Button type="submit" className="rounded-full">
            <Package className="h-4 w-4 mr-2" /> Rastrear
          </Button>
        </form>

        {submitted && (
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Para um rastreio em tempo real e personalizado, fale com nossa equipe no WhatsApp com o
              número <strong className="text-foreground">{code || "do seu pedido"}</strong>.
            </p>
            <Button asChild className="bg-success hover:bg-success/90 text-success-foreground rounded-full">
              <a href={`https://wa.me/5511999999999?text=Quero%20rastrear%20o%20pedido%20${encodeURIComponent(code)}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" /> Rastrear no WhatsApp
              </a>
            </Button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
