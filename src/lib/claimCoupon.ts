export interface ClaimCouponResult {
  alreadyClaimed: boolean;
  coupon?: string;
  message?: string;
  error?: string;
}

export async function claimCoupon(email: string, source: string): Promise<ClaimCouponResult> {
  rememberEmail(email);
  try {
    const res = await fetch("/api/public/claim-coupon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });
    const data = (await res.json()) as ClaimCouponResult;
    if (!res.ok) {
      return { alreadyClaimed: false, error: data.error || "Erro ao resgatar cupom" };
    }
    return data;
  } catch {
    return { alreadyClaimed: false, error: "Falha de conexão" };
  }
}

const EMAIL_KEY = "zupet-lead-email";

export function rememberEmail(email: string) {
  try {
    if (typeof window !== "undefined" && email.includes("@")) {
      localStorage.setItem(EMAIL_KEY, email);
    }
  } catch {
    /* ignore */
  }
}

export function getSavedEmail(): string {
  try {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(EMAIL_KEY) || "";
  } catch {
    return "";
  }
}
