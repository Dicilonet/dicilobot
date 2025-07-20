import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <section id="hero" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2>{t('hero.slogan')}</h2>
        <Link to="/directory">
          <button style={{ padding: '10px 20px', fontSize: '1.2em', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {t('hero.cta_button')}
          </button>
        </Link>
      </section>

      <section id="key-features" style={{ marginBottom: '40px' }}>
        <h3>{t('key_features.title1')}</h3>
        <p>{t('key_features.desc1')}</p>
        <h3>{t('key_features.title2')}</h3>
        <p>{t('key_features.desc2')}</p>
      </section>

      <section id="reasons" style={{ marginBottom: '40px' }}>
        <h2>{t('reasons.title')}</h2>
        <p>{t('reasons.subtitle')}</p>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <div style={{ flex: 1, marginRight: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
            <h4>{t('reasons.for_companies.title')}</h4>
            <ul>
              <li><strong>{t('reasons.for_companies.point1_title')}</strong> {t('reasons.for_companies.point1_desc')}</li>
              <li><strong>{t('reasons.for_companies.point2_title')}</strong> {t('reasons.for_companies.point2_desc')}</li>
              <li><strong>{t('reasons.for_companies.point3_title')}</strong> {t('reasons.for_companies.point3_desc')}</li>
            </ul>
          </div>
          <div style={{ flex: 1, border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
            <h4>{t('reasons.for_users.title')}</h4>
            <ul>
              <li><strong>{t('reasons.for_users.point1_title')}</strong> {t('reasons.for_users.point1_desc')}</li>
              <li><strong>{t('reasons.for_users.point2_title')}</strong> {t('reasons.for_users.point2_desc')}</li>
              <li><strong>{t('reasons.for_users.point3_title')}</strong> {t('reasons.for_users.point3_desc')}</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="community" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2>{t('community.title')}</h2>
        <p>{t('community.subtitle')}</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <div style={{ flex: 1, marginRight: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                <h4>{t('community.for_companies_title')}</h4>
                <p>{t('community.for_companies_desc')}</p>
            </div>
            <div style={{ flex: 1, border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                <h4>{t('community.for_users_title')}</h4>
                <p>{t('community.for_users_desc')}</p>
            </div>
        </div>
        <p style={{ marginTop: '20px' }}>{t('community.cta_join')}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px' }}>
            <Link to="/register">
                <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {t('community.register_company')}
                </button>
            </Link>
            <Link to="/register">
                <button style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {t('community.register_customer')}
                </button>
            </Link>
            <button style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {t('community.register_rep')}
            </button>
        </div>
      </section>

      {/* Füge hier weitere Abschnitte von der Startseite hinzu, z.B. aus der 'directory' oder 'footer' Sektion */}

      <footer style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' }}>
        <h3>{t('footer.about.title')}</h3>
        <p>{t('footer.about.desc')}</p>
        <p>{t('footer.rights')}</p>
      </footer>
    </div>
  );
};

export default HomePage;
