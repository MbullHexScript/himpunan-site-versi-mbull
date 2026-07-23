import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import {
  ChevronLeft,
  Share2,
  Calendar,
  MapPin,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import { aktivitasList } from "../data/aktivitas";

const statusBadge = {
  selesai: { label: "Selesai", dot: "bg-slate-400" },
  "akan-datang": { label: "Akan Datang", dot: "bg-emerald-400" },
  berlangsung: { label: "Sedang Berlangsung", dot: "bg-amber-400" },
};

export default function AktivitasDetail() {
  const { slug } = useParams();
  const [expanded, setExpanded] = useState(false);
  const item = aktivitasList.find((a) => a.slug === slug);

  if (!item) return <Navigate to="/aktivitas" replace />;

  const d = item.detail;
  const hasPhoto = Boolean(item.cover) && item.cover.startsWith("/");
  const badge = statusBadge[item.status];
  const fmt = (s) =>
    new Date(s).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="pt-24 pb-24">
      <Seo
        title={item.judul}
        path={`/aktivitas/${item.slug}`}
        description={item.ringkas}
        image={hasPhoto ? `https://lazarus-profile-versi-mbull.vercel.app${item.cover}` : undefined}
      />
      {/* Cover — foto polos, tanpa teks besar overlay */}
      <div className="relative h-[560px] md:h-[550px] overflow-hidden">
        {hasPhoto ? (
          <img
            src={item.cover}
            alt={item.judul}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />

        <div className="absolute top-6 inset-x-0">
          <div className="container-hmps">
            <Link
              to="/aktivitas"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-slate-900/40 hover:bg-slate-900/60 transition-colors backdrop-blur-sm px-4 py-2 rounded-full w-fit"
            >
              <ChevronLeft size={16} /> Kembali
            </Link>
          </div>
        </div>

        {/* Status + judul nempel di bagian bawah foto */}
        <div className="absolute bottom-0 inset-x-0 pb-20 md:pb-24">
          <div className="container-hmps">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                  {badge.label}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                  <MapPin size={12} />
                  {item.tipe}
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight">
                {item.judul}
              </h1>
            </div>
          </div>
        </div>
      </div>

     <div className="container-hmps">
        {/* Kartu detail — overlap ke bawah foto cover, dipersempit & sejajar dengan judul */}
        <div className="max-w-4xl mx-auto -mt-16 md:-mt-20 relative z-10 mb-14">
          <Reveal>
            <div className="bg-[var(--surface)] border border-[var(--border-subtle)] shadow-md rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[var(--border-subtle)]">
              {[
                {
                  label: "Mulai",
                  value: fmt(item.tanggalMulai),
                  sub: new Date(item.tanggalMulai).toLocaleDateString("id-ID", { weekday: "long" }),
                  icon: Calendar,
                  tone: "blue",
                },
                {
                  label: "Selesai",
                  value: fmt(item.tanggalSelesai),
                  sub: item.durasi,
                  icon: Calendar,
                  tone: "blue",
                },
                {
                  label: "Tipe",
                  value: item.tipe,
                  sub: "Tatap muka",
                  icon: MapPin,
                  tone: "amber",
                },
                {
                  label: "Lokasi",
                  value: item.lokasi,
                  sub: "Lokasi kegiatan",
                  icon: MapPin,
                  tone: "amber",
                },
              ].map((box) => (
                <div key={box.label} className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${
                        box.tone === "blue"
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
                          : "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"
                      }`}
                    >
                      <box.icon size={15} />
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider text-[var(--text-faint)] uppercase">
                      {box.label}
                    </span>
                  </div>
                  <p className="font-semibold text-[var(--text-primary)] capitalize">{box.value}</p>
                  <p className="text-xs text-[var(--text-faint)] mt-0.5">{box.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_320px] gap-10">
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
              {expanded ? "Tampilkan lebih sedikit" : "Lihat selengkapnya"}
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
                      {badge.label}
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
