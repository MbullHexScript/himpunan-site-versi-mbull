import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedPage from "./components/AnimatedPage";
import Home from "./pages/Home";
import Aktivitas from "./pages/Aktivitas";
import AktivitasDetail from "./pages/AktivitasDetail";
import StrukturOrganisasi from "./pages/StrukturOrganisasi";
import Sejarah from "./pages/Sejarah";
import Pendaftaran from "./pages/Pendaftaran";
import Galeri from "./pages/Galeri";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/aktivitas" element={<AnimatedPage><Aktivitas /></AnimatedPage>} />
            <Route path="/aktivitas/:slug" element={<AnimatedPage><AktivitasDetail /></AnimatedPage>} />
            <Route path="/struktur-organisasi" element={<AnimatedPage><StrukturOrganisasi /></AnimatedPage>} />
            <Route path="/sejarah" element={<AnimatedPage><Sejarah /></AnimatedPage>} />
            <Route path="/pendaftaran" element={<AnimatedPage><Pendaftaran /></AnimatedPage>} />
            <Route path="/galeri" element={<AnimatedPage><Galeri /></AnimatedPage>} />
            <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
