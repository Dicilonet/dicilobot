
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchIcon, DiciBotIcon } from './icons';

interface HeroProps {
  onSearch: (query: string) => void;
}


export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  const [localQuery, setLocalQuery] = useState('');

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(20, 20, 30, 0.7), rgba(20, 20, 30, 0.7)), url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1966&auto=format&fit=crop')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  return (
    <section id="hero" style={heroStyle} className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center text-white text-center py-12">
      <div className="container mx-auto px-4 z-10">
        <h1 className="text-6xl md:text-8xl font-thin tracking-wider mb-4" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
          DICILO
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }}>
          {t('hero.slogan')}
        </p>
        
        <div className="mt-10 max-w-3xl mx-auto">
           <form onSubmit={handleSubmit} className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg border border-white/30">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    className="block w-full pl-14 pr-14 py-4 text-lg border-2 border-transparent bg-white/90 placeholder-gray-500 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    placeholder={t('directory.search_placeholder_simple')}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                     <DiciBotIcon className="w-8 h-8 text-emerald-600" aria-label={t('dicibot.title', 'Búsqueda Inteligente')} />
                  </div>
                </div>
                 <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        type="submit"
                        className="flex items-center justify-center bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-emerald-500 transition-all transform hover:scale-105 w-full sm:w-auto"
                    >
                        <SearchIcon className="h-5 w-5 mr-2" />
                        {t('directory.search_button')}
                    </button>
                    <a
                        href="./register.html"
                        className="flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/50 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white hover:text-emerald-700 transition-all transform hover:scale-105 w-full sm:w-auto text-center"
                    >
                        {t('directory.register_button')}
                    </a>
                </div>
            </form>
        </div>
      </div>
    </section>
  );
};