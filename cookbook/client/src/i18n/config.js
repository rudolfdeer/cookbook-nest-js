import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: localStorage.getItem('lang') || 'en',
  resources: {
    en: {
      translations: translationEN,
    },
    fr: {
      translations: translationFR,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['en', 'fr'];

export default i18n;
