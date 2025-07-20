import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react'; // <-- ¡Asegúrate de añadir esta línea!

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()], // <-- ¡Añade esto para que Vite sepa que es React!
    base: '', // Para URLs limpias y Vercel. No pongas './'

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
          main: resolve(__dirname, 'index.html'),
          prices: resolve(__dirname, 'prices.html'),
          client: resolve(__dirname, 'client.html'),
          register: resolve(__dirname, 'register.html'),
          imprint: resolve(__dirname, 'imprint.html'),
          privacy: resolve(__dirname, 'privacy.html'),
          contact: resolve(__dirname, 'contact.html'),
          // Asegúrate de añadir aquí todos los demás archivos .html que tengas en la raíz:
          // 'invijajes-de': resolve(__dirname, 'invijajes-de.html'),
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
