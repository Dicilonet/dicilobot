
import React, { Suspense, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useTranslation, I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

import { TOP_COMPANIES_DATA } from './constants';
import type { Company, CompanyTour } from './types';
import { LoadingSpinnerIcon } from './components/icons';

// Initialize i18next
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

const FaIcon: React.FC<{ icon: string, className?: string }> = ({ icon, className }) => (
    <i className={`${icon} ${className}`}></i>
);

const socialIconMap: { [key: string]: string } = {
    facebook: "fa-brands fa-facebook-f",
    instagram: "fa-brands fa-instagram",
    whatsapp: "fa-brands fa-whatsapp",
    linkedin: "fa-brands fa-linkedin-in",
    x: "fa-brands fa-x-twitter",
    youtube: "fa-brands fa-youtube",
    tiktok: "fa-brands fa-tiktok",
    pinterest: "fa-brands fa-pinterest",
    telegram: "fa-brands fa-telegram",
    twitch: "fa-brands fa-twitch",
};

const ToursGrid: React.FC<{ tours: CompanyTour[], visitWebsiteUrl?: string }> = ({ tours, visitWebsiteUrl }) => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {tours.map((tour, index) => (
                    <div key={index} className="tour-box text-center">
                        <a href={tour.url} target="_blank" rel="noopener noreferrer">
                            <div className="tour-image-container">
                                <img src={tour.image} alt={t(tour.descriptionKey)} />
                            </div>
                        </a>
                        <p className="font-semibold text-sm">{t(tour.descriptionKey)}</p>
                    </div>
                ))}
            </div>
            {visitWebsiteUrl && (
                 <div className="text-center">
                    <a href={visitWebsiteUrl} className="inline-block bg-emerald-600 text-white font-bold py-2 px-6 rounded-md hover:bg-emerald-700 transition" target="_blank" rel="noopener noreferrer">
                        {t('client_profile.visit_website')}
                    </a>
                </div>
            )}
        </div>
    );
};

