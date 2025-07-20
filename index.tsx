import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './i18n'; // Asegúrate de que i18n.ts está en la raíz o ajusta la ruta
import App from './App.tsx'; // App.tsx está en la raíz

// Renderiza tu aplicación principal en el elemento con id="root"
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading app...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
);