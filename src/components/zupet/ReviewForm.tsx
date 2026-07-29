import { useRef, useState } from "react";
import { Star, Camera, Loader2, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MAX_PHOTO_MB = 5;

type Props = {
  productHandle?: string;
  orderRef?: string;
  className?: string;
};

export function ReviewForm({ productHandle, orderRef, className }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const pickPhoto = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Envie uma imagem (JPG ou PNG).");
      return;
    }
    if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
      toast.error(`A foto precisa ter até ${MAX_PHOTO_MB}MB.`);
      return;
    }
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const clearPhoto = () => {
    setPhoto(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) return toast.error("Escolha de 1 a 5 estrelas.");
    if (name.trim().length < 2) return toast.error("Informe seu nome.");

    setSending(true);
    try {
      let photoPath: string | null = null;
      if (photo) {
        const ext = photo.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("review-photos")
          .upload(path, photo, { contentType: photo.type, upsert: false });
        if (upErr) throw upErr;
        photoPath = path;
      }

      const { error } = await supabase.from("product_reviews").insert({
        product_handle: productHandle ?? null,
        order_ref: orderRef ?? null,
        author_name: name.trim().slice(0, 60),
        rating,
        title: title.trim().slice(0, 120) || null,
        body: body.trim().slice(0, 2000) || null,
        photo_url: photoPath,
      });
      if (error) throw error;

      setDone(true);
      toast.success("Avaliação enviada!", {
        description: "Obrigado 💛 Ela aparece no site após a moderação.",
      });
    } catch (err) {
      console.error("[review]", err);
      toast.error("Não conseguimos enviar sua avaliação. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className={`rounded-2xl border bg-card p-8 text-center ${className ?? ""}`}>
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-primary" />
        <h3 className="text-lg font-bold">Avaliação recebida! 🐾</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Ela passa por uma moderação rápida e depois aparece na loja.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={`rounded-2xl border bg-card p-6 shadow-soft ${className ?? ""}`}
    >
      <h3 className="text-lg font-bold">Conte como foi sua experiência</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Leva menos de 1 minuto — e ajuda outros tutores a decidirem.
      </p>

      {/* Estrelas */}
      <div className="mt-5 flex items-center gap-1" role="radiogroup" aria-label="Nota">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(n)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              className={`h-8 w-8 ${
                (hover || rating) >= n
                  ? "fill-accent text-accent"
                  : "text-muted-foreground/40"
              }`}
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm font-semibold text-muted-foreground">
            {rating}/5
          </span>
        )}
      </div>

      <div className="mt-5 grid gap-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          placeholder="Seu nome (ex.: Ana C.)"
          required
        />
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          placeholder="Título da avaliação (opcional)"
        />
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
          rows={4}
          placeholder="O que seu pet achou? O que mais te surpreendeu?"
        />
      </div>

      {/* Upload de foto */}
      <div className="mt-4">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(e) => pickPhoto(e.target.files?.[0])}
        />
        {preview ? (
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Pré-visualização da foto da avaliação"
              className="h-28 w-28 rounded-xl border object-cover"
            />
            <button
              type="button"
              onClick={clearPhoto}
              aria-label="Remover foto"
              className="absolute -right-2 -top-2 rounded-full bg-foreground p-1 text-background"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileRef.current?.click()}
            className="w-full sm:w-auto"
          >
            <Camera className="mr-2 h-4 w-4" /> Adicionar foto do pet (opcional)
          </Button>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          JPG ou PNG, até {MAX_PHOTO_MB}MB.
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={sending}
        className="mt-5 w-full bg-gradient-accent font-bold text-accent-foreground"
      >
        {sending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
          </>
        ) : (
          "Enviar avaliação"
        )}
      </Button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Sua avaliação passa por moderação antes de ser publicada.
      </p>
    </form>
  );
}
