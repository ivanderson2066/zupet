import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

export function CategoriesGrid() {
  return (
    <section id="categorias" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-accent font-bold uppercase tracking-wide text-xs mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Coleções Zupet
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Encontre tudo para o seu pet
          </h2>
          <p className="text-muted-foreground">
            Categorias selecionadas a dedo com os produtos mais desejados do momento.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to="/categoria/$slug"
              params={{ slug: cat.slug }}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} border border-border p-5 md:p-6 hover:shadow-elegant transition-all hover:-translate-y-1`}
            >
              <div className="text-4xl md:text-5xl mb-3">{cat.emoji}</div>
              <h3 className="font-black text-base md:text-lg leading-tight mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{cat.tagline}</p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                Ver produtos <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
