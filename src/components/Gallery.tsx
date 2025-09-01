// src/components/Gallery.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    { src: 'src/img/rec3pic.webp', caption: t('gallery.reception') },
    { src: 'src/img/rec5pic.webp', caption: t('gallery.receptionDesk') },
    { src: 'src/img/rec4pic.webp', caption: t('gallery.waitingArea') },
    { src: 'src/img/rec9pic.webp', caption: t('gallery.doubleRoom') },
    { src: 'src/img/rec6pic.webp', caption: t('gallery.twinRoom') },
    { src: 'src/img/rec7pic.webp', caption: t('gallery.doubleRoom') },
    { src: 'src/img/rec8pic.webp', caption: t('gallery.suite1') },
    { src: 'src/img/rec9pic.webp', caption: t('gallery.suite2') },
    { src: 'src/img/rec10pic.webp', caption: t('gallery.suite3') },
    { src: 'src/img/rec11pic.webp', caption: t('gallery.suite3') },
    { src: 'src/img/rec12pic.webp', caption: t('gallery.bathroom') },
    { src: 'src/img/rec13pic.webp', caption: t('gallery.lounge') }
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
