import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { claimCoupon } from "@/lib/claimCoupon";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const result = await claimCoupon(email, "newsletter");
      if (result.error) {
        toast.error("Não foi possível resgatar agora", { description: result.error });
        return;
      }
      if (result.alreadyClaimed) {
        toast.info("Você já resgatou seu cupom 🐾", {
          description: `Use ${result.coupon} no checkout — válido apenas uma vez por e-mail.`,
        });
      } else {
        toast.success("Cupom de 10% liberado!", {
          description: `Use ${result.coupon} no checkout. Enviamos os detalhes no seu e-mail.`,
        });
      }
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-14 bg-gradient-brand text-primary-foreground">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Sparkles className="h-3.5 w-3.5" /> OFERTA EXCLUSIVA
        </div>
        <h2 className="text-2xl md:text-3xl font-black mb-2">
          Ganhe 10% OFF na primeira compra
        </h2>
        <p className="text-primary-foreground/85 mb-6 text-sm md:text-base">
          Cadastre seu e-mail e receba o cupom. Limite de 1 cupom por e-mail.
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="pl-9 h-12 bg-background text-foreground rounded-xl border-0"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="h-12 px-6 bg-accent hover:opacity-95 text-accent-foreground font-bold rounded-xl shadow-glow"
          >
            {loading ? "Enviando..." : "Quero meu cupom"}
          </Button>
        </form>
        <p className="text-xs text-primary-foreground/70 mt-3">
          1 cupom por e-mail. Sem spam — cancele quando quiser.
        </p>
      </div>
    </section>
  );
}
