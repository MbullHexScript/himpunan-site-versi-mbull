import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";

const photos = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  caption: `Dokumentasi kegiatan HMPSINF #${i + 1}`,
}));

export default function Galeri() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="pt-40 pb-24">
      <div className="container-hmps">
        <Reveal>
          <Eyebrow>DOKUMENTASI</Eyebrow>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mt-5 mb-4 text-[var(--text-primary)]">
            Galeri <span className="text-[var(--brand-text)]">Kegiatan</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-lg mb-14">
            Momen-momen terbaik dari berbagai kegiatan yang telah HMPS INF
            selenggarakan.
          </p>
        </Reveal>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.08}>
              <button
                onClick={() => setSelected(p)}
                className="w-full block break-inside-avoid rounded-2xl overflow-hidden group relative"
                style={{ aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-700 via-blue-500 to-blue-400 group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors flex items-end p-4 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-xs font-medium text-left">{p.caption}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--surface)] rounded-2xl overflow-hidden max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-700 via-blue-500 to-blue-400" />
              <div className="p-5 flex items-center justify-between">
                <p className="text-sm font-medium text-[var(--text-secondary)]">{selected.caption}</p>
                <button onClick={() => setSelected(null)} className="text-[var(--text-faint)] hover:text-[var(--text-secondary)]">
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
