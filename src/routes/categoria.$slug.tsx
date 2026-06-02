import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, PackageX } from "lucide-react";
import { TopBar } from "@/components/zupet/TopBar";
import { Header } from "@/components/zupet/Header";
import { Footer } from "@/components/zupet/Footer";
import { ProductCard } from "@/components/zupet/ProductCard";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { getCategoryBySlug, CATEGORIES } from "@/lib/categories";

export const Route = createFileRoute("/categoria/$slug")({
  head: ({ params }) => {
    const cat = getCategoryBySlug(params.slug);
    const title = cat ? `${cat.name} — Zupet` : "Categoria — Zupet";
    const desc = cat?.description ?? "Produtos premium para o seu pet.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `/categoria/${params.slug}` }],
    };
  },
  loader: ({ params }) => {
    const cat = getCategoryBySlug(params.slug);
    if (!cat) throw notFound();
    return { category: cat };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center p-8 text-center">
      <div>
        <h1 className="text-3xl font-black mb-3">Categoria não encontrada</h1>
        <Button asChild><Link to="/">Voltar à loja</Link></Button>
      </div>
    </div>
  ),
  errorComponent: () => <div className="p-10 text-center">Erro ao carregar categoria.</div>,
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { data, isLoading } = useQuery({
    queryKey: ["products", "category", category.slug],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 24, query: category.query });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <section className={`bg-gradient-to-br ${category.gradient} border-b border-border`}>
          <div className="container mx-auto px-4 py-10 md:py-16">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Link>
            <div className="text-5xl md:text-6xl mb-3">{category.emoji}</div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">{category.name}</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{category.description}</p>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : !data || data.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 md:p-16 text-center">
                <PackageX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Em breve nesta categoria</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Estamos selecionando os melhores produtos premium para esta coleção.
                </p>
                <Button asChild><Link to="/">Ver todos os produtos</Link></Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {data.map((p) => (
                  <ProductCard key={p.node.id} product={p} />
                ))}
              </div>
            )}

            <div className="mt-16">
              <h2 className="text-xl font-black mb-4">Outras coleções</h2>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
                  <Link
                    key={c.slug}
                    to="/categoria/$slug"
                    params={{ slug: c.slug }}
                    className="px-4 py-2 rounded-full border border-border bg-card text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    {c.emoji} {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
