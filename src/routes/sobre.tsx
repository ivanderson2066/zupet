import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/zupet/PageShell";
import { Heart, ShieldCheck, Truck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Zupet — Pet Shop Premium" },
      { name: "description", content: "Conheça a Zupet: marca brasileira premium de produtos inteligentes, divertidos e inovadores para cães e gatos." },
      { property: "og:title", content: "Sobre a Zupet" },
      { property: "og:description", content: "A marca premium de produtos para pets que tutores brasileiros amam." },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <PageShell title="Sobre a Zupet" subtitle="Curadoria premium de produtos virais para deixar a vida do seu pet (e a sua) muito mais feliz.">
      <p className="lead">
        A Zupet nasceu da paixão de tutores que sentiam falta de uma loja brasileira realmente
        premium — com produtos selecionados, design moderno e atendimento humano de verdade.
      </p>

      <h2>Nossa missão</h2>
      <p>
        Trazer para o Brasil os produtos pet mais inovadores do mundo, com a qualidade que seu melhor
        amigo merece e a experiência de compra que você esperaria das melhores marcas globais.
      </p>

      <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
        {[
          { icon: Heart, title: "Feito com amor", text: "Cada produto é testado pensando no bem-estar real do pet." },
          { icon: ShieldCheck, title: "Qualidade garantida", text: "Marcas premium, materiais atóxicos e segurança certificada." },
          { icon: Truck, title: "Frete Brasil inteiro", text: "Entregamos rápido com rastreio em tempo real." },
          { icon: Sparkles, title: "Curadoria viral", text: "Os mesmos produtos que bombam no TikTok e Instagram, agora aqui." },
        ].map((b) => (
          <div key={b.title} className="rounded-2xl border border-border bg-card p-5 flex gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center shrink-0">
              <b.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-base m-0">{b.title}</h3>
              <p className="text-sm text-muted-foreground m-0 mt-1">{b.text}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Por que tutores escolhem a Zupet</h2>
      <ul>
        <li>+10 mil pets felizes em todo o Brasil</li>
        <li>Atendimento humano via WhatsApp em até 1h útil</li>
        <li>Garantia de satisfação de 30 dias</li>
        <li>Embalagem premium pensada para presente</li>
      </ul>
    </PageShell>
  );
}
