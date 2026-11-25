import type { ServiceItemConfig } from '../utils/appointmentLogic';

export const CLINIC_INFO = {
  nameEn: 'Tooth Hub Speciality Dental Centre',
  shortNameEn: 'TOOTH HUB',
  nameAr: 'مركز توث هب التخصصي للأسنان',
  shortNameAr: 'توث هب',
  categoryEn: 'Speciality Dental Centre',
  categoryAr: 'مركز تخصصي لطب الأسنان',
  addressEn: '2833, Al Sayh, Muharraq, Kingdom of Bahrain',
  shortAddressEn: '2833, Al Sayh, Bahrain',
  addressAr: '٢٨٣٣، الساية، المحرق، مملكة البحرين',
  shortAddressAr: '٢٨٣٣، الساية، البحرين',
  phoneDisplay: '+973 1733 1999',
  phoneHref: 'tel:+97317331999',
  googleRating: 5.0,
  googleReviewCount: 41,
  googleMapsUrl: 'https://maps.google.com/?cid=17966670789532107757',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Tooth+Hub+Speciality+Dental+Centre,+Al+Sayh,+Bahrain&output=embed',
  logoSrc: '/assets/aistudio/IMG_20261125_190544_ffab17b1.jpg',
};

export const BUSINESS_HOURS = [
  { dayEn: 'Saturday', dayAr: 'السبت', hoursEn: '9:00 AM – 9:00 PM', hoursAr: '9:00 ص – 9:00 م', closed: false },
  { dayEn: 'Sunday', dayAr: 'الأحد', hoursEn: '9:00 AM – 9:00 PM', hoursAr: '9:00 ص – 9:00 م', closed: false },
  { dayEn: 'Monday', dayAr: 'الاثنين', hoursEn: '9:00 AM – 9:00 PM', hoursAr: '9:00 ص – 9:00 م', closed: false },
  { dayEn: 'Tuesday', dayAr: 'الثلاثاء', hoursEn: '9:00 AM – 9:00 PM', hoursAr: '9:00 ص – 9:00 م', closed: false },
  { dayEn: 'Wednesday', dayAr: 'الأربعاء', hoursEn: '9:00 AM – 9:00 PM', hoursAr: '9:00 ص – 9:00 م', closed: false },
  { dayEn: 'Thursday', dayAr: 'الخميس', hoursEn: '9:00 AM – 9:00 PM', hoursAr: '9:00 ص – 9:00 م', closed: false },
  { dayEn: 'Friday', dayAr: 'الجمعة', hoursEn: 'CLOSED', hoursAr: 'مغلق', closed: true },
] as const;

export const CLINIC_IMAGES = {
  heroSmile: '/src/assets/images/healthy_natural_smile_1795624034570.jpg',
  heroCare: '/src/assets/images/hero_dental_care_1795624033644.jpg',
  consultation: '/src/assets/images/dental_consultation_1795624035240.jpg',
  preventive: '/src/assets/images/preventive_hygiene_care_1795624034694.jpg',
  reception: '/src/assets/images/clinic_reception_interior_1795624034934.jpg',
  treatmentSuite: '/src/assets/images/modern_treatment_suite_1795624036376.jpg',
};

/**
 * Editable clinic focus areas. Toggle `visible: false` to hide any service
 * category prior to final confirmation from clinic management.
 */
