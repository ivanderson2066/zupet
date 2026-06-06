import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const THRESHOLD = 199;

export function FreeShippingBar() {
  const items = useCartStore((s) => s.items);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = items.reduce(
      (acc, it) => acc + Number(it.price?.amount ?? 0) * it.quantity,
      0,
    );
    setTotal(sum);
  }, [items]);

  const pct = Math.min(100, (total / THRESHOLD) * 100);
  const remaining = Math.max(0, THRESHOLD - total);
  const achieved = remaining === 0 && total > 0;

  return (
    <div className="bg-success/10 border-b border-success/20">
      <div className="container mx-auto px-4 py-2 flex items-center gap-3 text-xs sm:text-sm">
        <Truck className="h-4 w-4 text-success shrink-0" />
        <div className="flex-1 min-w-0">
          {achieved ? (
            <span className="font-semibold text-success">🎉 Você ganhou FRETE GRÁTIS!</span>
          ) : total > 0 ? (
            <span className="text-foreground">
              Faltam <strong className="text-success">R$ {remaining.toFixed(2)}</strong> para
              <strong> FRETE GRÁTIS</strong>
            </span>
          ) : (
            <span className="text-foreground">
              <strong>FRETE GRÁTIS</strong> em compras acima de R$ {THRESHOLD}
            </span>
          )}
          {total > 0 && (
            <div className="mt-1 h-1.5 bg-success/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-success transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
