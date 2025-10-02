import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(() => new Date());

  const formatTime = useCallback((date: Date): string => {
    return date.toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className={`bg-primary-900 text-white py-4 px-4 ${className ?? ''}`}>
      <div className="container mx-auto text-center text-sm md:text-base">
        <p className="font-medium flex items-center justify-center gap-3">
          <span> {currentTime.getFullYear()}</span>
          <span className="text-gray-300">{formatTime(currentTime)}</span>
          <span className="text-gray-200">{t('footer.copyright')}</span>
        </p>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;