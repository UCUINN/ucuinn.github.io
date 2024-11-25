import React from 'react';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('Gallery.title')}</h2>
    </div>
  );
};

export default Gallery;
