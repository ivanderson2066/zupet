import { useEffect, useState } from "react";
import { Timer, Copy, Check, Truck } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";

const COUPON = "ZUPET10";
const FREE_SHIPPING_THRESHOLD = 49;

function useEndOfDayCountdown() {
  const [left, setLeft] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      const pad = (n: number) => String(n).padStart(2, "0");
      setLeft({ h: pad(h), m: pad(m), s: pad(s) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return left;
}

export function TopBanner() {
  const { h, m, s } = useEndOfDayCountdown();
  const [copied, setCopied] = useState(false);
  const items = useCartStore((s) => s.items);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = items.reduce(
      (acc, it) => acc + Number(it.price?.amount ?? 0) * it.quantity,
      0,
    );
    setTotal(sum);
  }, [items]);

  const pct = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const achieved = remaining === 0 && total > 0;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON);
      setCopied(true);
      toast.success("Cupom copiado!", { description: `Use ${COUPON} no checkout.` });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.info(`Use o cupom ${COUPON} no checkout.`);
    }
  };

  return (
    <div className="bg-accent text-accent-foreground border-b border-accent-foreground/10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
          {/* Linha principal: desconto + timer */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <Timer className="h-3.5 w-3.5" />
              10% OFF termina em
            </span>
            <span className="inline-flex items-center gap-1 font-black tabular-nums">
              <span className="px-1.5 py-0.5 rounded bg-accent-foreground/15">{h}</span>:
              <span className="px-1.5 py-0.5 rounded bg-accent-foreground/15">{m}</span>:
              <span className="px-1.5 py-0.5 rounded bg-accent-foreground/15">{s}</span>
            </span>
            <button
              onClick={copy}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-accent-foreground/30 bg-accent-foreground/10 hover:bg-accent-foreground/20 transition-colors font-black tracking-wide"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {COUPON}
            </button>
          </div>

          {/* Divisor desktop */}
          <span className="hidden sm:block w-px h-4 bg-accent-foreground/20" />

          {/* Linha secundária: frete grátis */}
          <div className="flex items-center justify-center gap-2 text-xs">
            <Truck className="h-3.5 w-3.5" />
            {achieved ? (
              <span className="font-semibold">🎉 Você ganhou FRETE GRÁTIS!</span>
            ) : total > 0 ? (
              <span>
                Faltam <strong>R$ {remaining.toFixed(2)}</strong> para <strong>FRETE GRÁTIS</strong>
              </span>
            ) : (
              <span>
                <strong>FRETE GRÁTIS</strong> em compras acima de R$ {FREE_SHIPPING_THRESHOLD}
              </span>
            )}
          </div>
        </div>

        {/* Barra de progresso do frete grátis (apenas quando há itens) */}
        {total > 0 && (
          <div className="mt-2 max-w-xs mx-auto sm:mx-0 sm:max-w-none">
            <div className="h-1 bg-accent-foreground/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-foreground transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
