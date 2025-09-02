// src/components/Gallery.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import rec3 from '../img/rec3pic.webp';
import rec4 from '../img/rec4pic.webp';
import rec5 from '../img/rec5pic.webp';
import rec6 from '../img/rec6pic.webp';
import rec7 from '../img/rec7pic.webp';
import rec8 from '../img/rec8pic.webp';
import rec9 from '../img/rec9pic.webp';
import rec10 from '../img/rec10pic.webp';
import rec11 from '../img/rec11pic.webp';
import rec12 from '../img/rec12pic.webp';
import rec13 from '../img/rec13pic.webp';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, EffectFade, Autoplay } from 'swiper/modules';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";

// Import styles
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Gallery.css';

interface Image {
  src: string;
  caption: string;
}

function Gallery() {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images: Image[] = [
    { src: rec3, caption: t('gallery.reception') },
    { src: rec5, caption: t('gallery.receptionDesk') },
    { src: rec4, caption: t('gallery.waitingArea') },
    { src: rec9, caption: t('gallery.doubleRoom') },
    { src: rec6, caption: t('gallery.twinRoom') },
    { src: rec7, caption: t('gallery.doubleRoom') },
    { src: rec8, caption: t('gallery.suite1') },
    { src: rec9, caption: t('gallery.suite2') },
    { src: rec10, caption: t('gallery.suite3') },
    { src: rec11, caption: t('gallery.suite3') },
    { src: rec12, caption: t('gallery.bathroom') },
    { src: rec13, caption: t('gallery.lounge') }
  ];

  // Підготовка зображень для лайтбоксу
  const slides = images.map(image => ({
    src: image.src,
    description: image.caption
  }));

  return (
    <section id="gallery" className="text-primary-600 ">
      <div className="max-w-7xl mx-auto">
          <h2 className="mt-4 text-2xl font-bold mb-8 mb-4 flex items-center gap-4 ml-4">{t('gallery.title')}</h2>

        <div className="gallery-container rounded-lg mt-4 relative rounded-lg ">
          {/* Змінено розміри контейнера та додано падінг знизу для пагінації */}
          <div className="aspect-[16/11] md:aspect-video rounded-lg overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination, Keyboard, EffectFade, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              navigation
              pagination={{ 
                clickable: true,
                // Перемістити пагінацію нижче на мобільних
                el: '.swiper-pagination-custom',
              }}
              keyboard={{ enabled: true }}
              effect="fade"
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="h-full rounded-lg gallery-swiper gap-4 ml-2 gap-4 mr-2"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative w-full h-full cursor-zoom-in group"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setLightboxOpen(true);
                    }}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={image.src}
                        alt={image.caption}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    {/* Оновлено стилі для підпису */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-4 px-4">
                      <p className="text-white text-center text-sm md:text-base">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Окремий контейнер для пагінації */}
          <div className="swiper-pagination-custom py-4 bg-white"></div>
        </div>

        {/* Lightbox залишається без змін */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={currentImageIndex}
          slides={slides}
          plugins={[Zoom, Captions]}
          carousel={{
            finite: true
          }}
          animation={{
            swipe: 250
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2
          }}
          render={{
            buttonPrev: images.length <= 1 ? () => null : undefined,
            buttonNext: images.length <= 1 ? () => null : undefined
          }}
        />

        <div className="mt-2">
          <h3 className="text-xl font-bold mb-2 gap-4 ml-2">{t('gallery.morePhoto')}</h3>
          <a
            href="https://drive.google.com/drive/folders/1hBpKFPunYQVaQya2LF2YNaDZ8eb0hbWX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors gap-4 ml-2"
          >
            Google Drive
            <span className="text-xl">📂</span>
          </a>
        </div>
      </div>
    </section>
    );
}

export default Gallery;
