import { Lock, Award, Truck, Headphones, ShieldCheck } from "lucide-react";

const items = [
  { icon: Lock, title: "Compra protegida", desc: "Conexão SSL e dados criptografados." },
  { icon: Award, title: "Garantia Zupet", desc: "30 dias para troca ou devolução." },
  { icon: Truck, title: "Rastreamento", desc: "Acompanhe o pedido até a sua porta." },
  { icon: Headphones, title: "Atendimento humano", desc: "Suporte rápido por WhatsApp." },
  { icon: ShieldCheck, title: "Pagamento seguro", desc: "Pix, cartão e boleto com segurança." },
];

export function TrustSection() {
  return (
    <section className="py-12 md:py-16 bg-secondary/40 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {items.map((it) => (
            <div key={it.title} className="text-center">
              <div className="h-12 w-12 mx-auto rounded-xl bg-background grid place-items-center mb-3 shadow-soft">
                <it.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-sm mb-1">{it.title}</h3>
              <p className="text-xs text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
