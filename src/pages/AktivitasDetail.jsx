import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Share2,
  Calendar,
  MapPin,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import Reveal from "../components/Reveal";
import { aktivitasList } from "../data/aktivitas";

const statusStyle = {
  selesai: "bg-slate-900/70 text-white",
  "akan-datang": "bg-emerald-500 text-white",
  berlangsung: "bg-amber-500 text-white",
};

export default function AktivitasDetail() {
  const { slug } = useParams();
  const [expanded, setExpanded] = useState(false);
  const item = aktivitasList.find((a) => a.slug === slug);

  if (!item) return <Navigate to="/aktivitas" replace />;

  const d = item.detail;
  const fmt = (s) =>
    new Date(s).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="pt-24 pb-24">
      {/* Cover */}
      <div className="relative h-[420px] md:h-[520px] bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_10%,white,transparent_45%)]" />
        <div className="container-hmps relative h-full flex flex-col justify-between py-6">
          <Link
            to="/aktivitas"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-slate-900/40 hover:bg-slate-900/60 transition-colors backdrop-blur-sm px-4 py-2 rounded-full w-fit"
          >
            <ChevronLeft size={16} /> Kembali
          </Link>

          <div className="text-center">
            <p className="font-display font-extrabold text-white text-5xl md:text-8xl leading-none drop-shadow-lg">
              {d.judulBesar}
            </p>
            <p className="text-white/90 font-medium mt-4 text-sm md:text-base max-w-md mx-auto">
              {d.subjudul}
            </p>
          </div>
          <div />
        </div>
      </div>

      <div className="container-hmps">
        <div className="flex items-center gap-3 -mt-8 relative z-10 mb-8">
          <span
            className={`text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded-full shadow ${statusStyle[item.status]}`}
          >
            {item.status.replace("-", " ")}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded-full shadow bg-[var(--surface)] text-[var(--text-secondary)] inline-flex items-center gap-1.5">
            <MapPin size={13} /> {item.tipe}
          </span>
        </div>

        <Reveal>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--text-primary)] mb-8">
            {item.judul}
          </h1>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-4 mb-14">
          {[
            { label: "Mulai", value: fmt(item.tanggalMulai), sub: new Date(item.tanggalMulai).toLocaleDateString("id-ID", { weekday: "long" }), icon: Calendar },
            { label: "Selesai", value: fmt(item.tanggalSelesai), sub: item.durasi, icon: Calendar },
            { label: "Tipe", value: item.tipe, sub: "Tatap muka", icon: MapPin },
            { label: "Lokasi", value: item.lokasi, sub: "Lokasi kegiatan", icon: MapPin },
          ].map((box) => (
            <Reveal key={box.label} delay={0.05}>
              <div className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-2xl p-5 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] text-[var(--brand-text)] grid place-items-center">
                    <box.icon size={15} />
                  </span>
                  <span className="text-[11px] font-semibold tracking-wider text-[var(--text-faint)] uppercase">
                    {box.label}
                  </span>
                </div>
                <p className="font-semibold text-[var(--text-primary)] capitalize">{box.value}</p>
                <p className="text-xs text-[var(--text-faint)] mt-0.5">{box.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr_320px] gap-10">
          <Reveal>
            <span className="text-[11px] font-semibold tracking-wider text-[var(--text-faint)] uppercase">
              Tentang Kegiatan
            </span>

            <div
              className={`prose prose-slate max-w-none mt-4 text-[var(--text-secondary)] leading-relaxed space-y-4 overflow-hidden transition-all duration-500 ${
                expanded ? "max-h-[3000px]" : "max-h-[220px]"
              }`}
            >
              <p>{d.deskripsi}</p>

              <p className="font-semibold text-[var(--text-primary)]">🔑 Speakers:</p>
              <ul className="!mt-2">
                {d.speakers.map((s) => (
                  <li key={s.nama}>
                    <span className="font-medium text-[var(--text-primary)]">{s.nama}</span> — {s.peran}
                  </li>
                ))}
              </ul>

              <p>📅 {d.jadwal}</p>
              <p>🕐 {d.waktu}</p>
              <p>📍 {d.tempat}</p>
              <p>🎁 Benefit: {d.benefit}</p>
              <p>👥 {d.target}</p>
              <p>📊 {d.kuota}</p>

              <p className="font-semibold text-[var(--text-primary)]">📮 Info & Pendaftaran:</p>
              <ul className="!mt-2">
                {d.kontak.map((k) => (
                  <li key={k.nama}>
                    {k.nama}: {k.telepon}
                  </li>
                ))}
              </ul>

              <p>
                🚀 Yuk ikuti {item.judul} dan jadi bagian dari keluarga Informatika UINSMHB!
              </p>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-text)] hover:text-[var(--brand-hover)]"
            >
              {expanded ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
              {expanded ? <ChevronUp size={15} /> : <ChevronDownIcon size={15} />}
            </button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <button className="w-full inline-flex items-center justify-center gap-2 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--brand)] transition-colors text-[var(--text-secondary)] text-sm font-semibold px-6 py-3.5 rounded-2xl">
                <Share2 size={16} /> Bagikan
              </button>

              <div className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-2xl p-6">
                <span className="text-[11px] font-semibold tracking-wider text-[var(--text-faint)] uppercase">
                  Detail
                </span>
                <dl className="mt-4 space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <dt className="text-[var(--text-muted)]">Penyelenggara</dt>
                    <dd className="font-semibold text-[var(--text-primary)]">{d.penyelenggara}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-[var(--text-muted)]">Lokasi</dt>
                    <dd className="font-semibold text-[var(--text-primary)]">{item.lokasi}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-[var(--text-muted)]">Durasi</dt>
                    <dd className="font-semibold text-[var(--text-primary)]">{item.durasi}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-[var(--text-muted)]">Status</dt>
                    <dd className="font-semibold text-[var(--text-primary)] capitalize">
                      {item.status.replace("-", " ")}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
