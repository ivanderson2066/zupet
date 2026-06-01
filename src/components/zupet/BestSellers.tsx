import { useQuery } from "@tanstack/react-query";
import { Flame, PackageX } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";

export function BestSellers() {
  const { data, isLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 12, query: null });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  return (
    <section id="mais-vendidos" className="py-16 md:py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8 md:mb-12">
          <div>
            <p className="text-accent font-bold uppercase tracking-wide text-xs mb-2 flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5" />
              Top da semana
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Produtos mais vendidos
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Selecionamos os favoritos de milhares de tutores brasileiros.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 md:p-16 text-center">
            <PackageX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Nenhum produto ainda</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Diga aqui no chat qual produto cadastrar (nome e preço) que eu adiciono na sua loja
              Shopify e ele aparece aqui automaticamente.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {data.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
