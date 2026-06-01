import { Link } from "@tanstack/react-router";
import { Search, MessageCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartButton } from "./CartButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-gradient-brand grid place-items-center shadow-soft">
              <span className="text-primary-foreground font-black text-lg">Z</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-lg md:text-xl tracking-tight">Zupet</span>
              <span className="hidden md:block text-[10px] text-muted-foreground font-medium">
                Premium Pet Store
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Início</Link>
            <a href="#mais-vendidos" className="hover:text-primary transition-colors">Mais Vendidos</a>
            <a href="#beneficios" className="hover:text-primary transition-colors">Benefícios</a>
            <a href="#faq" className="hover:text-primary transition-colors">Ajuda</a>
          </nav>

          <div className="hidden md:flex flex-1 max-w-sm items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar produtos..." className="pl-9 rounded-full bg-secondary border-transparent" />
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex bg-success hover:bg-success/90 text-success-foreground rounded-full font-semibold"
            >
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-1.5" />
                WhatsApp
              </a>
            </Button>
            <CartButton />
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
