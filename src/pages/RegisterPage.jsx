import React from 'react';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registrierung abgeschlossen! (Dies ist ein Platzhalter)');
    // Hier würde die Logik zum Senden des Formulars an ein Backend erfolgen
  };

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{t('register_page.title')}</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>{t('register_page.subtitle')}</p>

      <section style={{ marginBottom: '40px', border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
        <h2>{t('register_page.form_title')}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="company-name">{t('register_page.company_name')}:</label>
            <input type="text" id="company-name" name="companyName" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div>
            <label htmlFor="company-email">{t('register_page.company_email')}:</label>
            <input type="email" id="company-email" name="companyEmail" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div>
            <label htmlFor="country">{t('register_page.country')}:</label>
            <select id="country" name="country" required style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="">{t('directory.select_option')}</option>
              {Object.keys(t('countries', { returnObjects: true })).map(key => (
                  <option key={key} value={key}>{t(`countries.${key}`)}</option>
              ))}
            </select>
          </div>
          <div>
            <h3>{t('register_page.category_title')}</h3>
            <p style={{ fontSize: '0.9em', color: '#666' }}>{t('register_page.category_subtitle')}</p>
            <select id="category" name="category" required style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="">{t('directory.select_option')}</option>
              {Object.keys(t('categories', { returnObjects: true })).map(key => (
                  <option key={key} value={key}>{t(`categories.${key}`)}</option>
              ))}
            </select>
          </div>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {t('register_page.cta')}
          </button>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
