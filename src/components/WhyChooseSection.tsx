import { useState } from 'react';
import { Heart, Smile, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_IMAGES, TRANSLATIONS } from '../data/clinicData';
import type { Language } from '../utils/appointmentLogic';

interface WhyChooseSectionProps {
  lang: Language;
  onBookClick: () => void;
}

const PILLAR_ICONS = [Heart, Smile, Clock, Sparkles];

export function WhyChooseSection({ lang, onBookClick }: WhyChooseSectionProps) {
  const t = TRANSLATIONS[lang].why;
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="experience" className="py-20 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Architectural Interior Visual */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative flex-1 min-h-[340px] rounded-3xl overflow-hidden bg-[#F4F7F8] border border-[#DCE4EA]">
              {imgFailed ? (
                <div className="w-full h-full bg-gradient-to-br from-[#0F2942] to-[#2A9D98]" />
              ) : (
                <img
                  src={CLINIC_IMAGES.reception}
                  alt={
                    lang === 'ar'
                      ? 'صالة استقبال حديثة وهادئة'
                      : 'Calm modern dental reception lounge'
                  }
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </motion.div>

          {/* 4 Patient-Experience Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <p className="text-sm font-semibold text-[#2A9D98]">{t.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#0F2942] tracking-tight text-balance">
              {t.title}
            </h2>
            <p className="mt-4 text-base text-[#4A6073] leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.pillars.map((pillar, idx) => {
                const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="p-5 rounded-2xl bg-[#F4F7F8] border border-[#DCE4EA] hover:border-[#2A9D98]/60 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#DCE4EA] text-[#2A9D98] flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-[#0F2942]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#4A6073] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={onBookClick}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0F2942] hover:text-[#2A9D98] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2A9D98]"
              >
                <span>{t.cta}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
