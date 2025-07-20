import React from 'react';
import { useTranslation } from 'react-i18next';

const ImprintPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>{t('imprint_page.title')}</h1>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('imprint_page.section1.title')}</h2>
        <p>{t('imprint_page.section1.line1')}</p>
        <p>{t('imprint_page.section1.line2')}</p>
        <p>{t('imprint_page.section1.line3')}</p>
        <p>{t('imprint_page.section1.line4')}</p>
        <p>{t('imprint_page.section1.line5')}</p>
        <p>{t('imprint_page.section1.line6')}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('imprint_page.section2.title')}</h2>
        <p>{t('imprint_page.section2.line1')}</p>
        <p>{t('imprint_page.section2.line2')}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('imprint_page.section3.title')}</h2>
        <p>{t('imprint_page.section3.line1')}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('imprint_page.section4.title')}</h2>
        <p>{t('imprint_page.section4.line1')}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('imprint_page.section5.title')}</h2>
        <p>
          {t('imprint_page.section5.line1_part1')}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            {t('imprint_page.section5.line1_part2')}
          </a>
          {t('imprint_page.section5.line1_part3')}
        </p>
        <p>{t('imprint_page.section5.line2')}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('imprint_page.section6.title')}</h2>
        <p>{t('imprint_page.section6.line1')}</p>
      </section>
    </div>
  );
};

export default ImprintPage;
