import React from 'react';
import { useTranslation } from 'react-i18next';

const DirectoryPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>{t('directory.title')}</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>{t('directory.subtitle')}</p>

      <section style={{ marginBottom: '40px', border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
        <h3>{t('directory.browse_by_category')}</h3>
        {/* Such- und Filterfelder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="search-companies">{t('directory.search_label')}:</label>
            <input
              type="text"
              id="search-companies"
              placeholder={t('directory.search_placeholder')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label htmlFor="filter-country">{t('directory.country_label')}:</label>
            <select id="filter-country" style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="">{t('directory.all_countries')}</option>
              {Object.keys(t('countries', { returnObjects: true })).map(key => (
                  <option key={key} value={key}>{t(`countries.${key}`)}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-category">{t('directory.category_label')}:</label>
            <select id="filter-category" style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="">{t('directory.all_categories')}</option>
              {Object.keys(t('categories', { returnObjects: true })).map(key => (
                  <option key={key} value={key}>{t(`categories.${key}`)}</option>
              ))}
            </select>
          </div>
          {/* Unterkategorie wird komplexer, hier nur ein Platzhalter */}
          <div>
            <label htmlFor="filter-subcategory">{t('directory.subcategory_label')}:</label>
            <select id="filter-subcategory" style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="">{t('directory.all_subcategories')}</option>
              {/* Dynamische Subkategorien basierend auf der ausgewählten Hauptkategorie */}
            </select>
          </div>
          <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {t('directory.search_button')}
          </button>
        </div>
      </section>

      <section>
        <h2>{t('directory.top_companies')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {/* Beispiel-Unternehmen aus den Übersetzungsdaten */}
          {Object.keys(t('companies', { returnObjects: true })).map(companyKey => (
            <div key={companyKey} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <h3>{t(`companies.${companyKey}.slogan`)}</h3>
              <p>{t(`companies.${companyKey}.tagline`)}</p>
              {companyKey === 'inviajes' && (
                  <button onClick={() => window.location.href = '/company/inviajes'}
                          style={{ padding: '8px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
                    Mehr erfahren
                  </button>
              )}
            </div>
          ))}
        </div>
        {/* Meldung, wenn keine Unternehmen gefunden wurden (simuliert) */}
        {/* <p style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>{t('directory.no_companies_found')}</p> */}
      </section>
    </div>
  );
};

export default DirectoryPage;