export const CLINIC_SERVICES: ServiceItemConfig[] = [
  {
    id: 'general-dentistry',
    visible: true,
    image: CLINIC_IMAGES.treatmentSuite,
    iconKey: 'shield',
    en: {
      title: 'General Dentistry',
      shortDesc: 'Comprehensive oral examinations and attentive routine dental care tailored to your comfort.',
      detailDesc:
        'Routine dental check-ups, oral health assessments, and everyday dental care focused on keeping your teeth and gums healthy in a calm setting.',
      note: 'Proposed service category · Confirm specific treatment availability with our reception team.',
    },
    ar: {
      title: 'طب الأسنان العام',
      shortDesc: 'فحوصات شاملة للفم ورعاية روتينية دقيقة مصممة لراحتك واطمئنانك.',
      detailDesc:
        'فحوصات دورية وتقييم شامل لصحة الفم واللثة مع خطط متابعة واضحة ضمن بيئة هادئة ومريحة.',
      note: 'فئة خدمة مقترحة وقابلة للتعديل · يرجى تأكيد توفر الإجراء المحدد مع فريق الاستقبال.',
    },
  },
  {
    id: 'cosmetic-dentistry',
    visible: true,
    image: CLINIC_IMAGES.heroSmile,
    iconKey: 'sparkles',
    en: {
      title: 'Cosmetic Dentistry',
      shortDesc: 'Thoughtful aesthetic smile care designed around natural proportions and gentle refinement.',
      detailDesc:
        'Personalized smile consultations exploring natural-looking aesthetic options suited to your individual facial harmony and goals.',
      note: 'Proposed service category · Confirm specific treatment availability with our reception team.',
    },
    ar: {
      title: 'تجميل الأسنان',
      shortDesc: 'عناية جمالية مدروسة تركز على التناسق الطبيعي للابتسامة بكل لطف ودقة.',
      detailDesc:
        'استشارات مخصصة للابتسامة تهدف إلى تحسين المظهر الطبيعي للأسنان بما يتناسب مع تطلعاتك.',
      note: 'فئة خدمة مقترحة وقابلة للتعديل · يرجى تأكيد توفر الإجراء المحدد مع فريق الاستقبال.',
    },
  },
  {
    id: 'preventive-care',
    visible: true,
    image: CLINIC_IMAGES.preventive,
    iconKey: 'heart',
    en: {
      title: 'Preventive Dental Care',
      shortDesc: 'Proactive hygiene guidance and early care to help preserve long-term oral wellness.',
      detailDesc:
        'Prevention-first care designed to protect enamel, support gum health, and keep future dental visits straightforward and stress-free.',
      note: 'Proposed service category · Confirm specific treatment availability with our reception team.',
    },
    ar: {
      title: 'الرعاية الوقائية للأسنان',
      shortDesc: 'عناية وقائية وإرشادات مستمرة للحفاظ على صحة الأسنان واللثة على المدى الطويل.',
      detailDesc:
        'نهج وقائي يركز على حماية مينا الأسنان ودعم صحة اللثة لتقليل الحاجة إلى العلاجات المعقدة مستقبلاً.',
      note: 'فئة خدمة مقترحة وقابلة للتعديل · يرجى تأكيد توفر الإجراء المحدد مع فريق الاستقبال.',
    },
  },
  {
    id: 'restorative-dentistry',
    visible: true,
    image: CLINIC_IMAGES.heroCare,
    iconKey: 'layers',
    en: {
      title: 'Restorative Dentistry',
      shortDesc: 'Focused restorative evaluations to help rebuild comfort, bite balance, and everyday function.',
      detailDesc:
        'Careful assessment of worn, chipped, or sensitive teeth with patient-centered guidance on restoring strength and comfortable function.',
      note: 'Proposed service category · Confirm specific treatment availability with our reception team.',
    },
    ar: {
      title: 'طب الأسنان الترميمي',
      shortDesc: 'تقييمات علاجية دقيقة لاستعادة راحة المضغ وتوازن الأسنان ووظيفتها اليومية.',
      detailDesc:
        'فحص دقيق للأسنان المتضررة أو الحساسة مع مناقشة الخيارات المناسبة لاستعادة القوة والراحة.',
      note: 'فئة خدمة مقترحة وقابلة للتعديل · يرجى تأكيد توفر الإجراء المحدد مع فريق الاستقبال.',
    },
  },
  {
    id: 'oral-consultation',
    visible: true,
    image: CLINIC_IMAGES.consultation,
    iconKey: 'clipboard',
    en: {
      title: 'Oral Health Consultation',
      shortDesc: 'Unhurried one-on-one consultations to answer questions and clarify your care options.',
      detailDesc:
        'Clear, transparent conversations about your dental priorities, comfort preferences, and next steps before any care begins.',
      note: 'Proposed service category · Confirm specific treatment availability with our reception team.',
    },
    ar: {
      title: 'استشارات صحة الفم',
      shortDesc: 'جلسات استشارية متأنية للإجابة على جميع استفساراتك وتوضيح خيارات الرعاية المتاحة.',
      detailDesc:
        'حوار واضح وشفاف حول أولوياتك الصحية ومستوى راحتك والخطوات المقترحة قبل البدء بأي إجراء.',
      note: 'فئة خدمة مقترحة وقابلة للتعديل · يرجى تأكيد توفر الإجراء المحدد مع فريق الاستقبال.',
    },
  },
  {
    id: 'family-dental-care',
    visible: true,
    image: CLINIC_IMAGES.reception,
    iconKey: 'users',
    en: {
      title: 'Family Dental Care',
      shortDesc: 'Welcoming, attentive dental visits structured to put adults and family members at ease.',
      detailDesc:
        'Coordinated family scheduling and a warm, unhurried clinic environment across Saturday through Thursday hours.',
      note: 'Proposed service category · Confirm specific treatment availability with our reception team.',
    },
    ar: {
      title: 'رعاية الأسنان للأسرة',
      shortDesc: 'زيارات مريحة ومرحبة صُممت لمنح جميع أفراد الأسرة تجربة إيجابية ومطمئنة.',
      detailDesc:
        'تنسيق مريح لمواعيد الأسرة في أجواء هادئة ومواعيد ممتدة من السبت حتى الخميس.',
      note: 'فئة خدمة مقترحة وقابلة للتعديل · يرجى تأكيد توفر الإجراء المحدد مع فريق الاستقبال.',
    },
  },
];

