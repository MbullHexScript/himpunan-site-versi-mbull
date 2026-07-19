import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import BlurText from "./BlurText";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Foto bergerak lebih pelan dari konten pas discroll — efek parallax/depth
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[640px] flex items-end overflow-hidden"
    >
      {/* Background photo — dibuat lebih besar dari container biar nggak ada gap pas ke-geser parallax */}
      <motion.div
        className="absolute inset-x-0"
        style={{ y, top: "-12%", height: "124%" }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hmps-1.jpg')" }}
        />
        <div className="absolute inset-0 bg-slate-900/55" />
      </motion.div>

      <div className="container-hmps relative z-10 pb-24 pt-40 text-center mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-slate-100 bg-[var(--surface)]/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            UIN Sultan Maulana Hasanuddin Banten
          </span>
        </motion.div>

        <BlurText
          text="HMPS INF"
          delay={500}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="font-display font-extrabold text-white leading-[0.95] text-[15vw] md:text-[9rem] tracking-tight justify-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-slate-300 text-sm md:text-base tracking-[0.2em] uppercase mt-2 mb-6"
        >
          Himpunan Mahasiswa Program Studi Informatika
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="max-w-xl mx-auto text-slate-300 text-base md:text-lg mb-10"
        >
          Wadah resmi mahasiswa Informatika UIN Sultan Maulana Hasanuddin Banten untuk mengembangkan potensi,
          kompetensi akademik, kreativitas, integritas, dan aspirasi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="/pendaftaran"
            className="inline-flex items-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-hover)] transition-colors text-white text-sm font-semibold px-6 py-3.5 rounded-full"
          >
            Gabung HMPS INF →
          </a>

          <a
            href="#tentang"
            className="inline-flex items-center gap-2 bg-[var(--surface)]/10 hover:bg-[var(--surface)]/20 border border-white/20 transition-colors text-white text-sm font-semibold px-6 py-3.5 rounded-full backdrop-blur-sm"
          >
            Tentang Kami
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-300"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
