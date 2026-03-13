import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import TemplateShowcase from "@/components/TemplateShowcase";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

/**
 * SiteForge Marketing Homepage
 * The main landing page that potential customers see when visiting the platform.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <TemplateShowcase />
      <Testimonials />
      <PricingSection />
      <Footer />
    </main>
  );
}