export interface GalleryItem {
  id: string;
  category: 'interiors' | 'care' | 'smiles';
  image: string;
  en: {
    title: string;
    caption: string;
    categoryLabel: string;
  };
  ar: {
    title: string;
    caption: string;
    categoryLabel: string;
  };
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-reception',
    category: 'interiors',
    image: CLINIC_IMAGES.reception,
    en: {
      title: 'Calm Reception Lounge Aesthetic',
      caption: 'Concept visual illustrating serene hospitality seating and bright natural textures.',
      categoryLabel: 'Clinic Ambiance',
    },
    ar: {
      title: 'تصور صالة الاستقبال الهادئة',
      caption: 'صورة تعبيرية تعكس أجواء الضيافة الهادئة والإضاءة الطبيعية المريحة.',
      categoryLabel: 'أجواء العيادة',
    },
  },
  {
    id: 'g-suite',
    category: 'interiors',
    image: CLINIC_IMAGES.treatmentSuite,
    en: {
      title: 'Modern Treatment Suite',
      caption: 'Editorial interior concept highlighting clean surfaces, daylight, and ergonomic comfort.',
      categoryLabel: 'Clinic Ambiance',
    },
    ar: {
      title: 'غرفة علاج حديثة',
      caption: 'تصور معماري يبرز النظافة السريرية والضوء الطبيعي والراحة أثناء الزيارة.',
      categoryLabel: 'أجواء العيادة',
    },
  },
  {
    id: 'g-consultation',
    category: 'care',
    image: CLINIC_IMAGES.consultation,
    en: {
      title: 'Attentive Consultation',
      caption: 'Illustrative scene of calm, transparent patient-clinician communication.',
      categoryLabel: 'Patient Care',
    },
    ar: {
      title: 'استشارة طبية متأنية',
      caption: 'مشهد توضيحي للتواصل الهادئ والواضح بين الطبيب والمريض.',
      categoryLabel: 'رعاية المرضى',
    },
  },
  {
    id: 'g-smile',
    category: 'smiles',
    image: CLINIC_IMAGES.heroSmile,
    en: {
      title: 'Natural, Healthy Smile',
      caption: 'Editorial portrait celebrating natural confidence and everyday oral wellness.',
      categoryLabel: 'Healthy Smiles',
    },
    ar: {
      title: 'ابتسامة صحية وطبيعية',
      caption: 'صورة تعبيرية تحتفي بالثقة الطبيعية وصحة الفم المستدامة.',
      categoryLabel: 'ابتسامات صحية',
    },
  },
  {
    id: 'g-hygiene',
    category: 'interiors',
    image: CLINIC_IMAGES.preventive,
    en: {
      title: 'Wellness Suite Detail',
      caption: 'Minimalist architectural detail emphasizing calm hospitality and cleanliness.',
      categoryLabel: 'Clinic Ambiance',
    },
    ar: {
      title: 'تفاصيل العناية والنظافة',
      caption: 'تصميم بسيط يركز على الهدوء والنظافة والراحة في كل زاوية.',
      categoryLabel: 'أجواء العيادة',
    },
  },
  {
    id: 'g-care',
    category: 'care',
    image: CLINIC_IMAGES.heroCare,
    en: {
      title: 'Unhurried Patient Interaction',
      caption: 'Illustrative representation of supportive chairside dialogue.',
      categoryLabel: 'Patient Care',
    },
    ar: {
      title: 'تفاعل لطيف ومطمئن',
      caption: 'صورة تعبيرية عن الرعاية الشخصية والاهتمام براحة المريض.',
      categoryLabel: 'رعاية المرضى',
    },
  },
];

