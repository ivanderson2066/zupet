import { Link } from "@tanstack/react-router";
import { Star, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const variant = p.variants.edges[0]?.node;
  const image = p.images.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const currency = variant?.price.currencyCode || p.priceRange.minVariantPrice.currencyCode;
  const price = parseFloat(variant?.price.amount || p.priceRange.minVariantPrice.amount);
  const fakeOriginal = price > 0 ? price * 1.4 : 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:shadow-card hover:border-primary/30 transition-all hover:-translate-y-1"
    >
      <div className="relative aspect-square bg-secondary overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || p.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="grid place-items-center h-full text-muted-foreground text-sm">
            Sem imagem
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-bold rounded-full">
          -29%
        </Badge>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-1 text-xs">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-warning text-warning" />
            ))}
          </div>
          <span className="text-muted-foreground">(4.8)</span>
        </div>
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {p.title}
        </h3>
        <div className="mt-auto pt-2 space-y-2">
          <div className="flex items-baseline gap-2">
            {fakeOriginal > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(fakeOriginal, currency)}
              </span>
            )}
            <span className="text-lg font-black text-primary">
              {formatPrice(price, currency)}
            </span>
          </div>
          <Button
            onClick={handleAdd}
            disabled={isLoading || !variant}
            className="w-full rounded-xl bg-gradient-accent text-accent-foreground font-bold hover:opacity-95"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 mr-1.5" /> Comprar Agora
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}
