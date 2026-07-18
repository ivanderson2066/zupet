import { useEffect } from "react";
import { Star, ShieldCheck, ExternalLink, Quote } from "lucide-react";
import { SHOPIFY_STORE_PERMANENT_DOMAIN } from "@/lib/shopify";

/**
 * Judge.me widget integrado com skin Premium Zupet.
 *
 * O CSS abaixo re-estiliza as classes injetadas pela Judge.me
 * (`.jdgm-*`) para casar com o design system da loja: estrelas
 * laranja `--accent`, cards com sombra, tipografia consistente,
 * espaçamentos generosos e comportamento responsivo.
 */
export function Reviews() {
  useEffect(() => {
    if (document.getElementById("judgeme-widget-preloader")) return;
    const s = document.createElement("script");
    s.id = "judgeme-widget-preloader";
    s.src = "https://cdn.judge.me/widget_preloader.js";
    s.async = true;
    s.setAttribute("data-shop-domain", SHOPIFY_STORE_PERMANENT_DOMAIN);
    document.body.appendChild(s);
  }, []);

  return (
    <section id="avaliacoes" className="py-20 md:py-28 bg-gradient-soft relative overflow-hidden">
      {/* Skin Premium Zupet para Judge.me */}
      <style>{`
        .jdgm-widget,
        .jdgm-widget * {
          font-family: var(--font-sans) !important;
          color: var(--color-foreground);
          box-sizing: border-box;
        }
        /* Estrelas na cor de destaque */
        .jdgm-star.jdgm--on,
        .jdgm-star.jdgm--half { color: var(--color-accent) !important; }
        .jdgm-star.jdgm--off { color: color-mix(in oklab, var(--color-accent) 25%, transparent) !important; }
        .jdgm-star { font-size: 18px !important; letter-spacing: 1px; }

        /* Cabeçalho agregado */
        .jdgm-rev-widg__header,
        .jdgm-all-reviews-rating-wrapper {
          border: none !important;
          padding: 0 !important;
          background: transparent !important;
        }
        .jdgm-rev-widg__summary-average {
          font-size: 2.5rem !important;
          font-weight: 900 !important;
          color: var(--color-foreground);
          line-height: 1;
        }
        .jdgm-rev-widg__summary-text {
          color: var(--color-muted-foreground);
          font-size: 0.875rem;
        }

        /* Barra de filtros */
        .jdgm-rev-widg__sort-wrapper select,
        .jdgm-rev-widg__actions button,
        .jdgm-write-rev-link {
          background: var(--color-card) !important;
          border: 1px solid var(--color-border) !important;
          color: var(--color-foreground) !important;
          border-radius: 999px !important;
          padding: 0.5rem 1rem !important;
          font-weight: 600 !important;
          font-size: 0.8125rem !important;
          transition: all 0.2s;
        }
        .jdgm-write-rev-link {
          background: var(--color-accent) !important;
          color: var(--color-accent-foreground) !important;
          border-color: transparent !important;
          box-shadow: var(--shadow-glow);
        }
        .jdgm-write-rev-link:hover { transform: translateY(-1px); }

        /* Cards de review */
        .jdgm-rev {
          background: var(--color-card) !important;
          border: 1px solid var(--color-border) !important;
          border-radius: 1.25rem !important;
          padding: 1.5rem !important;
          margin-bottom: 1rem !important;
          box-shadow: var(--shadow-soft);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .jdgm-rev:hover {
          box-shadow: var(--shadow-card);
          transform: translateY(-2px);
        }
        .jdgm-rev__author,
        .jdgm-rev__reviewer-name-and-country {
          font-weight: 700 !important;
          color: var(--color-foreground) !important;
        }
        .jdgm-rev__timestamp,
        .jdgm-rev__location { color: var(--color-muted-foreground) !important; font-size: 0.75rem !important; }
        .jdgm-rev__title {
          font-size: 1rem !important;
          font-weight: 700 !important;
          margin-top: 0.5rem !important;
          color: var(--color-foreground);
        }
        .jdgm-rev__body {
          color: color-mix(in oklab, var(--color-foreground) 80%, transparent) !important;
          line-height: 1.6 !important;
          font-size: 0.9375rem !important;
        }
        .jdgm-rev__verified-badge,
        .jdgm-rev__buyer-badge {
          background: color-mix(in oklab, var(--color-success) 12%, transparent) !important;
          color: color-mix(in oklab, var(--color-success) 90%, #000) !important;
          border: 1px solid color-mix(in oklab, var(--color-success) 25%, transparent) !important;
          border-radius: 999px !important;
          padding: 2px 10px !important;
          font-size: 0.6875rem !important;
          font-weight: 600 !important;
        }

        /* Fotos de review */
        .jdgm-rev__pic,
        .jdgm-rev__pic-img {
          border-radius: 0.75rem !important;
          border: 1px solid var(--color-border) !important;
        }

        /* Paginação */
        .jdgm-paginate__page {
          background: var(--color-card) !important;
          border: 1px solid var(--color-border) !important;
          color: var(--color-foreground) !important;
          border-radius: 0.5rem !important;
          margin: 0 2px !important;
        }
        .jdgm-paginate__page.jdgm-curt {
          background: var(--color-primary) !important;
          color: var(--color-primary-foreground) !important;
          border-color: transparent !important;
        }

        /* Modal de escrever review */
        .jdgm-form-wrapper, .jdgm-modal-content {
          border-radius: 1.5rem !important;
          border: 1px solid var(--color-border) !important;
        }
      `}</style>

      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="text-center mb-12">
          <p className="text-accent font-bold uppercase tracking-widest text-xs mb-3">
            Avaliações verificadas
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            O que os tutores <span className="text-accent">estão dizendo</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Reviews reais coletadas via Judge.me — sem edição, sem filtro,
            direto de quem já comprou na Zupet.
          </p>

          {/* Rating agregado */}
          <div className="mt-8 inline-flex flex-col items-center gap-2 bg-card border border-border rounded-2xl px-6 py-4 shadow-soft">
            <div
              className="jdgm-all-reviews-rating"
              data-average-rating=""
              data-number-of-reviews=""
            />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full ml-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            100% verificadas · impossível editar ou remover
          </div>
        </div>

        {/* Widget principal */}
        <div className="relative rounded-3xl bg-card/60 backdrop-blur border border-border/70 shadow-card p-4 md:p-8 min-h-[420px]">
          <Quote className="absolute -top-4 -left-2 h-16 w-16 text-accent/10 pointer-events-none" />
          <div className="jdgm-all-reviews-widget" data-product-id="all" />

          <noscript>
            <p className="text-center text-sm text-muted-foreground py-12">
              Ative o JavaScript para ver as avaliações dos tutores Zupet.
            </p>
          </noscript>
        </div>

        {/* Selos de credibilidade */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
          {[
            { n: "Verified", t: "Compra confirmada" },
            { n: "Judge.me", t: "Plataforma independente" },
            { n: "Sem edição", t: "Só o cliente altera" },
            { n: "Fotos reais", t: "Do pet do tutor" },
          ].map((b) => (
            <div
              key={b.n}
              className="rounded-2xl bg-card border border-border/60 p-4 hover:shadow-soft transition-shadow"
            >
              <div className="flex items-center justify-center gap-1 text-accent">
                <Star className="h-4 w-4 fill-accent" />
                <span className="font-bold text-sm">{b.n}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{b.t}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground/70 mt-8 max-w-lg mx-auto flex items-center justify-center gap-1">
          Reviews gerenciadas por
          <a
            href="https://judge.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-semibold hover:text-foreground"
          >
            Judge.me <ExternalLink className="h-3 w-3" />
          </a>
        </p>
      </div>
    </section>
  );
}
