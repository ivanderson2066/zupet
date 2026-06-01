import { Star } from "lucide-react";

const reviews = [
  {
    name: "Mariana S.",
    pet: "Tutora do Thor",
    text: "Meu cachorro era ansioso e destruía tudo. Com o brinquedo da Zupet, ele finalmente relaxa e brinca sozinho!",
    rating: 5,
  },
  {
    name: "Rafael L.",
    pet: "Tutor da Mia",
    text: "Chegou super rápido, embalagem caprichada e qualidade premium. Já é meu pet shop favorito.",
    rating: 5,
  },
  {
    name: "Camila R.",
    pet: "Tutora do Bento",
    text: "Atendimento incrível pelo WhatsApp e o produto superou as expectativas. Recomendo demais!",
    rating: 5,
  },
];

export function SocialProof() {
  return (
    <section className="py-14 md:py-20 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <div className="md:col-span-1 flex md:flex-col justify-around md:justify-center text-center md:text-left gap-4 md:gap-2">
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary">+50k</div>
              <p className="text-sm text-muted-foreground">Pedidos entregues</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-accent">4.8★</div>
              <p className="text-sm text-muted-foreground">Avaliação média</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-success">98%</div>
              <p className="text-sm text-muted-foreground">Clientes satisfeitos</p>
            </div>
          </div>
          <div className="md:col-span-3 grid sm:grid-cols-3 gap-3 md:gap-4">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="p-5 rounded-2xl bg-card border border-border shadow-soft"
              >
                <div className="flex mb-2">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-3">“{r.text}”</p>
                <div>
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.pet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
