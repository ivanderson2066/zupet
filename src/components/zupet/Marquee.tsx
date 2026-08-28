const ITEMS = [
  "🚚 Frete grátis acima de R$ 49",
  "🎁 10% OFF com o cupom ZUPET10",
  "🔒 Compra 100% segura",
  "↩️ 30 dias para trocar ou devolver",
  "⭐ 4,8/5 em avaliações verificadas",
  "📦 Envio em até 24h úteis",
];

export function Marquee() {
  return (
    <div className="bg-primary text-primary-foreground overflow-hidden border-y border-primary-foreground/10">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
            {ITEMS.map((item) => (
              <span
                key={item}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
