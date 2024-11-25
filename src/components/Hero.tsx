import React from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('Hero.title')}</h2>
    </div>
  );
};

export default Hero;
