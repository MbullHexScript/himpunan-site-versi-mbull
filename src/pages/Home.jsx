import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Seo, { SITE_URL, SITE_NAME } from "../components/Seo";
import About from "../components/About";
import VisiMisi from "../components/VisiMisi";
import Culture from "../components/Culture";
import ActivityPreview from "../components/ActivityPreview";
import Contact from "../components/Contact";
import Marquee from "../components/Marquee";
import {
  GraduationCap,
  Cpu,
  Users,
  Trophy,
  ArrowRight,
} from "lucide-react";

const marqueeBadges = [
  { icon: GraduationCap, label: "Akademik" },
  { icon: Cpu, label: "Teknologi" },
  { icon: Users, label: "Organisasi" },
  { icon: Trophy, label: "Prestasi" },
];

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        description="Wadah pengembangan akademik, teknologi, inovasi, dan kolaborasi mahasiswa Teknik Informatika UINSMHB. Kenali kegiatan, struktur organisasi, dan program kerja kami."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/logo_hmps.png`,
        }}
      />
      <Hero />

      <div className="container-hmps my-8">
        <Marquee
          duration={30}
          className="rounded-3xl bg-gradient-to-r from-blue-400 via-slate-400 to-[var(--brand)] shadow-lg"
        >
          <div className="flex items-center gap-8 pl-8 pr-3 py-3">
            <span className="inline-flex items-center gap-3 shrink-0">
                <span className="w-9 h-9 rounded-full bg-white grid place-items-center shrink-0 overflow-hidden">
                <img
                    src="/logo_hmps.png"
                    alt="Logo HMPS Informatika"
                    className="w-6 h-6 object-contain"
                />
                </span>
                <span className="text-white font-extrabold text-sm md:text-base uppercase tracking-wide whitespace-nowrap">
                HMPS Informatika
                </span>
            </span>

            <p className="text-white/90 text-sm md:text-base font-medium whitespace-nowrap">
                wadah resmi bagi mahasiswa Program Studi Informatika
                untuk mengembangkan potensi diri.
            </p>

            {marqueeBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 text-white font-medium text-sm md:text-base shrink-0"
              >
                <Icon size={18} strokeWidth={2.2} />
                {label}
              </span>
            ))}

            <Link
              to="/aktivitas"
              className="inline-flex items-center gap-2 bg-white text-[var(--brand)] font-semibold text-sm px-5 py-2.5 rounded-full shrink-0 hover:bg-white/90 transition-colors"
            >
              Jelajahi HMPS
              <ArrowRight size={16} />
            </Link>
          </div>
        </Marquee>
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
