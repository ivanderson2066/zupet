import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/zupet/TopBar";
import { Header } from "@/components/zupet/Header";
import { Hero } from "@/components/zupet/Hero";
import { SocialProof } from "@/components/zupet/SocialProof";
import { Benefits } from "@/components/zupet/Benefits";
import { BestSellers } from "@/components/zupet/BestSellers";
import { CategoriesGrid } from "@/components/zupet/CategoriesGrid";
import { ProblemSolution } from "@/components/zupet/ProblemSolution";
import { VideoShowcase } from "@/components/zupet/VideoShowcase";
import { TrustSection } from "@/components/zupet/TrustSection";
import { UrgencySection } from "@/components/zupet/UrgencySection";
import { FAQ } from "@/components/zupet/FAQ";
import { Footer } from "@/components/zupet/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zupet — Pet Shop Premium para Cães e Gatos" },
      {
        name: "description",
        content:
          "Brinquedos inteligentes, acessórios inovadores e produtos premium para deixar seu pet mais feliz, ativo e saudável. Frete para todo Brasil.",
      },
      { property: "og:title", content: "Zupet — Pet Shop Premium para Cães e Gatos" },
      {
        property: "og:description",
        content: "Seu pet mais feliz todos os dias. Produtos inteligentes e inovadores para cães e gatos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Benefits />
        <CategoriesGrid />
        <BestSellers />
        <ProblemSolution />
        <VideoShowcase />
        <UrgencySection />
        <TrustSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
