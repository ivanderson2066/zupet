/**
 * Captura e persistência de parâmetros UTM (atribuição de campanha).
 * Os valores ficam no sessionStorage e são repassados ao checkout da Shopify.
 */

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "ttclid",
  "gclid",
] as const;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const STORAGE_KEY = "zupet_utm";

export function captureUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  const search = new URLSearchParams(window.location.search);
  const found: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) found[key] = value;
  }
  if (Object.keys(found).length > 0) {
    try {
      const merged = { ...getUtm(), ...found };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    } catch {
      return found;
    }
  }
  return getUtm();
}

export function getUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

/** Acrescenta os UTMs salvos a qualquer URL (ex.: checkout da Shopify). */
export function withUtm(url: string): string {
  const utm = getUtm();
  const entries = Object.entries(utm).filter(([, v]) => Boolean(v));
  if (entries.length === 0) return url;
  try {
    const parsed = new URL(url, typeof window !== "undefined" ? window.location.origin : "https://zupet.store");
    for (const [k, v] of entries) {
      if (!parsed.searchParams.has(k)) parsed.searchParams.set(k, String(v));
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

/** Monta um link de campanha para divulgação (anúncios, bio, e-mail). */
export function buildCampaignUrl(
  path: string,
  params: UtmParams,
  origin = "https://zupet.store",
): string {
  const url = new URL(path, origin);
  for (const [k, v] of Object.entries(params)) {
    if (v) url.searchParams.set(k, v);
  }
  return url.toString();
}
