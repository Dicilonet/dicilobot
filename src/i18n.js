import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'de', // Standardsprache, wenn eine Übersetzung fehlt
    debug: false, // Auf true setzen für Debug-Informationen
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Pfad zu deinen Übersetzungsdateien
    },
    interpolation: {
      escapeValue: false, // React bereits schützt vor XSS
    },
  });

export default i18n;
