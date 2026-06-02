import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/zupet/PageShell";

export const Route = createFileRoute("/envio")({
  head: () => ({
    meta: [
      { title: "Política de Envio — Zupet" },
      { name: "description", content: "Prazos, fretes e formas de envio Zupet para todo o Brasil. Envio expresso disponível." },
    ],
    links: [{ rel: "canonical", href: "/envio" }],
  }),
  component: () => (
    <PageShell title="Política de Envio" subtitle="Enviamos para todo o Brasil com rastreio em tempo real.">
      <h2>Prazos de entrega</h2>
      <ul>
        <li><strong>Sudeste:</strong> 2 a 5 dias úteis</li>
        <li><strong>Sul e Centro-Oeste:</strong> 4 a 8 dias úteis</li>
        <li><strong>Nordeste:</strong> 5 a 10 dias úteis</li>
        <li><strong>Norte:</strong> 7 a 14 dias úteis</li>
      </ul>
      <h2>Frete grátis</h2>
      <p>Frete grátis para compras acima de R$ 199 em todo o Brasil (modalidade econômica).</p>
      <h2>Envio expresso</h2>
      <p>Disponível na finalização da compra com prazos reduzidos via transportadora premium.</p>
      <h2>Rastreio</h2>
      <p>Após o despacho, você recebe o código de rastreio por e-mail e WhatsApp. Acompanhamento em tempo real.</p>
      <h2>Embalagem</h2>
      <p>Toda compra Zupet chega em embalagem premium, lacrada e pronta para presente.</p>
    </PageShell>
  ),
});
