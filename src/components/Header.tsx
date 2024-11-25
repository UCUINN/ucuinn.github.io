import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('Header.title')}</h2>
    </div>
  );
};

export default Header;
