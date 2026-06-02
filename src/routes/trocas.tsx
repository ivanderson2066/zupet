import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/zupet/PageShell";

export const Route = createFileRoute("/trocas")({
  head: () => ({
    meta: [
      { title: "Trocas e Devoluções — Zupet" },
      { name: "description", content: "30 dias de garantia de satisfação. Trocas e devoluções fáceis na Zupet." },
    ],
    links: [{ rel: "canonical", href: "/trocas" }],
  }),
  component: () => (
    <PageShell title="Trocas e Devoluções" subtitle="Sua satisfação garantida em 30 dias. Sem dor de cabeça.">
      <h2>Direito de arrependimento</h2>
      <p>Conforme o Código de Defesa do Consumidor, você tem até 7 dias corridos após o recebimento para desistir da compra.</p>
      <h2>Garantia de satisfação Zupet</h2>
      <p>Vamos além: oferecemos 30 dias de garantia. Se o produto não conquistou o seu pet, devolvemos 100% do valor.</p>
      <h2>Como solicitar</h2>
      <ol>
        <li>Entre em contato via WhatsApp ou e-mail em até 30 dias.</li>
        <li>Nossa equipe gera o código de postagem reversa (sem custo).</li>
        <li>Após receber e conferir o produto, o reembolso é processado em até 5 dias úteis.</li>
      </ol>
      <h2>Defeitos de fabricação</h2>
      <p>Produtos com defeito têm garantia de 90 dias. Trocamos ou devolvemos o valor integral.</p>
    </PageShell>
  ),
});
