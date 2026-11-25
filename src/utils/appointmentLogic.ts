export type Language = 'en' | 'ar';

export interface AppointmentFormInput {
  fullName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  serviceId: string;
  message: string;
}

export interface ValidationErrors {
  fullName?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  serviceId?: string;
}

export interface ServiceItemConfig {
  id: string;
  visible: boolean;
  image: string;
  iconKey: 'shield' | 'sparkles' | 'heart' | 'layers' | 'clipboard' | 'users';
  en: {
    title: string;
    shortDesc: string;
    detailDesc: string;
    note: string;
  };
  ar: {
    title: string;
    shortDesc: string;
    detailDesc: string;
    note: string;
  };
}

export interface ClinicStatus {
  isOpen: boolean;
  dayNameEn: string;
  dayNameAr: string;
  labelEn: string;
  labelAr: string;
}

const VALIDATION_MESSAGES = {
  en: {
    fullNameRequired: 'Please enter your full name.',
    fullNameShort: 'Full name must be at least 2 characters.',
    phoneRequired: 'Please enter a contact phone number.',
    phoneInvalid: 'Please enter a valid phone number (7–15 digits).',
    dateRequired: 'Please select a preferred date.',
    datePast: 'Preferred date cannot be in the past.',
    dateFriday: 'Our clinic is closed on Fridays. Please choose Saturday–Thursday.',
    timeRequired: 'Please select a preferred time window.',
    serviceRequired: 'Please select a service of interest.',
  },
  ar: {
    fullNameRequired: 'يرجى إدخال الاسم الكامل.',
    fullNameShort: 'يجب أن يتكون الاسم الكامل من حرفين على الأقل.',
    phoneRequired: 'يرجى إدخال رقم هاتف للتواصل.',
    phoneInvalid: 'يرجى إدخال رقم هاتف صحيح (من 7 إلى 15 رقماً).',
    dateRequired: 'يرجى اختيار التاريخ المفضل.',
    datePast: 'لا يمكن اختيار تاريخ في الماضي.',
    dateFriday: 'العيادة مغلقة يوم الجمعة. يرجى اختيار يوم من السبت إلى الخميس.',
    timeRequired: 'يرجى اختيار الفترة الزمنية المفضلة.',
    serviceRequired: 'يرجى اختيار الخدمة المطلوبة.',
  },
} as const;

export function validateAppointmentForm(
  input: AppointmentFormInput,
  lang: Language,
  referenceDate: Date = new Date()
): ValidationErrors {
  const errors: ValidationErrors = {};
  const msg = VALIDATION_MESSAGES[lang];

  const trimmedName = input.fullName.trim();
  if (!trimmedName) {
    errors.fullName = msg.fullNameRequired;
  } else if (trimmedName.length < 2) {
    errors.fullName = msg.fullNameShort;
  }

  const digitsOnly = input.phone.replace(/[^\d]/g, '');
  if (!input.phone.trim()) {
    errors.phone = msg.phoneRequired;
  } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    errors.phone = msg.phoneInvalid;
  }

  if (!input.preferredDate.trim()) {
    errors.preferredDate = msg.dateRequired;
  } else {
    const [year, month, day] = input.preferredDate.split('-').map(Number);
    if (!year || !month || !day) {
      errors.preferredDate = msg.dateRequired;
    } else {
      const selected = new Date(year, month - 1, day);
      const today = new Date(
        referenceDate.getFullYear(),
        referenceDate.getMonth(),
        referenceDate.getDate()
      );
      if (selected < today) {
        errors.preferredDate = msg.datePast;
      } else if (selected.getDay() === 5) {
        errors.preferredDate = msg.dateFriday;
      }
    }
  }

  if (!input.preferredTime.trim()) {
    errors.preferredTime = msg.timeRequired;
  }

  if (!input.serviceId.trim()) {
    errors.serviceId = msg.serviceRequired;
  }

  return errors;
}

const DAY_NAMES = [
  { en: 'Sunday', ar: 'الأحد' },
  { en: 'Monday', ar: 'الاثنين' },
  { en: 'Tuesday', ar: 'الثلاثاء' },
  { en: 'Wednesday', ar: 'الأربعاء' },
  { en: 'Thursday', ar: 'الخميس' },
  { en: 'Friday', ar: 'الجمعة' },
  { en: 'Saturday', ar: 'السبت' },
];

/**
 * Evaluates clinic opening status in Bahrain local time (UTC+3).
 * Clinic schedule: Saturday–Thursday 09:00–21:00, Friday CLOSED.
 */
export function getBahrainClinicStatus(now: Date = new Date()): ClinicStatus {
  const bahrainTimeMs = now.getTime() + 3 * 60 * 60 * 1000;
  const bhDate = new Date(bahrainTimeMs);
  const day = bhDate.getUTCDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
  const hour = bhDate.getUTCHours();

  const dayMeta = DAY_NAMES[day];
  const isFriday = day === 5;
  const isWithinHours = hour >= 9 && hour < 21;
  const isOpen = !isFriday && isWithinHours;

  return {
    isOpen,
    dayNameEn: dayMeta.en,
    dayNameAr: dayMeta.ar,
    labelEn: isOpen ? 'Open Today · 9:00 AM – 9:00 PM' : isFriday ? 'Closed on Fridays' : 'Currently Closed · Opens 9:00 AM',
    labelAr: isOpen ? 'مفتوح اليوم · 9:00 صباحاً – 9:00 مساءً' : isFriday ? 'مغلق يوم الجمعة' : 'مغلق حالياً · يفتح 9:00 صباحاً',
  };
}

export function getVisibleServices(
  services: ServiceItemConfig[],
  hiddenServiceIds: string[] = []
): ServiceItemConfig[] {
  const hiddenSet = new Set(hiddenServiceIds);
  return services.filter((service) => service.visible && !hiddenSet.has(service.id));
}

export function buildAppointmentSummaryText(
  input: AppointmentFormInput,
  serviceTitle: string,
  lang: Language
): string {
  if (lang === 'ar') {
    return [
      'طلب حجز موعد - مركز توث هب التخصصي للأسنان',
      `الاسم: ${input.fullName.trim()}`,
      `الهاتف: ${input.phone.trim()}`,
      `التاريخ المفضل: ${input.preferredDate}`,
      `الفترة المفضلة: ${input.preferredTime}`,
      `الخدمة المطلوبة: ${serviceTitle}`,
      input.message.trim() ? `ملاحظات: ${input.message.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');
  }

  return [
    'Appointment Request — Tooth Hub Speciality Dental Centre',
    `Name: ${input.fullName.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Preferred Date: ${input.preferredDate}`,
    `Preferred Time: ${input.preferredTime}`,
    `Service of Interest: ${serviceTitle}`,
    input.message.trim() ? `Notes: ${input.message.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}
