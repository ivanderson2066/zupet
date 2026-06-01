import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Qual o prazo de entrega?",
    a: "Despachamos em até 24h úteis. A entrega para todo Brasil leva entre 3 e 10 dias úteis, com rastreamento completo enviado por e-mail e WhatsApp.",
  },
  {
    q: "Como funcionam as trocas e devoluções?",
    a: "Você tem 30 dias para solicitar troca ou devolução pelo motivo que for. O processo é simples: basta entrar em contato pelo WhatsApp e enviamos as instruções.",
  },
  {
    q: "Como rastrear o meu pedido?",
    a: "Assim que o pedido for despachado, você recebe o código de rastreio por e-mail. Você também pode acompanhar pelo nosso site, na seção 'Rastrear Pedido'.",
  },
  {
    q: "Os produtos têm garantia?",
    a: "Todos os produtos têm garantia mínima de 30 dias contra defeitos de fabricação, além da nossa garantia Zupet de satisfação.",
  },
  {
    q: "A compra é segura?",
    a: "Sim. Utilizamos criptografia SSL e processamos pagamentos via gateways certificados. Seus dados nunca são compartilhados.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-accent font-bold uppercase tracking-wide text-xs mb-3">
            Tire suas dúvidas
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Perguntas frequentes
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl bg-card border border-border px-4 md:px-6"
            >
              <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
