import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import PhotoStack from "./PhotoStack";
import RotatingText from "./RotatingText";
import TextReveal from "./TextReveal";

const aboutPhotos = [
  { src: "/hmps-2.jpg", alt: "Kegiatan komunitas HMPS INF" },
  { src: "/hmps-1.jpg", alt: "Dokumentasi HMPS INF" },
  { src: "/hmps-3.jpg", alt: "Penyambutan maba inf" },
];

export default function About() {
  return (
    <section id="tentang" className="container-hmps py-24 md:py-28">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <Eyebrow>TENTANG KAMI</Eyebrow>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-5 mb-6 leading-tight text-[var(--text-primary)] flex flex-wrap items-center gap-3">
            Informatika
            <RotatingText
              texts={["Berkarya", "Berinovasi", "Bisa-bisa Jaya"]}
              mainClassName="px-3 sm:px-3 md:px-4 bg-[var(--brand)] text-white overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg text-3xl md:text-4xl"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
              splitBy="characters"
              auto
              loop
            />
          </h2>
          <TextReveal
            text="Kabinet Lazarus adalah wadah resmi bagi mahasiswa Program Studi Informatika untuk mengembangkan potensi diri, meningkatkan kemampuan akademis, dan menyalurkan aspirasi, bakat, minat, serta kreativitas."
            className="text-[var(--text-secondary)] leading-relaxed mb-4"
          />
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Kami berkomitmen membentuk mahasiswa yang berkompeten, kreatif,
            dan berintegritas dan menjadi jembatan antara mahasiswa dan civitas
            akademika UINSMHB, menciptakan lingkungan akademis yang dinamis dan
            berdampak.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <PhotoStack images={aboutPhotos} size={380} />
          <p className="text-center text-xs text-[var(--text-faint)] mt-6">
            Klik foto untuk lihat foto berikutnya
          </p>
        </Reveal>
      </div>
    </section>
  );
}
