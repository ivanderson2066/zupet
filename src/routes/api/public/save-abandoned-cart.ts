import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const Schema = z.object({
  email: z.string().email().max(255),
  cartId: z.string().min(1).max(512),
  checkoutUrl: z.string().url().max(1024),
  totalAmount: z.number().min(0).max(1_000_000).optional(),
  currency: z.string().min(1).max(8).optional(),
  itemsCount: z.number().int().min(0).max(1000).optional(),
});

export const Route = createFileRoute("/api/public/save-abandoned-cart")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Corpo inválido" }, { status: 400 });
        }
        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Dados inválidos" }, { status: 400 });
        }
        const d = parsed.data;
        const email = d.email.trim().toLowerCase();

        const { error } = await supabaseAdmin
          .from("abandoned_carts")
          .upsert(
            {
              email,
              cart_id: d.cartId,
              checkout_url: d.checkoutUrl,
              total_amount: d.totalAmount ?? null,
              currency: d.currency ?? "BRL",
              items_count: d.itemsCount ?? 0,
            },
            { onConflict: "email,cart_id" },
          );

        if (error) {
          console.error("[save-abandoned-cart]", error);
          return Response.json({ error: "Não foi possível salvar" }, { status: 500 });
        }
        return Response.json({ ok: true });
      },
    },
  },
});