const ClientProfile: React.FC<{ company: Company }> = ({ company }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('tours');
    const website = company.contact.find(c => c.type === 'website')?.value;

    const tabs = [
        { id: 'tours', label: t('client_profile.tabs.tours'), available: !!company.tours && company.tours.length > 0 },
        { id: 'about', label: t('client_profile.tabs.about'), available: !!company.details?.aboutKey },
        { id: 'services', label: t('client_profile.tabs.services'), available: !!company.details?.servicesKey },
        { id: 'map', label: t('client_profile.tabs.map'), available: !!company.details?.mapEmbedUrl },
    ].filter(tab => tab.available);

     useEffect(() => {
        if (tabs.length > 0) {
            setActiveTab(tabs[0].id);
        }
    }, [company.name]);


    return (
        <div className="bg-white min-h-screen">
            <header className="bg-gray-800 text-white shadow-lg">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img src={company.logo} alt={`${company.name} Logo`} className="h-12 w-12 rounded-full border-2 border-emerald-400" />
                        <div>
                            <h1 className="text-2xl font-bold">{company.name}</h1>
                            <p className="text-emerald-300 text-sm">{t(company.taglineKey)}</p>
                        </div>
                    </div>
                    <a href="./" className="text-sm font-semibold hover:text-emerald-300 transition-colors">&larr; {t('client_profile.go_home')}</a>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left Column: Tabs */}
                    <div className="lg:col-span-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            {tabs.length > 0 && (
                                <div className="border-b border-gray-200 mb-6">
                                    <nav className="-mb-px flex space-x-6 overflow-x-auto">
                                        {tabs.map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            <div>
                                {activeTab === 'tours' && company.tours && <ToursGrid tours={company.tours} visitWebsiteUrl={website ? `//${website}` : undefined} />}
                                {activeTab === 'about' && company.details?.aboutKey && <p className="text-gray-700 leading-relaxed" style={{textAlign: 'justify'}}>{t(company.details.aboutKey)}</p>}
                                {activeTab === 'services' && company.details?.servicesKey && <p className="text-gray-700 leading-relaxed" style={{textAlign: 'justify'}}>{t(company.details.servicesKey)}</p>}
                                {activeTab === 'map' && company.details?.mapEmbedUrl && (
                                     <div>
                                        <iframe width="100%" height="450" src={company.details.mapEmbedUrl} style={{ border: '1px solid black' }} loading="lazy" title={`${company.name} Map`}></iframe>
                                        <small><a href={company.details.mapEmbedUrl.replace('/embed.html', '/?').replace('&marker=', '#map=19/')} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">{t('client_profile.show_larger_map')}</a></small>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Strengths, Contact, Socials */}
                    <div className="lg:col-span-4 space-y-8">
                        {company.details?.strengthsKeys && company.details.strengthsKeys.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('client_profile.our_strength')}</h3>
                                <ul className="space-y-4">
                                    {company.details.strengthsKeys.map(key => (
                                        <li key={key} className="flex items-start">
                                            <FaIcon icon="fa-solid fa-check-circle" className="text-emerald-500 mt-1 mr-3"/>
                                            <span className="text-gray-700 text-sm" style={{textAlign: 'justify'}}>{t(key)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {company.contact && company.contact.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('client_profile.contact_info')}</h3>
                                <ul className="space-y-4">
                                    {company.contact.map(item => {
                                        const isEmail = item.type === 'email';
                                        const isPhone = item.type === 'phone';
                                        const href = isEmail ? `mailto:${item.value}` : isPhone ? `tel:${item.value}` : item.type === 'website' ? `//${item.value}` : '#';
                                        const linkProps = item.type === 'website' ? { target: '_blank', rel: 'noopener noreferrer' } : {};
                                        const isClickable = isEmail || isPhone || item.type === 'website';
                                        
                                        return (
                                            <li key={item.labelKey} className="flex items-start">
                                                <FaIcon icon={item.icon} className="text-emerald-500 mt-1 mr-4 w-5 text-center"/>
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-500">{t(item.labelKey)}</p>
                                                    {isClickable ? (
                                                        <a href={href} {...linkProps} className="text-gray-800 hover:text-emerald-600 break-all">{item.value}</a>
                                                    ) : (
                                                        <p className="text-gray-800 break-all">{item.value}</p>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                        
                        {company.socials && company.socials.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('client_profile.socials')}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {company.socials.map(social => {
                                        const iconClass = socialIconMap[social.platform];
                                        return (
                                            <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-emerald-500 hover:text-white transition-colors duration-300">
                                                {iconClass && <FaIcon icon={iconClass} className="text-xl" />}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};


const App: React.FC = () => {
    const [company, setCompany] = useState<Company | null | undefined>(undefined);
    const { t } = useTranslation();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const companyName = urlParams.get('name');
        if (companyName) {
            const companyData = TOP_COMPANIES_DATA.find(c => c.name === companyName);
            setCompany(companyData || null);
        } else {
            setCompany(null);
        }
    }, []);

    if (company === undefined) {
        return (
            <div className="fixed inset-0 bg-white flex justify-center items-center">
                <LoadingSpinnerIcon className="h-12 w-12 text-emerald-600"/>
            </div>
        );
    }
    
    if (company === null) {
        return (
             <div className="fixed inset-0 bg-gray-100 flex flex-col justify-center items-center text-center p-4">
                <h1 className="text-3xl font-bold text-gray-800">404</h1>
                <p className="text-lg text-gray-600 mt-2">{t('client_profile.not_found')}</p>
                 <a href="./" className="mt-6 bg-emerald-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">{t('client_profile.go_home')}</a>
            </div>
        )
    }

    return <ClientProfile company={company} />;
}


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
          <App />
        </I18nextProvider>
      </Suspense>
    </React.StrictMode>
  );
}
