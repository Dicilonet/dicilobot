
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Category } from '../types';
import { CloseIcon, ChevronDownIcon, CategoryIcons } from './icons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSelectCategory?: (categoryKey: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, categories, onSelectCategory }) => {
  const { t } = useTranslation();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform ease-in-out duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 id="mobile-menu-title" className="text-xl font-bold text-gray-800">{t('nav.menu')}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-emerald-600 hover:bg-gray-100"
            aria-label={t('nav.close_menu')}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-2 border-b">
             <a href="./#reasons" onClick={onClose} className="block px-4 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">{t('nav.benefits')}</a>
             <a href="./#directory" onClick={onClose} className="block px-4 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">{t('nav.directory')}</a>
             <a href="./prices.html" onClick={onClose} className="block px-4 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">{t('nav.pricing', 'Preise')}</a>
          </nav>

          <div className="p-4">
              <button 
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} 
                  className="w-full flex justify-between items-center px-4 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                  aria-expanded={isCategoriesOpen}
              >
                  <span>{t('nav.categories')}</span>
                  <ChevronDownIcon className={`h-5 w-5 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoriesOpen && (
                  <div className="pl-4 border-l-2 border-emerald-500 ml-4 mt-2 space-y-1 animate-fade-in">
                      {categories.map(category => (
                          <a 
                              key={category.nameKey} 
                              href={`./?category=${category.nameKey}#directory`}
                              onClick={(e) => {
                                  e.preventDefault();
                                  if (onSelectCategory) {
                                      onSelectCategory(category.nameKey);
                                  }
                                  onClose();
                              }}
                              className="flex items-center gap-3 px-4 py-2 rounded-md text-base text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                          >
                              <span className="w-5 text-center text-emerald-600">{CategoryIcons[category.iconKey]}</span>
                              <span>{t(category.nameKey)}</span>
                          </a>
                      ))}
                  </div>
              )}
          </div>
        </div>

        <div className="p-4 border-t space-y-3">
             <a href="./register.html" className="block text-center w-full bg-emerald-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">{t('nav.register')}</a>
             <button className="w-full font-semibold text-emerald-600 border border-emerald-600 py-3 px-5 rounded-lg hover:bg-emerald-50 transition">{t('nav.login')}</button>
        </div>
      </div>
    </div>
  );
};
