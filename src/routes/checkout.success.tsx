import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShoppingBag, Gift, Truck, Copy } from "lucide-react";
import { toast } from "sonner";
import { TopBar } from "@/components/zupet/TopBar";
import { Header } from "@/components/zupet/Header";
import { Footer } from "@/components/zupet/Footer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";

const NEXT_COUPON = "ZUVOLTA15";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Pedido confirmado — Zupet" },
      { name: "description", content: "Obrigado pela sua compra na Zupet! Seu pedido foi confirmado." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    // Limpa o carrinho local ao retornar do checkout
    clearCart();
  }, [clearCart]);

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(NEXT_COUPON);
      toast.success("Cupom copiado!", { description: `Use ${NEXT_COUPON} na próxima compra.` });
    } catch {
      toast.error("Não foi possível copiar. Anote: " + NEXT_COUPON);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Pedido confirmado! 🐾
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Obrigado por escolher a <strong>Zupet</strong>. Em instantes você receberá um e-mail
            com os detalhes do pedido e o código de rastreio assim que for despachado.
          </p>

          {/* Próximos passos */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
            <div className="rounded-xl border bg-card p-4">
              <ShoppingBag className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm mb-1">Confirmação</h3>
              <p className="text-xs text-muted-foreground">
                E-mail com nota e detalhes em até 10 min.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <Truck className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm mb-1">Envio em 24h</h3>
              <p className="text-xs text-muted-foreground">
                Despachamos rápido e você acompanha pelo rastreio.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <Gift className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm mb-1">Cupom exclusivo</h3>
              <p className="text-xs text-muted-foreground">
                15% OFF na sua próxima compra.
              </p>
            </div>
          </div>

          {/* Cupom de recompra */}
          <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              Presente da Zupet pra você voltar 💛
            </p>
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-2xl md:text-3xl font-extrabold tracking-widest text-primary">
                {NEXT_COUPON}
              </span>
              <Button size="sm" variant="outline" onClick={copyCoupon}>
                <Copy className="w-4 h-4 mr-2" /> Copiar
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              15% OFF na próxima compra · válido por 30 dias
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/">Continuar comprando</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/rastreio">Rastrear pedido</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
