import { MessageCircle } from "lucide-react";

const PHONE = "5598991891675"; // WhatsApp oficial da Zupet
const MESSAGE = "Olá! Vim pelo site da Zupet e gostaria de ajuda.";

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full grid place-items-center bg-success text-success-foreground shadow-glow hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-40 animate-ping" />
    </a>
  );
}
