export interface ClaimCouponResult {
  alreadyClaimed: boolean;
  coupon?: string;
  message?: string;
  error?: string;
}

export async function claimCoupon(email: string, source: string): Promise<ClaimCouponResult> {
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
