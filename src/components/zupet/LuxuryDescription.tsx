import {
  Heart,
  Sparkles,
  ShieldCheck,
  Truck,
  Award,
  Gift,
  Star,
  Zap,
  Check,
  X,
  Clock,
  CreditCard,
} from "lucide-react";

interface LuxuryDescriptionProps {
  title: string;
  description?: string;
}

/**
 * Premium product storytelling block — inspirado em Aesop, Apple e Allbirds.
 * Tipografia editorial, micro-interações suaves, alta densidade de prova social.
 */
export function LuxuryDescription({ title, description }: LuxuryDescriptionProps) {
  return (
    <section className="relative overflow-hidden bg-background border-t border-border">
      {/* Glow decorativo */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[800px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl" />

      <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        {/* ── Manifesto ─────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-accent font-bold uppercase tracking-[0.18em] text-[11px]">
              Curadoria Zupet
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
            Não é mais um produto.
            <br />
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              É um upgrade no dia do seu pet.
            </span>
          </h2>
          {description ? (
            <FormattedDescription text={description} />
          ) : (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              <span className="font-semibold text-foreground">{title}</span> chegou na Zupet depois
              de meses de testes com tutores reais. Cada detalhe foi pensado para entregar mais
              alegria, saúde e momentos inesquecíveis.
            </p>
          )}
        </div>

        {/* ── Pilares premium ──────────────── */}
        <div className="grid md:grid-cols-3 gap-5 mb-16 md:mb-20">
          {[
            {
              icon: Heart,
              title: "Saúde & Bem-estar",
              text: "Materiais atóxicos certificados, livres de BPA. Aprovado por veterinários.",
              accent: "from-rose-500/20 to-rose-500/5",
            },
            {
              icon: Zap,
              title: "Estímulo Inteligente",
              text: "Desperta o instinto natural, combate ansiedade e tédio em minutos.",
              accent: "from-amber-500/20 to-amber-500/5",
            },
            {
              icon: Star,
              title: "Design Premium",
              text: "Acabamento sofisticado que decora a casa e dura anos de uso intenso.",
              accent: "from-primary/20 to-primary/5",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="group relative rounded-3xl bg-card border border-border p-7 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <p.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-black mb-2 tracking-tight">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Antes vs Depois ──────────────── */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
              A transformação que você vai ver
            </h3>
            <p className="text-sm text-muted-foreground">Em poucos dias de uso real</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-3xl border border-border bg-muted/30 p-7 relative">
              <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-background border border-border">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Antes
                </span>
              </div>
              <ul className="space-y-3.5 text-sm text-muted-foreground mt-2">
                {[
                  "Pet entediado, ansioso e destrutivo",
                  "Brinquedos genéricos que quebram em dias",
                  "Falta de estímulo físico e mental",
                  "Casa bagunçada e tutor frustrado",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-muted grid place-items-center flex-shrink-0">
                      <X className="h-3 w-3" />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border-2 border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-7 relative shadow-card">
              <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-primary text-primary-foreground">
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Depois com {title}
                </span>
              </div>
              <ul className="space-y-3.5 text-sm mt-2">
                {[
                  "Pet feliz, calmo e mentalmente estimulado",
                  "Produto premium que acompanha por anos",
                  "Energia gasta da forma certa, todo dia",
                  "Casa em paz e tutor orgulhoso",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 font-medium">
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground grid place-items-center flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Trust strip ──────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16 md:mb-20">
          {[
            { icon: Truck, label: "Frete grátis", sub: "acima de R$ 49" },
            { icon: CreditCard, label: "12x sem juros", sub: "em todos pedidos" },
            { icon: Clock, label: "Envio em 24h", sub: "dias úteis" },
            { icon: ShieldCheck, label: "Compra segura", sub: "site verificado" },
          ].map((t) => (
            <div
              key={t.label}
              className="rounded-2xl bg-card border border-border p-4 text-center hover:border-primary/30 transition-colors"
            >
              <t.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-xs font-black uppercase tracking-wide">{t.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{t.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Garantia premium ─────────────── */}
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-brand text-primary-foreground shadow-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="relative p-8 md:p-14 text-center">
            <div className="inline-flex h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm grid place-items-center mb-5 ring-1 ring-white/30">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] opacity-80 mb-3">
              Garantia incondicional
            </p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-[1.1]">
              30 dias para se apaixonar
              <br />
              <span className="opacity-80">ou seu dinheiro de volta.</span>
            </h3>
            <p className="opacity-90 max-w-xl mx-auto mb-7 text-sm md:text-base leading-relaxed">
              Se o seu pet não amar, devolvemos 100% do que você pagou. Sem perguntas. Sem
              burocracia. O risco é todo nosso.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
              {[
                { icon: Award, label: "Qualidade premium" },
                { icon: Heart, label: "+12 mil pets felizes" },
                { icon: Gift, label: "Embalagem presente" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-xl py-3 ring-1 ring-white/15"
                >
                  <b.icon className="h-5 w-5" />
                  <span className="text-[11px] font-bold text-center leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
