import { useEffect, useState } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import {
  CheckCircle2,
  ShoppingBag,
  Gift,
  Truck,
  Copy,
  PawPrint,
  Instagram,
  MessageCircle,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { TopBar } from "@/components/zupet/TopBar";
import { Header } from "@/components/zupet/Header";
import { Footer } from "@/components/zupet/Footer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";

const NEXT_COUPON = "ZUVOLTA15";

const searchSchema = z.object({
  order: z.string().optional(),
  total: z.string().optional(),
});

export const Route = createFileRoute("/checkout/success")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Pedido confirmado — Zupet 🐾" },
      {
        name: "description",
        content: "Obrigado pela sua compra na Zupet! Seu pet vai amar.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { order, total } = useSearch({ from: "/checkout/success" });
  const clearCart = useCartStore((s) => s.clearCart);
  const [confettiDone, setConfettiDone] = useState(false);

  useEffect(() => {
    clearCart();
    // pequena animação ao montar
    const t = setTimeout(() => setConfettiDone(true), 1500);
    return () => clearTimeout(t);
  }, [clearCart]);

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(NEXT_COUPON);
      toast.success("Cupom copiado!", {
        description: `Use ${NEXT_COUPON} na próxima compra.`,
      });
    } catch {
      toast.error("Anote: " + NEXT_COUPON);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://zupet.store";
  const handleShare = async () => {
    const text = "Acabei de comprar na @zupet.store! Achei produtos incríveis pro meu pet 🐾";
    if (navigator.share) {
      try {
        await navigator.share({ title: "Zupet", text, url: shareUrl });
      } catch {
        /* user cancelou */
      }
    } else {
      navigator.clipboard.writeText(`${text} ${shareUrl}`);
      toast.success("Link copiado!");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <Header />

      <main className="flex-1">
        {/* Hero de confirmação */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-20">
          {!confettiDone && (
            <div className="pointer-events-none absolute inset-0 flex justify-center">
              <PawPrint className="absolute left-[15%] top-8 h-6 w-6 text-primary/40 animate-bounce" />
              <PawPrint className="absolute right-[18%] top-16 h-8 w-8 text-accent/40 animate-bounce [animation-delay:200ms]" />
              <PawPrint className="absolute left-[25%] bottom-10 h-5 w-5 text-primary/30 animate-bounce [animation-delay:400ms]" />
              <PawPrint className="absolute right-[10%] bottom-20 h-7 w-7 text-accent/30 animate-bounce [animation-delay:600ms]" />
            </div>
          )}

          <div className="container mx-auto px-4 relative">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/15 mb-6 ring-8 ring-primary/5">
                <CheckCircle2 className="w-14 h-14 text-primary" strokeWidth={2.5} />
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">
                Pedido confirmado! 🐾
              </h1>
              <p className="text-muted-foreground text-base md:text-lg mb-2">
                Sua patinha bateu o pé certo. Já estamos preparando tudo com muito carinho.
              </p>
              {order && (
                <p className="text-sm text-muted-foreground">
                  Nº do pedido: <span className="font-mono font-semibold text-foreground">#{order}</span>
                  {total && <> · Total: <span className="font-semibold text-foreground">{total}</span></>}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10">
          <div className="max-w-2xl mx-auto">
            {/* Próximos passos */}
            <h2 className="text-xl font-bold mb-4 text-center">O que acontece agora?</h2>
            <div className="grid sm:grid-cols-3 gap-3 mb-10">
              <div className="rounded-xl border bg-card p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center mx-auto mb-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">1. Confirmação</h3>
                <p className="text-xs text-muted-foreground">
                  E-mail com a nota chega em até 10 min.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center mx-auto mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">2. Envio em 24h</h3>
                <p className="text-xs text-muted-foreground">
                  Despachamos rápido com código de rastreio.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center mx-auto mb-2">
                  <PawPrint className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">3. Pet feliz</h3>
                <p className="text-xs text-muted-foreground">
                  Hora da alegria! Marca a gente no Insta 📸
                </p>
              </div>
            </div>

            {/* Cupom de recompra */}
            <div className="relative rounded-2xl border-2 border-dashed border-primary/40 bg-gradient-to-br from-primary/5 to-accent/5 p-6 mb-8 text-center overflow-hidden">
              <Gift className="absolute -top-4 -right-4 w-20 h-20 text-primary/10" />
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">
                Presente exclusivo
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Use na sua próxima compra e ganhe <strong>15% OFF</strong> 💛
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
                <span className="text-2xl md:text-3xl font-extrabold tracking-widest text-primary bg-background border-2 border-primary/30 rounded-lg px-4 py-2">
                  {NEXT_COUPON}
                </span>
                <Button size="sm" variant="outline" onClick={copyCoupon}>
                  <Copy className="w-4 h-4 mr-2" /> Copiar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Válido por 30 dias · 1 uso por cliente</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button asChild size="lg" className="bg-gradient-accent text-accent-foreground font-bold">
                <Link to="/">Continuar comprando</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/rastreio">Rastrear pedido</Link>
              </Button>
            </div>

            {/* Compartilhar */}
            <div className="rounded-xl bg-secondary/40 p-4 text-center">
              <p className="text-sm font-semibold mb-3">
                Conta pra galera onde você comprou 💜
              </p>
              <div className="flex items-center justify-center gap-2">
                <Button size="sm" variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" /> Compartilhar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                >
                  <a
                    href="https://instagram.com/zupet.store"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-4 h-4 mr-2" /> @zupet.store
                  </a>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a
                    href="https://wa.me/5511999999999?text=Olá! Acabei de fazer um pedido na Zupet"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> Suporte
                  </a>
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
