import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    base: '', 

    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, '.'),
      },
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          // Asegúrate de que TODOS estos archivos .html existen en la RAÍZ del proyecto
          // y que cada uno apunta a su respectivo .tsx de entrada (ej. ./index.tsx)
          main: resolve(__dirname, 'index.html'),
          prices: resolve(__dirname, 'prices.html'),
          client: resolve(__dirname, 'client.html'),
          register: resolve(__dirname, 'register.html'),
          imprint: resolve(__dirname, 'imprint.html'),
          privacy: resolve(__dirname, 'privacy.html'),
          contact: resolve(__dirname, 'contact.html'),
          // Añade aquí si tienes un archivo inviajes-de.html en la raíz
          // 'inviajes-de': resolve(__dirname, 'inviajes-de.html'), 
        }
      }
    },

    server: {
      fs: {
        allow: ['.']
      }
    }
  };
});