import { useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { CheckCircle2 } from "lucide-react";
import Seo from "../components/Seo";


export default function Pendaftaran() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-40 pb-24">
      <Seo
        title="Pendaftaran"
        path="/pendaftaran"
        description="Daftar jadi anggota atau ikut kegiatan HMPS Informatika UINSMHB. Isi formulir pendaftaran secara online di sini."
      />
      <div className="container-hmps grid md:grid-cols-2 gap-14 items-start">
        <Reveal>
          <Eyebrow>PENDAFTARAN</Eyebrow>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mt-5 mb-4 text-[var(--text-primary)]">
            Gabung <span className="text-[var(--brand-text)]">HMPS INF</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-md mb-6">
            Jadilah bagian dari HMPS INF dan kembangkan potensi, jaringan, serta
            pengalaman organisasimu bersama kami.
          </p>
          <ul className="space-y-3">
            {[
              "Terbuka untuk seluruh mahasiswa Informatika UIN Sultan Maulana Hasanuddin Banten",
              "Kesempatan mengikuti pelatihan & event eksklusif",
              "Membangun relasi lintas angkatan dan kampus",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <CheckCircle2 size={18} className="text-[var(--brand-text)] shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          {sent ? (
            <div className="bg-[var(--brand-soft)] border border-[var(--brand-ring)] rounded-3xl p-10 text-center">
              <CheckCircle2 size={36} className="text-[var(--brand-text)] mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">
                Pendaftaran Terkirim!
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Terima kasih sudah mendaftar. Tim HMPS INF akan menghubungimu
                lewat email atau WhatsApp.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-3xl p-8 space-y-5"
            >
              {[
                { label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap" },
                { label: "NIM", type: "text", placeholder: "Masukkan NIM" },
                { label: "Email", type: "email", placeholder: "nama@email.com" },
                { label: "No. WhatsApp", type: "tel", placeholder: "08xxxxxxxxxx" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    {f.label}
                  </label>
                  <input
                    required
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full text-sm border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-ring)] transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Motivasi Bergabung
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan alasanmu ingin bergabung..."
                  className="w-full text-sm border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-ring)] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] transition-colors text-white text-sm font-semibold py-3.5 rounded-xl"
              >
                Kirim Pendaftaran
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}
