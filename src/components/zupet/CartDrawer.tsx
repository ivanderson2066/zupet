import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  ShieldCheck,
  Tag,
  X,
  Mail,
  Check,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { trackInitiateCheckout } from "@/lib/pixel";
import { saveAbandonedCart } from "@/lib/abandonedCart";
import { toast } from "sonner";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const setOpen = useCartStore((s) => s.setOpen);
  const items = useCartStore((s) => s.items);
  const cartId = useCartStore((s) => s.cartId);
  const isLoading = useCartStore((s) => s.isLoading);
  const isSyncing = useCartStore((s) => s.isSyncing);
  const appliedDiscount = useCartStore((s) => s.appliedDiscount);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const syncCart = useCartStore((s) => s.syncCart);
  const applyDiscount = useCartStore((s) => s.applyDiscount);
  const removeDiscount = useCartStore((s) => s.removeDiscount);

  const [couponInput, setCouponInput] = useState("");
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  useEffect(() => {
    setEmailSaved(false);
  }, [items.length]);

  const totalItems = items.reduce((a, b) => a + b.quantity, 0);
  const subtotal = items.reduce((a, b) => a + parseFloat(b.price.amount) * b.quantity, 0);
  const currency = items[0]?.price.currencyCode || "BRL";

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    const r = await applyDiscount(couponInput);
    if (r.success) {
      toast.success(r.message);
      setCouponInput("");
    } else {
      toast.error(r.message);
    }
  };

  const handleSaveEmail = async () => {
    if (!email.includes("@") || !cartId) return;
    const url = getCheckoutUrl();
    if (!url) return;
    setSavingEmail(true);
    const ok = await saveAbandonedCart({
      email,
      cartId,
      checkoutUrl: url,
      totalAmount: subtotal,
      currency,
      itemsCount: totalItems,
    });
    setSavingEmail(false);
    if (ok) {
      setEmailSaved(true);
      toast.success("Tudo certo! 💌", {
        description: "Vamos guardar seu carrinho e te enviar um lembrete.",
      });
    } else {
      toast.error("Não foi possível salvar agora. Tente novamente.");
    }
  };

  const checkout = async () => {
    const url = getCheckoutUrl();
    if (!url) return;
    // salva carrinho antes de ir pro checkout (se tiver email)
    if (email.includes("@") && cartId && !emailSaved) {
      await saveAbandonedCart({
        email,
        cartId,
        checkoutUrl: url,
        totalAmount: subtotal,
        currency,
        itemsCount: totalItems,
      });
    }
    trackInitiateCheckout({
      content_ids: items.map((i) => i.variantId),
      num_items: totalItems,
      value: subtotal,
      currency,
    });
    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Seu carrinho
          </SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Seu carrinho está vazio"
              : `${totalItems} ite${totalItems !== 1 ? "ns" : "m"} selecionado${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 grid place-items-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Adicione produtos para começar</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto -mx-6 px-6 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.variantId}
                      className="flex gap-3 p-3 rounded-xl bg-secondary/50 border border-border"
                    >
                      <div className="w-20 h-20 rounded-lg bg-background overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{item.product.node.title}</h4>
                        {item.selectedOptions.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {item.selectedOptions.map((o) => o.value).join(" • ")}
                          </p>
                        )}
                        <p className="font-bold text-primary mt-1">
                          {formatPrice(item.price.amount, item.price.currencyCode)}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 ml-auto text-destructive"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cupom */}
                <div className="mt-4 rounded-xl border border-border p-3 bg-background">
                  <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Tag className="h-4 w-4 text-primary" />
                    Cupom de desconto
                  </div>
                  {appliedDiscount ? (
                    <div className="flex items-center justify-between rounded-lg bg-primary/10 border border-primary/30 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="font-bold text-primary text-sm">{appliedDiscount}</span>
                        <span className="text-xs text-muted-foreground">aplicado</span>
                      </div>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={removeDiscount}>
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ex: ZUPET10"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                        className="h-9 uppercase"
                      />
                      <Button
                        size="sm"
                        onClick={handleApplyCoupon}
                        disabled={isLoading || !couponInput.trim()}
                      >
                        Aplicar
                      </Button>
                    </div>
                  )}
                </div>

                {/* Email para recuperação */}
                {!emailSaved && (
                  <div className="mt-3 rounded-xl border border-dashed border-border p-3 bg-secondary/30">
                    <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                      <Mail className="h-4 w-4 text-primary" />
                      Não perca seu carrinho
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Te enviamos um lembrete + cupom se você sair sem finalizar.
                    </p>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-9"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSaveEmail}
                        disabled={savingEmail || !email.includes("@")}
                      >
                        {savingEmail ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Salvar"}
                      </Button>
                    </div>
                  </div>
                )}
                {emailSaved && (
                  <div className="mt-3 rounded-xl border border-success/30 bg-success/10 p-3 flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-sm text-success-foreground">
                      Carrinho salvo — relaxa que a gente te lembra 💛
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 space-y-3 pt-4 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal, currency)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between items-center text-sm text-primary">
                    <span>Cupom {appliedDiscount}</span>
                    <span className="font-semibold">aplicado no checkout</span>
                  </div>
                )}
                <Button
                  onClick={checkout}
                  className="w-full h-12 bg-gradient-accent hover:opacity-95 text-accent-foreground font-bold rounded-xl shadow-glow"
                  disabled={isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" /> Finalizar Compra
                    </>
                  )}
                </Button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-success" />
                  Pagamento 100% seguro · Frete em todo Brasil
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
