import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header style={{ background: '#f0f0f0', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
      <h1>Dicilo</h1>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '15px' }}>
          <li>
            <Link to="/">{t('nav.menu')}</Link>
          </li>
          <li>
            <Link to="/benefits">{t('nav.benefits')}</Link>
          </li>
          <li>
            <Link to="/directory">{t('nav.directory')}</Link>
          </li>
          <li>
            <Link to="/pricing">{t('nav.pricing')}</Link>
          </li>
          <li>
            <Link to="/categories">{t('nav.categories')}</Link>
          </li>
          <li>
            <Link to="/login">{t('nav.login')}</Link>
          </li>
          <li>
            <Link to="/register">{t('nav.register')}</Link>
          </li>
          <li>
            <Link to="/contact">{t('footer.links.contact')}</Link>
          </li>
          <li>
            <Link to="/imprint">{t('footer.links.imprint')}</Link>
          </li>
          <li>
            <Link to="/privacy">{t('footer.links.privacy')}</Link>
          </li>
          {/* Beispiel für einen Link zu einem Unternehmensprofil */}
          <li>
            <Link to="/company/inviajes">Inviajes Profil</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
