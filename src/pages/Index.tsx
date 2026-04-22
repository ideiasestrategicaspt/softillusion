import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Servicos } from "@/components/site/Servicos";
import { B2B } from "@/components/site/B2B";
import { Cobertura } from "@/components/site/Cobertura";
import { Porque } from "@/components/site/Porque";
import { Testemunhos } from "@/components/site/Testemunhos";
import { Processo } from "@/components/site/Processo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Footer } from "@/components/site/Footer";
import { FloatingCTAs } from "@/components/site/FloatingCTAs";
import { useReveal } from "@/hooks/useReveal";

const Index = () => {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Servicos />
        <B2B />
        <Cobertura />
        <Porque />
        <Testemunhos />
        <Processo />
        <QuoteForm />
      </main>
      <Footer />
      <FloatingCTAs />
    </div>
  );
};

export default Index;
