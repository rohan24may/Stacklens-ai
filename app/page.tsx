import Navbar from "@/components/layout/navbar"
import Hero from "@/components/home/hero"
import Preview from "@/components/home/preview"
import Features from "@/components/home/features"
import HowItWorks from "@/components/home/how-it-works"
import CTA from "@/components/home/cta"
import Footer from "@/components/home/footer"
import Links from "@/components/home/Links"
import Line from "@/components/home/Line"
import Testimonial from "@/components/home/Testimonial"
import Marquee from "@/components/home/Marquee"

export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col gap-12">

      <Navbar />

      <Hero />

      <Preview />

      <Features />

      <Testimonial />

      <HowItWorks />

      <CTA />

       <Marquee />
      
      <Links />

      <Footer />

    </main>
  )
}