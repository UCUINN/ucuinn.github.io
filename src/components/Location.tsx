import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import entranceEn from '../img/entracy.webp';
import entranceUa from '../img/entracy_ukr.webp';

const Location = () => {
  const { t, i18n } = useTranslation();
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const isMountedRef = useRef(true);
  const entranceImage = i18n.language === 'en' 
    ? entranceEn 
    : entranceUa;

  useEffect(() => {
    const container = mapContainerRef.current;

    if (!container) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoadMap(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadMap(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      isMountedRef.current = false;
    };
  }, []);

  const handleLoadMap = () => {
    if (!isMountedRef.current) {
      return;
    }
    setShouldLoadMap(true);
  };

  return (
    <>
      <section id="info" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-primary-50/30 to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-12 text-center">
            {t('info.findUs')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div className="aspect-video relative overflow-hidden rounded-2xl border border-primary-100/50 shadow-sm">
                <img
                  loading="lazy"
                  decoding="async"
                  src={entranceImage}
                  alt={t('info.findUs')}
                  width="800"
                  height="600"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-lg text-gray-700 leading-relaxed bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-primary-100/50 shadow-sm space-y-4">
                <p>
                  {t('info.description.welcome')}{' '}
                  <span className="font-bold text-primary-700">UCU Inn</span>{' '}
                  — {t('info.description.location')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-primary-50 to-primary-100/50 border-l-4 border-primary-600 rounded-lg shadow-sm">
                    <span className="text-2xl">🕐</span>
                    <div>
                      <strong className="text-primary-800 font-bold text-base block">Check-in:</strong>
                      <span className="text-primary-900 font-semibold text-lg">{t('info.description.checkInTime')}</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-primary-50 to-primary-100/50 border-l-4 border-primary-600 rounded-lg shadow-sm">
                    <span className="text-2xl">🕐</span>
                    <div>
                      <strong className="text-primary-800 font-bold text-base block">Check-out:</strong>
                      <span className="text-primary-900 font-semibold text-lg">{t('info.description.checkOutTime')}</span>
                    </div>
                  </div>
                </div>
                <p>{t('info.description.additionalInfo')}</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-primary-100/50 shadow-sm">
              <h3 className="font-bold text-2xl sm:text-3xl text-gray-900 mb-8">
                {t('info.description.whyChoose')}
              </h3>
              <ul className="space-y-6">
                {['amenities', 'comfort', 'dining', 'activities'].map((item) => (
                  <li key={item} className="flex gap-4">
                    <div className="w-1 flex-shrink-0 bg-primary-600 rounded-full"></div>
                    <div>
                      <p className="font-bold text-primary-700 mb-2 text-base sm:text-lg">
                        {t(`info.description.${item}.title`)}
                      </p>
                      <p className="text-gray-600 leading-relaxed text-base">
                        {t(`info.description.${item}.text`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="location" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/20 via-white to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
              {t('info.location.title')}
            </h3>
            <p className="text-lg sm:text-xl text-gray-800 font-semibold flex items-center justify-center gap-2">
              <MapPin className="w-6 h-6 text-primary-700" />
              {t('info.location.address')}
            </p>
            <p className="text-base text-gray-600 mt-3 leading-relaxed whitespace-pre-line">
              {t('info.location.reception')}
            </p>
          </div>

          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-primary-100/50 shadow-lg">
            <div ref={mapContainerRef} className="w-full h-full" aria-live="polite">
              {shouldLoadMap ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5779.116598308234!2d24.021067014566256!3d49.81795401511609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae7f32dff0929%3A0xb5c40308a4d0d108!2z0JPQvtGB0YLRjNC-0LLRliDQutGW0LzQvdCw0YLQuCDQmtC-0LvQtdKR0ZbRg9C80YMg0KPQmtCj!5e0!3m2!1suk!2sua!4v1712334211072!5m2!1suk!2sua"
                  width="800"
                  height="600"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="UCU INN Location Map"
                  aria-label={t('info.location.mapAriaLabel') || 'Map showing UCU INN location'}
                  className="w-full h-full"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-white/80 px-6 text-center">
                  <p className="text-sm text-gray-600">
                    {t('info.location.mapPlaceholder')}
                  </p>
                  <button
                    type="button"
                    onClick={handleLoadMap}
                    className="inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-700"
                  >
                    {t('info.location.mapCta')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
