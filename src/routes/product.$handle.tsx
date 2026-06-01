import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ShoppingBag,
  Loader2,
  ShieldCheck,
  Truck,
  Award,
  ChevronLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TopBar } from "@/components/zupet/TopBar";
import { Header } from "@/components/zupet/Header";
import { Footer } from "@/components/zupet/Footer";
import { BestSellers } from "@/components/zupet/BestSellers";
import {
  storefrontApiRequest,
  PRODUCT_BY_HANDLE_QUERY,
  formatPrice,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `Produto — Zupet` },
      { name: "description", content: "Produto premium Zupet para o seu pet." },
      { property: "og:url", content: `/product/${params.handle}` },
    ],
    links: [{ rel: "canonical", href: `/product/${params.handle}` }],
  }),
  component: ProductPage,
});

const bullets = [
  "Material premium e seguro para o seu pet",
  "Testado por veterinários e tutores reais",
  "Estimula brincadeira, saúde e bem-estar",
  "Pronta entrega para todo o Brasil",
];

function ProductPage() {
  const { handle } = Route.useParams();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [activeIdx, setActiveIdx] = useState(0);

  const { data, isLoading: loading } = useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return res?.data?.product as
        | {
            id: string;
            title: string;
            description: string;
            handle: string;
            images: { edges: Array<{ node: { url: string; altText: string | null } }> };
            variants: {
              edges: Array<{
                node: {
                  id: string;
                  title: string;
                  price: { amount: string; currencyCode: string };
                  availableForSale: boolean;
                  selectedOptions: Array<{ name: string; value: string }>;
                };
              }>;
            };
            priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
          }
        | null;
    },
  });

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <TopBar />
      <Header />
      <main>
        <div className="container mx-auto px-4 py-4 text-sm">
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" /> Voltar para a loja
          </Link>
        </div>

        {loading ? (
          <div className="container mx-auto px-4 py-20 grid place-items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !data ? (
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold mb-2">Produto não encontrado</h1>
            <p className="text-muted-foreground">
              O produto que você procura não está disponível no momento.
            </p>
          </div>
        ) : (
          <ProductDetail
            product={data}
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
            onAdd={async () => {
              const variant = data.variants.edges[0]?.node;
              if (!variant) return;
              await addItem({
                product: { node: { ...data, options: [] } as never } as never,
                variantId: variant.id,
                variantTitle: variant.title,
                price: variant.price,
                quantity: 1,
                selectedOptions: variant.selectedOptions || [],
              });
            }}
            isLoading={isLoading}
          />
        )}

        <BestSellers />
      </main>
      <Footer />
    </div>
  );
}

function ProductDetail({
  product,
  activeIdx,
  setActiveIdx,
  onAdd,
  isLoading,
}: {
  product: {
    title: string;
    description: string;
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    variants: {
      edges: Array<{
        node: {
          id: string;
          price: { amount: string; currencyCode: string };
          availableForSale: boolean;
        };
      }>;
    };
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  };
  activeIdx: number;
  setActiveIdx: (i: number) => void;
  onAdd: () => Promise<void>;
  isLoading: boolean;
}) {
  const images = product.images.edges;
  const variant = product.variants.edges[0]?.node;
  const currency = variant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode;
  const price = parseFloat(variant?.price.amount || product.priceRange.minVariantPrice.amount);
  const original = price * 1.4;

  return (
    <>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 pb-12">
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border border-border">
            {images[activeIdx] ? (
              <img
                src={images[activeIdx].node.url}
                alt={images[activeIdx].node.altText || product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="grid place-items-center h-full text-muted-foreground">Sem imagem</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    activeIdx === i ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">{product.title}</h1>

          <div className="flex items-baseline gap-3">
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(original, currency)}
            </span>
            <span className="text-3xl md:text-4xl font-black text-primary">
              {formatPrice(price, currency)}
            </span>
          </div>

          {product.description && (
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          )}

          <ul className="space-y-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button
              onClick={onAdd}
              disabled={isLoading || !variant?.availableForSale}
              size="lg"
              className="w-full h-14 bg-gradient-accent text-accent-foreground font-bold rounded-2xl shadow-glow text-base"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5 mr-2" /> Comprar Agora
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="text-center p-3 rounded-xl bg-secondary/60">
              <ShieldCheck className="h-5 w-5 text-success mx-auto mb-1" />
              <p className="text-[11px] font-semibold">Compra segura</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-secondary/60">
              <Truck className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-[11px] font-semibold">Frete Brasil</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-secondary/60">
              <Award className="h-5 w-5 text-accent mx-auto mb-1" />
              <p className="text-[11px] font-semibold">Garantia 30 dias</p>
            </div>
          </div>

          <Accordion type="single" collapsible className="pt-2">
            <AccordionItem value="faq" className="border-border">
              <AccordionTrigger className="font-semibold">Perguntas frequentes</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p><strong>Prazo:</strong> 3 a 10 dias úteis para todo Brasil.</p>
                <p><strong>Garantia:</strong> 30 dias para troca ou devolução.</p>
                <p><strong>Rastreamento:</strong> enviado por e-mail e WhatsApp.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="garantia" className="border-border">
              <AccordionTrigger className="font-semibold">Garantia Zupet</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Não amou? Devolvemos o seu dinheiro em até 30 dias, sem perguntas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Sticky mobile buy bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-xl border-t border-border p-3 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-none">
            <span className="text-[10px] text-muted-foreground line-through">
              {formatPrice(original, currency)}
            </span>
            <span className="text-lg font-black text-primary">
              {formatPrice(price, currency)}
            </span>
          </div>
          <Button
            onClick={onAdd}
            disabled={isLoading || !variant?.availableForSale}
            className="flex-1 h-12 bg-gradient-accent text-accent-foreground font-bold rounded-xl shadow-glow"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 mr-1.5" /> Comprar Agora
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
