import Navbar from "@/components/layout/navbar"

import Hero from "@/components/home/hero"
import RepoInput from "@/components/home/repo-input"
import Preview from "@/components/home/preview"
import Features from "@/components/home/features"
import HowItWorks from "@/components/home/how-it-works"
import CTA from "@/components/home/cta"
import Footer from "@/components/home/footer"
import Links from "@/components/home/Links"

export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col gap-32">

      <Navbar />

      <Hero />

      <RepoInput />

      <Preview />

      <Features />

      <HowItWorks />

      <CTA />
      
      <Links />

      <Footer />

    </main>
  )
}