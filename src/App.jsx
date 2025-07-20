import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DirectoryPage from './pages/DirectoryPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import ImprintPage from './pages/ImprintPage';
import PrivacyPage from './pages/PrivacyPage';
import RegisterPage from './pages/RegisterPage';
import DiciBot from './components/DiciBot'; // Importiere den DiciBot
import ClientProfilePage from './pages/ClientProfilePage'; // Für die Inviajes-Profilseite

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <Header /> {/* Dein Header mit Navigation */}

      <div style={{ padding: '20px' }}>
        {/* Sprachwechsler - Beispielhaft hier platziert */}
        <button onClick={() => changeLanguage('de')}>Deutsch</button>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('es')}>Español</button>
        <button onClick={() => changeLanguage('it')}>Italiano</button>
        <button onClick={() => changeLanguage('pt')}>Português</button>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/imprint" element={<ImprintPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Beispiel für eine dynamische Route für Unternehmensprofile */}
        <Route path="/company/:companyId" element={<ClientProfilePage />} />
        {/* Füge hier weitere Routen hinzu */}
      </Routes>

      {/* DiciBot wird auf jeder Seite angezeigt */}
      <DiciBot />

      {/* Optional: Footer-Komponente hinzufügen */}
      {/* <footer>...</footer> */}
    </Router>
  );
}

export default App;
