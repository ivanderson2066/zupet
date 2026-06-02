import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft border-b border-border">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">{title}</h1>
            {subtitle && <p className="text-muted-foreground text-base md:text-lg max-w-2xl">{subtitle}</p>}
          </div>
        </section>
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl prose prose-neutral dark:prose-invert">
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
