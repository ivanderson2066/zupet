import { Star, ShieldCheck } from "lucide-react";

// MOCK DATA — placeholder de UI para validação de layout/responsividade.
// Substituir por integração real (Judge.me, Loox ou Stamped) antes de publicar.
const MOCK_REVIEWS = [
  {
    name: "Marcos T.",
    location: "São Paulo, SP",
    rating: 5,
    date: "12/05/2026",
    title: "Finalmente um brinquedo que aguenta!",
    text: "Meu pitbull destruía tudo em menos de uma semana. Já comprei de vários lugares e nada durava. Esse aqui já tem mais de 2 meses e tá inteiro, ele ama. Vale cada centavo, recomendo demais pra quem tem cão destruidor.",
    verified: true,
  },
  {
    name: "Juliana R.",
    location: "Belo Horizonte, MG",
    rating: 5,
    date: "28/04/2026",
    title: "Minha gata voltou a brincar",
    text: "A Mel tem 8 anos e tinha parado de brincar com qualquer coisa. Comprei meio sem esperança e olha… ela ficou 40 minutos seguidos no primeiro dia. Tô emocionada de verdade.",
    verified: true,
  },
  {
    name: "Rafael M.",
    location: "Curitiba, PR",
    rating: 4,
    date: "19/04/2026",
    title: "Produto ótimo, entrega demorou um dia",
    text: "A transportadora atrasou 1 dia útil, mas o produto compensou. Material bem reforçado, costura firme. Meu doguinho amou de primeira. Tiro uma estrela só pelo frete mesmo.",
    verified: true,
  },
  {
    name: "Camila S.",
    location: "Recife, PE",
    rating: 5,
    date: "05/04/2026",
    title: "Ajudou demais com a ansiedade",
    text: "Meu border collie ficava destruindo a sala quando eu saía pra trabalhar. Comecei a deixar ele com o brinquedo interativo da Zupet e a diferença foi absurda — voltei pra casa e tava tudo no lugar. Recomendo de olhos fechados.",
    verified: true,
  },
  {
    name: "Pedro H.",
    location: "Porto Alegre, RS",
    rating: 5,
    date: "22/03/2026",
    title: "Qualidade premium de verdade",
    text: "Embalagem caprichada, acabamento impecável. Dá pra ver que não é aquele produto chinês qualquer.",
    verified: true,
  },
  {
    name: "Larissa F.",
    location: "Salvador, BA",
    rating: 4,
    date: "10/03/2026",
    title: "Meus dois gatos aprovaram",
    text: "Tenho um siamês e um vira-lata, os dois disputam o brinquedo. Único ponto é que poderia vir com peça reserva, porque eles brigam muito por ele kkkk. Fora isso, perfeito.",
    verified: true,
  },
];

export function Reviews() {
  const avg =
    MOCK_REVIEWS.reduce((s, r) => s + r.rating, 0) / MOCK_REVIEWS.length;

  return (
    <section id="avaliacoes" className="py-16 md:py-24 bg-secondary/40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-accent font-bold uppercase tracking-wide text-xs mb-3">
            Avaliações
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            O que dizem os tutores
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(avg)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold">
              {avg.toFixed(1)} · {MOCK_REVIEWS.length} avaliações
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {MOCK_REVIEWS.map((r, i) => (
            <article
              key={i}
              className="rounded-2xl bg-card border border-border p-5 md:p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${
                        j < r.rating
                          ? "fill-accent text-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>

              <h3 className="font-bold text-base leading-snug">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {r.text}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.location}</p>
                </div>
                {r.verified && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verificado
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground/70 mt-8 max-w-lg mx-auto">
          * Avaliações de demonstração para validação de layout. Conecte
          Judge.me, Loox ou Stamped para exibir reviews reais antes de publicar.
        </p>
      </div>
    </section>
  );
}
