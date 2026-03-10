import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, ChevronRight, Loader2 } from 'lucide-react';

function Booking() {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 300);
    };
    
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      return () => iframe.removeEventListener('load', handleLoad);
    }
    return undefined;
  }, []);

  return (
    <section className="py-24 bg-[#f5f5f7]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="group w-full flex items-center justify-between px-7 py-6 transition-colors hover:bg-gray-50/50"
            aria-expanded={isExpanded}
          >
            <div className="flex items-center gap-5">
              {/* Rating badge */}
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#003580] shadow-lg shadow-[#003580]/20">
                <span className="text-white font-bold text-lg leading-none">9.5</span>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                  <Star className="w-3 h-3 text-yellow-700 fill-yellow-700" />
                </div>
              </div>

              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                  {t('info.description.welcome')} Booking.com
                </h3>
                <p className="text-[13px] text-gray-400 mt-0.5">{t('reviews.subtitle')}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[13px] font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
              <span className="hidden sm:inline">{isExpanded ? t('reviews.collapse') : t('reviews.expand')}</span>
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
            </div>
          </button>
          
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded ? 'h-[70vh]' : 'h-0'
            }`}
          >
            <div className="relative w-full h-full border-t border-gray-100">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="text-center">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-300 mx-auto mb-3" />
                    <p className="text-[13px] text-gray-400">{t('reviews.loading.message')}</p>
                  </div>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={`https://www.booking.com/hotel/ua/university-centre.${t('lang', 'uk')}.html#tab-reviews`}
                className={`w-full h-full border-none transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                title={t('reviews.loading.note')}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Booking;