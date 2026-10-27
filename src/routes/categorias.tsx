import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/zupet/Header";
import { Footer } from "@/components/zupet/Footer";
import { CATEGORIES } from "@/lib/categories";

const CANONICAL = "https://zupet.store/categorias";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias — Produtos Premium para Cães e Gatos | Zupet" },
      {
        name: "description",
        content:
          "Navegue por todas as categorias da Zupet: brinquedos virais, alimentação, conforto, higiene, passeio e tecnologia pet. Frete grátis acima de R$ 49.",
      },
      { property: "og:title", content: "Todas as categorias da Zupet" },
      {
        property: "og:description",
        content:
          "Brinquedos, alimentação, conforto, higiene, passeio e tech pet — curadoria premium para cães e gatos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: CategoriasPage,
});

function CategoriasPage() {
  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft border-b border-border">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
              Todas as categorias
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Encontre rapidamente o que seu pet precisa — cada categoria tem curadoria própria.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to="/categoria/$slug"
                  params={{ slug: c.slug }}
                  className={`group rounded-3xl border border-border bg-gradient-to-br ${c.gradient} p-6 transition-shadow hover:shadow-soft`}
                >
                  <span className="text-3xl" aria-hidden>
                    {c.emoji}
                  </span>
                  <h2 className="text-xl font-black tracking-tight mt-3 mb-1">{c.name}</h2>
                  <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2">
                    {c.tagline}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{c.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold">
                    Ver produtos
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
