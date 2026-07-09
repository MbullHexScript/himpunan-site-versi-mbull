import { motion } from "framer-motion";

/**
 * PageHero — banner header dengan foto background, dipakai di halaman-halaman
 * selain Home (Aktivitas, Struktur Organisasi, dll).
 *
 * Props:
 *   title:     judul utama (string biasa, bukan JSX)
 *   highlight: bagian judul yang mau dikasih warna aksen (opsional)
 *   subtitle:  deskripsi singkat di bawah judul
 *   image:     path foto background (dari folder public/)
 */
export default function PageHero({ title, highlight, subtitle, image }) {
  return (
    <div className="relative h-[420px] md:h-[480px] flex items-end overflow-hidden">
      {/* Background foto + efek zoom halus (Ken Burns) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 14, ease: "easeOut" }}
      />

      {/* Scrim gelap konsisten — lebih pekat di bawah tempat teks berada */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />

      <div className="container-hmps relative z-10 pb-14 pt-32">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 56 }}
          transition={{ duration: 0.6 }}
          className="h-1 rounded-full bg-blue-600 mb-6"
        />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight"
        >
          {title} {highlight && <span className="text-blue-500">{highlight}</span>}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 max-w-xl text-base md:text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
