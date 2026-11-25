import { useEffect, useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_INFO, TRANSLATIONS } from '../data/clinicData';
import type { Language } from '../utils/appointmentLogic';
import { ClinicLogo } from './ClinicLogo';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export function Navbar({ lang, onToggleLang, onNavigateToSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = TRANSLATIONS[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'services', label: t.services },
    { id: 'experience', label: t.experience },
    { id: 'gallery', label: t.gallery },
    { id: 'reviews', label: t.reviews },
    { id: 'location', label: t.visit },
  ];

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    onNavigateToSection(id);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-[#DCE4EA]'
          : 'bg-white border-[#EBEFF1]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo + Single-Line Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2A9D98] rounded-md"
        >
          <ClinicLogo size="sm" />
          <span className="font-display text-lg font-semibold tracking-tight text-[#0F2942] whitespace-nowrap">
            {lang === 'ar' ? CLINIC_INFO.shortNameAr : CLINIC_INFO.shortNameEn}
          </span>
        </a>

        {/* Zone 2: 5 Clean Single-Line Nav Links */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className="relative py-1 text-sm font-medium text-[#4A6073] hover:text-[#0F2942] transition-colors whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#2A9D98] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2A9D98]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language Switcher + Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={lang === 'en' ? 'Switch language to Arabic' : 'التبديل إلى اللغة الإنجليزية'}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#0F2942] hover:text-[#2A9D98] rounded-lg hover:bg-[#F4F7F8] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2A9D98]"
          >
            <Globe className="w-4 h-4 text-[#2A9D98]" aria-hidden="true" />
            <span>{t.langSwitch}</span>
          </button>

          <a
            href="#appointment"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('appointment');
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#0F2942] hover:bg-[#183E61] rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A9D98]"
          >
            {t.bookCta}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#0F2942] hover:bg-[#F4F7F8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2A9D98]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-[#EBEFF1] bg-white px-4 py-5 shadow-lg"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className="px-3 py-3 text-base font-medium text-[#0F2942] hover:bg-[#F4F7F8] rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-[#EBEFF1]">
                <a
                  href="#appointment"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('appointment');
                  }}
                  className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-[#0F2942] hover:bg-[#183E61] rounded-lg transition-colors"
                >
                  {t.bookCta}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
