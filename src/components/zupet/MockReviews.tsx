import { Star, BadgeCheck, Quote } from "lucide-react";

type MockReview = {
  name: string;
  city: string;
  rating: number;
  title: string;
  text: string;
  product: string;
};

const REVIEWS: MockReview[] = [
  {
    name: "Amanda R.",
    city: "São Luís, MA",
    rating: 5,
    title: "Minha gata voltou a beber água!",
    text: "Ela só bebia da torneira. Coloquei a fonte e no mesmo dia já estava bebendo sozinha. Silenciosa e fácil de limpar.",
    product: "Fonte de Água Inox",
  },
  {
    name: "Rafael M.",
    city: "Belo Horizonte, MG",
    rating: 5,
    title: "Acabou a comilança acelerada",
    text: "Meu labrador comia em 40 segundos e passava mal. Com o comedouro lento ele leva 5 minutos e nunca mais vomitou.",
    product: "Comedouro Lento",
  },
  {
    name: "Juliana P.",
    city: "Curitiba, PR",
    rating: 4,
    title: "Ótimo para o tártaro",
    text: "A escova mordedor realmente ajuda no hálito. Meu cão adorou brincar. Só achei que poderia ter uma versão maior.",
    product: "Escova Mordedor",
  },
  {
    name: "Diego S.",
    city: "Fortaleza, CE",
    rating: 5,
    title: "Cansa o cachorro sozinha",
    text: "A bolinha automática salvou minhas tardes. Ele brinca 20 minutos direto enquanto eu trabalho.",
    product: "Bolinha Automática",
  },
  {
    name: "Carla F.",
    city: "Porto Alegre, RS",
    rating: 5,
    title: "Fico tranquila no trabalho",
    text: "Consigo ver e falar com a minha cadela pelo celular. A imagem é nítida até de noite.",
    product: "Câmera Petsitter",
  },
  {
    name: "Marcos V.",
    city: "Campinas, SP",
    rating: 5,
    title: "Chegou antes do prazo",
    text: "Embalagem caprichada e produto exatamente como nas fotos. Atendimento respondeu no WhatsApp em minutos.",
    product: "Fonte de Água Inox",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "h-4 w-4 fill-accent text-accent"
              : "h-4 w-4 text-muted-foreground/30"
          }
        />
      ))}
    </div>
  );
}

export function MockReviews({
  compact = false,
  limit,
}: {
  compact?: boolean;
  limit?: number;
}) {
  const list = limit ? REVIEWS.slice(0, limit) : REVIEWS;

  return (
    <section
      id={compact ? undefined : "avaliacoes"}
      className={compact ? "py-10" : "py-20 md:py-28 bg-gradient-soft"}
    >
      <div className="container mx-auto px-4">
        <div className={compact ? "mb-6" : "text-center mb-12"}>
          <h2
            className={
              compact
                ? "text-2xl font-black"
                : "text-3xl md:text-5xl font-black tracking-tight"
            }
          >
            O que dizem sobre a Zupet
          </h2>
          {!compact && (
            <>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Histórias de tutores que transformaram a rotina dos seus pets.
              </p>
              <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-sm">
                <span className="text-3xl font-black leading-none">4,8</span>
                <Stars rating={5} />
                <span className="text-xs text-muted-foreground">
                  média das avaliações exibidas
                </span>
                <span className="hidden sm:inline h-4 w-px bg-border" />
                <span className="flex items-center gap-1 text-xs font-semibold text-success">
                  <BadgeCheck className="h-3.5 w-3.5" /> 7 dias para trocar ou devolver
                </span>
              </div>
            </>
          )}

        <div
          className={`grid gap-5 ${
            compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {list.map((r) => (
            <article
              key={r.name + r.title}
              className="relative rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-4 right-4 h-6 w-6 text-accent/15" />
              <Stars rating={r.rating} />
              <h3 className="font-bold mt-3">{r.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                {r.text}
              </p>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.city}</p>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-success whitespace-nowrap">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {r.product}
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          * Avaliações fictícias, exibidas apenas para demonstração do layout. Serão
          substituídas por avaliações reais de clientes.
        </p>
      </div>
    </section>
  );
}
