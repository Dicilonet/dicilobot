import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPage = () => {
  const { t } = useTranslation();

  const renderSectionContent = (contentKey) => {
    const content = t(contentKey, { returnObjects: true });
    if (Array.isArray(content)) {
      return content.map((paragraph, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
      ));
    }
    return <p dangerouslySetInnerHTML={{ __html: content }}></p>;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>{t('privacy_page.title')}</h1>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('privacy_page.section1.title')}</h2>
        {renderSectionContent('privacy_page.section1.content')}
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('privacy_page.section2.title')}</h2>
        {renderSectionContent('privacy_page.section2.content')}
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('privacy_page.section3.title')}</h2>
        {renderSectionContent('privacy_page.section3.content')}
        <p>
          <strong>{t('privacy_page.section3.content.8')}</strong>{" "} {/* Umsatzsteuer-ID */}
          <a href="https://www.mittwald.de/datenschutz" target="_blank" rel="noopener noreferrer">
            https://www.mittwald.de/datenschutz
          </a>
          .
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>{t('privacy_page.section4.title')}</h2>
        {renderSectionContent('privacy_page.section4.content')}
      </section>

      {/* Die Section 5 für Social Media ist nur im DE-Text enthalten, hier ist eine generische Einbindung */}
      {t('privacy_page.section5.title', {defaultValue: ''}) && (
        <section style={{ marginBottom: '30px' }}>
          <h2>{t('privacy_page.section5.title')}</h2>
          {renderSectionContent('privacy_page.section5.content')}
        </section>
      )}

    </div>
  );
};

export default PrivacyPage;
