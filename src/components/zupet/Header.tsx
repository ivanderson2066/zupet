import { Link } from "@tanstack/react-router";
import { Search, MessageCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartButton } from "./CartButton";
import logoAsset from "@/assets/zupet-logo.png.asset.json";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16 md:h-20">
          <Link to="/" className="flex items-center shrink-0" aria-label="Zupet">
            <img
              src="/logo.png"
              alt="Zupet — Premium Pet Shop"
              width={140}
              height={40}
              className="h-9 md:h-11 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Início</Link>
            <Link to="/categoria/$slug" params={{ slug: "caes" }} className="hover:text-primary transition-colors">Cães</Link>
            <Link to="/categoria/$slug" params={{ slug: "gatos" }} className="hover:text-primary transition-colors">Gatos</Link>
            <Link to="/categoria/$slug" params={{ slug: "brinquedos" }} className="hover:text-primary transition-colors">Brinquedos</Link>
            <Link to="/categoria/$slug" params={{ slug: "tecnologia" }} className="hover:text-primary transition-colors">Tech Pet</Link>
            <Link to="/sobre" className="hover:text-primary transition-colors">Sobre</Link>
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
              <a href="https://wa.me/5598991891675" target="_blank" rel="noopener noreferrer">
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
