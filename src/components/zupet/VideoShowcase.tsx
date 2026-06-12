import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface VideoItem {
  title: string;
  src: string;
  poster?: string;
}

const videos: VideoItem[] = [
  {
    title: "Brincadeira que vira diversão",
    src: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
    poster: "https://images.pexels.com/videos/4763824/free-video-4763824.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gatos curiosos com novidades",
    src: "https://videos.pexels.com/video-files/4877948/4877948-hd_1080_1920_30fps.mp4",
    poster: "https://images.pexels.com/videos/4877948/pexels-photo-4877948.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Hora do petisco favorito",
    src: "https://videos.pexels.com/video-files/5732538/5732538-uhd_2732_1440_25fps.mp4",
    poster: "https://images.pexels.com/videos/5732538/pexels-photo-5732538.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Passeios mais confortáveis",
    src: "https://videos.pexels.com/video-files/4763734/4763734-uhd_2560_1440_24fps.mp4",
    poster: "https://images.pexels.com/videos/4763734/free-video-4763734.jpg?auto=compress&cs=tinysrgb&w=600",
  },
];

function VideoCard({ video }: { video: VideoItem }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-muted cursor-pointer shadow-card hover:scale-[1.02] transition-transform text-left"
    >
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        playsInline
        muted
        loop
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent pointer-events-none" />
      <div className={`absolute inset-0 grid place-items-center transition-opacity ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
        <div className="h-14 w-14 rounded-full bg-background/90 backdrop-blur grid place-items-center shadow-glow">
          {playing ? (
            <Pause className="h-6 w-6 text-accent fill-accent" />
          ) : (
            <Play className="h-6 w-6 text-accent fill-accent ml-0.5" />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 text-background pointer-events-none">
        <p className="text-xs font-semibold line-clamp-2">{video.title}</p>
      </div>
    </button>
  );
}

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
          {videos.map((v) => (
            <VideoCard key={v.src} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
