

import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Company } from '../types';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { t } = useTranslation();
  return (
    <a href={`./client.html?name=${encodeURIComponent(company.name)}`} className="block h-full group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transform group-hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
        <div className="flex-grow p-6">
          <div className="flex items-start gap-4">
              <img className="w-16 h-16 rounded-full object-cover" src={company.logo} alt={`${company.name} logo`} />
              <div className="flex-1">
                  <div className="uppercase tracking-wide text-sm text-emerald-600 font-semibold">{t(company.categoryKey)} &middot; {t(company.subcategoryKey)}</div>
                  <h3 className="block mt-1 text-lg leading-tight font-bold text-black">{company.name}</h3>
                  <p className="mt-2 text-gray-500 text-sm">{t(company.sloganKey)}</p>
              </div>
          </div>
        </div>
         <div className="px-6 pb-4 bg-gray-50">
             <p className="text-gray-600 text-xs">
                  {company.city? `${company.city}, ` : ''}{t(company.countryKey)}
              </p>
        </div>
      </div>
    </a>
  );
};