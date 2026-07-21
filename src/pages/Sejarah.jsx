import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import Seo from "../components/Seo";


const timeline = [
  { tahun: "2015", title: "Berdirinya HMPS INF", desc: "Program Studi Informatika UINSMHB resmi membentuk himpunan mahasiswa sebagai wadah aspirasi dan pengembangan diri." },
  { tahun: "2019", title: "Ekspansi Kegiatan", desc: "HMPSINF mulai rutin menggelar seminar, workshop, dan kompetisi teknologi tingkat kampus." },
  { tahun: "2023", title: "Kolaborasi Eksternal", desc: "Menjalin kerja sama dengan komunitas dan industri teknologi untuk memperluas jaringan mahasiswa." },
  { tahun: "2026", title: "HMPSINF Hari Ini", desc: "Terus bertransformasi menjadi wadah yang adaptif, kreatif, dan relevan dengan kebutuhan mahasiswa Informatika." },
];

export default function Sejarah() {
  return (
    <div className="pt-40 pb-24">
      <Seo
        title="Sejarah"
        path="/sejarah"
        description="Perjalanan dan sejarah berdirinya HMPS Informatika UINSMHB dari tahun ke tahun."
      />
      <div className="container-hmps">
        <Reveal>
          <Eyebrow>PERJALANAN KAMI</Eyebrow>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mt-5 mb-4 text-[var(--text-primary)]">
            Sejarah <span className="text-[var(--brand-text)]">HMPS INF</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-lg mb-14">
            Jejak langkah HMPS INF dari masa ke masa dalam membangun ekosistem
            mahasiswa Informatika yang berdaya.
          </p>
        </Reveal>

        <div className="relative pl-8 border-l-2 border-[var(--border-subtle)] space-y-12 max-w-2xl">
          {timeline.map((t, i) => (
            <Reveal key={t.tahun} delay={i * 0.1} className="relative">
              <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[var(--brand)] border-4 border-white ring-1 ring-[var(--border-subtle)]" />
              <p className="text-[var(--brand-text)] font-bold text-sm mb-1">{t.tahun}</p>
              <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">{t.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{t.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
