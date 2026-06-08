import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const Schema = z.object({
  email: z.string().email().max(255),
  source: z.string().max(64).optional(),
});

const COUPON = "ZUPET10";

export const Route = createFileRoute("/api/public/claim-coupon")({
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
          return Response.json({ error: "E-mail inválido" }, { status: 400 });
        }
        const email = parsed.data.email.trim().toLowerCase();
        const source = parsed.data.source ?? "site";

        // Verifica se já existe um cupom para este e-mail
        const { data: existing, error: selErr } = await supabaseAdmin
          .from("coupon_claims")
          .select("email, coupon_code, created_at")
          .eq("email", email)
          .maybeSingle();

        if (selErr) {
          console.error("[claim-coupon] select error", selErr);
          return Response.json({ error: "Erro interno" }, { status: 500 });
        }

        if (existing) {
          return Response.json(
            {
              alreadyClaimed: true,
              coupon: existing.coupon_code,
              message: "Este e-mail já resgatou um cupom de 10% OFF.",
            },
            { status: 200 },
          );
        }

        const { error: insErr } = await supabaseAdmin
          .from("coupon_claims")
          .insert({ email, coupon_code: COUPON, source });

        if (insErr) {
          // Race condition: outro request inseriu primeiro (unique violation)
          if ((insErr as { code?: string }).code === "23505") {
            return Response.json(
              { alreadyClaimed: true, coupon: COUPON, message: "Este e-mail já resgatou um cupom." },
              { status: 200 },
            );
          }
          console.error("[claim-coupon] insert error", insErr);
          return Response.json({ error: "Não foi possível registrar o cupom." }, { status: 500 });
        }

        return Response.json({ alreadyClaimed: false, coupon: COUPON });
      },
    },
  },
});
