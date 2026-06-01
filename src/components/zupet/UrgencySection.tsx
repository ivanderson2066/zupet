import { Flame, Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const stockHighlights = [
  { name: "Brinquedo Interativo Pro", left: 12, total: 80, sold: "68 vendidos hoje" },
  { name: "Coleira Inteligente GPS", left: 7, total: 60, sold: "53 vendidos hoje" },
  { name: "Comedouro Automático", left: 19, total: 100, sold: "81 vendidos hoje" },
];

export function UrgencySection() {
  return (
    <section className="py-14 md:py-20 bg-gradient-brand text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-black uppercase tracking-wide mb-4">
            <Timer className="h-3.5 w-3.5" /> Esta semana
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Produtos mais procurados desta semana
          </h2>
          <p className="text-primary-foreground/80">
            Estoque limitado — reposição apenas no próximo lote.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {stockHighlights.map((s) => {
            const pct = ((s.total - s.left) / s.total) * 100;
            return (
              <div
                key={s.name}
                className="p-5 rounded-2xl bg-background/10 backdrop-blur border border-primary-foreground/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{s.name}</h3>
                  <Flame className="h-4 w-4 text-accent" />
                </div>
                <Progress value={pct} className="h-2 bg-background/20 [&>div]:bg-accent" />
                <div className="flex justify-between text-xs mt-2 text-primary-foreground/85">
                  <span>Restam apenas {s.left}</span>
                  <span>{s.sold}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
