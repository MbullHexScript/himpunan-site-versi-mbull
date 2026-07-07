import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Unplug } from "lucide-react";

// Titik-titik node & garis penghubung untuk background "jaringan"
const nodes = [
  { x: 80, y: 100 }, { x: 220, y: 60 }, { x: 360, y: 140 }, { x: 520, y: 70 }, { x: 680, y: 130 },
  { x: 120, y: 280 }, { x: 300, y: 320 }, { x: 480, y: 300 }, { x: 640, y: 340 },
  { x: 90, y: 480 }, { x: 260, y: 520 }, { x: 430, y: 480 }, { x: 600, y: 520 }, { x: 720, y: 460 },
];

const edges = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [1, 6], [3, 8], [4, 8],
  [5, 6], [7, 8],
  [5, 9], [6, 10], [7, 11], [8, 12],
  [9, 10], [10, 11], [11, 12], [12, 13],
];

// Edge yang sengaja diputus — node index 6 & 7
const brokenEdge = [6, 7];

export default function NotFound() {
  const [bx, by] = brokenEdge;
  const nA = nodes[bx];
  const nB = nodes[by];
  const midX = (nA.x + nB.x) / 2;
  const midY = (nA.y + nB.y) / 2;
  const gap = 26;
  const dx = (nB.x - nA.x) / 2;
  const dy = (nB.y - nA.y) / 2;
  const len = Math.hypot(dx, dy);
  const ux = (dx / len) * gap;
  const uy = (dy / len) * gap;

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center px-6">
      {/* Background network */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="#3b82f6"
            strokeWidth="1"
          />
        ))}

        {/* Garis yang putus — dua stub dengan celah di tengah */}
        <line x1={nA.x} y1={nA.y} x2={midX - ux} y2={midY - uy} stroke="#f87171" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1={midX + ux} y1={midY + uy} x2={nB.x} y2={nB.y} stroke="#f87171" strokeWidth="1.5" strokeDasharray="4 4" />

        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === bx || i === by ? 6 : 4}
            fill={i === bx || i === by ? "#f87171" : "#60a5fa"}
            animate={{ cy: [n.y, n.y - 6, n.y] }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 5) * 0.3,
            }}
          />
        ))}
      </svg>

      {/* Titik putus berkedip di tengah celah */}
      <div
        className="absolute w-full h-full pointer-events-none"
        style={{ maxWidth: 800, maxHeight: 600 }}
      >
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-red-400"
          style={{
            left: `${(midX / 800) * 100}%`,
            top: `${(midY / 600) * 100}%`,
            translate: "-50% -50%",
          }}
          animate={{ opacity: [1, 0.2, 1], scale: [1, 1.6, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Konten utama */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-lg"
      >
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-red-300 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-8">
          <Unplug size={13} />
          Koneksi Terputus
        </div>

        <p className="font-display font-extrabold text-8xl md:text-9xl bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent leading-none mb-6">
          404
        </p>

        <h1 className="font-display font-bold text-xl md:text-2xl text-white mb-3">
          Node yang kamu cari nggak ditemukan
        </h1>
        <p className="text-slate-400 text-sm md:text-base mb-10">
          Halaman ini mungkin sudah dipindahkan, dihapus, atau memang belum
          pernah ada di jaringan kami.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-semibold px-6 py-3.5 rounded-full"
        >
          <Home size={16} />
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
