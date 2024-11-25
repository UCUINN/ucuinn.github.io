import React from 'react';
import { useTranslation } from 'react-i18next';

const PriceList = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('PriceList.title')}</h2>
    </div>
  );
};

export default PriceList;
