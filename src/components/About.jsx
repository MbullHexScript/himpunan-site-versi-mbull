import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

export default function About() {
  return (
    <section id="tentang" className="container-hmps py-24 md:py-28">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <Eyebrow>TENTANG KAMI</Eyebrow>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-5 mb-6 leading-tight text-slate-900">
            Mengenal Kabinet <span className="text-blue-600">LAZARUS</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Kabinet Lazarus adalah wadah resmi bagi mahasiswa Program Studi
            Informatika untuk mengembangkan potensi diri, meningkatkan
            kemampuan akademis, dan menyalurkan aspirasi, bakat, minat, serta
            kreativitas.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Kami berkomitmen membentuk mahasiswa yang berkompeten, kreatif,
            dan berintegritas dan menjadi jembatan antara mahasiswa dan civitas
            akademika UINSMHB, menciptakan lingkungan akademis yang dinamis dan
            berdampak.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
        <img
            src="/hmps-2.jpg"
            alt="Kegiatan komunitas HMPS INF"
            className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white rounded-xl px-4 py-3">
            <p className="text-sm font-semibold">HMPS INF</p>
            <p className="text-xs text-slate-300">Himpunan Mahasiswa Informatika</p>
        </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
