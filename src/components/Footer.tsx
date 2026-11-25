import { Phone, MapPin, ExternalLink } from 'lucide-react';
import { CLINIC_INFO, CLINIC_SERVICES, TRANSLATIONS } from '../data/clinicData';
import { getVisibleServices, type Language } from '../utils/appointmentLogic';
import { ClinicLogo } from './ClinicLogo';

interface FooterProps {
  lang: Language;
  onNavigateToSection: (id: string) => void;
  onSelectService: (id: string) => void;
}

export function Footer({
  lang,
  onNavigateToSection,
  onSelectService,
}: FooterProps) {
  const t = TRANSLATIONS[lang].footer;
  const nav = TRANSLATIONS[lang].nav;
  const visibleServices = getVisibleServices(CLINIC_SERVICES);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { id: 'services', label: nav.services },
    { id: 'experience', label: nav.experience },
    { id: 'gallery', label: nav.gallery },
    { id: 'reviews', label: nav.reviews },
    { id: 'appointment', label: nav.bookCta },
    { id: 'location', label: nav.visit },
  ];

  return (
    <footer className="bg-[#091B2C] text-slate-300 border-t border-white/10 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <ClinicLogo size="md" />
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  {lang === 'ar' ? CLINIC_INFO.nameAr : CLINIC_INFO.nameEn}
                </p>
                <p className="text-xs text-[#66CBC6]">
                  {lang === 'ar' ? CLINIC_INFO.categoryAr : CLINIC_INFO.categoryEn}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {t.summary}
            </p>
          </div>

          {/* Site Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">
              {t.quickLinksTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToSection(link.id);
                    }}
                    className="hover:text-[#66CBC6] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">
              {t.servicesTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {visibleServices.map((srv) => (
                <li key={srv.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(srv.id)}
                    className="text-start hover:text-[#66CBC6] transition-colors cursor-pointer"
                  >
                    {srv[lang].title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-3 text-sm">
            <h3 className="text-sm font-semibold text-white mb-4">
              {t.contactTitle}
            </h3>
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#66CBC6] mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {lang === 'ar' ? CLINIC_INFO.addressAr : CLINIC_INFO.addressEn}
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#66CBC6] shrink-0" aria-hidden="true" />
              <a
                href={CLINIC_INFO.phoneHref}
                dir="ltr"
                className="text-white font-medium hover:text-[#66CBC6] transition-colors tabular-nums"
              >
                {CLINIC_INFO.phoneDisplay}
              </a>
            </p>
            <p className="text-xs text-slate-400 pt-1">
              {lang === 'ar'
                ? 'السبت – الخميس: 9:00 صباحاً – 9:00 مساءً · الجمعة: مغلق'
                : 'Sat – Thu: 9:00 AM – 9:00 PM · Fri: Closed'}
            </p>
            <a
              href={CLINIC_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#66CBC6] hover:text-white transition-colors pt-1"
            >
              <span>{t.mapsLink}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear}{' '}
            {lang === 'ar' ? CLINIC_INFO.nameAr : CLINIC_INFO.nameEn}. {t.rights}
          </p>
          <p>
            {lang === 'ar'
              ? `${CLINIC_INFO.googleRating.toFixed(1)} / 5.0 على جوجل (${CLINIC_INFO.googleReviewCount} تقييم)`
              : `Rated ${CLINIC_INFO.googleRating.toFixed(1)} / 5.0 on Google (${CLINIC_INFO.googleReviewCount} reviews)`}
          </p>
        </div>
      </div>
    </footer>
  );
}
