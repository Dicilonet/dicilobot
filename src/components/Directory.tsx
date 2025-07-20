
import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TOP_COMPANIES_DATA } from '../constants';
import { CompanyCard } from './CompanyCard';
import { WhatsAppIcon, TelegramIcon, InstagramIcon, FacebookIcon, TikTokIcon, LinkedInIcon, YouTubeIcon, XTwitterIcon, TwitchIcon, PinterestIcon } from './icons';

interface DirectoryProps {
  categoryFromHeader?: string;
  searchQuery: string;
}

export const Directory: React.FC<DirectoryProps> = ({ categoryFromHeader, searchQuery }) => {
  const { t, i18n } = useTranslation();
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  useEffect(() => {
    if (categoryFromHeader) {
        setCategoryFilter(categoryFromHeader);
    }
  }, [categoryFromHeader]);

  const filteredCompanies = useMemo(() => {
    return TOP_COMPANIES_DATA.filter(company => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const matchesSearch = searchQuery 
        ? company.name.toLowerCase().includes(lowerCaseQuery) || 
          t(company.sloganKey).toLowerCase().includes(lowerCaseQuery) ||
          t(company.categoryKey).toLowerCase().includes(lowerCaseQuery) ||
          t(company.subcategoryKey).toLowerCase().includes(lowerCaseQuery) ||
          company.city.toLowerCase().includes(lowerCaseQuery)
        : true;
        
      const matchesCategory = categoryFilter ? company.categoryKey === categoryFilter : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter, i18n.language, t]);
  
  const socials = [
    { name: 'WhatsApp', icon: WhatsAppIcon, url: 'https://chat.whatsapp.com/J3q1Jj9wQ4v8Z2Y2Z7K5Jq' },
    { name: 'Telegram', icon: TelegramIcon, url: 'https://t.me/dicilo' },
    { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/dicilo.net_' },
    { name: 'Facebook', icon: FacebookIcon, url: 'https://www.facebook.com/dicilo.net' },
    { name: 'TikTok', icon: TikTokIcon, url: 'https://www.tiktok.com/@dicilo.net' },
    { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://www.linkedin.com/company/dicilo-net' },
    { name: 'YouTube', icon: YouTubeIcon, url: 'https://www.youtube.com/@dicilo' },
    { name: 'X', icon: XTwitterIcon, url: 'https://x.com/dicilonet' },
    { name: 'Twitch', icon: TwitchIcon, url: 'https://www.twitch.tv/dicilo_net' },
    { name: 'Pinterest', icon: PinterestIcon, url: 'https://www.pinterest.de/dicilo/' },
  ];
  
  const title = searchQuery 
    ? t('directory.search_results_for', { query: searchQuery })
    : categoryFilter
    ? `${t('directory.companies_in')} ${t(categoryFilter)}`
    : t('directory.top_companies');


  return (
    <div className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t('directory.title')}</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{t('directory.subtitle')}</p>
        </div>
        
        {/* Companies Grid */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{title}</h3>

           {/* Social Media Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-12 max-w-4xl mx-auto">
            <h4 className="text-xl font-bold text-center text-emerald-600 mb-2">{t('social_media.title')}</h4>
            <p className="text-gray-600 text-center mb-6">{t('social_media.description')}</p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {socials.map(social => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">
                  <social.icon className="h-10 w-10" />
                </a>
              ))}
            </div>
          </div>
          
          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompanies.map(company => (
                <CompanyCard key={company.name} company={company} />
              ))}
            </div>
          ) : (
             <div className="text-center py-12 px-6 bg-white rounded-lg shadow-md">
                <p className="text-lg text-gray-500">{t('directory.no_companies_found')}</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
