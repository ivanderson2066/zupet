import { Star, ShieldCheck, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/zupet-hero.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-soft">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      <div className="container mx-auto px-4 py-10 md:py-20 relative">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wide">
              <Flame className="h-3.5 w-3.5" />
              Mais vendidos do Brasil
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Os produtos que estão{" "}
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                transformando a rotina
              </span>{" "}
              de milhares de pets.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Brinquedos inteligentes, acessórios inovadores e soluções que deixam seu pet mais
              feliz, ativo e saudável.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 bg-gradient-accent text-accent-foreground font-bold rounded-2xl shadow-glow hover:opacity-95 hover:scale-[1.02] transition-all text-base"
              >
                <a href="#mais-vendidos">Comprar Agora</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-2xl font-semibold border-2"
              >
                <a href="#beneficios">Ver benefícios</a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <span className="text-sm font-bold">4.8</span>
                <span className="text-xs text-muted-foreground">avaliações verificadas</span>
              </div>
              <div className="h-4 w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-1.5 text-sm font-medium text-success">
                <ShieldCheck className="h-4 w-4" />
                Compra 100% segura
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-brand rounded-[2rem] blur-2xl opacity-30" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-card border border-border/50 aspect-[4/3]">
              <img
                src={heroImg}
                alt="Cachorro e gato felizes — Zupet"
                width={1536}
                height={1024}
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-xs font-bold flex items-center gap-1.5 shadow-soft">
                <Flame className="h-3.5 w-3.5 text-accent" />
                Mais vendidos
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
