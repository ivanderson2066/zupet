import { Instagram, Music2, Mail, PackageSearch, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-14 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-brand grid place-items-center shadow-soft">
                <span className="text-primary-foreground font-black text-lg">Z</span>
              </div>
              <span className="text-xl font-black">Zupet</span>
            </div>
            <p className="text-background/70 max-w-md mb-4">
              Seu pet mais feliz todos os dias. Produtos inteligentes, divertidos e inovadores para
              cães e gatos.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/80">
              <ShieldCheck className="h-4 w-4 text-success" />
              Loja oficial • SSL ativo • Pagamento seguro
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Ajuda</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#faq" className="hover:text-background">Perguntas frequentes</a></li>
              <li><a href="#" className="hover:text-background flex items-center gap-1.5"><PackageSearch className="h-3.5 w-3.5" /> Rastrear pedido</a></li>
              <li><a href="#" className="hover:text-background">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-background">Termos de Uso</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Fale com a gente</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="mailto:ola@zupet.com.br" className="hover:text-background flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> ola@zupet.com.br
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-background flex items-center gap-1.5">
                  <Instagram className="h-3.5 w-3.5" /> @zupet
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-background flex items-center gap-1.5">
                  <Music2 className="h-3.5 w-3.5" /> @zupet
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/15 pt-6 text-xs text-background/60 flex flex-col md:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} Zupet. Todos os direitos reservados.</p>
          <p>Seu pet mais feliz todos os dias.</p>
        </div>
      </div>
    </footer>
  );
}
