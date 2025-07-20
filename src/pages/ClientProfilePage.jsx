import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ClientProfilePage = () => {
  const { companyId } = useParams();
  const { t } = useTranslation();

  // Beispiel: Daten direkt aus den Übersetzungen für inviajes laden
  // In einer echten App würden diese Daten von einer API kommen
  const companyData = t(`companies.${companyId}`, { returnObjects: true });

  if (!companyData || !companyData.slogan) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>{t('client_profile.not_found')}</h1>
        <button onClick={() => window.history.back()} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {t('client_profile.go_home')}
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '0 20px', border: '1px solid #eee', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>{companyData.slogan}</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#666', marginBottom: '30px' }}>{companyData.tagline}</p>

      {/* Tabs für die Unternehmensdetails */}
      <div style={{ display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
        <div style={tabStyle}>{t('client_profile.tabs.about')}</div>
        <div style={tabStyle}>{t('client_profile.tabs.services')}</div>
        <div style={tabStyle}>{t('client_profile.tabs.tours')}</div> {/* Spezifisch für Inviajes */}
        <div style={tabStyle}>{t('client_profile.tabs.contact')}</div>
        <div style={tabStyle}>{t('client_profile.tabs.map')}</div>
      </div>

      {/* Inhalt basierend auf den Tabs (hier vereinfacht nur "Über uns") */}
      <section style={{ marginBottom: '30px' }}>
        <h2>{t('client_profile.tabs.about')}</h2>
        <p>{companyData.details?.about}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('client_profile.tabs.services')}</h2>
        <p>{companyData.details?.services}</p>
        {companyId === 'inviajes' && companyData.details?.strength1 && (
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><strong>{t('client_profile.our_strength')}:</strong></li>
                <li>- {companyData.details.strength1}</li>
                <li>- {companyData.details.strength2}</li>
                <li>- {companyData.details.strength3}</li>
                <li>- {companyData.details.strength4}</li>
                <li>- {companyData.details.strength5}</li>
                <li>- {companyData.details.strength6}</li>
            </ul>
        )}
      </section>

      {companyId === 'inviajes' && companyData.tours && (
        <section style={{ marginBottom: '30px' }}>
          <h2>{t('client_profile.tabs.tours')}</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>{companyData.tours.tour1}</li>
            <li>{companyData.tours.tour2}</li>
            <li>{companyData.tours.tour3}</li>
            <li>{companyData.tours.tour4}</li>
          </ul>
        </section>
      )}

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('client_profile.business_data')}</h2>
        <p><strong>{t('client_profile.founded')}:</strong> {/* Datum aus Daten */}</p>
        <p><strong>{t('client_profile.employees')}:</strong> {/* Anzahl aus Daten */}</p>
        <p><strong>{t('client_profile.countries_active')}:</strong> {t('countries.international')}</p> {/* Beispiel */}
        <p><strong>{t('client_profile.partners')}:</strong> {/* Partnerliste */}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('client_profile.contact_info')}</h2>
        <p><strong>{t('contact.email')}:</strong> info@inviajes.net</p> {/* Beispiel */}
        <p><strong>{t('contact.phone')}:</strong> +0178 8338 735</p> {/* Beispiel */}
        <p>
            <a href="https://www.inviajes.net" target="_blank" rel="noopener noreferrer">
                {t('client_profile.visit_website')}
            </a>
        </p>
      </section>

      <section style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2>{t('client_profile.socials')}</h2>
        <p>{t('social_media.description')}</p>
        {/* Hier könnten Social Media Icons/Links sein */}
      </section>

      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <button onClick={() => window.history.back()} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Zurück
        </button>
      </div>
    </div>
  );
};

const tabStyle = {
  padding: '10px 15px',
  cursor: 'pointer',
  border: '1px solid transparent',
  borderBottom: 'none',
  marginRight: '5px',
  backgroundColor: '#f0f0f0',
  borderRadius: '5px 5px 0 0',
  fontWeight: 'bold',
};

export default ClientProfilePage;
