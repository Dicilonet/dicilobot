
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18next from './i18n';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CATEGORIES_DATA } from './constants';
import { LoadingSpinnerIcon } from './components/icons';

const PrivacyPageContent: React.FC = () => {
    const { t } = useTranslation();

    const renderSection = (sectionKey: string) => {
        const section = t(sectionKey, { returnObjects: true }) as any;
        if (!section || !section.title) return null;

        return (
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
                {section.content.map((paragraph: string, index: number) => {
                     // Check for subheadings denoted by '<strong>...</strong>'
                    if (paragraph.startsWith('<strong>')) {
                        const title = paragraph.replace(/<strong>/g, '').replace(/<\/strong>/g, '');
                        return <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-2">{title}</h3>
                    }
                    return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                })}
            </div>
        );
    };

    return (
        <div className="bg-white min-h-screen">
            <Header categories={CATEGORIES_DATA} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 border-b pb-4">{t('privacy_page.title')}</h1>
                    <div className="prose max-w-none text-gray-700">
                        {renderSection('privacy_page.section1')}
                        {renderSection('privacy_page.section2')}
                        {renderSection('privacy_page.section3')}
                        {renderSection('privacy_page.section4')}
                        {renderSection('privacy_page.section5')}
                        {renderSection('privacy_page.section6')}
                        {renderSection('privacy_page.section7')}
                        {renderSection('privacy_page.section8')}
                        {renderSection('privacy_page.section9')}
                        {renderSection('privacy_page.section10')}
                        {renderSection('privacy_page.section11')}
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
          <PrivacyPageContent />
        </I18nextProvider>
      </Suspense>
    </React.StrictMode>
  );
}
