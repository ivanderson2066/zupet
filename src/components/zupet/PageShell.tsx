import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-brand text-primary-foreground">
          <span aria-hidden className="absolute -right-6 -top-6 text-[9rem] opacity-15 rotate-12 select-none">🐾</span>
          <span aria-hidden className="absolute left-4 bottom-0 text-6xl opacity-10 -rotate-12 select-none">🐾</span>
          <div className="relative container mx-auto px-4 py-12 md:py-16">
            <span className="inline-block mb-3 rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-wide">Zupet</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">{title}</h1>
            {subtitle && <p className="opacity-90 text-base md:text-lg max-w-2xl">{subtitle}</p>}
          </div>
        </section>
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="rounded-3xl bg-card border border-border shadow-lg p-6 md:p-10 prose prose-neutral dark:prose-invert max-w-none border-t-4 border-t-accent">
              {children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
