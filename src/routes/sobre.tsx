import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Heart,
  ShieldCheck,
  Truck,
  Sparkles,
  Search,
  FlaskConical,
  PackageCheck,
  MessageCircle,
  ArrowRight,
  Quote,
} from "lucide-react";
import { Header } from "@/components/zupet/Header";
import { Footer } from "@/components/zupet/Footer";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://zupet.store/sobre";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Zupet — Pet Shop Premium Brasileiro" },
      {
        name: "description",
        content:
          "Conheça a Zupet: curadoria brasileira de produtos inteligentes e inovadores para cães e gatos, com garantia de 30 dias e atendimento humano.",
      },
      { property: "og:title", content: "Sobre a Zupet — Pet Shop Premium" },
      {
        property: "og:description",
        content:
          "A marca premium de produtos para pets que tutores brasileiros amam: curadoria, garantia de 30 dias e atendimento humano.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Zupet",
          url: "https://zupet.store",
          email: "ola@zupet.com.br",
          description:
            "Pet shop premium brasileiro com curadoria de produtos inteligentes e inovadores para cães e gatos.",
        }),
      },
    ],
  }),
  component: SobrePage,
});

const PILLARS = [
  { icon: Heart, title: "Feito com amor", text: "Cada produto é escolhido pensando no bem-estar real do pet." },
  { icon: ShieldCheck, title: "Qualidade garantida", text: "Materiais atóxicos, marcas premium e 30 dias de garantia." },
  { icon: Truck, title: "Brasil inteiro", text: "Envio rápido com rastreio em tempo real até a sua porta." },
  { icon: Sparkles, title: "Curadoria viral", text: "Os produtos que bombam no TikTok, com padrão premium." },
];

const STEPS = [
  { icon: Search, title: "1. Garimpamos", text: "Monitoramos lançamentos e tendências pet no mundo inteiro." },
  { icon: FlaskConical, title: "2. Testamos", text: "Só entra no catálogo o que passa por teste real com pets." },
  { icon: PackageCheck, title: "3. Embalamos", text: "Embalagem premium, pronta para presentear." },
  { icon: MessageCircle, title: "4. Acompanhamos", text: "Suporte humano no WhatsApp do pedido à entrega." },
];

const NUMBERS = [
  { value: "+10 mil", label: "pets atendidos" },
  { value: "4,8/5", label: "satisfação média" },
  { value: "30 dias", label: "de garantia" },
  { value: "até 1h", label: "resposta no WhatsApp" },
];

function SobrePage() {
  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-brand text-primary-foreground">
          <span aria-hidden className="absolute -right-8 -top-8 text-[11rem] opacity-15 rotate-12 select-none">🐾</span>
          <span aria-hidden className="absolute left-6 bottom-2 text-7xl opacity-10 -rotate-12 select-none">🐾</span>
          <div className="relative container mx-auto px-4 py-14 md:py-20 max-w-3xl">
            <p className="inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 font-bold uppercase tracking-wide text-xs mb-4">
              Nossa história
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-4">
              Uma loja pet premium feita por quem também é tutor
            </h1>
            <p className="text-lg opacity-90">
              A Zupet nasceu da paixão de tutores que sentiam falta de uma loja brasileira realmente
              premium — com produtos selecionados, design moderno e atendimento humano de verdade.
            </p>
          </div>
        </section>

        {/* Números */}
        <section className="bg-gradient-accent text-accent-foreground">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {NUMBERS.map((n) => (
                <div key={n.label}>
                  <p className="text-2xl md:text-3xl font-black text-primary">{n.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{n.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Missão */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Nossa missão</h2>
              <p className="text-muted-foreground mb-4">
                Trazer para o Brasil os produtos pet mais inovadores do mundo, com a qualidade que
                seu melhor amigo merece e a experiência de compra que você esperaria das melhores
                marcas globais.
              </p>
              <p className="text-muted-foreground">
                Não vendemos tudo: vendemos o que resolve. Cada item precisa melhorar de verdade a
                rotina do pet — e a sua também.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {PILLARS.map((b) => (
                <div key={b.title} className="rounded-2xl border border-border bg-card p-5">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center mb-3">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-base mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como escolhemos */}
        <section className="py-14 md:py-20 bg-secondary/40 border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">
              Como escolhemos cada produto
            </h2>
            <div className="grid md:grid-cols-4 gap-5">
              {STEPS.map((s) => (
                <div key={s.title} className="rounded-2xl bg-card border border-border p-6">
                  <s.icon className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promessa */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <Quote className="h-8 w-8 text-primary mb-4" />
            <blockquote className="text-xl md:text-2xl font-bold leading-snug mb-6">
              “Se o seu pet não amar, a gente devolve o seu dinheiro. Você nunca corre risco
              comprando na Zupet.”
            </blockquote>
            <h2 className="text-2xl font-black tracking-tight mb-3">Nossos compromissos</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>Garantia de satisfação de 30 dias em qualquer pedido.</li>
              <li>Rastreio enviado por e-mail assim que o pacote sai.</li>
              <li>Atendimento humano via WhatsApp em até 1h útil.</li>
              <li>Frete grátis nas compras acima de R$ 49.</li>
              <li>Pagamento seguro com Pix, boleto ou cartão em até 12x.</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="rounded-3xl bg-gradient-soft border border-border p-8 md:p-14 text-center">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
                Pronto para deixar seu pet mais feliz?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-7">
                Comece pela nossa seleção com 10% de desconto e frete grátis acima de R$ 49.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild size="lg" className="rounded-full font-bold px-8">
                  <Link to="/oferta">
                    Ver ofertas <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full font-bold px-8">
                  <Link to="/contato">Falar com a gente</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
