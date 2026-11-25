import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_HOURS, CLINIC_INFO, TRANSLATIONS } from '../data/clinicData';
import { getBahrainClinicStatus, type Language } from '../utils/appointmentLogic';

interface LocationHoursSectionProps {
  lang: Language;
}

export function LocationHoursSection({ lang }: LocationHoursSectionProps) {
  const t = TRANSLATIONS[lang].location;
  const status = getBahrainClinicStatus();

  return (
    <section id="location" className="py-20 sm:py-24 bg-[#F4F7F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-sm font-semibold text-[#2A9D98]">{t.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#0F2942] tracking-tight">
              {t.title}
            </h2>
          </div>

          <p className="text-sm font-medium text-[#0F2942]">
            {lang === 'ar' ? status.labelAr : status.labelEn}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Clinic Info & Business Hours Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-white rounded-3xl border border-[#DCE4EA] p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-[#0F2942]">
                  {lang === 'ar' ? CLINIC_INFO.nameAr : CLINIC_INFO.nameEn}
                </h3>
                <div className="mt-4 space-y-3 text-sm text-[#4A6073]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#2A9D98] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="sr-only">{t.addressLabel}: </span>
                      <span>
                        {lang === 'ar' ? CLINIC_INFO.addressAr : CLINIC_INFO.addressEn}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#2A9D98] shrink-0" aria-hidden="true" />
                    <div>
                      <span className="sr-only">{t.phoneLabel}: </span>
                      <a
                        href={CLINIC_INFO.phoneHref}
                        dir="ltr"
                        className="font-semibold text-[#0F2942] hover:text-[#2A9D98] transition-colors tabular-nums"
                      >
                        {CLINIC_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Hours Table */}
              <div className="pt-5 border-t border-[#EBEFF1]">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0F2942] mb-4">
                  <Clock className="w-4 h-4 text-[#2A9D98]" aria-hidden="true" />
                  <span>{t.hoursLabel}</span>
                </div>

                <dl className="divide-y divide-[#EBEFF1] text-sm">
                  {BUSINESS_HOURS.map((row) => {
                    const isToday =
                      row.dayEn.toLowerCase() === status.dayNameEn.toLowerCase();
                    return (
                      <div
                        key={row.dayEn}
                        className={`py-2.5 flex items-center justify-between gap-4 ${
                          isToday ? 'font-semibold text-[#0F2942]' : 'text-[#4A6073]'
                        }`}
                      >
                        <dt>{lang === 'ar' ? row.dayAr : row.dayEn}</dt>
                        <dd
                          className={`tabular-nums ${
                            row.closed ? 'text-[#0F2942]/70' : ''
                          }`}
                        >
                          {lang === 'ar' ? row.hoursAr : row.hoursEn}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-[#EBEFF1] flex flex-wrap gap-3">
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0F2942] hover:bg-[#183E61] rounded-xl transition-colors whitespace-nowrap"
              >
                <Navigation className="w-4 h-4 text-[#66CBC6]" aria-hidden="true" />
                <span>{t.directionsBtn}</span>
              </a>
              <a
                href={CLINIC_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F2942] bg-[#F4F7F8] hover:bg-[#E2ECEE] rounded-xl transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#2A9D98]" aria-hidden="true" />
                <span>{t.callBtn}</span>
              </a>
            </div>
          </motion.div>

          {/* Interactive Embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE4EA] overflow-hidden min-h-[380px] flex flex-col"
          >
            <div className="px-5 py-3.5 border-b border-[#EBEFF1] flex items-center justify-between gap-4 bg-[#F9FBFC]">
              <span className="text-xs sm:text-sm font-medium text-[#0F2942] truncate">
                {lang === 'ar' ? CLINIC_INFO.addressAr : CLINIC_INFO.addressEn}
              </span>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#2A9D98] hover:text-[#0F2942] transition-colors whitespace-nowrap shrink-0"
              >
                {t.directionsBtn}
              </a>
            </div>
            <iframe
              title={t.mapTitle}
              src={CLINIC_INFO.googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full flex-1 min-h-[340px] border-0 bg-[#EEF7F6]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
