import { CreditCard, QrCode, Barcode } from "lucide-react";
import { formatPrice } from "@/lib/shopify";
import { installmentsFor } from "@/lib/pricing";

export function PaymentOptions({ price, currency }: { price: number; currency: string }) {
  const { count, value } = installmentsFor(price);

  return (
    <div className="rounded-xl border border-border bg-card p-3 space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <CreditCard className="h-4 w-4 text-primary shrink-0" />
        <p>
          Em até <strong>{count}x de {formatPrice(value, currency)}</strong> no cartão
        </p>
      </div>
      <div className="flex items-center gap-2">
        <QrCode className="h-4 w-4 text-success shrink-0" />
        <p>
          <strong>Pix</strong> — aprovação na hora
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Barcode className="h-4 w-4 text-muted-foreground shrink-0" />
        <p className="text-muted-foreground">Boleto bancário</p>
      </div>
    </div>
  );
}
