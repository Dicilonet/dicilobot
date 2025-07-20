import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Category } from '../types';
import { CategoryIcons } from './icons';

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onSelect: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, isSelected, onSelect }) => {
  const { t } = useTranslation();
  
  const cardClasses = `
    flex flex-col items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer h-full
    ${isSelected 
      ? 'bg-emerald-600 text-white shadow-lg scale-105' 
      : 'bg-white text-gray-700 hover:shadow-md hover:scale-105'
    }
  `;

  const iconClasses = `h-10 w-10 mb-3 ${isSelected ? 'text-white' : 'text-emerald-600'}`;
  const textClasses = `font-semibold text-center text-sm flex-grow ${isSelected ? 'text-white' : 'text-gray-800'}`;
  const selectClasses = `
    mt-3 w-full text-xs p-1.5 border rounded-md transition
    ${isSelected 
      ? 'bg-white text-gray-800 border-gray-300 focus:ring-emerald-200' 
      : 'bg-gray-50 border-gray-300 focus:ring-emerald-500'
    }
  `;

  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const iconElement = CategoryIcons[category.iconKey] || null;

  return (
    <div className={cardClasses} onClick={onSelect}>
      <div className={iconClasses}>
        {iconElement}
      </div>
      <h3 className={textClasses}>{t(category.nameKey)}</h3>
      <select 
        className={selectClasses} 
        onClick={stopPropagation} 
        onChange={stopPropagation}
        defaultValue=""
      >
        <option value="" disabled>{t('directory.select_option')}</option>
        {category.subcategoriesKeys.map(subKey => (
          <option key={subKey} value={subKey}>{t(subKey)}</option>
        ))}
      </select>
    </div>
  );
};