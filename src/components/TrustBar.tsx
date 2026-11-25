import { Star, MessageSquareText, HeartHandshake, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_INFO, TRANSLATIONS } from '../data/clinicData';
import type { Language } from '../utils/appointmentLogic';
import { AnimatedCounter } from './AnimatedCounter';

interface TrustBarProps {
  lang: Language;
}

export function TrustBar({ lang }: TrustBarProps) {
  const t = TRANSLATIONS[lang].trust;

  const items = [
    {
      icon: Star,
      value: <AnimatedCounter value={CLINIC_INFO.googleRating} decimals={1} />,
      label: t.ratingTitle,
    },
    {
      icon: MessageSquareText,
      value: <AnimatedCounter value={CLINIC_INFO.googleReviewCount} decimals={0} />,
      label: t.reviewsTitle,
    },
    {
      icon: HeartHandshake,
      value: t.careValue,
      label: t.careTitle,
    },
    {
      icon: MapPin,
      value: t.locationValue,
      label: t.locationTitle,
    },
  ];

  return (
    <section
      aria-label={lang === 'ar' ? 'مؤشرات الثقة' : 'Clinic Trust Highlights'}
      className="bg-white border-y border-[#DCE4EA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x rtl:lg:divide-x-reverse divide-[#DCE4EA]">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3.5 lg:px-6 first:lg:ps-0 last:lg:pe-0"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EEF7F6] text-[#2A9D98] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-lg sm:text-xl font-semibold text-[#0F2942] leading-tight">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#4A6073] mt-0.5 truncate">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
