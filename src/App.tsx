import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import type { Language } from './utils/appointmentLogic';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { AppointmentSection } from './components/AppointmentSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar'
        ? 'مركز توث هب التخصصي للأسنان | الساية، البحرين'
        : 'Tooth Hub Speciality Dental Centre | Al Sayh, Bahrain';
  }, [lang]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToSection('appointment');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#0F2942]">
        <Navbar
          lang={lang}
          onToggleLang={() => setLang((prev) => (prev === 'en' ? 'ar' : 'en'))}
          onNavigateToSection={scrollToSection}
        />

        <main id="main" className="flex-1">
          <HeroSection
            lang={lang}
            onBookClick={() => scrollToSection('appointment')}
          />

          <TrustBar lang={lang} />

          <ServicesSection
            lang={lang}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />

          <WhyChooseSection
            lang={lang}
            onBookClick={() => scrollToSection('appointment')}
          />

          <GallerySection lang={lang} />

          <ReviewsSection lang={lang} />

          <AppointmentSection
            lang={lang}
            preselectedServiceId={selectedServiceId}
          />

          <LocationHoursSection lang={lang} />
        </main>

        <Footer
          lang={lang}
          onNavigateToSection={scrollToSection}
          onSelectService={handleSelectServiceForBooking}
        />

        <MobileStickyBar
          lang={lang}
          onBookClick={() => scrollToSection('appointment')}
        />
      </div>
    </MotionConfig>
  );
}
