import { ShieldCheck, Truck, RefreshCw, Lock, BadgeCheck, CreditCard } from "lucide-react";

const badges = [
  { icon: ShieldCheck, title: "Compra Garantida", sub: "Ou seu dinheiro de volta" },
  { icon: Truck, title: "Frete Rastreado", sub: "Para todo o Brasil" },
  { icon: RefreshCw, title: "7 Dias para Troca", sub: "Direito garantido por lei" },
  { icon: Lock, title: "Site 100% Seguro", sub: "SSL + LGPD" },
  { icon: BadgeCheck, title: "Loja Verificada", sub: "Atendimento humano" },
  { icon: CreditCard, title: "Pague como quiser", sub: "Pix, cartão até 12x, boleto" },
];

export function GuaranteeBadges() {
  return (
    <section className="py-10 md:py-14 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">
            Selos de garantia
          </p>
          <h2 className="text-xl md:text-3xl font-black">
            Sua compra protegida do início ao fim
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {badges.map((b) => (
            <div
              key={b.title}
              className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-soft transition-all"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-brand grid place-items-center shadow-soft">
                <b.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold text-xs md:text-sm leading-tight">{b.title}</p>
                <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
