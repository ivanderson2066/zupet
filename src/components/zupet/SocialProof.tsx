import { ShieldCheck, Truck, RefreshCw, MessageCircle, Lock, HeartHandshake } from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Compra 100% segura",
    desc: "Pagamento processado pelo Mercado Pago com criptografia bancária.",
  },
  {
    icon: Truck,
    title: "Frete para todo o Brasil",
    desc: "Enviamos pelos Correios e transportadoras com código de rastreio.",
  },
  {
    icon: RefreshCw,
    title: "7 dias para troca",
    desc: "Direito de arrependimento garantido pelo Código de Defesa do Consumidor.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento humano",
    desc: "Falamos com você no WhatsApp em até 2 horas em horário comercial.",
  },
  {
    icon: Lock,
    title: "Seus dados protegidos",
    desc: "Site em HTTPS e em conformidade com a LGPD.",
  },
  {
    icon: HeartHandshake,
    title: "Curadoria pet-first",
    desc: "Produtos escolhidos pensando no bem-estar real do seu pet.",
  },
];

export function SocialProof() {
  return (
    <section className="py-14 md:py-20 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
            Por que comprar na Zupet
          </p>
          <h2 className="text-2xl md:text-4xl font-black">
            Compra tranquila, do clique à entrega
          </h2>
          <p className="text-muted-foreground mt-3 text-sm md:text-base">
            Loja independente, atendimento direto e os direitos do consumidor garantidos por lei.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="p-5 md:p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center mb-3">
                <g.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base mb-1">{g.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
