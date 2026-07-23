import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import TiltCard from "./TiltCard";

const statusStyle = {
  selesai: "bg-slate-900/70 text-white",
  "akan-datang": "bg-emerald-500 text-white",
  berlangsung: "bg-amber-500 text-white",
};

export default function ActivityCard({ item, index = 0 }) {
  // Kalau field `cover` diisi path foto asli (diawali "/"), pakai foto itu.
  // Kalau belum ada foto (mis. masih "gradient-blue" atau kosong), fallback ke gradient.
  const hasPhoto = Boolean(item.cover) && item.cover.startsWith("/");

  return (
    <TiltCard>
    <Link
      to={`/aktivitas/${item.slug}`}
      className="group block bg-[var(--surface)] rounded-3xl overflow-hidden border border-[var(--border-subtle)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[2.35/1] overflow-hidden">
        {hasPhoto ? (
          <img
            src={item.cover}
            alt={item.judul}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-500" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <p className="text-white font-display font-extrabold text-xl md:text-2xl text-center leading-none drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                {item.judul}
              </p>
            </div>
          </>
        )}

        <span
          className={`absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${statusStyle[item.status]}`}
        >
          {item.status.replace("-", " ")}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-text)] transition-colors">
          {item.judul}
        </h3>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2 mb-4">
          {item.ringkas}
        </p>
        <div className="flex items-center gap-2 flex-wrap text-xs font-medium text-[var(--text-muted)] mb-4">
          <span className="inline-flex items-center gap-1.5 bg-[var(--surface-alt)] px-3 py-1.5 rounded-full">
            <Calendar size={13} />
            {new Date(item.tanggalMulai).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full">
            <MapPin size={13} />
            {item.tipe} · {item.lokasi}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--border-subtle)]">
          <span className="text-xs font-medium text-[var(--text-faint)]">
            {item.tipe}
          </span>
          <span className="inline-flex items-center gap-1 shrink-0 text-xs font-semibold text-[var(--brand-text)] group-hover:gap-1.5 transition-all">
            Lihat Detail
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
    </TiltCard>
  );
}
