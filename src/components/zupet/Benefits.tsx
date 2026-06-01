import { Sparkles, Heart, Activity, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    emoji: "🐾",
    title: "Menos tédio",
    desc: "Brinquedos inteligentes que mantêm seu pet entretido por horas.",
  },
  {
    icon: Heart,
    emoji: "🐾",
    title: "Mais diversão",
    desc: "Experiências interativas que fortalecem o vínculo com o seu pet.",
  },
  {
    icon: Activity,
    emoji: "🐾",
    title: "Mais bem-estar",
    desc: "Produtos que estimulam a saúde física e mental do seu pet.",
  },
  {
    icon: ShieldCheck,
    emoji: "🐾",
    title: "Produtos selecionados",
    desc: "Curadoria premium testada por veterinários e milhares de tutores.",
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-accent font-bold uppercase tracking-wide text-xs mb-3">
            Por que escolher Zupet
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Tudo que seu pet precisa para ser feliz
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-card transition-all hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 grid place-items-center mb-4 group-hover:bg-gradient-brand transition-colors">
                <b.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-bold text-lg mb-1.5">
                <span aria-hidden className="mr-1">{b.emoji}</span>
                {b.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
