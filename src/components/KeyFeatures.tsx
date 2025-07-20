
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BuildingOfficeIcon, ClockIcon } from './icons';

export const KeyFeatures: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-4">
                            <div className="p-4 bg-emerald-100 rounded-full">
                                <BuildingOfficeIcon className="h-8 w-8 text-emerald-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('key_features.title1')}</h3>
                        <p className="text-gray-600">{t('key_features.desc1')}</p>
                    </div>
                    <div className="text-center md:text-left">
                         <div className="flex justify-center md:justify-start mb-4">
                            <div className="p-4 bg-emerald-100 rounded-full">
                                <ClockIcon className="h-8 w-8 text-emerald-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('key_features.title2')}</h3>
                        <p className="text-gray-600">{t('key_features.desc2')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
