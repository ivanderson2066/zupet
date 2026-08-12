import { ShieldCheck, RefreshCw, Truck, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: ShieldCheck,
    title: "Você compra sem risco",
    desc: "Pagamento protegido e dados criptografados. Se algo der errado, resolvemos.",
  },
  {
    icon: Truck,
    title: "Receba com rastreio",
    desc: "Código de acompanhamento enviado por e-mail e WhatsApp após o envio.",
  },
  {
    icon: RefreshCw,
    title: "Não amou? Devolvemos",
    desc: "7 dias de arrependimento garantidos por lei e 30 dias contra defeitos.",
  },
  {
    icon: MessageCircle,
    title: "Suporte de verdade",
    desc: "Atendimento humano no WhatsApp em até 2 horas em horário comercial.",
  },
];

export function RiskReversal() {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="rounded-[2rem] border border-border bg-card p-6 md:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-black uppercase tracking-wide mb-3">
              Risco zero
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
              O risco é nosso, não seu
            </h2>
            <p className="text-muted-foreground">
              Compre com tranquilidade: se o produto não fizer sentido para o seu pet, você tem
              nosso compromisso de devolução.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 rounded-2xl bg-secondary/50 border border-border/60">
                <Icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-bold text-sm mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
