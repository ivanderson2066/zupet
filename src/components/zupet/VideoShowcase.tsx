import { Play } from "lucide-react";

const videos = [
  { title: "Pets amando o brinquedo inteligente", views: "1.2M" },
  { title: "Antes e depois com a coleira Zupet", views: "847K" },
  { title: "Comedouro automático em ação", views: "562K" },
  { title: "Diversão garantida no tapete", views: "431K" },
];

export function VideoShowcase() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-accent font-bold uppercase tracking-wide text-xs mb-3">
            Pets reais, momentos reais
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Veja Zupet em ação
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {videos.map((v, i) => (
            <div
              key={i}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-brand cursor-pointer shadow-card hover:scale-[1.02] transition-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-14 w-14 rounded-full bg-background/90 backdrop-blur grid place-items-center group-hover:scale-110 transition-transform shadow-glow">
                  <Play className="h-6 w-6 text-accent fill-accent ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-background">
                <p className="text-xs font-semibold line-clamp-2">{v.title}</p>
                <p className="text-[10px] opacity-80 mt-0.5">{v.views} visualizações</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
