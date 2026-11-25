import { useEffect, useState, type FormEvent } from 'react';
import { Phone, CheckCircle2, Copy, Check, CalendarCheck2 } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_INFO, CLINIC_SERVICES, TRANSLATIONS } from '../data/clinicData';
import {
  buildAppointmentSummaryText,
  getVisibleServices,
  validateAppointmentForm,
  type AppointmentFormInput,
  type Language,
  type ValidationErrors,
} from '../utils/appointmentLogic';

interface AppointmentSectionProps {
  lang: Language;
  preselectedServiceId: string;
}

export function AppointmentSection({
  lang,
  preselectedServiceId,
}: AppointmentSectionProps) {
  const t = TRANSLATIONS[lang].appointment;
  const visibleServices = getVisibleServices(CLINIC_SERVICES);

  const [formData, setFormData] = useState<AppointmentFormInput>({
    fullName: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    serviceId: preselectedServiceId || '',
    message: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submittedRequest, setSubmittedRequest] =
    useState<AppointmentFormInput | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
      setErrors((prev) => ({ ...prev, serviceId: undefined }));
    }
  }, [preselectedServiceId]);

  // Clear stale localized error messages when language switches
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErrors(validateAppointmentForm(formData, lang));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateAppointmentForm(formData, lang);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setSubmittedRequest({ ...formData });
    }
  };

  const getServiceTitle = (id: string) => {
    const found = visibleServices.find((s) => s.id === id);
    return found ? found[lang].title : id;
  };

  const handleCopySummary = async () => {
    if (!submittedRequest) return;
    const summary = buildAppointmentSummaryText(
      submittedRequest,
      getServiceTitle(submittedRequest.serviceId),
      lang
    );
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in restricted contexts; ignore gracefully
    }
  };

  const todayIso = new Date().toISOString().split('T')[0];

  return (
    <section id="appointment" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left/Start Intro & Direct Call Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-sm font-semibold text-[#2A9D98]">{t.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#0F2942] tracking-tight text-balance">
              {t.title}
            </h2>
            <p className="mt-4 text-base text-[#4A6073] leading-relaxed">
              {t.subtitle}
            </p>

            {/* Direct Phone Call Card */}
            <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-[#F4F7F8] border border-[#DCE4EA]">
              <h3 className="text-lg font-semibold text-[#0F2942]">
                {t.directCallTitle}
              </h3>
              <p className="mt-2 text-sm text-[#4A6073] leading-relaxed">
                {t.directCallDesc}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#2A9D98] hover:bg-[#228580] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2942]"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>{t.callClinicBtn}</span>
                </a>
                <span className="text-base font-semibold text-[#0F2942] tabular-nums" dir="ltr">
                  {CLINIC_INFO.phoneDisplay}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right/End Interactive Request Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-9 rounded-3xl bg-[#F4F7F8] border border-[#DCE4EA]">
              {submittedRequest ? (
                <div role="status" aria-live="polite" className="space-y-6">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#EEF7F6] text-[#2A9D98] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-[#0F2942]">
                        {t.successTitle}
                      </h3>
                      <p className="mt-2 text-sm text-[#4A6073] leading-relaxed">
                        {t.successBody}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#DCE4EA] space-y-2.5 text-sm">
                    <div className="flex justify-between gap-4 py-1 border-b border-[#EBEFF1]">
                      <span className="text-[#4A6073]">{t.fullName}</span>
                      <span className="font-medium text-[#0F2942]">
                        {submittedRequest.fullName}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 py-1 border-b border-[#EBEFF1]">
                      <span className="text-[#4A6073]">{t.phone}</span>
                      <span className="font-medium text-[#0F2942] tabular-nums" dir="ltr">
                        {submittedRequest.phone}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 py-1 border-b border-[#EBEFF1]">
                      <span className="text-[#4A6073]">{t.preferredDate}</span>
                      <span className="font-medium text-[#0F2942] tabular-nums">
                        {submittedRequest.preferredDate}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 py-1 border-b border-[#EBEFF1]">
                      <span className="text-[#4A6073]">{t.preferredTime}</span>
                      <span className="font-medium text-[#0F2942]">
                        {submittedRequest.preferredTime}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 py-1">
                      <span className="text-[#4A6073]">{t.service}</span>
                      <span className="font-medium text-[#0F2942]">
                        {getServiceTitle(submittedRequest.serviceId)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={CLINIC_INFO.phoneHref}
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0F2942] hover:bg-[#183E61] rounded-xl transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#66CBC6]" aria-hidden="true" />
                      <span>{t.callClinicBtn}</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#0F2942] bg-white border border-[#CED9E2] hover:border-[#2A9D98] rounded-xl transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-[#2A9D98]" aria-hidden="true" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#4A6073]" aria-hidden="true" />
                      )}
                      <span>{copied ? t.copied : t.copySummary}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedRequest(null);
                        setFormData({
                          fullName: '',
                          phone: '',
                          preferredDate: '',
                          preferredTime: '',
                          serviceId: '',
                          message: '',
                        });
                      }}
                      className="px-4 py-3 text-sm font-medium text-[#4A6073] hover:text-[#0F2942] cursor-pointer"
                    >
                      {t.newRequest}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="appt-full-name"
                        className="block text-sm font-medium text-[#0F2942] mb-1.5"
                      >
                        {t.fullName} <span className="text-[#2A9D98]">*</span>
                      </label>
                      <input
                        id="appt-full-name"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder={t.fullNamePlaceholder}
                        aria-invalid={Boolean(errors.fullName)}
                        className="w-full px-4 py-3 text-sm bg-white border border-[#CED9E2] rounded-xl text-[#0F2942] placeholder:text-[#7D90A1] focus:outline-none focus:border-[#2A9D98] focus:ring-2 focus:ring-[#2A9D98]/20"
                      />
                      {errors.fullName && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="appt-phone"
                        className="block text-sm font-medium text-[#0F2942] mb-1.5"
                      >
                        {t.phone} <span className="text-[#2A9D98]">*</span>
                      </label>
                      <input
                        id="appt-phone"
                        name="phone"
                        type="tel"
                        dir="ltr"
                        required
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder={t.phonePlaceholder}
                        aria-invalid={Boolean(errors.phone)}
                        className="w-full px-4 py-3 text-sm bg-white border border-[#CED9E2] rounded-xl text-[#0F2942] placeholder:text-[#7D90A1] focus:outline-none focus:border-[#2A9D98] focus:ring-2 focus:ring-[#2A9D98]/20 text-start"
                      />
                      {errors.phone && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label
                        htmlFor="appt-date"
                        className="block text-sm font-medium text-[#0F2942] mb-1.5"
                      >
                        {t.preferredDate} <span className="text-[#2A9D98]">*</span>
                      </label>
                      <input
                        id="appt-date"
                        name="preferredDate"
                        type="date"
                        min={todayIso}
                        required
                        value={formData.preferredDate}
                        onChange={(e) => {
                          setFormData({ ...formData, preferredDate: e.target.value });
                          if (errors.preferredDate)
                            setErrors({ ...errors, preferredDate: undefined });
                        }}
                        aria-invalid={Boolean(errors.preferredDate)}
                        className="w-full px-4 py-3 text-sm bg-white border border-[#CED9E2] rounded-xl text-[#0F2942] focus:outline-none focus:border-[#2A9D98] focus:ring-2 focus:ring-[#2A9D98]/20 tabular-nums"
                      />
                      {errors.preferredDate && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label
                        htmlFor="appt-time"
                        className="block text-sm font-medium text-[#0F2942] mb-1.5"
                      >
                        {t.preferredTime} <span className="text-[#2A9D98]">*</span>
                      </label>
                      <select
                        id="appt-time"
                        name="preferredTime"
                        required
                        value={formData.preferredTime}
                        onChange={(e) => {
                          setFormData({ ...formData, preferredTime: e.target.value });
                          if (errors.preferredTime)
                            setErrors({ ...errors, preferredTime: undefined });
                        }}
                        aria-invalid={Boolean(errors.preferredTime)}
                        className="w-full px-4 py-3 text-sm bg-white border border-[#CED9E2] rounded-xl text-[#0F2942] focus:outline-none focus:border-[#2A9D98] focus:ring-2 focus:ring-[#2A9D98]/20"
                      >
                        <option value="">{t.timePlaceholder}</option>
                        {t.timeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.preferredTime && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                          {errors.preferredTime}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service of Interest */}
                  <div>
                    <label
                      htmlFor="appt-service"
                      className="block text-sm font-medium text-[#0F2942] mb-1.5"
                    >
                      {t.service} <span className="text-[#2A9D98]">*</span>
                    </label>
                    <select
                      id="appt-service"
                      name="serviceId"
                      required
                      value={formData.serviceId}
                      onChange={(e) => {
                        setFormData({ ...formData, serviceId: e.target.value });
                        if (errors.serviceId)
                          setErrors({ ...errors, serviceId: undefined });
                      }}
                      aria-invalid={Boolean(errors.serviceId)}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#CED9E2] rounded-xl text-[#0F2942] focus:outline-none focus:border-[#2A9D98] focus:ring-2 focus:ring-[#2A9D98]/20"
                    >
                      <option value="">{t.servicePlaceholder}</option>
                      {visibleServices.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv[lang].title}
                        </option>
                      ))}
                    </select>
                    {errors.serviceId && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                        {errors.serviceId}
                      </p>
                    )}
                  </div>

                  {/* Additional Message */}
                  <div>
                    <label
                      htmlFor="appt-message"
                      className="block text-sm font-medium text-[#0F2942] mb-1.5"
                    >
                      {t.message}
                    </label>
                    <textarea
                      id="appt-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={t.messagePlaceholder}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#CED9E2] rounded-xl text-[#0F2942] placeholder:text-[#7D90A1] focus:outline-none focus:border-[#2A9D98] focus:ring-2 focus:ring-[#2A9D98]/20 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#0F2942] to-[#1C4D6E] hover:from-[#143554] hover:to-[#2A9D98] rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A9D98]"
                  >
                    <CalendarCheck2 className="w-5 h-5 text-[#66CBC6]" aria-hidden="true" />
                    <span>{t.submit}</span>
                  </button>

                  <p className="text-xs text-[#4A6073] leading-relaxed">
                    {t.honestyNote}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
