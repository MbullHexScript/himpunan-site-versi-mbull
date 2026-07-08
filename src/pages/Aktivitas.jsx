import { useState } from "react";
import { Search } from "lucide-react";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";
import ActivityCard from "../components/ActivityCard";
import { aktivitasList, filterStatus } from "../data/aktivitas";

export default function Aktivitas() {
  const [active, setActive] = useState("semua");
  const [query, setQuery] = useState("");

  const filtered = aktivitasList.filter((a) => {
    const matchStatus = active === "semua" || a.status === active;
    const matchQuery = a.judul.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchQuery;
  });

  return (
    <div className="pb-24">
      <PageHero
        title="Jelajahi Aktivitas Kami"
        subtitle="Temukan berbagai kegiatan, workshop, seminar, dan kompetisi yang diselenggarakan oleh HMPS Informatika untuk meningkatkan skill kamu."
        image="/PageHero-hmps.jpg"
      />

      <div className="container-hmps pt-14">
        <Reveal
          className="flex flex-col md:flex-row md:items-center gap-4 mb-10"
        >
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {filterStatus.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`text-sm font-medium px-5 py-2.5 rounded-full border transition-colors ${
                  active === f.key
                    ? "bg-[var(--brand)] border-[var(--brand)] text-white"
                    : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari aktivitas..."
              className="w-full text-sm bg-[var(--surface)] border border-[var(--border)] rounded-full pl-10 pr-4 py-2.5 outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-ring)] transition-all"
            />
          </div>
        </Reveal>

        <p className="text-sm text-[var(--text-muted)] mb-6 pl-3 border-l-2 border-[var(--brand)]">
          Ditemukan <span className="font-semibold text-[var(--text-primary)]">{filtered.length}</span> aktivitas
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.08}>
              <ActivityCard item={item} />
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <p className="text-[var(--text-muted)] col-span-full text-center py-16">
              Tidak ada aktivitas yang cocok dengan pencarianmu.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
