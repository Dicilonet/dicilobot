
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuIcon, ChevronDownIcon, CategoryIcons } from './icons';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Category } from '../types';

interface HeaderProps {
    categories: Category[];
    onSelectCategory?: (categoryKey: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ categories, onSelectCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const categoryMenuTimeoutRef = useRef<number | null>(null);
  
  const [onlineUsers, setOnlineUsers] = useState(Math.floor(Math.random() * 99) + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prevCount => {
        const fluctuation = Math.floor(Math.random() * 5) - 2; // Smaller fluctuation for a smaller range
        let newCount = prevCount + fluctuation;
        if (newCount > 99) return 99;
        if (newCount < 1) return 1;
        return newCount;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleCategoryMenuEnter = () => {
    if (categoryMenuTimeoutRef.current) {
      clearTimeout(categoryMenuTimeoutRef.current);
    }
    setCategoryMenuOpen(true);
  };

  const handleCategoryMenuLeave = () => {
    categoryMenuTimeoutRef.current = window.setTimeout(() => {
      setCategoryMenuOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (categoryMenuTimeoutRef.current) {
        clearTimeout(categoryMenuTimeoutRef.current);
      }
    };
  }, []);


  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <a href="./" className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                <span>Dicilo<span className="text-emerald-600">.</span>net</span>
              </a>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <div 
                className="relative" 
                onMouseEnter={handleCategoryMenuEnter} 
                onMouseLeave={handleCategoryMenuLeave}
              >
                  <button 
                      onClick={() => setCategoryMenuOpen(prev => !prev)}
                      className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors font-medium"
                      aria-haspopup="true"
                      aria-expanded={isCategoryMenuOpen}
                  >
                      {t('nav.categories')}
                      <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isCategoryMenuOpen && (
                      <div className="absolute -left-16 mt-2 w-[520px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
                          <div className="py-2 px-1 max-h-96 overflow-y-auto grid grid-cols-2 gap-1">
                              {categories.map(category => (
                                  <a
                                      key={category.nameKey}
                                      href={`./?category=${category.nameKey}#directory`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (onSelectCategory) {
                                            onSelectCategory(category.nameKey);
                                        }
                                        setCategoryMenuOpen(false);
                                      }}
                                      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-md transition-colors"
                                  >
                                      <span className="w-5 text-center text-emerald-600">{CategoryIcons[category.iconKey]}</span>
                                      <span>{t(category.nameKey)}</span>
                                  </a>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
              <a href="./#reasons" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">{t('nav.benefits')}</a>
              <a href="./#directory" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">{t('nav.directory')}</a>
              <a href="./prices.html" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">{t('nav.pricing', 'Preise')}</a>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
               <div className="text-sm text-gray-500 flex items-center">
                 <span className="relative flex h-2 w-2 mr-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
                 {t('nav.online_users', { count: onlineUsers })}
               </div>
               <LanguageSwitcher />
               <button className="font-semibold text-emerald-600 hover:text-emerald-700 transition">{t('nav.login')}</button>
               <a href="./register.html" className="bg-emerald-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">{t('nav.register')}</a>
            </div>
            <div className="md:hidden flex items-center gap-2">
               <div className="text-xs text-gray-500 flex items-center">
                 <span className="relative flex h-2 w-2 mr-1.5">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
                 {t('nav.online_users', { count: onlineUsers })}
               </div>
              <LanguageSwitcher />
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                aria-label={t('nav.open_menu')}
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} categories={categories} onSelectCategory={onSelectCategory} />
    </>
  );
};
