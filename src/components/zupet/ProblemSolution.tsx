import { Cat, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProblemSolution() {
  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/20 text-destructive-foreground text-xs font-bold uppercase tracking-wide">
              <Cat className="h-3.5 w-3.5" />
              Problema comum
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Seu gato passa o dia entediado e sem energia?
            </h2>
            <p className="text-lg text-background/70 leading-relaxed">
              Pets entediados desenvolvem comportamentos destrutivos, ansiedade e até problemas de
              saúde. A solução não é mais brinquedos — é os brinquedos certos, pensados para
              estimular instintos naturais.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-accent opacity-30 blur-3xl rounded-full" />
            <div className="relative rounded-3xl bg-background text-foreground p-8 md:p-10 shadow-glow border-2 border-accent/40">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wide mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Solução Zupet
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-3 leading-tight">
                Brinquedos interativos que despertam o caçador.
              </h3>
              <p className="text-muted-foreground mb-6">
                Movimento imprevisível, sons que estimulam o instinto e mecanismos seguros. Seu pet
                gasta energia, dorme melhor e fica mais feliz — comprovado em milhares de lares.
              </p>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gradient-accent text-accent-foreground font-bold rounded-xl h-12 px-6 shadow-glow"
              >
                <a href="#mais-vendidos">
                  Ver produtos <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
