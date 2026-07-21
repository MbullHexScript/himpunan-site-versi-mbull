import { useState } from "react";
import { Search } from "lucide-react";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";
import ActivityCard from "../components/ActivityCard";
import Dropdown from "../components/ui/dropdown";
import { aktivitasList, filterStatus } from "../data/aktivitas";
import { departemenList } from "../data/organisasi";

const deptOptions = [
  { key: "semua", label: "Semua Departemen" },
  ...departemenList.map((d) => ({ key: d.slug, label: d.nama })),
];

export default function Aktivitas() {
  const [statusFilter, setStatusFilter] = useState("semua");
  const [deptFilter, setDeptFilter] = useState("semua");
  const [query, setQuery] = useState("");

  const filtered = aktivitasList.filter((a) => {
    const matchStatus = statusFilter === "semua" || a.status === statusFilter;
    const matchDept = deptFilter === "semua" || a.departemen === deptFilter;
    const matchQuery = a.judul.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchDept && matchQuery;
  });

  const selectedDeptLabel =
    deptFilter !== "semua"
      ? departemenList.find((d) => d.slug === deptFilter)?.nama
      : null;

  return (
    <div className="pb-24">
      <Seo
        title="Aktivitas"
        path="/aktivitas"
        description="Jelajahi berbagai kegiatan, workshop, seminar, dan kompetisi yang diselenggarakan oleh HMPS Informatika UINSMHB untuk mahasiswa."
      />
      <PageHero
        title="Jelajahi Aktivitas Kami"
        subtitle="Temukan berbagai kegiatan, workshop, seminar, dan kompetisi yang diselenggarakan oleh HMPS Informatika untuk meningkatkan skill kamu."
        image="/PageHero-hmps.jpg"
      />

      <div className="container-hmps pt-14">
        <Reveal
          className="flex flex-col md:flex-row md:items-center gap-3 mb-10"
        >
          <div className="flex items-center gap-3 flex-wrap flex-1">
            <Dropdown
              label="Status"
              options={filterStatus}
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <Dropdown
              label="Proker"
              options={deptOptions}
              value={deptFilter}
              onChange={setDeptFilter}
            />
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
              {selectedDeptLabel
                ? `Departemen ${selectedDeptLabel} belum memiliki proker di aktivitas ini.`
                : "Tidak ada aktivitas yang cocok dengan pencarianmu."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
