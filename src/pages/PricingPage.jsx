import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PricingPage = () => {
  const { t } = useTranslation();
  const [euroAmount, setEuroAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [currencyError, setCurrencyError] = useState('');

  const handleConvert = () => {
    if (!euroAmount) {
      setCurrencyError(t('pricing_page.converter.please_enter_amount'));
      return;
    }
    setCurrencyError('');
    // Hier würde eine echte API-Anfrage für den Wechselkurs stattfinden
    // Für dieses Beispiel simulieren wir eine Umrechnung
    const rate = 1.08; // Beispiel: 1 Euro = 1.08 USD
    setConvertedAmount((parseFloat(euroAmount) * rate).toFixed(2) + ' USD');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>{t('pricing_page.hero_title')}</h1>

      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', padding: '20px', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center' }}>
            <h3>{t('pricing_page.welcome.club_title')}</h3>
            <p>{t('pricing_page.welcome.club_desc')}</p>
          </div>
          <div style={{ flex: '1 1 300px', padding: '20px', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center' }}>
            <h3>{t('pricing_page.welcome.buyers_title')}</h3>
            <p>{t('pricing_page.welcome.buyers_desc')}</p>
          </div>
          <div style={{ flex: '1 1 300px', padding: '20px', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center' }}>
            <h3>{t('pricing_page.welcome.entrepreneurs_title')}</h3>
            <p>{t('pricing_page.welcome.entrepreneurs_desc')}</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center' }}>{t('pricing_page.plans_title')}</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>{t('pricing_page.plans_desc1')}</p>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>{t('pricing_page.plans_desc2')}</p>
        <p style={{ textAlign: 'center', marginBottom: '40px' }}>{t('pricing_page.plans_desc3')}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {/* Privatkunde Plan */}
          <div style={planCardStyle}>
            <h3>{t('pricing_page.plans.private.title')}</h3>
            <p style={priceStyle}>{t('pricing_page.plans.private.price')}</p>
            <p style={periodStyle}>{t('pricing_page.plans.private.period')}</p>
            <ul style={featureListStyle}>
              {t('pricing_page.plans.private.features', { returnObjects: true }).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button style={ctaButtonStyle}>{t('pricing_page.plans.private.cta')}</button>
          </div>

          {/* Einzelhändler Plan */}
          <div style={planCardStyle}>
            <h3>{t('pricing_page.plans.retailer.title')}</h3>
            <p style={priceStyle}>{t('pricing_page.plans.retailer.price')}</p>
            <p style={periodStyle}>{t('pricing_page.plans.retailer.period')}</p>
            <ul style={featureListStyle}>
              {t('pricing_page.plans.retailer.features', { returnObjects: true }).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button style={ctaButtonStyle}>{t('pricing_page.plans.retailer.cta')}</button>
          </div>

          {/* Großhändler Plan */}
          <div style={{...planCardStyle, border: '2px solid #007bff', boxShadow: '0 0 15px rgba(0,123,255,0.2)'}}>
            <p style={{ background: '#007bff', color: '#fff', padding: '5px 10px', borderRadius: '5px', position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)' }}>
              {t('pricing_page.plans.wholesaler.best_choice')}
            </p>
            <h3>{t('pricing_page.plans.wholesaler.title')}</h3>
            <p style={priceStyle}>{t('pricing_page.plans.wholesaler.price')}</p>
            <p style={periodStyle}>{t('pricing_page.plans.wholesaler.period')}</p>
            <ul style={featureListStyle}>
              {t('pricing_page.plans.wholesaler.features', { returnObjects: true }).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button style={{...ctaButtonStyle, backgroundColor: '#007bff'}}>{t('pricing_page.plans.wholesaler.cta')}</button>
          </div>

          {/* Spender Plan */}
          <div style={planCardStyle}>
            <h3>{t('pricing_page.plans.donor.title')}</h3>
            <p style={priceStyle}>{t('pricing_page.plans.donor.price')}</p>
            <p style={periodStyle}>{t('pricing_page.plans.donor.period')}</p>
            <ul style={featureListStyle}>
              {t('pricing_page.plans.donor.features', { returnObjects: true }).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button style={ctaButtonStyle}>{t('pricing_page.plans.donor.cta')}</button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '1.1em' }}>
          {t('pricing_page.plans_cta')}
        </p>
      </section>

      <section style={{ marginBottom: '40px', textAlign: 'center', border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
        <h2>{t('pricing_page.converter.title')}</h2>
        <p>{t('pricing_page.converter.desc')}</p>
        <input
          type="number"
          value={euroAmount}
          onChange={(e) => setEuroAmount(e.target.value)}
          placeholder={t('pricing_page.converter.amount_placeholder')}
          style={{ padding: '8px', margin: '10px 0', width: '200px' }}
        />
        <button
          onClick={handleConvert}
          style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
        >
          {t('pricing_page.converter.button')}
        </button>
        {currencyError && <p style={{ color: 'red', marginTop: '10px' }}>{currencyError}</p>}
        {convertedAmount && <p style={{ marginTop: '10px', fontSize: '1.1em' }}>{convertedAmount}</p>}
      </section>

      <section style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2>{t('pricing_page.testimonials.title')}</h2>
        <p>{t('pricing_page.testimonials.subtitle')}</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap', marginTop: '30px' }}>
          {/* Testimonial Carla */}
          <div style={testimonialCardStyle}>
            <p>"{t('pricing_page.testimonials.carla.quote')}"</p>
            <strong>{t('pricing_page.testimonials.carla.name')}</strong>
            <p style={{ fontSize: '0.9em', color: '#666' }}>{t('pricing_page.testimonials.carla.role')}</p>
          </div>
          {/* Testimonial Tomás */}
          <div style={testimonialCardStyle}>
            <p>"{t('pricing_page.testimonials.tomas.quote')}"</p>
            <strong>{t('pricing_page.testimonials.tomas.name')}</strong>
            <p style={{ fontSize: '0.9em', color: '#666' }}>{t('pricing_page.testimonials.tomas.role')}</p>
          </div>
          {/* Testimonial Lucía */}
          <div style={testimonialCardStyle}>
            <p>"{t('pricing_page.testimonials.lucia.quote')}"</p>
            <strong>{t('pricing_page.testimonials.lucia.name')}</strong>
            <p style={{ fontSize: '0.9em', color: '#666' }}>{t('pricing_page.testimonials.lucia.role')}</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '40px', border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
        <h2>{t('pricing_page.faq.title')}</h2>
        <h4>{t('pricing_page.faq.q1.q')}</h4>
        <p>{t('pricing_page.faq.q1.a')}</p>
      </section>

      <section style={{ textAlign: 'center', padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2>{t('pricing_page.final_cta.title')}</h2>
        <p style={{ marginBottom: '20px' }}>{t('pricing_page.final_cta.subtitle')}</p>
        <button
          onClick={() => window.location.href = '/contact'} // Oder eine andere Logik für den Kontakt
          style={{ padding: '12px 25px', fontSize: '1.1em', backgroundColor: '#ffc107', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {t('pricing_page.final_cta.button')}
        </button>
      </section>
    </div>
  );
};

// Einige grundlegende Inline-Styles für Wiederverwendbarkeit
const planCardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '30px',
  textAlign: 'center',
  width: 'calc(25% - 20px)', // Passt für 4 Spalten auf größeren Bildschirmen
  minWidth: '280px', // Mindestbreite für kleinere Bildschirme
  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  position: 'relative',
  marginBottom: '20px', // Abstand für kleinere Bildschirme
};

const priceStyle = {
  fontSize: '2.5em',
  fontWeight: 'bold',
  color: '#007bff',
  margin: '10px 0',
};

const periodStyle = {
  color: '#666',
  fontSize: '0.9em',
  marginBottom: '20px',
};

const featureListStyle = {
  listStyle: 'none',
  padding: 0,
  textAlign: 'left',
  marginBottom: '30px',
};

const ctaButtonStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1em',
};

const testimonialCardStyle = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #dee2e6',
  borderRadius: '10px',
  padding: '20px',
  width: 'calc(33% - 20px)', // Für 3 Spalten
  minWidth: '280px',
  marginBottom: '20px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  fontStyle: 'italic',
};


export default PricingPage;
