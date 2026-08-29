import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, QrCode, Barcode, Lock, ShieldCheck, BadgePercent } from "lucide-react";
import { PageShell } from "@/components/zupet/PageShell";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://zupet.store/pagamento";

const METHODS = [
  {
    icon: QrCode,
    title: "Pix",
    text: "Aprovação imediata. O pedido entra em separação em minutos.",
  },
  {
    icon: CreditCard,
    title: "Cartão de crédito",
    text: "Parcelamos em até 12x. Aceitamos Visa, Mastercard, Elo, Amex e Hipercard.",
  },
  {
    icon: Barcode,
    title: "Boleto bancário",
    text: "Compensação em até 2 dias úteis; o envio acontece após a confirmação.",
  },
];

export const Route = createFileRoute("/pagamento")({
  head: () => ({
    meta: [
      { title: "Formas de Pagamento — Pix, Boleto e até 12x | Zupet" },
      {
        name: "description",
        content:
          "Pague na Zupet com Pix, boleto ou cartão de crédito em até 12x. Checkout criptografado, dados protegidos e garantia de 30 dias.",
      },
      { property: "og:title", content: "Formas de pagamento na Zupet" },
      {
        property: "og:description",
        content: "Pix, boleto ou cartão em até 12x, com checkout seguro e criptografado.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: PagamentoPage,
});

function PagamentoPage() {
  return (
    <PageShell
      title="Formas de pagamento"
      subtitle="Escolha como preferir pagar: Pix, boleto ou cartão em até 12x, sempre com segurança."
    >
      <div className="not-prose grid sm:grid-cols-3 gap-4 mb-10">
        {METHODS.map((m) => (
          <div key={m.title} className="rounded-2xl border border-border bg-card p-5">
            <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center mb-3">
              <m.icon className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-bold text-base mb-1">{m.title}</h2>
            <p className="text-sm text-muted-foreground">{m.text}</p>
          </div>
        ))}
      </div>

      <h2>Parcelamento</h2>
      <p>
        O parcelamento em até 12x é oferecido pela operadora do seu cartão. O valor mínimo por
        parcela é de R$ 5,00 — em compras menores, o número de parcelas disponíveis é reduzido
        automaticamente no checkout.
      </p>

      <h2>Segurança da transação</h2>
      <p>
        O pagamento é processado pelo Shopify Checkout com criptografia de ponta a ponta e
        certificação PCI-DSS. A Zupet não armazena e não tem acesso aos dados do seu cartão.
      </p>

      <div className="not-prose grid sm:grid-cols-3 gap-4 my-8">
        {[
          { icon: Lock, title: "Conexão SSL", text: "Todos os dados trafegam criptografados." },
          { icon: ShieldCheck, title: "Garantia 30 dias", text: "Satisfação garantida ou reembolso." },
          { icon: BadgePercent, title: "Cupom ZUPET10", text: "10% OFF na primeira compra." },
        ].map((b) => (
          <div key={b.title} className="rounded-2xl bg-secondary/50 border border-border p-5">
            <b.icon className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-bold text-sm m-0">{b.title}</h3>
            <p className="text-sm text-muted-foreground m-0 mt-1">{b.text}</p>
          </div>
        ))}
      </div>

      <h2>Cupons e descontos</h2>
      <p>
        Cupons são aplicados no carrinho antes de finalizar a compra. Só é possível usar um cupom por
        pedido, e cupons promocionais não são cumulativos com outras campanhas ativas.
      </p>

      <h2>Reembolsos</h2>
      <p>
        Aprovado o reembolso, o prazo depende do meio de pagamento: Pix em até 3 dias úteis, boleto
        em até 10 dias úteis (via transferência) e cartão de crédito na fatura seguinte, conforme o
        ciclo do banco emissor.
      </p>

      <div className="not-prose mt-10 flex flex-wrap gap-3">
        <Button asChild className="rounded-full font-bold">
          <Link to="/oferta">Ver ofertas</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full font-bold">
          <Link to="/faq">Perguntas frequentes</Link>
        </Button>
      </div>
    </PageShell>
  );
}
