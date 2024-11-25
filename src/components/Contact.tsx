import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('Contact.title')}</h2>
    </div>
  );
};

export default Contact;
