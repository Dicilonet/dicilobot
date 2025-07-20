
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Directory } from './components/Directory';
import { Footer } from './components/Footer';
import { KeyFeatures } from './components/KeyFeatures';
import { DiciBot } from './components/DiciBot';
import { CheckCircleIcon, RocketLaunchIcon, UserGroupIcon } from './components/icons';
import { CATEGORIES_DATA } from './constants';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [categoryFromUrl, setCategoryFromUrl] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectCategory = (categoryKey: string) => {
    setCategoryFromUrl(categoryKey);
    setSearchQuery(''); // Reset search when a category is selected from header
    const directoryElement = document.getElementById('directory');
    if (directoryElement) {
      directoryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCategoryFromUrl(''); // Reset category when a new search is performed
    // Slight delay to allow state to update before scrolling
    setTimeout(() => {
        const directoryElement = document.getElementById('directory');
        if (directoryElement) {
            directoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  useEffect(() => {
    // This effect runs once on mount to check for a category in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryKey = urlParams.get('category');
    if (categoryKey) {
      const isValidCategory = CATEGORIES_DATA.some(c => c.nameKey === categoryKey);
      if (isValidCategory) {
        setCategoryFromUrl(categoryKey); // Set state to pass to Directory
        
        // Use a slight delay to ensure the component has rendered before scrolling
        setTimeout(() => {
          const directoryElement = document.getElementById('directory');
          if (directoryElement) {
            directoryElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, []); 


  return (
    <div className="bg-white min-h-screen text-gray-800">
      <Header categories={CATEGORIES_DATA} onSelectCategory={handleSelectCategory} />
      <main>
        <Hero onSearch={handleSearch} />

        <KeyFeatures />
        
        <section id="reasons" className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t('reasons.title')}</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{t('reasons.subtitle')}</p>
            </div>
            <div className="mt-16 grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-emerald-600 mb-4">{t('reasons.for_companies.title')}</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start"><RocketLaunchIcon className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" /><span><strong>{t('reasons.for_companies.point1_title')}</strong> {t('reasons.for_companies.point1_desc')}</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" /><span><strong>{t('reasons.for_companies.point2_title')}</strong> {t('reasons.for_companies.point2_desc')}</span></li>
                  <li className="flex items-start"><UserGroupIcon className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" /><span><strong>{t('reasons.for_companies.point3_title')}</strong> {t('reasons.for_companies.point3_desc')}</span></li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-emerald-600 mb-4">{t('reasons.for_users.title')}</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start"><RocketLaunchIcon className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" /><span><strong>{t('reasons.for_users.point1_title')}</strong> {t('reasons.for_users.point1_desc')}</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" /><span><strong>{t('reasons.for_users.point2_title')}</strong> {t('reasons.for_users.point2_desc')}</span></li>
                  <li className="flex items-start"><UserGroupIcon className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" /><span><strong>{t('reasons.for_users.point3_title')}</strong> {t('reasons.for_users.point3_desc')}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="community" className="py-16 sm:py-24 bg-emerald-700 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold mb-4">{t('community.title')}</h2>
                <div className="max-w-4xl mx-auto space-y-6 text-lg text-emerald-100">
                    <p>{t('community.subtitle')}</p>
                    <div className='text-left space-y-4 mt-6'>
                        <p><strong>{t('community.for_companies_title')}</strong> {t('community.for_companies_desc')}</p>
                        <p><strong>{t('community.for_users_title')}</strong> {t('community.for_users_desc')}</p>
                    </div>
                    <p className='font-semibold'>{t('community.cta_join')}</p>
                </div>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="./register.html" className="bg-white text-emerald-700 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-emerald-50 transition transform hover:scale-105">{t('community.register_company')}</a>
                    <a href="./register.html" className="bg-emerald-800 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-emerald-900 transition transform hover:scale-105">{t('community.register_customer')}</a>
                </div>
                 <p className="mt-8 text-lg font-semibold underline hover:text-emerald-200 cursor-pointer">{t('community.register_rep')}</p>
            </div>
        </section>

        <section id="directory">
          <Directory categoryFromHeader={categoryFromUrl} searchQuery={searchQuery} />
        </section>

      </main>
      <Footer />
      <DiciBot />
    </div>
  );
};

export default App;
