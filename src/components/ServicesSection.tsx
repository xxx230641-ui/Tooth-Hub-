import { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  HeartPulse,
  Layers,
  ClipboardList,
  Users,
  ArrowRight,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_SERVICES, TRANSLATIONS } from '../data/clinicData';
import { getVisibleServices, type Language, type ServiceItemConfig } from '../utils/appointmentLogic';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceForBooking: (serviceId: string) => void;
}

const ICON_MAP = {
  shield: ShieldCheck,
  sparkles: Sparkles,
  heart: HeartPulse,
  layers: Layers,
  clipboard: ClipboardList,
  users: Users,
};

export function ServicesSection({
  lang,
  onSelectServiceForBooking,
}: ServicesSectionProps) {
  const t = TRANSLATIONS[lang].services;
  const visibleServices = getVisibleServices(CLINIC_SERVICES);
  const [activeService, setActiveService] = useState<ServiceItemConfig | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section id="services" className="py-20 sm:py-24 bg-[#F4F7F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold text-[#2A9D98]">{t.eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#0F2942] tracking-tight text-balance">
            {t.title}
          </h2>
          <p className="mt-4 text-base text-[#4A6073] leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Editable Service Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((service, index) => {
            const copy = service[lang];
            const Icon = ICON_MAP[service.iconKey];
            const imgFailed = failedImages[service.id];

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-white rounded-2xl border border-[#DCE4EA] overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* 4:3 Image Frame */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EBEFF1] relative">
                  {imgFailed ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#0F2942]/10 to-[#2A9D98]/20 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-[#0F2942]/40" aria-hidden="true" />
                    </div>
                  ) : (
                    <img
                      src={service.image}
                      alt={copy.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [service.id]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#EEF7F6] text-[#2A9D98] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F2942]">
                      {copy.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm text-[#4A6073] leading-relaxed flex-1">
                    {copy.shortDesc}
                  </p>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-[#EBEFF1] flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveService(service)}
                      className="text-sm font-medium text-[#0F2942] hover:text-[#2A9D98] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#2A9D98]"
                    >
                      {t.learnMore}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectServiceForBooking(service.id)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2A9D98] hover:text-[#0F2942] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#2A9D98]"
                    >
                      <span>{t.requestService}</span>
                      <ArrowRight
                        className="w-4 h-4 rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Accessible Service Detail Modal */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#091B2C]/65 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveService(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-[#DCE4EA] shadow-2xl"
            >
              <div className="aspect-[16/9] w-full bg-[#EBEFF1] overflow-hidden relative">
                <img
                  src={activeService.image}
                  alt={activeService[lang].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveService(null)}
                  aria-label={t.modalClose}
                  className="absolute top-3 end-3 w-10 h-10 rounded-full bg-white/95 text-[#0F2942] hover:bg-[#0F2942] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 sm:p-7">
                <h3
                  id="service-modal-title"
                  className="font-display text-2xl font-semibold text-[#0F2942]"
                >
                  {activeService[lang].title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#4A6073] leading-relaxed">
                  {activeService[lang].detailDesc}
                </p>
                <p className="mt-4 text-xs text-[#4A6073] bg-[#F4F7F8] rounded-lg px-3.5 py-2.5 border border-[#DCE4EA]">
                  {activeService[lang].note}
                </p>
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveService(null)}
                    className="px-4 py-2.5 text-sm font-medium text-[#4A6073] hover:text-[#0F2942] cursor-pointer"
                  >
                    {t.modalClose}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const id = activeService.id;
                      setActiveService(null);
                      onSelectServiceForBooking(id);
                    }}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0F2942] hover:bg-[#2A9D98] rounded-lg transition-colors cursor-pointer"
                  >
                    {t.modalBookCta}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
