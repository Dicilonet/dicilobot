
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18next from './i18n';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CATEGORIES_DATA } from './constants';
import { LoadingSpinnerIcon } from './components/icons';

const ImprintPageContent: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen">
            <Header categories={CATEGORIES_DATA} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 border-b pb-4">{t('imprint_page.title')}</h1>
                    <div className="prose max-w-none text-gray-700">
                        <h2 className="font-bold text-xl mt-6 mb-2">{t('imprint_page.section1.title')}</h2>
                        <p>{t('imprint_page.section1.line1')}</p>
                        <p>{t('imprint_page.section1.line2')}</p>
                        <p>{t('imprint_page.section1.line3')}</p>
                        <p>{t('imprint_page.section1.line4')}</p>
                        <br/>
                        <p><strong>{t('imprint_page.section1.line5')}</strong></p>
                        <p>{t('imprint_page.section1.line6')}</p>
                        
                        <h2 className="font-bold text-xl mt-6 mb-2">{t('imprint_page.section2.title')}</h2>
                        <p>{t('imprint_page.section2.line1')}</p>
                        <p>{t('imprint_page.section2.line2')}</p>

                        <h2 className="font-bold text-xl mt-6 mb-2">{t('imprint_page.section3.title')}</h2>
                        <p>{t('imprint_page.section3.line1')}</p>
                        
                        <h2 className="font-bold text-xl mt-6 mb-2">{t('imprint_page.section4.title')}</h2>
                        <p>{t('imprint_page.section4.line1')}</p>
                        
                        <h2 className="font-bold text-xl mt-6 mb-2">{t('imprint_page.section5.title')}</h2>
                        <p>
                            {t('imprint_page.section5.line1_part1')}
                            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">{t('imprint_page.section5.line1_part2')}</a>
                            {t('imprint_page.section5.line1_part3')}
                        </p>
                        <p>{t('imprint_page.section5.line2')}</p>
                        
                        <h2 className="font-bold text-xl mt-6 mb-2">{t('imprint_page.section6.title')}</h2>
                        <p>{t('imprint_page.section6.line1')}</p>
                    </div>
                </div>
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
          <ImprintPageContent />
        </I18nextProvider>
      </Suspense>
    </React.StrictMode>
  );
}
