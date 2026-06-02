import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/zupet/PageShell";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Zupet" },
      { name: "description", content: "Como a Zupet coleta, usa e protege seus dados pessoais conforme a LGPD." },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: () => (
    <PageShell title="Política de Privacidade" subtitle="Seus dados estão seguros conosco. Transparência total conforme a LGPD.">
      <h2>Coleta de dados</h2>
      <p>Coletamos apenas os dados necessários para processar seu pedido: nome, endereço, e-mail, telefone e dados de pagamento (processados de forma segura pelo Shopify Payments).</p>
      <h2>Uso dos dados</h2>
      <ul>
        <li>Processar e entregar seus pedidos</li>
        <li>Enviar atualizações sobre sua compra</li>
        <li>Comunicações promocionais (mediante consentimento)</li>
      </ul>
      <h2>Compartilhamento</h2>
      <p>Não vendemos seus dados. Compartilhamos apenas com parceiros logísticos para entrega e processadores de pagamento certificados (PCI-DSS).</p>
      <h2>Seus direitos (LGPD)</h2>
      <p>Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento via ola@zupet.com.br.</p>
      <h2>Cookies</h2>
      <p>Utilizamos cookies essenciais e analíticos para melhorar sua experiência.</p>
    </PageShell>
  ),
});
