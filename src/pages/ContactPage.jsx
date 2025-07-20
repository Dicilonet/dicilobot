import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Nachricht gesendet! (Dies ist ein Platzhalter)');
    // Hier würde die Logik zum Senden des Formulars an ein Backend erfolgen
  };

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{t('contact_page.title')}</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>{t('contact_page.subtitle')}</p>

      <section style={{ marginBottom: '40px', border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
        <h2>{t('contact_page.form.title')}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="name">{t('contact_page.form.name')}:</label>
            <input type="text" id="name" name="name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div>
            <label htmlFor="email">{t('contact_page.form.email')}:</label>
            <input type="email" id="email" name="email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div>
            <label htmlFor="message">{t('contact_page.form.message')}:</label>
            <textarea id="message" name="message" rows="5" required style={{ width: '100%', padding: '8px', marginTop: '5px' }}></textarea>
          </div>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {t('contact_page.form.submit')}
          </button>
        </form>
      </section>

      <section style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
        <h2>{t('contact_page.info.title')}</h2>
        <p><strong>{t('contact_page.info.address_title')}:</strong> {t('imprint_page.section1.line3')}, {t('imprint_page.section1.line4')} {t('imprint_page.section1.line2')}</p>
        <p><strong>{t('contact_page.info.email_title')}:</strong> {t('imprint_page.section2.line2')}</p>
        <p><strong>{t('contact_page.info.phone_title')}:</strong> {t('imprint_page.section2.line1')}</p>
      </section>
    </div>
  );
};

export default ContactPage;
