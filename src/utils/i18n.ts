import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'ua',
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json?v=' + Date.now(),
      requestOptions: {
        cache: 'no-store',
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Force reload on hot reload
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    i18n.reloadResources();
  });
}

export default i18n;
