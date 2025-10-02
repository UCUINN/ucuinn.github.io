import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';

function Booking() {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const handleLoad = () => {
      // Плавне приховання лоадера
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      return () => iframe.removeEventListener('load', handleLoad);
    }
    return undefined;
  }, []);

  return (
    <section 
      className="relative py-20 overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-primary-50/30 to-white" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-primary-100/50 shadow-lg overflow-hidden">
          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="w-full flex items-center justify-between p-6 bg-primary-50/80 hover:bg-primary-100/60 transition-colors duration-300"
            aria-expanded={isExpanded}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary-600 rounded-full p-2">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">{t('info.description.welcome')} Booking.com</h3>
                <p className="text-sm text-gray-700 mt-1">{t('reviews.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">
                {isExpanded ? t('reviews.collapse') : t('reviews.expand')}
              </span>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-primary-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary-600" />
              )}
            </div>
          </button>
          
          <div 
            className={`transform transition-all duration-300 ease-in-out ${
              isExpanded ? 'h-[75vh]' : 'h-0'
            } overflow-hidden`}
            style={{ 
              willChange: 'height',
              containIntrinsicSize: '0 75vh'
            }}
          >
            <div className="relative w-full h-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <Loader2 className="w-10 h-10 animate-spin text-primary-600 mx-auto" />
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white to-transparent" />
                    </div>
                    <p className="text-gray-700 font-medium">{t('reviews.loading.message')}</p>
                    <p className="text-sm text-gray-600">{t('reviews.loading.note')}</p>
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