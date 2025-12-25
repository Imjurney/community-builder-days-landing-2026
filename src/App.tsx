import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import Overview from '@/sections/Overview';
import Speakers from '@/sections/Speakers';
import Schedule from '@/sections/Schedule';
import Venue from '@/sections/Venue';
import FAQ from '@/sections/FAQ';
import StickyCountdown from '@/components/StickyCountdown';

export default function App() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <Navbar />
      <StickyCountdown />
      <main>
        <Hero />
        <Overview />
        <Speakers />
        <Schedule />
        <Venue />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
