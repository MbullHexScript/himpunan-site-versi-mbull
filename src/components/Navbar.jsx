import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ShieldCheck, MessageSquare, Heart } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/aktivitas", label: "Aktivitas" },
  { to: "/struktur-organisasi", label: "Struktur Organisasi" },
];

const infoLinks = [
  { to: "/sejarah", label: "Sejarah HMPS" },
  { to: "/pendaftaran", label: "Pendaftaran" },
  { to: "/galeri", label: "Galeri" },
];

// Dropdown "Aspirasi" — dua kolom, tiap item bisa dikasih badge status (mis. "ONGOING")
const aspirasiGroups = [
  {
    heading: "SAMPAIKAN",
    items: [
      { label: "Aspirasi", to: "/aspirasi/form", icon: MessageSquare, status: "ONGOING" },
    ],
  },
  {
    heading: "KHUSUS",
    items: [
      {
        label: "RAPI (PP)",
        to: "https://rasa-dppinf-2430da.netlify.app/",
        icon: Heart,
        external: true,
      },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [aspirasiOpen, setAspirasiOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <nav className="container-hmps flex items-center justify-between h-[76px]">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-9 h-9 rounded-full bg-blue-600 text-white grid place-items-center">
            <ShieldCheck size={18} />
          </span>
          <span className="font-display font-extrabold text-lg tracking-tight text-slate-900">
            LAZARUS
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                location.pathname === link.to ? "text-slate-900" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setAspirasiOpen(true)}
            onMouseLeave={() => setAspirasiOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Aspirasi
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${aspirasiOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 origin-top ${
                aspirasiOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 flex gap-8 w-[380px]">
                {aspirasiGroups.map((group) => (
                  <div key={group.heading} className="flex-1">
                    <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-3">
                      {group.heading}
                    </p>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const inner = (
                          <>
                            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 grid place-items-center shrink-0 group-hover:bg-white transition-colors">
                              <item.icon size={15} />
                            </span>
                            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                              {item.label}
                            </span>
                            {item.status && (
                              <span className="ml-auto text-[9px] font-semibold tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded-full shrink-0">
                                {item.status}
                              </span>
                            )}
                          </>
                        );
                        const className =
                          "flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-blue-50 transition-colors group";

                        return item.external ? (

                           <a key={item.label}
                            href={item.to}
                            target="_blank"
                            rel="noreferrer"
                            className={className}
                          >
                            {inner}
                          </a>
                        ) : (
                          <Link key={item.label} to={item.to} className={className}>
                            {inner}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setInfoOpen(true)}
            onMouseLeave={() => setInfoOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Informasi
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${infoOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 origin-top ${
                infoOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg border border-slate-100 py-2 w-48">
                {infoLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>


            <a href="#kontak"
            className="text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 transition-colors px-5 py-2.5 rounded-full"
          >
            Kontak Kami
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-700"
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-slate-100 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container-hmps py-4 flex flex-col gap-1">
          {[...navLinks, ...infoLinks].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              {l.label}
            </Link>
          ))}
          <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mt-3 mb-1">
            Aspirasi
          </p>
          {aspirasiGroups.flatMap((g) => g.items).map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.to}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                <item.icon size={15} className="text-blue-600" />
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-2 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                <item.icon size={15} className="text-blue-600" />
                {item.label}
              </Link>
            )
          )}
          <a href="#kontak" className="py-2.5 text-sm font-semibold text-blue-600 mt-2">
            Kontak Kami
          </a>
        </div>
      </div>
    </header>
  );
}
