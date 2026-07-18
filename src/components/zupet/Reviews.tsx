import { useEffect } from "react";
import { Star, ShieldCheck, ExternalLink } from "lucide-react";
import { SHOPIFY_STORE_PERMANENT_DOMAIN } from "@/lib/shopify";

/**
 * Judge.me widget integrado.
 *
 * Como funciona:
 * - O script `widget_preloader` da Judge.me lê o `data-shop-domain` e injeta
 *   automaticamente as reviews reais da conta Judge.me conectada à loja Shopify.
 * - Os containers `.jdgm-all-reviews-widget` e `.jdgm-all-reviews-rating`
 *   são renderizados pela Judge.me com o design que configuramos no
 *   painel deles (Judge.me → Settings → Widget Appearance).
 *
 * Para importar reviews reais do AliExpress:
 *   Judge.me Admin → Import Reviews → AliExpress → cole o link do produto AE
 *   → mapeie para o produto Shopify correspondente → Import.
 *   (Recurso nativo do plano Judge.me Awesome, US$ 15/mês.)
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
    <section id="avaliacoes" className="py-16 md:py-24 bg-secondary/40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-accent font-bold uppercase tracking-wide text-xs mb-3">
            Avaliações verificadas
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            O que os tutores estão dizendo
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Reviews reais coletadas via Judge.me — sem edição, sem filtro,
            direto de quem já comprou.
          </p>

          {/* Rating agregado (nota média + total) — renderizado pela Judge.me */}
          <div className="mt-6 flex justify-center">
            <div
              className="jdgm-all-reviews-rating"
              data-average-rating=""
              data-number-of-reviews=""
            />
          </div>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5" />
            100% verificadas · impossível editar ou remover
          </div>
        </div>

        {/* Widget de reviews Judge.me — carrega a lista real */}
        <div className="rounded-3xl bg-card border border-border shadow-sm p-4 md:p-8 min-h-[400px]">
          <div className="jdgm-all-reviews-widget" data-product-id="all" />

          {/* Fallback antes do script carregar / se conta não tiver reviews */}
          <noscript>
            <p className="text-center text-sm text-muted-foreground py-12">
              Ative o JavaScript para ver as avaliações dos tutores Zupet.
            </p>
          </noscript>
        </div>

        {/* Rodapé de credibilidade */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { n: "Verified", t: "Compra confirmada" },
            { n: "Judge.me", t: "Plataforma independente" },
            { n: "Sem edição", t: "Só o cliente altera" },
            { n: "Fotos reais", t: "Do pet do tutor" },
          ].map((b) => (
            <div
              key={b.n}
              className="rounded-2xl bg-card border border-border/60 p-4"
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
