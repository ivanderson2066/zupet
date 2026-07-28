// Regras comerciais da Zupet usadas na vitrine.
// IMPORTANTE: mantenha estes valores iguais aos que você configurou no Shopify
// (Configurações → Envio para o frete grátis, e o seu gateway para o parcelamento).

export const FREE_SHIPPING_THRESHOLD = 49;

/** Número máximo de parcelas sem juros oferecido pelo seu gateway. */
export const MAX_INSTALLMENTS = 12;

/** Valor mínimo de cada parcela (padrão do mercado brasileiro). */
export const MIN_INSTALLMENT_VALUE = 5;

export function installmentsFor(price: number) {
  const n = Math.max(1, Math.min(MAX_INSTALLMENTS, Math.floor(price / MIN_INSTALLMENT_VALUE)));
  return { count: n, value: price / n };
}

export function hasFreeShipping(price: number) {
  return price >= FREE_SHIPPING_THRESHOLD;
}

/** Janela estimada de entrega em dias úteis (padrão nacional). */
export function deliveryWindow(minDays = 3, maxDays = 9) {
  const fmt = (d: Date) =>
    d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
  const addBusinessDays = (days: number) => {
    const d = new Date();
    let added = 0;
    while (added < days) {
      d.setDate(d.getDate() + 1);
      const wd = d.getDay();
      if (wd !== 0 && wd !== 6) added++;
    }
    return d;
  };
  return { from: fmt(addBusinessDays(minDays)), to: fmt(addBusinessDays(maxDays)) };
}
