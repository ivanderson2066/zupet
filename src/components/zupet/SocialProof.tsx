import { Star, MessageCircleHeart } from "lucide-react";

export function SocialProof() {
  return (
    <section className="py-14 md:py-20 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12 text-center">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="text-4xl md:text-5xl font-black text-primary">50k+</div>
            <p className="text-sm text-muted-foreground mt-1">Pets atendidos no Brasil</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-center gap-2 text-4xl md:text-5xl font-black text-accent">
              4.8 <Star className="h-7 w-7 fill-accent" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Avaliação média da loja</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="text-4xl md:text-5xl font-black text-success">98%</div>
            <p className="text-sm text-muted-foreground mt-1">Clientes que recomendam</p>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-border bg-background/60 p-8 text-center max-w-2xl mx-auto">
          <MessageCircleHeart className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-1">Avaliações com fotos chegam em breve</h3>
          <p className="text-sm text-muted-foreground">
            Em breve você verá aqui depoimentos reais e fotos dos clientes que receberam seus
            pedidos Zupet.
          </p>
        </div>
      </div>
    </section>
  );
}
