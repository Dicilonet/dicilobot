
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18next from './i18n';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CATEGORIES_DATA } from './constants';
import { LoadingSpinnerIcon } from './components/icons';

const ContactPageContent: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen">
            <Header categories={CATEGORIES_DATA} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t('contact_page.title')}</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{t('contact_page.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-md border">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('contact_page.form.title')}</h2>
                            <form action="#" method="POST" className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('contact_page.form.name')}</label>
                                    <input type="text" name="name" id="name" required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('contact_page.form.email')}</label>
                                    <input type="email" name="email" id="email" required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"/>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('contact_page.form.message')}</label>
                                    <textarea name="message" id="message" rows={4} required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-emerald-700 transition transform hover:scale-105">{t('contact_page.form.submit')}</button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                           <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('contact_page.info.title')}</h2>
                           <div className="flex items-start">
                               <i className="fa-solid fa-map-marker-alt text-emerald-500 text-xl mt-1 mr-4"></i>
                               <div>
                                   <h3 className="font-semibold text-gray-800">{t('contact_page.info.address_title')}</h3>
                                   <p className="text-gray-600">Milenium Holding & Consulting UG</p>
                                   <p className="text-gray-600">Mühlendamm 84a</p>
                                   <p className="text-gray-600">22087 Hamburg</p>
                               </div>
                           </div>
                            <div className="flex items-start">
                               <i className="fa-solid fa-envelope text-emerald-500 text-xl mt-1 mr-4"></i>
                               <div>
                                   <h3 className="font-semibold text-gray-800">{t('contact_page.info.email_title')}</h3>
                                   <a href="mailto:info@dicilo.net" className="text-gray-600 hover:text-emerald-600">info@dicilo.net</a>
                               </div>
                           </div>
                           <div className="flex items-start">
                               <i className="fa-solid fa-mobile-screen-button text-emerald-500 text-xl mt-1 mr-4"></i>
                               <div>
                                   <h3 className="font-semibold text-gray-800">{t('contact_page.info.phone_title')}</h3>
                                   <a href="tel:015678710511" className="text-gray-600 hover:text-emerald-600">015678710511</a>
                               </div>
                           </div>
                        </div>
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
          <ContactPageContent />
        </I18nextProvider>
      </Suspense>
    </React.StrictMode>
  );
}