import { useEffect, useState } from "react";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const STORAGE_KEY = "zupet-exit-intent-shown";
const COUPON = "ZUPET10";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [claimed, setClaimed] = useState(false);

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const raw = localStorage.getItem("zupet-newsletter");
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(email)) list.push(email);
    localStorage.setItem("zupet-newsletter", JSON.stringify(list));
    setClaimed(true);
  };

  const copyCoupon = async () => {
    await navigator.clipboard.writeText(COUPON);
    toast.success("Cupom copiado!", { description: `Use ${COUPON} no checkout.` });
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
                Receba o cupom no seu e-mail e novidades em primeira mão.
              </p>
              <Input
                type="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="w-full" size="lg">
                Quero meu cupom
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                Sem spam. Cancele quando quiser.
              </p>
            </form>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">Use seu cupom no checkout:</p>
              <button
                onClick={copyCoupon}
                className="w-full border-2 border-dashed border-primary rounded-lg py-3 font-mono text-2xl font-bold text-primary hover:bg-primary/5 transition"
              >
                {COUPON}
              </button>
              <p className="text-xs text-muted-foreground">Toque para copiar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
