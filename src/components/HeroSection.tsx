import { useRef, useState } from 'react';
import { Phone, ArrowRight, Calendar } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CLINIC_IMAGES, CLINIC_INFO, TRANSLATIONS } from '../data/clinicData';
import type { Language } from '../utils/appointmentLogic';
import { ClinicLogo } from './ClinicLogo';

interface HeroSectionProps {
  lang: Language;
  onBookClick: () => void;
}

export function HeroSection({ lang, onBookClick }: HeroSectionProps) {
  const t = TRANSLATIONS[lang].hero;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [primaryImgFailed, setPrimaryImgFailed] = useState(false);
  const [secondaryImgFailed, setSecondaryImgFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Gentle scroll-linked parallax on the hero imagery
  const primaryY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const secondaryY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#F9FBFC] to-[#F4F7F8] pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      {/* Subtle architectural medical arc motif echoing Tooth Hub's smile curve */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 800 400"
        className="pointer-events-none absolute -top-24 end-0 w-[640px] h-[320px] opacity-[0.09] text-[#2A9D98]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 0.09, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <path
          d="M 80 80 C 260 280, 540 280, 720 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M 140 40 C 300 220, 500 220, 660 40"
          fill="none"
          stroke="#0F2942"
          strokeWidth="1.5"
        />
      </motion.svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Editorial Text Column */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Clinic Identity Emblem + Unboxed Location Metadata */}
            <div className="flex items-center gap-4 mb-7">
              <ClinicLogo size="lg" />
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-wide text-[#0F2942]">
                  {lang === 'ar' ? CLINIC_INFO.nameAr : CLINIC_INFO.nameEn}
                </p>
                <p className="text-xs sm:text-sm text-[#4A6073] mt-0.5">
                  {t.kicker}
                </p>
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.12] tracking-tight text-[#0F2942] text-balance">
              {t.headline}
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#4A6073] max-w-xl">
              {t.description}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBookClick}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#0F2942] to-[#1C4D6E] hover:from-[#143554] hover:to-[#2A9D98] rounded-xl shadow-sm transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A9D98]"
              >
                <Calendar className="w-4 h-4 text-[#7AD3CE]" aria-hidden="true" />
                <span>{t.primaryCta}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </button>

              <a
                href={CLINIC_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#0F2942] bg-white border border-[#CED9E2] hover:border-[#2A9D98] hover:text-[#2A9D98] rounded-xl transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A9D98]"
              >
                <Phone className="w-4 h-4 text-[#2A9D98]" aria-hidden="true" />
                <span>{t.secondaryCta}</span>
              </a>
            </div>

            {/* Quiet Typographic Metadata Line (Zero Pills) */}
            <div className="mt-8 pt-6 border-t border-[#DCE4EA] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-[#4A6073]">
              <span dir="ltr" className="font-medium text-[#0F2942] tabular-nums inline-block">
                {CLINIC_INFO.phoneDisplay}
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>{t.hoursNote}</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>
                {lang === 'ar' ? CLINIC_INFO.shortAddressAr : CLINIC_INFO.shortAddressEn}
              </span>
            </div>
          </motion.div>

          {/* Editorial Photography Composition */}
          <motion.div
            className="lg:col-span-6 relative flex items-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full grid grid-cols-12 gap-4 items-stretch">
              {/* Primary Arched Editorial Portrait */}
              <motion.div
                style={{ y: primaryY }}
                className="col-span-12 sm:col-span-8 aspect-[4/3] sm:aspect-[4/4.6] rounded-t-[7rem] rounded-b-3xl overflow-hidden bg-[#EBEFF1] border border-[#DCE4EA] shadow-sm"
              >
                {primaryImgFailed ? (
                  <div className="w-full h-full bg-gradient-to-br from-[#0F2942] to-[#2A9D98] flex items-center justify-center p-6 text-white text-center">
                    <span className="font-display text-xl">{CLINIC_INFO.nameEn}</span>
                  </div>
                ) : (
                  <img
                    src={CLINIC_IMAGES.heroSmile}
                    alt={t.imageAltPrimary}
                    referrerPolicy="no-referrer"
                    onError={() => setPrimaryImgFailed(true)}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </motion.div>

              {/* Secondary Offset Clinical Suite Frame */}
              <motion.div
                style={{ y: secondaryY }}
                className="hidden sm:flex sm:col-span-4 flex-col justify-end gap-4"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#EBEFF1] border border-[#DCE4EA] shadow-sm">
                  {secondaryImgFailed ? (
                    <div className="w-full h-full bg-[#0F2942]/10" />
                  ) : (
                    <img
                      src={CLINIC_IMAGES.treatmentSuite}
                      alt={t.imageAltSecondary}
                      referrerPolicy="no-referrer"
                      onError={() => setSecondaryImgFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#DCE4EA]">
                  <p dir="ltr" className="font-display text-2xl font-semibold text-[#0F2942] tabular-nums inline-block">
                    5.0 / 5
                  </p>
                  <p className="text-xs text-[#4A6073] mt-1">
                    {lang === 'ar'
                      ? 'تقييم 41 مريضاً على جوجل'
                      : '41 Verified Google Reviews'}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
