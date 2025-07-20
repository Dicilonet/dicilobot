
import React, { Suspense, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useTranslation, I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CATEGORIES_DATA } from './constants';
import { UsersIcon, UserIcon, BriefcaseIcon, LoadingSpinnerIcon } from './components/icons';

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

const CheckIcon = () => <i className="fa-solid fa-check text-emerald-500 mr-3 flex-shrink-0"></i>;

const WelcomeCard: React.FC<{ icon: React.ReactNode; titleKey: string; descKey: string; }> = ({ icon, titleKey, descKey }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center h-full flex flex-col">
            <div className="text-emerald-600 inline-block mb-4 text-4xl">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex-grow">{t(titleKey)}</h3>
            <p className="text-gray-600 text-sm">{t(descKey)}</p>
        </div>
    );
};

const CurrencyConverter: React.FC = () => {
    const { t } = useTranslation();
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const currencies = [
      { value: "USD", label: "US-Dollar" }, { value: "MXN", label: "Mexikanischer Peso" },
      { value: "BRL", label: "Brasilianischer Real" }, { value: "ARS", label: "Argentinischer Peso" },
      { value: "COP", label: "Kolumbianischer Peso" }, { value: "PEN", label: "Peruanischer Sol" },
      { value: "CLP", label: "Chilenischer Peso" }, { value: "UYU", label: "Uruguayischer Peso" },
      { value: "PYG", label: "Paraguayischer Guaraní" }, { value: "NIO", label: "Nicaraguanischer Córdoba" },
      { value: "CUP", label: "Kubanischer Peso" }, { value: "DOP", label: "Dominikanischer Peso" },
      { value: "SVC", label: "Salvadorianischer Colón" }, { value: "BSD", label: "Bahama-Dollar" },
      { value: "HTG", label: "Haitianischer Gourde" }, { value: "HNL", label: "Honduranische Lempira" },
      { value: "JMD", label: "Jamaikanischer Dollar" }, { value: "XCD", label: "Ostkaribischer Dollar" },
      { value: "INR", label: "Indische Rupie" }, { value: "CAD", label: "Kanadischer Dollar" },
      { value: "AUD", label: "Australischer Dollar" }, { value: "GBP", label: "Britisches Pfund" },
      { value: "DKK", label: "Dänische Krone" }, { value: "CHF", label: "Schweizer Franken" },
      { value: "JPY", label: "Japanischer Yen" }, { value: "CNY", label: "Chinesischer Yuan" },
      { value: "KRW", label: "Südkoreanischer Won" }, { value: "SGD", label: "Singapur-Dollar" },
      { value: "HKD", label: "Hongkong-Dollar" }, { value: "MYR", label: "Malaysischer Ringgit" },
      { value: "THB", label: "Thailändischer Baht" }, { value: "IDR", label: "Indonesische Rupie" },
      { value: "NZD", label: "Neuseeland-Dollar" }, { value: "PHP", label: "Philippinischer Peso" },
      { value: "SAR", label: "Saudi-Riyal" }, { value: "AED", label: "VAE-Dirham" },
      { value: "QAR", label: "Katar-Riyal" }, { value: "ZAR", label: "Südafrikanischer Rand" },
      { value: "EGP", label: "Ägyptisches Pfund" }, { value: "TND", label: "Tunesischer Dinar" },
      { value: "NGN", label: "Nigerianischer Naira" }, { value: "KES", label: "Kenianischer Schilling" },
      { value: "GHS", label: "Ghanaischer Cedi" }, { value: "MAD", label: "Marokkanischer Dirham" },
      { value: "ILS", label: "Israelischer Schekel" }, { value: "TRY", label: "Türkische Lira" },
      { value: "RUB", label: "Russischer Rubel" }, { value: "CZK", label: "Tschechische Krone" },
      { value: "PLN", label: "Polnischer Zloty" }, { value: "SEK", label: "Schwedische Krone" },
      { value: "NOK", label: "Norwegische Krone" }, { value: "HUF", label: "Ungarischer Forint" },
      { value: "VND", label: "Vietnamesischer Dong" },
    ];
    
    const convertCurrency = async () => {
        if (!amount) {
            alert(t('pricing_page.converter.please_enter_amount'));
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/EUR`);
            if (!response.ok) throw new Error('API error');
            const data = await response.json();
            const rate = data.rates[currency];
            const convertedAmount = (Number(amount) * rate).toFixed(2);
            setResult(`${amount} EUR = ${convertedAmount} ${currency}`);
        } catch (err) {
            setError(t('pricing_page.converter.error'));
            console.error("Fehler beim Abrufen der Daten:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">{t('pricing_page.converter.title')}</h3>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={t('pricing_page.converter.amount_placeholder')} className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"/>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white focus:ring-emerald-500 focus:border-emerald-500">
                {currencies.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <button onClick={convertCurrency} disabled={isLoading} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-md hover:bg-emerald-700 transition disabled:bg-gray-400 flex justify-center items-center">
                {isLoading ? <LoadingSpinnerIcon/> : t('pricing_page.converter.button')}
            </button>
            <div className="mt-4 text-center font-semibold text-lg h-6">
                {error && <p className="text-red-500">{error}</p>}
                {result && <p className="text-emerald-700">{result}</p>}
            </div>
        </div>
    );
};

const PricingPlanCard: React.FC<{ planKey: string, isRecommended?: boolean }> = ({ planKey, isRecommended }) => {
    const { t } = useTranslation();
    const planData = t(`pricing_page.plans.${planKey}`, { returnObjects: true });

    if (typeof planData !== 'object' || planData === null || !('title' in planData)) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center min-h-[400px]">
          <LoadingSpinnerIcon className="h-8 w-8 text-emerald-500" />
        </div>
      );
    }
    
    const plan = planData as { title: string, price: string, period: string, best_choice?: string, features: string[], cta: string };
    
    return (
        <div className={`bg-white rounded-xl shadow-lg p-6 flex flex-col h-full relative transform transition-transform hover:-translate-y-2 ${isRecommended ? 'border-2 border-emerald-500' : 'border-2 border-transparent'}`}>
            {isRecommended && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 text-sm font-bold rounded-full shadow-lg">{plan.best_choice}</div>}
            <div className="text-center mb-6 pt-4">
                <h3 className="text-2xl font-bold text-gray-800">{plan.title}</h3>
                <p className="text-5xl font-extrabold text-emerald-600 my-4">{plan.price}<span className="text-base font-medium text-gray-500">{plan.period}</span></p>
            </div>
            <ul className="space-y-3 text-gray-600 flex-grow">
                {(plan.features || []).map((feature, index) => (
                    <li key={index} className="flex items-start"><CheckIcon /><span>{feature}</span></li>
                ))}
            </ul>
            <a href="./contact.html" className="mt-8 block w-full text-center bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-700 transition">{plan.cta}</a>
        </div>
    );
};

const TestimonialCard: React.FC<{ testimonialKey: string, imageUrl: string }> = ({ testimonialKey, imageUrl }) => {
    const { t } = useTranslation();
    const testimonial = t(`pricing_page.testimonials.${testimonialKey}`, { returnObjects: true }) as { quote: string, name: string, role: string };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col">
            <img src={imageUrl} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto -mt-12 border-4 border-white shadow-md"/>
            <div className="flex-grow flex flex-col justify-center">
              <p className="text-gray-600 italic mt-4 mb-4 text-center">"{testimonial.quote}"</p>
            </div>
            <div>
              <p className="font-bold text-center text-emerald-700">{testimonial.name}</p>
              <p className="text-sm text-gray-500 text-center">{testimonial.role}</p>
            </div>
        </div>
    );
};

const FAQItem: React.FC<{ faqKey: string }> = ({ faqKey }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const faq = t(`pricing_page.faq.${faqKey}`, { returnObjects: true }) as { q: string, a: string };

    return (
        <div className="border-b">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-gray-50">
                <span className="font-semibold text-gray-800">{faq.q}</span>
                <i className={`fa-solid fa-plus transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}></i>
            </button>
             {isOpen && (
                <div className="overflow-hidden">
                    <div className="p-4 bg-gray-50 text-gray-700 animate-fade-in">
                        <p>{faq.a}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const PricingPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header categories={CATEGORIES_DATA} />
            <main className="flex-grow">
                {/* Hero */}
                <section className="relative bg-cover bg-center text-white py-24 md:py-32" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')"}}>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold">{t('pricing_page.hero_title')}</h1>
                    </div>
                </section>
                
                {/* Welcome Cards */}
                <section className="py-16 sm:py-24 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <WelcomeCard icon={<UsersIcon />} titleKey="pricing_page.welcome.club_title" descKey="pricing_page.welcome.club_desc" />
                            <WelcomeCard icon={<UserIcon />} titleKey="pricing_page.welcome.buyers_title" descKey="pricing_page.welcome.buyers_desc" />
                            <WelcomeCard icon={<BriefcaseIcon />} titleKey="pricing_page.welcome.entrepreneurs_title" descKey="pricing_page.welcome.entrepreneurs_desc" />
                        </div>
                    </div>
                </section>
                
                {/* Plans and Converter Section */}
                <section className="py-16 sm:py-24 bg-white">
                    <div className="container mx-auto px-4">
                         <div className="text-center max-w-4xl mx-auto mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t('pricing_page.plans_title')}</h2>
                             <div className="mt-4 text-gray-600 space-y-4">
                                <p>{t('pricing_page.plans_desc1')}</p>
                                <p>{t('pricing_page.plans_desc2')}</p>
                                <p>{t('pricing_page.plans_desc3')}</p>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
                            <div className="lg:sticky lg:top-24">
                                <CurrencyConverter/>
                                <p className="mt-6 text-gray-600 text-sm">{t('pricing_page.converter.desc')}</p>
                            </div>
                            <div>
                               <p className="font-semibold text-gray-700 mb-4">{t('pricing_page.plans_cta')}</p>
                               <div className="grid sm:grid-cols-2 gap-8">
                                  <PricingPlanCard planKey="private" />
                                  <PricingPlanCard planKey="donor" />
                                  <PricingPlanCard planKey="retailer" />
                                  <PricingPlanCard planKey="wholesaler" isRecommended />
                               </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Testimonials */}
                <section className="py-16 sm:py-24 bg-gray-50 -mt-12">
                     <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900">{t('pricing_page.testimonials.title')}</h2>
                        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">{t('pricing_page.testimonials.subtitle')}</p>
                        <div className="mt-20 grid md:grid-cols-3 gap-y-16 md:gap-8">
                            <TestimonialCard testimonialKey="carla" imageUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            <TestimonialCard testimonialKey="tomas" imageUrl="https://images.unsplash.com/photo-1624298357597-fd92f750a494?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            <TestimonialCard testimonialKey="lucia" imageUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </div>
                </section>
                
                {/* FAQ */}
                <section className="py-16 sm:py-24 bg-white">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8">{t('pricing_page.faq.title')}</h2>
                        <div className="bg-white rounded-lg shadow-sm border">
                           <FAQItem faqKey="q1" />
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section id="contact-cta" className="bg-emerald-700">
                    <div className="container mx-auto px-4 py-16 text-center text-white">
                        <h2 className="text-3xl font-bold">{t('pricing_page.final_cta.title')}</h2>
                        <p className="mt-2 mb-6 max-w-2xl mx-auto text-emerald-100">{t('pricing_page.final_cta.subtitle')}</p>
                        <a href="./contact.html" className="bg-white text-emerald-700 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-emerald-50 transition transform hover:scale-105">{t('pricing_page.final_cta.button')}</a>
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
          <PricingPage />
        </I18nextProvider>
      </Suspense>
    </React.StrictMode>
  );
}
