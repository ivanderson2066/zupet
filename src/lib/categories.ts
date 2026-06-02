export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  query: string; // Shopify search query
  emoji: string;
  gradient: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "caes",
    name: "Para Cães",
    tagline: "Tudo que seu melhor amigo precisa",
    description:
      "Brinquedos, acessórios, conforto e tecnologia premium pensados para o estilo de vida do seu cachorro.",
    query: "tag:caes OR tag:dog OR product_type:Dog",
    emoji: "🐶",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    slug: "gatos",
    name: "Para Gatos",
    tagline: "Conforto felino com sofisticação",
    description:
      "Arranhadores, brinquedos interativos e acessórios premium para gatos exigentes.",
    query: "tag:gatos OR tag:cat OR product_type:Cat",
    emoji: "🐱",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    slug: "brinquedos",
    name: "Brinquedos Virais",
    tagline: "Os mais pedidos do TikTok",
    description:
      "Brinquedos inteligentes, interativos e que viralizaram pela diversão garantida.",
    query: "tag:brinquedos OR product_type:Toys",
    emoji: "🎾",
    gradient: "from-accent/30 to-primary/10",
  },
  {
    slug: "alimentacao",
    name: "Alimentação",
    tagline: "Nutrição premium",
    description:
      "Comedouros automáticos, fontes inteligentes e acessórios para uma alimentação saudável.",
    query: "tag:alimentacao OR product_type:Food",
    emoji: "🍖",
    gradient: "from-success/20 to-primary/5",
  },
  {
    slug: "conforto",
    name: "Cama & Conforto",
    tagline: "Descanso de luxo",
    description: "Caminhas ortopédicas, mantas e cantinhos premium para o pet relaxar.",
    query: "tag:conforto OR tag:cama OR product_type:Bed",
    emoji: "🛏️",
    gradient: "from-primary/15 to-accent/10",
  },
  {
    slug: "higiene",
    name: "Higiene & Beleza",
    tagline: "Cuidado spa em casa",
    description: "Escovas inteligentes, shampoos, banho e grooming profissional para uso doméstico.",
    query: "tag:higiene OR product_type:Grooming",
    emoji: "🛁",
    gradient: "from-primary/20 to-success/10",
  },
  {
    slug: "passeio",
    name: "Passeio & Coleiras",
    tagline: "Estilo nas ruas",
    description: "Coleiras premium, guias confortáveis e acessórios elegantes para o passeio.",
    query: "tag:passeio OR product_type:Walk",
    emoji: "🦮",
    gradient: "from-accent/20 to-primary/15",
  },
  {
    slug: "tecnologia",
    name: "Tech Pet",
    tagline: "O futuro do seu pet",
    description: "Câmeras, GPS, alimentadores automáticos e gadgets que transformam a rotina.",
    query: "tag:tech OR tag:tecnologia OR product_type:Tech",
    emoji: "📡",
    gradient: "from-primary/25 to-accent/15",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
