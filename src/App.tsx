import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import Highlights from "@/sections/Highlights";
import Speakers from "@/sections/Speakers";
import Schedule from "@/sections/Schedule";
import Venue from "@/sections/Venue";
import FAQ from "@/sections/FAQ";
import Sponsors from "@/sections/Sponsors";
import CTA from "@/sections/CTA";
import StickyCountdown from "@/components/StickyCountdown";

export default function App() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <Navbar />
      <StickyCountdown />
      <main>
        <Hero />
        <Highlights />
        <Speakers />
        <Schedule />
        <Venue />
        <FAQ />
        <Sponsors />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
