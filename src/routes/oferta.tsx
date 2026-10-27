import { useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  Clock,
  CreditCard,
  Flame,
  PackageX,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { Header } from "@/components/zupet/Header";
import { Footer } from "@/components/zupet/Footer";
import { ProductCard } from "@/components/zupet/ProductCard";
import { LiveActivity } from "@/components/zupet/LiveActivity";
import { FAQ } from "@/components/zupet/FAQ";
import { MockReviews } from "@/components/zupet/MockReviews";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { captureUtm } from "@/lib/utm";
import heroImage from "@/assets/zupet-hero.jpg";

const CANONICAL = "https://zupet.store/oferta";

export const Route = createFileRoute("/oferta")({
  head: () => ({
    meta: [
      { title: "Oferta Zupet — 10% OFF + Frete Grátis acima de R$ 49" },
      {
        name: "description",
        content:
          "Aproveite 10% de desconto com o cupom ZUPET10 nos produtos pet mais desejados do Brasil. Frete grátis acima de R$ 49 e garantia de 30 dias.",
      },
      { property: "og:title", content: "Oferta Zupet — 10% OFF + Frete Grátis" },
      {
        property: "og:description",
        content:
          "Cupom ZUPET10 nos produtos virais para cães e gatos. Frete grátis acima de R$ 49 e 30 dias de garantia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: OfertaPage,
});

function OfertaPage() {
  useEffect(() => {
    captureUtm();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["products", "oferta"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 8, query: null });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  const perks = useMemo(
    () => [
      { icon: BadgePercent, label: "10% OFF com ZUPET10" },
      { icon: Truck, label: "Frete grátis acima de R$ 49" },
      { icon: ShieldCheck, label: "30 dias de garantia" },
      { icon: CreditCard, label: "Pix, boleto ou até 12x" },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero da campanha */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-soft">
          <div className="container mx-auto px-4 py-12 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="mb-4 rounded-full bg-accent text-accent-foreground font-bold">
                <Flame className="h-3.5 w-3.5 mr-1" /> Campanha de lançamento
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-4">
                10% OFF nos produtos que deixam seu pet{" "}
                <span className="text-primary">obcecado</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mb-6">
                Curadoria premium dos itens virais para cães e gatos. Use o cupom{" "}
                <strong className="text-foreground">ZUPET10</strong> no carrinho e ganhe frete grátis
                acima de R$ 49.
              </p>

              <div className="flex flex-wrap gap-3 mb-7">
                {perks.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold"
                  >
                    <p.icon className="h-3.5 w-3.5 text-primary" />
                    {p.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full font-bold text-base px-7">
                  <a href="#ofertas">
                    Ver ofertas agora <ArrowRight className="h-4 w-4 ml-1.5" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full font-bold text-base px-7"
                >
                  <Link to="/sobre">Conhecer a Zupet</Link>
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                4,8/5 · +10 mil pets atendidos no Brasil
              </div>
            </div>

            <div className="relative">
              <img
                src={heroImage}
                alt="Cão e gato brincando com produtos premium da Zupet"
                width={960}
                height={720}
                className="rounded-3xl shadow-soft w-full object-cover aspect-[4/3]"
                loading="eager"
              />
              <div className="absolute -bottom-4 left-4 right-4">
                <LiveActivity />
              </div>
            </div>
          </div>
        </section>

        {/* Escassez / prazo */}
        <section className="bg-foreground text-background py-4">
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-sm font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> Pedidos até 15h saem no mesmo dia
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgePercent className="h-4 w-4" /> Cupom ZUPET10 válido nesta campanha
            </span>
          </div>
        </section>

        {/* Produtos */}
        <section id="ofertas" className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-8 md:mb-12">
              <p className="text-accent font-bold uppercase tracking-wide text-xs mb-2">
                Seleção da campanha
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Os favoritos com 10% OFF
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : !data || data.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <PackageX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Estoque sendo reposto</h3>
                <p className="text-muted-foreground">
                  Volte em instantes — novos itens entram na campanha todos os dias.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {data.map((p) => (
                  <ProductCard key={p.node.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Por que comprar */}
        <section className="py-14 md:py-20 bg-secondary/40 border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">
              Comprar na Zupet é seguro do começo ao fim
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  title: "Teste por 30 dias",
                  text: "Se o seu pet não amar, devolvemos o valor. Simples assim.",
                },
                {
                  title: "Checkout protegido",
                  text: "Pagamento processado com criptografia pelo Shopify Checkout.",
                },
                {
                  title: "Atendimento humano",
                  text: "Resposta no WhatsApp em até 1h útil, por gente de verdade.",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl bg-card border border-border p-6">
                  <CheckCircle2 className="h-6 w-6 text-success mb-3" />
                  <h3 className="font-bold text-lg mb-1">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MockReviews />
        <FAQ />

        {/* CTA final */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="rounded-3xl bg-gradient-soft border border-border p-8 md:p-14 text-center">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
                Seu pet merece o melhor hoje
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-7">
                Use o cupom <strong className="text-foreground">ZUPET10</strong> e garanta 10% de
                desconto com frete grátis acima de R$ 49.
              </p>
              <Button asChild size="lg" className="rounded-full font-bold text-base px-8">
                <a href="#ofertas">
                  Escolher meu produto <ArrowRight className="h-4 w-4 ml-1.5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
