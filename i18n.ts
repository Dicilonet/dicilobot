import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'de', // Idioma de respaldo
    debug: false, // Cambia a true para depuración
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    // RUTA CRÍTICA para cargar los archivos de traducción desde la carpeta 'public'
    backend: { loadPath: '/locales/{{lng}}/translation.json' },
    interpolation: {
      escapeValue: false, // React ya protege contra XSS
    },
  });

export default i18n;
