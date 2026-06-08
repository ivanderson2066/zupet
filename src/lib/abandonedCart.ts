export async function saveAbandonedCart(input: {
  email: string;
  cartId: string;
  checkoutUrl: string;
  totalAmount?: number;
  currency?: string;
  itemsCount?: number;
}) {
  try {
    const res = await fetch("/api/public/save-abandoned-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return res.ok;
  } catch (e) {
    console.error("saveAbandonedCart failed", e);
    return false;
  }
}
