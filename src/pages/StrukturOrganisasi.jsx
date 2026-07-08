import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Users, Building2 } from "lucide-react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import TeamCard from "../components/TeamCard";
import { bph, departemenList } from "../data/organisasi";

// Bagi array jadi kelompok-kelompok berukuran `size`, dipakai supaya
// tiap baris anggota selalu berisi maksimal 4 kartu dan baris terakhir
// yang cuma sisa 1-2 kartu tetap ke-render sebagai baris tersendiri (biar bisa di-center).
function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function StrukturOrganisasi() {
  const [tab, setTab] = useState(departemenList[0].slug);
  const active = departemenList.find((d) => d.slug === tab);

  return (
    <div className="pt-40 pb-24">
      <div className="container-hmps">
        <Reveal>
          <Eyebrow>MASA KHIDMAT 2026</Eyebrow>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mt-5 mb-4 text-[var(--text-primary)]">
            Struktur <span className="text-[var(--brand-text)]">Organisasi</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-lg mb-14">
            Sinergi dalam harmoni — HMPS Informatika yang adaptif dan kreatif.
          </p>
        </Reveal>

        {/* Badan Pengurus Harian — layout tree/org-chart */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-10">
            <Star size={16} className="text-[var(--brand-text)]" />
            <h2 className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
              Badan Pengurus Harian
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Ketua — tengah atas */}
            <div className="flex justify-center">
              <div className="w-40">
                <Reveal once={false}>
                  <TeamCard {...bph.ketua} jabatan="Ketua Umum" />
                </Reveal>
              </div>
            </div>

            {/* Connector lines — desktop only */}
            <div className="hidden md:block relative h-12">
              <div className="absolute left-1/2 top-0 w-px h-6 bg-[var(--border)] -translate-x-1/2" />
              <div className="absolute left-[12%] right-[12%] top-6 h-px bg-[var(--border)]" />
              <div className="absolute left-[12%] top-6 w-px h-6 bg-[var(--border)]" />
              <div className="absolute right-[12%] top-6 w-px h-6 bg-[var(--border)]" />
            </div>
            {/* Mobile spacer */}
            <div className="h-8 md:hidden" />

            {/* Sekretaris & Bendahara — menyebar kiri-kanan */}
            <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-8 md:gap-0">
              <div className="w-40">
                <Reveal once={false} delay={0.1}>
                  <TeamCard {...bph.sekretaris} jabatan="Sekretaris Umum" />
                </Reveal>
              </div>
              <div className="w-40">
                <Reveal once={false} delay={0.2}>
                  <TeamCard {...bph.bendahara} jabatan="Bendahara Umum" />
                </Reveal>
              </div>
            </div>
          </div>
        </div>

        {/* Departemen */}
        <Reveal once={false}>
          <div className="flex items-center gap-2 mb-5">
            <Building2 size={16} className="text-[var(--brand-text)]" />
            <h2 className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
              Departemen
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-8">
            {departemenList.map((d) => (
              <button
                key={d.slug}
                onClick={() => setTab(d.slug)}
                className={`text-sm font-medium px-5 py-2.5 rounded-full transition-colors ${
                  tab === d.slug
                    ? "bg-[var(--brand)] text-white"
                    : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)]"
                }`}
              >
                {d.nama}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-[var(--text-muted)] mb-8">{active.namaLengkap}</p>

              {/* Kepala + Sekretaris Departemen, menyebar kiri-kanan, simetris di tengah */}
              <div className="flex flex-col sm:flex-row sm:justify-around items-center gap-8 sm:gap-4 mb-14 max-w-3xl mx-auto">
                <div className="w-40">
                  <Reveal once={false}>
                    <TeamCard {...active.ketua} jabatan="Kepala Departemen" />
                  </Reveal>
                </div>
                <div className="w-40">
                  <Reveal once={false} delay={0.1}>
                    <TeamCard {...active.sekretaris} jabatan="Sekretaris Departemen" />
                  </Reveal>
                </div>
              </div>

              {/* Anggota */}
              <div className="flex items-center gap-2 mb-4">
                <Users size={14} className="text-[var(--text-faint)]" />
                <p className="text-xs font-semibold tracking-wider text-[var(--text-faint)] uppercase">
                  Anggota
                </p>
              </div>
              <div className="space-y-4">
                {chunk(active.anggota, 4).map((row, ri) => (
                  <div key={ri} className="flex flex-wrap justify-center gap-4">
                    {row.map((a, i) => (
                      <Reveal key={a.nim} once={false} delay={((ri * 4 + i) % 4) * 0.06}>
                        <div className="w-36">
                          <TeamCard {...a} size="sm" />
                        </div>
                      </Reveal>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </div>
  );
}
