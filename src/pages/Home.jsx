import Hero from "../components/Hero";
import About from "../components/About";
import VisiMisi from "../components/VisiMisi";
import Culture from "../components/Culture";
import ActivityPreview from "../components/ActivityPreview";
import Contact from "../components/Contact";
import Marquee from "../components/Marquee";

const marqueeItems = [
  "Akademik",
  "Teknologi",
  "Organisasi",
  "Kolaborasi",
  "Kreativitas",
  "Solidaritas",
];

export default function Home() {
  return (
    <>
      <Hero />

      <div className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-hover)] py-4 overflow-hidden">
        <Marquee items={marqueeItems} />
      </div>

      {/* Pattern grid+dot nyambung dari "Tentang" sampai "Departemen" (Culture) */}
      <div className="bg-pattern-grid">
        <About />
        <VisiMisi />
        <Culture />
      </div>

      <ActivityPreview />
      <Contact />
    </>
  );
}
