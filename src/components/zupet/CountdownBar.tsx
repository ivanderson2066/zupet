import { useEffect, useState } from "react";
import { Timer, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const COUPON = "ZUPET10";

function useEndOfDayCountdown() {
  const [left, setLeft] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      const pad = (n: number) => String(n).padStart(2, "0");
      setLeft({ h: pad(h), m: pad(m), s: pad(s) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return left;
}

export function CountdownBar() {
  const { h, m, s } = useEndOfDayCountdown();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON);
      setCopied(true);
      toast.success("Cupom copiado!", { description: `Use ${COUPON} no checkout.` });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.info(`Use o cupom ${COUPON} no checkout.`);
    }
  };

  return (
    <div className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm font-semibold">
        <span className="inline-flex items-center gap-1.5">
          <Timer className="h-3.5 w-3.5" />
          10% OFF termina em
        </span>
        <span className="inline-flex items-center gap-1 font-black tabular-nums">
          <span className="px-1.5 py-0.5 rounded bg-accent-foreground/15">{h}</span>:
          <span className="px-1.5 py-0.5 rounded bg-accent-foreground/15">{m}</span>:
          <span className="px-1.5 py-0.5 rounded bg-accent-foreground/15">{s}</span>
        </span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-accent-foreground/30 bg-accent-foreground/10 hover:bg-accent-foreground/20 transition-colors font-black tracking-wide"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {COUPON}
        </button>
      </div>
    </div>
  );
}
