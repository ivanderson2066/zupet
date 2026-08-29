import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { PageShell } from "@/components/zupet/PageShell";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CANONICAL = "https://zupet.store/faq";

const QA = [
  {
    q: "Qual o prazo de entrega?",
    a: "Pedidos aprovados até 15h saem no mesmo dia útil. A entrega leva de 3 a 9 dias úteis para capitais e de 5 a 14 dias úteis para o interior, com rastreio enviado por e-mail.",
  },
  {
    q: "O frete é grátis?",
    a: "Sim: compras acima de R$ 49 têm frete grátis para todo o Brasil. Abaixo desse valor o frete é calculado no checkout pelo CEP.",
  },
  {
    q: "Como uso o cupom de desconto?",
    a: "Adicione os produtos ao carrinho, abra o carrinho e digite o cupom (por exemplo ZUPET10) no campo de desconto. O valor é aplicado antes de você finalizar a compra.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Pix (aprovação imediata), boleto bancário e cartão de crédito em até 12x. Todo o pagamento é processado com criptografia pelo Shopify Checkout.",
  },
  {
    q: "É seguro comprar no site?",
    a: "Sim. O site usa conexão SSL e o pagamento acontece em ambiente certificado. Nunca temos acesso aos dados do seu cartão.",
  },
  {
    q: "Posso trocar ou devolver?",
    a: "Você tem 30 dias de garantia de satisfação. Se o produto não agradar, falamos com você pelo WhatsApp e organizamos a troca ou o reembolso.",
  },
  {
    q: "Como acompanho meu pedido?",
    a: "Use a página de rastreio com o código enviado por e-mail. Se algo parecer travado, chame no WhatsApp que verificamos com a transportadora.",
  },
  {
    q: "Os produtos são seguros para o pet?",
    a: "Trabalhamos apenas com materiais atóxicos e testamos cada item antes de colocá-lo no catálogo. Ainda assim, recomendamos supervisão nas primeiras brincadeiras.",
  },
  {
    q: "Vocês emitem nota fiscal?",
    a: "Sim, a nota é enviada para o e-mail informado no pedido junto com a confirmação de envio.",
  },
  {
    q: "Como falo com o atendimento?",
    a: "Pelo WhatsApp (98) 99189-1675 ou pelo e-mail ola@zupet.com.br. Respondemos em até 1 hora útil.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Perguntas Frequentes — Entrega, Pagamento e Trocas | Zupet" },
      {
        name: "description",
        content:
          "Tire suas dúvidas sobre prazo de entrega, frete grátis, cupons, formas de pagamento, trocas e garantia de 30 dias da Zupet.",
      },
      { property: "og:title", content: "Perguntas Frequentes — Zupet" },
      {
        property: "og:description",
        content: "Entrega, frete grátis, cupons, pagamento, trocas e garantia: tudo explicado.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: QA.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PageShell
      title="Perguntas frequentes"
      subtitle="As dúvidas mais comuns sobre entrega, pagamento, trocas e garantia."
    >
      <div className="not-prose">
        <Accordion type="single" collapsible className="w-full">
          {QA.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-bold">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-center">
          <h2 className="text-xl font-black tracking-tight mb-2">Ainda com dúvida?</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Nosso time responde no WhatsApp em até 1 hora útil.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              asChild
              className="rounded-full font-bold bg-success hover:bg-success/90 text-success-foreground"
            >
              <a href="https://wa.me/5598991891675" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-1.5" /> Falar no WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full font-bold">
              <Link to="/contato">Central de atendimento</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
