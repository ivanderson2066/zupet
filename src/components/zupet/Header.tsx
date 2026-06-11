import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { CartButton } from "./CartButton";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16 md:h-20">
          <Link to="/" className="flex items-center shrink-0" aria-label="Zupet">
            <img
              src="/zupet-logo.png"
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
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-80 p-0">
                <SheetHeader className="px-5 pt-5 pb-3 border-b">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="p-5 flex flex-col gap-1">
                  <SheetClose asChild>
                    <Link to="/" className="py-3 px-3 rounded-lg hover:bg-secondary font-medium">Início</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/categoria/$slug" params={{ slug: "caes" }} className="py-3 px-3 rounded-lg hover:bg-secondary font-medium">Cães</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/categoria/$slug" params={{ slug: "gatos" }} className="py-3 px-3 rounded-lg hover:bg-secondary font-medium">Gatos</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/categoria/$slug" params={{ slug: "brinquedos" }} className="py-3 px-3 rounded-lg hover:bg-secondary font-medium">Brinquedos</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/categoria/$slug" params={{ slug: "tecnologia" }} className="py-3 px-3 rounded-lg hover:bg-secondary font-medium">Tech Pet</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/sobre" className="py-3 px-3 rounded-lg hover:bg-secondary font-medium">Sobre</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/contato" className="py-3 px-3 rounded-lg hover:bg-secondary font-medium">Contato</Link>
                  </SheetClose>
                  <div className="mt-4 pt-4 border-t">
                    <Button asChild className="w-full bg-success hover:bg-success/90 text-success-foreground rounded-full font-semibold">
                      <a href="https://wa.me/5598991891675" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-1.5" />
                        Falar no WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
