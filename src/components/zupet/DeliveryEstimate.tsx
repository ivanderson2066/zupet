import { useEffect, useState } from "react";
import { Truck, PackageCheck } from "lucide-react";
import { deliveryWindow, hasFreeShipping, FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";

export function DeliveryEstimate({ price }: { price: number }) {
  const [range, setRange] = useState<{ from: string; to: string } | null>(null);

  useEffect(() => {
    setRange(deliveryWindow());
  }, []);

  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-3 space-y-2 text-sm">
      <div className="flex items-start gap-2">
        <Truck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <p>
          {hasFreeShipping(price) ? (
            <>
              <strong className="text-success">Frete grátis</strong> para todo o Brasil
            </>
          ) : (
            <>
              Frete grátis a partir de{" "}
              <strong>R$ {FREE_SHIPPING_THRESHOLD.toFixed(2).replace(".", ",")}</strong>
            </>
          )}
          {range && (
            <>
              {" "}— chega entre <strong>{range.from}</strong> e <strong>{range.to}</strong>
            </>
          )}
        </p>
      </div>
      <div className="flex items-start gap-2">
        <PackageCheck className="h-4 w-4 text-success mt-0.5 shrink-0" />
        <p className="text-muted-foreground">
          Postagem em até 1 dia útil. Código de rastreio por e-mail e WhatsApp.
        </p>
      </div>
    </div>
  );
}
