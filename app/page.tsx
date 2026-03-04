import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import RepoInput from "@/components/home/repo-input";
import Preview from "@/components/home/preview";
import Features from "@/components/home/features";
import HowItWorks from "@/components/home/how-it-works";
import CTA from "@/components/home/cta";
import Footer from "@/components/home/footer";

export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen">

      <Navbar />

      <Hero />

      <RepoInput />

      <Preview />

      <Features />

      <HowItWorks />

      <CTA />

      <Footer />

    </main>
  );
}