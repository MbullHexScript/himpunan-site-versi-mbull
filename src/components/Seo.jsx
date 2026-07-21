import { Helmet } from "react-helmet-async";

// GANTI ke domain resmi kamu begitu sudah ada (custom domain / domain .vercel.app final)
export const SITE_URL = "https://lazarus-profile-versi-mbull.vercel.app/";
export const SITE_NAME = "HMPS Informatika UINSMHB — Kabinet Lazarus";
const DEFAULT_DESCRIPTION =
  "HMPS Informatika UINSMHB adalah wadah resmi mahasiswa Informatika untuk mengembangkan potensi, kompetensi akademik, kreativitas, integritas, dan aspirasi.";
const DEFAULT_IMAGE = `${SITE_URL}/logo_hmps.png`;

/**
 * Komponen SEO, dipasang di tiap halaman (page) dengan props yang relevan.
 *
 * Contoh pakai:
 * <Seo
 *   title="Aktivitas"
 *   description="Jelajahi berbagai kegiatan, workshop, dan seminar HMPS Informatika."
 *   path="/aktivitas"
 * />
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = DEFAULT_IMAGE,
  noIndex = false,
  jsonLd = null,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph (preview waktu di-share ke WhatsApp/Facebook/LinkedIn dsb) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter/X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Data terstruktur (JSON-LD), opsional per halaman, contoh: schema Organization di Home */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