export const TRANSLATIONS = {
  en: {
    nav: {
      services: 'Services',
      experience: 'Experience',
      gallery: 'Gallery',
      reviews: 'Reviews',
      visit: 'Visit Us',
      bookCta: 'Book Appointment',
      langSwitch: 'العربية',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
    },
    hero: {
      kicker: 'Al Sayh, Muharraq · Kingdom of Bahrain',
      headline: 'Your Smile Deserves Exceptional Care.',
      description:
        'Discover a more comfortable dental experience with Tooth Hub Speciality Dental Centre. Your smile and oral health deserve thoughtful, professional attention.',
      primaryCta: 'Book an Appointment',
      secondaryCta: 'Call Our Clinic',
      hoursNote: 'Sat – Thu · 9:00 AM – 9:00 PM',
      imageAltPrimary: 'Radiant natural healthy smile in soft studio light',
      imageAltSecondary: 'Sunlit modern dental suite at Tooth Hub',
    },
    trust: {
      ratingTitle: 'Google Rating',
      reviewsTitle: 'Patient Reviews',
      careValue: 'Patient-Focused',
      careTitle: 'Calm, Attentive Care',
      locationValue: 'Al Sayh, Bahrain',
      locationTitle: 'Convenient Location',
    },
    services: {
      eyebrow: 'Dental Care Categories',
      title: 'Thoughtful Care Tailored to Every Visit',
      subtitle:
        'Explore our primary dental care focus areas. Listed categories can be customized as our clinic team confirms your personalized treatment plan.',
      learnMore: 'Learn More',
      requestService: 'Request Appointment',
      modalClose: 'Close service details',
      modalBookCta: 'Request This Service',
    },
    why: {
      eyebrow: 'The Tooth Hub Approach',
      title: 'Why Choose Tooth Hub?',
      subtitle:
        'We believe every visit to the dentist should feel unhurried, reassuring, and centered entirely around your comfort.',
      pillars: [
        {
          title: 'Patient-Focused Experience',
          desc: 'Every visit begins by listening to your goals, comfort needs, and questions without rushing.',
        },
        {
          title: 'Friendly and Welcoming Environment',
          desc: 'A calm, thoughtfully arranged clinical setting in Al Sayh designed to help you feel at ease from arrival.',
        },
        {
          title: 'Convenient Appointment Access',
          desc: 'Extended hours from 9:00 AM to 9:00 PM, Saturday through Thursday, making scheduling straightforward.',
        },
        {
          title: 'Dedicated Attention to Your Smile',
          desc: 'Careful, detail-oriented focus on preserving natural oral health and supporting lasting confidence.',
        },
      ],
      cta: 'Schedule Your Visit',
    },
    gallery: {
      eyebrow: 'Clinic Atmosphere & Care',
      title: 'Designed Around Calm & Confidence',
      subtitle:
        'Editorial visuals illustrating our commitment to clean architectural calm, hospitality, and healthy smiles. Real clinic photography can be updated anytime.',
      filters: {
        all: 'All Views',
        interiors: 'Clinic Ambiance',
        care: 'Patient Care',
        smiles: 'Healthy Smiles',
      },
      viewLarger: 'Inspect photo',
      prevPhoto: 'Previous photo',
      nextPhoto: 'Next photo',
      closeLightbox: 'Close gallery lightbox',
    },
    reviews: {
      eyebrow: 'Verified Google Profile',
      title: 'What Our Patients Say',
      subtitle:
        'Our reputation in Muharraq is built on genuine patient experiences. View verified feedback directly on our official Google Maps profile.',
      ratingSuffix: '/ 5.0',
      reviewsSuffix: 'Google Reviews',
      verifiedNote: 'All reviews are hosted publicly on Google Maps.',
      cta: 'Read Google Reviews',
    },
    appointment: {
      eyebrow: 'Appointment Request',
      title: 'Ready for a Healthier Smile?',
      subtitle:
        'Take the first step toward better oral health. Contact our team to arrange your appointment.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      phone: 'Phone Number',
      phonePlaceholder: '+973 3XXX XXXX',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time',
      timePlaceholder: 'Select a time window',
      timeOptions: [
        'Morning (9:00 AM – 1:00 PM)',
        'Afternoon (1:00 PM – 5:00 PM)',
        'Evening (5:00 PM – 9:00 PM)',
      ],
      service: 'Service of Interest',
      servicePlaceholder: 'Select a service category',
      message: 'Additional Message (Optional)',
      messagePlaceholder: 'Share any questions, comfort preferences, or preferred callback times...',
      submit: 'Request an Appointment',
      directCallTitle: 'Prefer to Speak With Us Directly?',
      directCallDesc:
        'Our reception team in Al Sayh is available Saturday to Thursday from 9:00 AM to 9:00 PM to confirm appointments immediately by phone.',
      callClinicBtn: 'Call Our Clinic',
      honestyNote:
        'Submitting this form prepares your appointment request for our clinic coordinator. Visits are finalized once our team confirms availability with you.',
      successTitle: 'Appointment Request Prepared',
      successBody:
        'Thank you. Your request details are ready below. Because appointments are confirmed directly by our reception team, please call us if you need same-day assistance.',
      copySummary: 'Copy Request Summary',
      copied: 'Copied',
      newRequest: 'Submit Another Request',
    },
    location: {
      eyebrow: 'Al Sayh · Muharraq',
      title: 'Visit Our Clinic',
      addressLabel: 'Clinic Address',
      phoneLabel: 'Phone Number',
      hoursLabel: 'Opening Hours',
      directionsBtn: 'Get Directions',
      callBtn: 'Call Clinic',
      mapTitle: 'Tooth Hub Speciality Dental Centre Location Map',
    },
    footer: {
      summary:
        'A patient-centered speciality dental centre in Al Sayh, Muharraq, Bahrain, dedicated to thoughtful care and a calm clinical experience.',
      quickLinksTitle: 'Quick Links',
      servicesTitle: 'Dental Care',
      contactTitle: 'Clinic Details',
      mapsLink: 'View on Google Maps',
      rights: 'All rights reserved.',
    },
    mobileBar: {
      callNow: 'Call Now',
      bookNow: 'Book Appointment',
    },
  },
  ar: {
    nav: {
      services: 'الخدمات',
      experience: 'لماذا نحن',
      gallery: 'المعرض',
      reviews: 'التقييمات',
      visit: 'موقعنا',
      bookCta: 'احجز موعداً',
      langSwitch: 'English',
      openMenu: 'فتح قائمة التنقل',
      closeMenu: 'إغلاق قائمة التنقل',
    },
    hero: {
      kicker: 'الساية، المحرق · مملكة البحرين',
      headline: 'ابتسامتك تستحق عناية استثنائية.',
      description:
        'اكتشف تجربة علاج أسنان أكثر راحة واطمئناناً مع مركز توث هب التخصصي للأسنان. ابتسامتك وصحة فمك تستحقان اهتماماً مهنياً دقيقاً.',
      primaryCta: 'احجز موعداً',
      secondaryCta: 'اتصل بالعيادة',
      hoursNote: 'السبت – الخميس · 9:00 صباحاً – 9:00 مساءً',
      imageAltPrimary: 'ابتسامة صحية وطبيعية مشرقة في إضاءة هادئة',
      imageAltSecondary: 'جناح علاج أسنان حديث ومشرق في مركز توث هب',
    },
    trust: {
      ratingTitle: 'تقييم جوجل',
      reviewsTitle: 'تقييم مريض',
      careValue: 'محورها المريض',
      careTitle: 'رعاية هادئة ومتأنية',
      locationValue: 'الساية، البحرين',
      locationTitle: 'موقع يسهل الوصول إليه',
    },
    services: {
      eyebrow: 'فئات الرعاية السنية',
      title: 'رعاية مدروسة تُصمم لراحتك في كل زيارة',
      subtitle:
        'استكشف مجالات العناية الرئيسية بالأسنان. الفئات المعروضة قابلة للتعديل والتخصيص وفق الخطة العلاجية المعتمدة من فريق العيادة.',
      learnMore: 'اعرف المزيد',
      requestService: 'اطلب موعداً',
      modalClose: 'إغلاق تفاصيل الخدمة',
      modalBookCta: 'طلب موعد لهذه الخدمة',
    },
    why: {
      eyebrow: 'منهجية توث هب',
      title: 'لماذا تختار توث هب؟',
      subtitle:
        'نؤمن بأن كل زيارة لطبيب الأسنان يجب أن تكون هادئة، مطمئنة، ومتمحورة بالكامل حول راحتك.',
      pillars: [
        {
          title: 'تجربة تتمحور حول المريض',
          desc: 'تبدأ كل زيارة بالاستماع إلى احتياجاتك وأسئلتك وتفضيلات راحتك دون استعجال.',
        },
        {
          title: 'بيئة ودودة ومرحّبة',
          desc: 'أجواء عيادة هادئة ومرتبة بعناية في الساية لتمنحك شعوراً بالراحة منذ لحظة وصولك.',
        },
        {
          title: 'سهولة حجز والوصول للمواعيد',
          desc: 'ساعات عمل مرنة من 9:00 صباحاً حتى 9:00 مساءً من السبت إلى الخميس لتناسب جدولك.',
        },
        {
          title: 'اهتمام مخصص بابتسامتك',
          desc: 'تركيز دقيق على الحفاظ على صحة الفم الطبيعية ودعم ثقتك بابتسامتك على المدى الطويل.',
        },
      ],
      cta: 'رتّب زيارتك الآن',
    },
    gallery: {
      eyebrow: 'أجواء العيادة والرعاية',
      title: 'تصميم يجمع بين الهدوء والثقة',
      subtitle:
        'صور تعبيرية تعكس التزامنا بالهدوء المعماري، والنظافة السريرية، والابتسامات الصحية. يمكن استبدالها بصور المركز الحقيقية فور توفرها.',
      filters: {
        all: 'جميع الصور',
        interiors: 'أجواء العيادة',
        care: 'رعاية المرضى',
        smiles: 'ابتسامات صحية',
      },
      viewLarger: 'تكبير الصورة',
      prevPhoto: 'الصورة السابقة',
      nextPhoto: 'الصورة التالية',
      closeLightbox: 'إغلاق عارض الصور',
    },
    reviews: {
      eyebrow: 'ملف جوجل الموثق',
      title: 'آراء وتقييمات مرضانا',
      subtitle:
        'تُبنى سمعتنا في المحرق على تجارب حقيقية لمرضانا. يمكنك الاطلاع على جميع التقييمات الموثقة مباشرة عبر خرائط جوجل.',
      ratingSuffix: '/ 5.0',
      reviewsSuffix: 'تقييم على جوجل',
      verifiedNote: 'جميع التقييمات منشورة وموثقة للعموم على خرائط جوجل.',
      cta: 'اقرأ تقييمات جوجل',
    },
    appointment: {
      eyebrow: 'طلب حجز موعد',
      title: 'مستعد لابتسامة أكثر صحة؟',
      subtitle:
        'اتخذ الخطوة الأولى نحو صحة فم أفضل. تواصل مع فريقنا لتنسيق موعد زيارتك.',
      fullName: 'الاسم الكامل',
      fullNamePlaceholder: 'أدخل اسمك الكامل',
      phone: 'رقم الهاتف',
      phonePlaceholder: '+973 3XXX XXXX',
      preferredDate: 'التاريخ المفضل',
      preferredTime: 'الوقت المفضل',
      timePlaceholder: 'اختر الفترة الزمنية المناسبة',
      timeOptions: [
        'صباحاً (9:00 ص – 1:00 م)',
        'ظهراً (1:00 م – 5:00 م)',
        'مساءً (5:00 م – 9:00 م)',
      ],
      service: 'الخدمة المطلوبة',
      servicePlaceholder: 'اختر فئة الخدمة',
      message: 'ملاحظات إضافية (اختياري)',
      messagePlaceholder: 'شاركنا أي استفسارات أو تفضيلات للوقت المناسب للتواصل معك...',
      submit: 'إرسال طلب الموعد',
      directCallTitle: 'هل تفضل التواصل الهاتفي المباشر؟',
      directCallDesc:
        'يتواجد فريق الاستقبال في الساية من السبت إلى الخميس، من 9:00 صباحاً حتى 9:00 مساءً لتأكيد المواعيد هاتفياً بشكل مباشر.',
      callClinicBtn: 'اتصل بالعيادة',
      honestyNote:
        'إرسال هذا النموذج يجهز طلبك لمراجعة فريق الاستقبال. يتم تأكيد الموعد النهائي بعد تواصل الفريق معك والتحقق من المواعيد المتاحة.',
      successTitle: 'تم تجهيز طلب الموعد بنجاح',
      successBody:
        'شكراً لك. تفاصيل طلبك جاهزة أدناه للمتابعة من فريق الاستقبال. وللمواعيد العاجلة في نفس اليوم، يُرجى الاتصال بالعيادة مباشرة.',
      copySummary: 'نسخ ملخص الطلب',
      copied: 'تم النسخ',
      newRequest: 'إرسال طلب جديد',
    },
    location: {
      eyebrow: 'الساية · المحرق',
      title: 'زوروا عيادتنا',
      addressLabel: 'عنوان العيادة',
      phoneLabel: 'رقم الهاتف',
      hoursLabel: 'ساعات العمل',
      directionsBtn: 'احصل على الاتجاهات',
      callBtn: 'اتصل بالعيادة',
      mapTitle: 'خريطة موقع مركز توث هب التخصصي للأسنان',
    },
    footer: {
      summary:
        'مركز تخصصي لطب الأسنان في الساية، المحرق، البحرين، يضع راحة المريض وجودة العناية السنية في مقدمة أولوياته.',
      quickLinksTitle: 'روابط سريعة',
      servicesTitle: 'العناية بالأسنان',
      contactTitle: 'بيانات العيادة',
      mapsLink: 'عرض على خرائط جوجل',
      rights: 'جميع الحقوق محفوظة.',
    },
    mobileBar: {
      callNow: 'اتصل الآن',
      bookNow: 'احجز موعداً',
    },
  },
} as const;
