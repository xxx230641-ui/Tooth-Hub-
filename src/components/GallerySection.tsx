import { useEffect, useState } from 'react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { GALLERY_ITEMS, TRANSLATIONS, type GalleryItem } from '../data/clinicData';
import type { Language } from '../utils/appointmentLogic';

interface GallerySectionProps {
  lang: Language;
}

type GalleryFilter = 'all' | 'interiors' | 'care' | 'smiles';

export function GallerySection({ lang }: GallerySectionProps) {
  const t = TRANSLATIONS[lang].gallery;
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredItems: GalleryItem[] =
    filter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  const activeItem =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const filterTabs: { key: GalleryFilter; label: string }[] = [
    { key: 'all', label: t.filters.all },
    { key: 'interiors', label: t.filters.interiors },
    { key: 'care', label: t.filters.care },
    { key: 'smiles', label: t.filters.smiles },
  ];

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-[#F4F7F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold text-[#2A9D98]">{t.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#0F2942] tracking-tight text-balance">
              {t.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4A6073] leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Interactive Category Tabs */}
          <div
            role="tablist"
            aria-label={t.eyebrow}
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-[#DCE4EA] rounded-xl self-start md:self-auto"
          >
            {filterTabs.map((tab) => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(tab.key);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0F2942] text-white'
                      : 'text-[#4A6073] hover:text-[#0F2942] hover:bg-[#F4F7F8]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const copy = item[lang];
            const failed = failedImages[item.id];
            return (
              <motion.figure
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="group relative bg-white rounded-2xl border border-[#DCE4EA] overflow-hidden"
              >
                <div className="aspect-[16/11] w-full overflow-hidden bg-[#EBEFF1] relative">
                  {failed ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#0F2942]/10 to-[#2A9D98]/20 flex items-center justify-center p-4 text-sm text-[#4A6073]">
                      {copy.title}
                    </div>
                  ) : (
                    <img
                      src={item.image}
                      alt={copy.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`${t.viewLarger}: ${copy.title}`}
                    className="absolute inset-0 bg-[#091B2C]/0 group-hover:bg-[#091B2C]/25 transition-colors duration-200 flex items-end justify-end p-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#2A9D98]"
                  >
                    <span className="w-10 h-10 rounded-full bg-white/95 text-[#0F2942] flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 shadow-sm">
                      <Expand className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </button>
                </div>

                <figcaption className="p-4">
                  <div className="text-xs font-medium text-[#2A9D98]">
                    {copy.categoryLabel}
                  </div>
                  <div className="mt-1 text-base font-semibold text-[#0F2942]">
                    {copy.title}
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#091B2C]/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeItem[lang].title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#DCE4EA]"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label={t.closeLightbox}
                className="absolute top-3 end-3 z-20 w-10 h-10 rounded-full bg-white/95 text-[#0F2942] hover:bg-[#0F2942] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative bg-[#091B2C] aspect-[16/10] w-full flex items-center justify-center overflow-hidden">
                <img
                  src={activeItem.image}
                  alt={activeItem[lang].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {filteredItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex(
                          (lightboxIndex - 1 + filteredItems.length) %
                            filteredItems.length
                        )
                      }
                      aria-label={t.prevPhoto}
                      className="absolute start-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-[#0F2942] hover:bg-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                    >
                      <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                      }
                      aria-label={t.nextPhoto}
                      className="absolute end-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-[#0F2942] hover:bg-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                    >
                      <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                    </button>
                  </>
                )}
              </div>

              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-[#0F2942]">
                    {activeItem[lang].title}
                  </h3>
                  <p className="text-sm text-[#4A6073] mt-1">
                    {activeItem[lang].caption}
                  </p>
                </div>
                <span className="text-xs font-medium text-[#4A6073] tabular-nums shrink-0">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
