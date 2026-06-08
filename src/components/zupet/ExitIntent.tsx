import { useEffect, useState } from "react";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { claimCoupon } from "@/lib/claimCoupon";

const STORAGE_KEY = "zupet-exit-intent-shown";
const DEFAULT_COUPON = "ZUPET10";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [claimed, setClaimed] = useState(false);
  const [coupon, setCoupon] = useState(DEFAULT_COUPON);
  const [loading, setLoading] = useState(false);
  const [alreadyMsg, setAlreadyMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, "1");
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    const timer = window.setTimeout(trigger, 45000);
    document.addEventListener("mouseout", onMouseOut);
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.clearTimeout(timer);
    };
  }, []);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      const result = await claimCoupon(email, "exit-intent");
      if (result.error) {
        toast.error("Não foi possível resgatar agora", { description: result.error });
        return;
      }
      setCoupon(result.coupon || DEFAULT_COUPON);
      setAlreadyMsg(result.alreadyClaimed ? "Este e-mail já resgatou um cupom anteriormente." : null);
      setClaimed(true);
    } finally {
      setLoading(false);
    }
  };

  const copyCoupon = async () => {
    await navigator.clipboard.writeText(coupon);
    toast.success("Cupom copiado!", { description: `Use ${coupon} no checkout.` });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm grid place-items-center px-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted z-10"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="bg-gradient-brand text-primary-foreground p-6 text-center">
          <Gift className="h-12 w-12 mx-auto mb-2" />
          <h3 className="text-2xl font-black">Espera! Leva 10% OFF 🐾</h3>
          <p className="text-sm opacity-95 mt-1">No seu primeiro pedido na Zupet</p>
        </div>
        <div className="p-6">
          {!claimed ? (
            <form onSubmit={submit} className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                Receba o cupom no seu e-mail. Limite de 1 cupom por e-mail.
              </p>
              <Input
                type="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? "Validando..." : "Quero meu cupom"}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                Sem spam. Cancele quando quiser.
              </p>
            </form>
          ) : (
            <div className="text-center space-y-3">
              {alreadyMsg && (
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{alreadyMsg}</p>
              )}
              <p className="text-sm text-muted-foreground">Use seu cupom no checkout:</p>
              <button
                onClick={copyCoupon}
                className="w-full border-2 border-dashed border-primary rounded-lg py-3 font-mono text-2xl font-bold text-primary hover:bg-primary/5 transition"
              >
                {coupon}
              </button>
              <p className="text-xs text-muted-foreground">Toque para copiar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
