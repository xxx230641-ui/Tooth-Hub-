import { Star, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_INFO, TRANSLATIONS } from '../data/clinicData';
import type { Language } from '../utils/appointmentLogic';
import { AnimatedCounter } from './AnimatedCounter';

interface ReviewsSectionProps {
  lang: Language;
}

export function ReviewsSection({ lang }: ReviewsSectionProps) {
  const t = TRANSLATIONS[lang].reviews;

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-[#0F2942] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Editorial Heading & Direct Verification Link */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-sm font-semibold text-[#66CBC6]">{t.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance">
              {t.title}
            </h2>
            <p className="mt-4 text-base text-slate-200 leading-relaxed max-w-xl">
              {t.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#0F2942] bg-white hover:bg-[#EEF7F6] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66CBC6]"
              >
                <span>{t.cta}</span>
                <ExternalLink className="w-4 h-4 text-[#2A9D98]" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-300">{t.verifiedNote}</p>
          </motion.div>

          {/* Verified Rating Card (Zero Fabricated Quotes) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-[#163654] border border-white/10">
              <div className="flex items-center gap-1.5 text-[#5FD0CA]" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className="w-6 h-6 fill-[#5FD0CA] text-[#5FD0CA]"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div dir="ltr" className="mt-6 flex items-baseline gap-2 w-fit">
                <span className="font-display text-5xl sm:text-6xl font-semibold text-white tabular-nums">
                  <AnimatedCounter value={CLINIC_INFO.googleRating} decimals={1} />
                </span>
                <span className="text-xl text-slate-300 tabular-nums">
                  {t.ratingSuffix}
                </span>
              </div>

              <div className="mt-4 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-white tabular-nums">
                    <AnimatedCounter
                      value={CLINIC_INFO.googleReviewCount}
                      decimals={0}
                    />{' '}
                    {t.reviewsSuffix}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    {lang === 'ar' ? CLINIC_INFO.nameAr : CLINIC_INFO.nameEn}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
