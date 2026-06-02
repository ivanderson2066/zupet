import { Heart, Sparkles, ShieldCheck, Truck, Award, Gift, Star, Zap } from "lucide-react";

interface LuxuryDescriptionProps {
  title: string;
  description?: string;
}

/**
 * Sales-focused luxury product description block.
 * Renders the Shopify description plus persuasive sections, applied to every product.
 */
export function LuxuryDescription({ title, description }: LuxuryDescriptionProps) {
  return (
    <section className="bg-gradient-soft border-t border-border">
      <div className="container mx-auto px-4 py-14 md:py-20 max-w-5xl">
        {/* Manifesto */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-accent font-bold uppercase tracking-wide text-xs mb-3 inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Por que tutores escolhem Zupet
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Pensado em cada detalhe para o seu pet
          </h2>
          {description ? (
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{description}</p>
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {title} foi selecionado pela curadoria Zupet pensando no bem-estar real, na diversão e
              no estilo do seu melhor amigo. Premium do início ao fim.
            </p>
          )}
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {[
            { icon: Heart, title: "Saúde & bem-estar", text: "Materiais atóxicos, testados e seguros para uso diário." },
            { icon: Zap, title: "Estímulo inteligente", text: "Desperta a curiosidade natural e evita o tédio." },
            { icon: Star, title: "Design premium", text: "Acabamento elegante que combina com a sua casa." },
          ].map((p) => (
            <div key={p.title} className="rounded-2xl bg-card border border-border p-6 text-center hover:shadow-card transition-all">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 grid place-items-center mx-auto mb-3">
                <p.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-black mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div className="grid md:grid-cols-2 gap-4 mb-14">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">Antes</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Pet entediado e ansioso em casa</li>
              <li>• Brinquedos baratos que quebram em dias</li>
              <li>• Falta de estímulo físico e mental</li>
              <li>• Tutor sem tempo para entreter</li>
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-primary mb-3">Depois com {title}</p>
            <ul className="space-y-2 text-sm">
              <li>✅ Pet feliz, ativo e calmo no dia a dia</li>
              <li>✅ Produto premium feito para durar</li>
              <li>✅ Estímulo físico e mental real</li>
              <li>✅ Mais tempo de qualidade com o tutor</li>
            </ul>
          </div>
        </div>

        {/* Guarantee */}
        <div className="rounded-3xl bg-gradient-brand text-primary-foreground p-8 md:p-10 text-center shadow-glow">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-white/20 grid place-items-center mb-4">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h3 className="text-2xl md:text-3xl font-black mb-2">Garantia Zupet de 30 dias</h3>
          <p className="opacity-90 max-w-xl mx-auto mb-6">
            Se o seu pet não amar, devolvemos 100% do seu dinheiro. Sem perguntas. Sem burocracia.
            Você só tem a ganhar.
          </p>
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs">
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-5 w-5" />
              <span>Frete Brasil</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Award className="h-5 w-5" />
              <span>Qualidade premium</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Gift className="h-5 w-5" />
              <span>Embalagem presente</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
