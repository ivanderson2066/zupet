import { Star, Camera } from "lucide-react";

export function Reviews() {
  return (
    <section id="avaliacoes" className="py-16 md:py-24 bg-secondary/40">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <p className="text-accent font-bold uppercase tracking-wide text-xs mb-3">
            Avaliações
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            O que dizem os tutores
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-muted-foreground/40" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Ainda não há avaliações publicadas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-card border border-dashed border-border p-6 text-center"
            >
              <Camera className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Sua avaliação pode aparecer aqui
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-lg mx-auto">
          Conecte um app de avaliações da Shopify (Judge.me, Loox, Stamped) para exibir
          reviews reais com fotos dos clientes.
        </p>
      </div>
    </section>
  );
}
