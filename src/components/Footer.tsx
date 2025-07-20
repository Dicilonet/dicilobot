
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Dicilo */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{t('footer.about.title')}</h3>
            <p className="text-gray-400">
              {t('footer.about.desc')}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.links.title')}</h3>
            <ul className="space-y-2">
              <li><a href="./#reasons" className="text-gray-400 hover:text-white transition">{t('nav.benefits')}</a></li>
              <li><a href="./#directory" className="text-gray-400 hover:text-white transition">{t('nav.directory')}</a></li>
              <li><a href="./prices.html" className="text-gray-400 hover:text-white transition">{t('nav.pricing', 'Preise')}</a></li>
              <li><a href="./contact.html" className="text-gray-400 hover:text-white transition">{t('footer.links.contact', 'Kontakt')}</a></li>
              <li><a href="./imprint.html" className="text-gray-400 hover:text-white transition">{t('footer.links.imprint', 'Impressum')}</a></li>
              <li><a href="./privacy.html" className="text-gray-400 hover:text-white transition">{t('footer.links.privacy', 'Datenschutz')}</a></li>
            </ul>
          </div>

          {/* Join Club */}
          <div>
             <h3 className="text-lg font-semibold mb-4">{t('footer.join.title')}</h3>
             <p className="text-gray-400 mb-4">{t('footer.join.desc')}</p>
             <form className="flex">
                <input type="email" placeholder={t('footer.join.email_placeholder')} className="w-full rounded-l-md border-0 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-emerald-500" />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-r-md transition">{t('footer.join.cta')}</button>
             </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dicilo.net. {t('footer.rights')}</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
             {/* Social links can be added here later */}
          </div>
        </div>
      </div>
    </footer>
  );
};
