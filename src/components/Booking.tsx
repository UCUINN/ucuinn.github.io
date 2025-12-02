import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, ChevronDown, Loader2 } from 'lucide-react';

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            aria-expanded={isExpanded}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">{t('info.description.welcome')} Booking.com</h3>
                <p className="text-sm text-gray-500 mt-0.5">{t('reviews.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{isExpanded ? t('reviews.collapse') : t('reviews.expand')}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
          </button>
          
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded ? 'h-[70vh]' : 'h-0'
            }`}
          >
            <div className="relative w-full h-full border-t border-gray-100">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">{t('reviews.loading.message')}</p>
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