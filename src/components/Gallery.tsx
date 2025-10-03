import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { useTranslation } from "react-i18next";
import { ImagePlus } from "lucide-react";
import rec3 from "../img/rec3pic.webp";
import rec4 from "../img/rec4pic.webp";
import rec5 from "../img/rec5pic.webp";
import rec6 from "../img/rec6pic.webp";
import rec7 from "../img/rec7pic.webp";
import rec8 from "../img/rec8pic.webp";
import rec9 from "../img/rec9pic.webp";
import rec10 from "../img/rec10pic.webp";
import rec11 from "../img/rec11pic.webp";
import rec12 from "../img/rec12pic.webp";
import rec13 from "../img/rec13pic.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Keyboard,
  EffectFade,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Gallery.css";

interface ImageItem {
  src: string;
  caption: string;
}

function Gallery() {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxBundle, setLightboxBundle] = useState<{
    Lightbox: ComponentType<any>;
    plugins: unknown[];
  } | null>(null);
  const [isLoadingLightbox, setIsLoadingLightbox] = useState(false);
  const lightboxRef = useRef<{
    Lightbox: ComponentType<any>;
    plugins: unknown[];
  } | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => () => {
    isMountedRef.current = false;
  }, []);

  const images: ImageItem[] = [
    { src: rec3, caption: t("gallery.reception") },
    { src: rec5, caption: t("gallery.receptionDesk") },
    { src: rec4, caption: t("gallery.waitingArea") },
    { src: rec9, caption: t("gallery.doubleRoom") },
    { src: rec6, caption: t("gallery.twinRoom") },
    { src: rec7, caption: t("gallery.doubleRoom") },
    { src: rec8, caption: t("gallery.suite1") },
    { src: rec9, caption: t("gallery.suite2") },
    { src: rec10, caption: t("gallery.suite3") },
    { src: rec11, caption: t("gallery.suite3") },
    { src: rec12, caption: t("gallery.bathroom") },
    { src: rec13, caption: t("gallery.lounge") },
  ];

  const slides = images.map((image) => ({
    src: image.src,
    description: image.caption,
  }));

  const loadLightbox = useCallback(async () => {
    if (lightboxRef.current || isLoadingLightbox) {
      return lightboxRef.current;
    }

    setIsLoadingLightbox(true);
    try {
      await Promise.all([
        import("yet-another-react-lightbox/styles.css"),
        import("yet-another-react-lightbox/plugins/captions.css"),
      ]);

      const [lightboxModule, zoomModule, captionsModule] = await Promise.all([
        import("yet-another-react-lightbox"),
        import("yet-another-react-lightbox/plugins/zoom"),
        import("yet-another-react-lightbox/plugins/captions"),
      ]);

      const bundle = {
        Lightbox: lightboxModule.default,
        plugins: [zoomModule.default, captionsModule.default],
      };
      lightboxRef.current = bundle;
      if (isMountedRef.current) {
        setLightboxBundle(bundle);
      }
      return bundle;
    } catch (error) {
      console.error("Failed to load lightbox", error);
      return null;
    } finally {
      if (isMountedRef.current) {
        setIsLoadingLightbox(false);
      }
    }
  }, [isLoadingLightbox]);

  const handleOpenLightbox = useCallback(
    async (index: number) => {
      setCurrentImageIndex(index);
      const bundle = await loadLightbox();
      if (bundle && isMountedRef.current) {
        setLightboxBundle(bundle);
        setLightboxOpen(true);
      }
    },
    [loadLightbox]
  );

  return (
    <section
      id="gallery"
      className="relative overflow-hidden py-20"
      aria-labelledby="gallery-heading"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-primary-50/30 to-white" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="gallery-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-primary-700"
          >
            {t("gallery.title")}
          </h2>
        </div>

        <div className="gallery-container mt-12 rounded-3xl border border-primary-100/50 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="relative aspect-[16/11] md:aspect-video overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination, Keyboard, EffectFade, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              loop
              navigation
              pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
              keyboard={{ enabled: true }}
              effect="fade"
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={600}
              className="gallery-swiper h-full w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <button
                    type="button"
                    className="group relative h-full w-full cursor-zoom-in"
                    onClick={() => handleOpenLightbox(index)}
                    aria-label={`View ${image.caption} in fullscreen`}
                  >
                    <span className="sr-only">Click to enlarge</span>
                    <div className="relative h-full w-full">
                      <img
                        src={image.src}
                        alt={image.caption}
                        loading="lazy"
                        width="800"
                        height="600"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent px-6 pb-6 pt-16 text-left">
                        <p className="text-sm font-semibold text-white md:text-base">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="swiper-pagination-custom border-t border-primary-100/50 bg-white/70 py-5" />
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://drive.google.com/drive/folders/1hBpKFPunYQVaQya2LF2YNaDZ8eb0hbWX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-sm font-bold text-primary-700 shadow-lg ring-1 ring-primary-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
          >
            <ImagePlus className="h-5 w-5" aria-hidden="true" />
            {t("gallery.morePhoto")}
          </a>
        </div>
      </div>

      {lightboxBundle?.Lightbox ? (
        <lightboxBundle.Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={currentImageIndex}
          slides={slides}
          plugins={lightboxBundle.plugins}
          carousel={{ finite: true }}
          animation={{ swipe: 250 }}
          zoom={{ maxZoomPixelRatio: 3, zoomInMultiplier: 2 }}
          render={{
            buttonPrev: images.length <= 1 ? () => null : undefined,
            buttonNext: images.length <= 1 ? () => null : undefined,
          }}
        />
      ) : null}
    </section>
  );
}

export default Gallery;
