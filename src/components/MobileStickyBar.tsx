import { Phone, Calendar } from 'lucide-react';
import { CLINIC_INFO, TRANSLATIONS } from '../data/clinicData';
import type { Language } from '../utils/appointmentLogic';

interface MobileStickyBarProps {
  lang: Language;
  onBookClick: () => void;
}

export function MobileStickyBar({ lang, onBookClick }: MobileStickyBarProps) {
  const t = TRANSLATIONS[lang].mobileBar;

  return (
    <div
      role="region"
      aria-label={lang === 'ar' ? 'إجراءات سريعة' : 'Quick Clinic Actions'}
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DCE4EA] px-3 py-2.5 shadow-[0_-4px_20px_rgba(15,41,66,0.08)]"
    >
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <a
          href={CLINIC_INFO.phoneHref}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold text-[#0F2942] bg-[#F4F7F8] border border-[#CED9E2] rounded-xl whitespace-nowrap"
        >
          <Phone className="w-4 h-4 text-[#2A9D98]" aria-hidden="true" />
          <span>{t.callNow}</span>
        </a>

        <button
          type="button"
          onClick={onBookClick}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold text-white bg-[#0F2942] rounded-xl whitespace-nowrap cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#66CBC6]" aria-hidden="true" />
          <span>{t.bookNow}</span>
        </button>
      </div>
    </div>
  );
}
