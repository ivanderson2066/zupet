import { Truck, ShieldCheck, Headphones, PackageSearch } from "lucide-react";

const items = [
  { icon: Truck, label: "Frete para todo Brasil" },
  { icon: ShieldCheck, label: "Compra 100% segura" },
  { icon: Headphones, label: "Suporte rápido" },
  { icon: PackageSearch, label: "Rastreamento disponível" },
];

export function TopBar() {
  return (
    <div className="bg-gradient-brand text-primary-foreground text-xs sm:text-sm">
      <div className="container mx-auto px-4">
        <div className="flex animate-pulse-none overflow-x-auto sm:overflow-visible sm:justify-center gap-6 py-2 whitespace-nowrap">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 shrink-0 opacity-95">
              <Icon className="h-3.5 w-3.5" />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
