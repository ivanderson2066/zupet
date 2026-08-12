// Meta Pixel event tracking helpers.
// Safe no-ops when fbq is not loaded (e.g. during SSR or when VITE_META_PIXEL_ID is unset).

type FbqFn = (...args: unknown[]) => void;

function fbq(): FbqFn | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { fbq?: FbqFn };
  return typeof w.fbq === "function" ? w.fbq : null;
}

export function trackPageView() {
  fbq()?.("track", "PageView");
}

export function trackViewContent(params: {
  content_ids: string[];
  content_name: string;
  content_type?: "product" | "product_group";
  value: number;
  currency: string;
}) {
  fbq()?.("track", "ViewContent", { content_type: "product", ...params });
}

export function trackAddToCart(params: {
  content_ids: string[];
  content_name: string;
  value: number;
  currency: string;
  quantity?: number;
}) {
  fbq()?.("track", "AddToCart", { content_type: "product", ...params });
}

export function trackInitiateCheckout(params: {
  content_ids: string[];
  content_name?: string;
  num_items: number;
  value: number;
  currency: string;
}) {
  fbq()?.("track", "InitiateCheckout", { content_type: "product", ...params });
}

export function trackPurchase(params: {
  content_ids: string[];
  content_name?: string;
  value: number;
  currency: string;
  num_items: number;
  order_id?: string;
}) {
  fbq()?.("track", "Purchase", {
    content_type: "product",
    ...params,
  });
}

export function trackLead(params: { content_name?: string; value?: number; currency?: string }) {
  fbq()?.("track", "Lead", { value: 0, currency: "BRL", ...params });
}

export function trackCompleteRegistration(params?: { content_name?: string; status?: string }) {
  fbq()?.("track", "CompleteRegistration", { content_name: "Cadastro Zupet", status: "completed", ...params });
}

export function trackSearch(params: { search_string: string }) {
  fbq()?.("track", "Search", params);
}

