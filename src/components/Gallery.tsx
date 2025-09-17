import { useState } from "react";
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
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
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

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white py-20"
      aria-labelledby="gallery-heading"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(98,65,245,0.15)_0,_rgba(255,255,255,0)_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="gallery-heading"
            className="text-4xl font-bold tracking-tight text-primary-700"
          >
            {t("gallery.title")}
          </h2>
          <p className="mt-4 text-base text-gray-600">
            {t("gallery.description")}
          </p>
        </div>

        <div className="gallery-container mt-12 rounded-3xl border border-primary-100/60 bg-white/80 backdrop-blur-sm shadow-xl">
          <div className="relative aspect-[16/11] md:aspect-video">
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
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              className="gallery-swiper h-full w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <button
                    type="button"
                    className="group relative h-full w-full cursor-zoom-in"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setLightboxOpen(true);
                    }}
                  >
                    <span className="sr-only">{t("gallery.title")}</span>
                    <div className="relative h-full w-full">
                      <img
                        src={image.src}
                        alt={image.caption}
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="600"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent px-6 pb-6 pt-16 text-left">
                        <p className="text-sm font-medium text-white md:text-base">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="swiper-pagination-custom border-t border-primary-100/60 bg-white/60 py-5" />
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://drive.google.com/drive/folders/1hBpKFPunYQVaQya2LF2YNaDZ8eb0hbWX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg ring-1 ring-primary-100 transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            <ImagePlus className="h-5 w-5" aria-hidden="true" />
            {t("gallery.morePhoto")}
          </a>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentImageIndex}
        slides={slides}
        plugins={[Zoom, Captions]}
        carousel={{ finite: true }}
        animation={{ swipe: 250 }}
        zoom={{ maxZoomPixelRatio: 3, zoomInMultiplier: 2 }}
        render={{
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
        }}
      />
    </section>
  );
}

export default Gallery;
