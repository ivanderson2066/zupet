import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/zupet/PageShell";

const CANONICAL = "https://zupet.store/cookies";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — Zupet" },
      {
        name: "description",
        content:
          "Entenda quais cookies a Zupet utiliza, para que servem e como você pode gerenciar suas preferências no navegador.",
      },
      { property: "og:title", content: "Política de Cookies — Zupet" },
      {
        property: "og:description",
        content: "Quais cookies usamos, por quê e como gerenciar suas preferências.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <PageShell
      title="Política de Cookies"
      subtitle="Transparência sobre os dados que usamos para melhorar sua experiência de compra."
    >
      <p className="lead">
        Cookies são pequenos arquivos guardados no seu navegador que ajudam o site a funcionar,
        lembrar seu carrinho e entender o que precisa melhorar.
      </p>

      <h2>Tipos de cookies que usamos</h2>
      <ul>
        <li>
          <strong>Essenciais:</strong> mantêm seu carrinho, o cupom aplicado e a sessão de compra.
          Sem eles a loja não funciona.
        </li>
        <li>
          <strong>Desempenho:</strong> medem páginas mais visitadas e erros, de forma agregada.
        </li>
        <li>
          <strong>Marketing:</strong> Meta Pixel e parâmetros de campanha (UTM) para medir quais
          anúncios geram vendas e evitar mostrar o mesmo anúncio repetidamente.
        </li>
      </ul>

      <h2>Terceiros</h2>
      <p>
        Além dos nossos, alguns parceiros podem definir cookies: Shopify (carrinho e checkout) e Meta
        (mensuração de anúncios). Cada um segue a própria política de privacidade.
      </p>

      <h2>Como gerenciar</h2>
      <p>
        Você pode bloquear ou apagar cookies nas configurações do seu navegador. Ao bloquear os
        cookies essenciais, funções como carrinho e finalização de compra podem parar de funcionar.
      </p>

      <h2>Seus direitos</h2>
      <p>
        Conforme a LGPD, você pode solicitar acesso, correção ou exclusão dos seus dados escrevendo
        para <a href="mailto:ola@zupet.com.br">ola@zupet.com.br</a>. Veja também nossa{" "}
        <Link to="/privacidade">Política de Privacidade</Link> e os{" "}
        <Link to="/termos">Termos de Uso</Link>.
      </p>
    </PageShell>
  );
}
