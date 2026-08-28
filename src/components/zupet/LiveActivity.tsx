import { useEffect, useState } from "react";
import { Eye, ShoppingBag, Truck } from "lucide-react";

const MESSAGES = [
  { icon: Eye, text: "pessoas vendo esta loja agora" },
  { icon: ShoppingBag, text: "pedidos feitos nas últimas 24h" },
  { icon: Truck, text: "encomendas saindo hoje" },
];

const NUMBERS = [37, 128, 42];

export function LiveActivity() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(NUMBERS[0]);

  useEffect(() => {
    const id = setInterval(() => {
      setI((prev) => {
        const next = (prev + 1) % MESSAGES.length;
        setN(NUMBERS[next] + Math.floor(Math.random() * 7));
        return next;
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const Item = MESSAGES[i].icon;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
      </span>
      <Item className="h-3.5 w-3.5" />
      <span className="tabular-nums">{n}</span>
      <span className="font-medium">{MESSAGES[i].text}</span>
    </div>
  );
}
