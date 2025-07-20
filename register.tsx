
import React, { Suspense, useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { useTranslation, I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CategoryCard } from './components/CategoryCard';
import { CATEGORIES_DATA, TOP_COMPANIES_DATA } from './constants';
import { LoadingSpinnerIcon } from './components/icons';

// Initialize i18next for this page
i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'de',
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
    backend: { loadPath: './locales/{{lng}}/translation.json' }
  });

const RegistrationPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleSelectCategory = (categoryNameKey: string) => {
        setSelectedCategory(prev => (prev === categoryNameKey ? null : categoryNameKey));
    };
    
    const allCountries = useMemo(() => [...new Set(TOP_COMPANIES_DATA.map(c => t(c.countryKey)).filter(Boolean))].sort(), [i18n.language, t]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header categories={CATEGORIES_DATA} />
            <main className="flex-grow">
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t('register_page.title')}</h1>
                                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{t('register_page.subtitle')}</p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                                <form className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-6">{t('register_page.form_title')}</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">{t('register_page.company_name')}</label>
                                            <input type="text" id="company-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="company-email" className="block text-sm font-medium text-gray-700">{t('register_page.company_email')}</label>
                                            <input type="email" id="company-email" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="country-filter" className="block text-sm font-medium text-gray-700">{t('register_page.country')}</label>
                                        <input
                                          type="text"
                                          id="country-filter"
                                          list="country-list"
                                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                        <datalist id="country-list">
                                          {allCountries.map(country => <option key={country} value={country} />)}
                                        </datalist>
                                    </div>
                                    
                                    <div className="pt-6">
                                      <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-6">{t('register_page.category_title')}</h2>
                                      <p className="text-sm text-gray-600 mb-6">{t('register_page.category_subtitle')}</p>
                                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {CATEGORIES_DATA.map(cat => (
                                          <CategoryCard 
                                            key={cat.nameKey} 
                                            category={cat} 
                                            isSelected={selectedCategory === cat.nameKey}
                                            onSelect={() => handleSelectCategory(cat.nameKey)}
                                          />
                                        ))}
                                      </div>
                                    </div>

                                    <div className="pt-6 text-right">
                                        <button type="submit" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-emerald-700 transition transform hover:scale-105">{t('register_page.cta')}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Suspense fallback={
        <div className="fixed inset-0 bg-white flex justify-center items-center">
          <LoadingSpinnerIcon className="h-12 w-12 text-emerald-600"/>
        </div>
      }>
        <I18nextProvider i18n={i18next}>
          <RegistrationPage />
        </I18nextProvider>
      </Suspense>
    </React.StrictMode>
  );
}