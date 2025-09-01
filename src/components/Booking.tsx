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
      className="w-full max-w-screen-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 my-6"
      ref={containerRef}
    >
      <button
        onClick={() => setIsExpanded(prev => !prev)}
        className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-colors duration-200"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center space-x-4">
          <div className="bg-blue-900 rounded-full p-2">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-800">{t('info.description.welcome')} Booking.com</h3>
            <p className="text-sm text-gray-600 mt-1">{t('reviews.subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-600">
            {isExpanded ? t('reviews.collapse') : t('reviews.expand')}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600" />
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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-50 to-white z-10">
              <div className="text-center space-y-4">
                <div className="relative">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto" />
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white to-transparent" />
                </div>
                <p className="text-gray-600 font-medium">{t('reviews.loading.message')}</p>
                <p className="text-sm text-gray-500">{t('reviews.loading.note')}</p>
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
    </section>
  );
}

export default Booking;