import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/zupet/PageShell";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Zupet" },
      { name: "description", content: "Termos e condições de uso da loja Zupet." },
    ],
    links: [{ rel: "canonical", href: "/termos" }],
  }),
  component: () => (
    <PageShell title="Termos de Uso" subtitle="Regras claras para uma relação de confiança.">
      <h2>Sobre a Zupet</h2>
      <p>Zupet é uma loja virtual brasileira de produtos premium para pets. Ao usar nosso site você concorda com estes termos.</p>
      <h2>Pedidos e pagamentos</h2>
      <p>Pagamentos processados de forma segura via Shopify Checkout: Pix, cartão de crédito (até 12x), boleto e carteiras digitais. O pedido é confirmado após a aprovação do pagamento.</p>
      <h2>Preços</h2>
      <p>Os preços estão em Reais (R$) e podem ser alterados sem aviso prévio. O valor cobrado é o vigente no momento da compra.</p>
      <h2>Cancelamento</h2>
      <p>Pedidos podem ser cancelados antes do despacho. Após o envio, seguem nossa política de Trocas e Devoluções.</p>
      <h2>Propriedade intelectual</h2>
      <p>Todo conteúdo do site (textos, imagens, marca) é propriedade da Zupet e protegido por lei.</p>
      <h2>Dúvidas</h2>
      <p>Entre em contato: ola@zupet.com.br</p>
    </PageShell>
  ),
});
