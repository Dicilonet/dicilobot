import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react'; // Importa el plugin de React

// Helper para obtener el __dirname en módulos ES (Vite usa ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..'); // Esto apunta a la raíz del proyecto (donde está vite.config.ts)

export default defineConfig(({ mode }) => {
  // Carga variables de entorno desde el directorio raíz del proyecto
  // 'mode' es 'development' o 'production'
  // '.' significa que busca archivos .env en el directorio actual
  // '' significa que no tiene prefijo para las variables de entorno (ej. API_KEY en lugar de VITE_API_KEY)
  const env = loadEnv(mode, '.', '');

  return {
    // Plugins de Vite
    plugins: [
      react() // Habilita el soporte para React y JSX/TSX
    ],

    // Base URL para el despliegue de tu aplicación.
    // '' (cadena vacía) significa rutas relativas a la raíz del host,
    // ideal para Vercel y URLs limpias.
    base: '', 

    // Define reemplazos de variables globales en el código.
    // Esto es útil para inyectar variables de entorno en el cliente.
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    // Configuración de resolución de módulos
    resolve: {
      alias: {
        // Configura un alias '@' que apunta a la raíz del proyecto.
        // Esto te permite usar importaciones como `@/components/MiComponente`
        '@': resolve(__dirname, '.'),
        // Puedes añadir más alias si necesitas apuntar a carpetas específicas, ej:
        // '@src': resolve(__dirname, 'src'),
        // '@components': resolve(__dirname, 'src/components'),
      },
    },

    // Opciones de construcción (para 'npm run build')
    build: {
      // Directorio de salida para los archivos de construcción
      outDir: 'dist',
      // Directorio para los assets (imágenes, fuentes, etc.)
      assetsDir: 'assets',
      // Opciones avanzadas de Rollup (el bundler subyacente de Vite)
      rollupOptions: {
        // Define los múltiples puntos de entrada HTML de tu aplicación (MPA - Multi-Page Application)
        // Cada entrada corresponde a una página HTML independiente.
        input: {
          main: resolve(__dirname, 'index.html'),
          prices: resolve(__dirname, 'prices.html'),
          client: resolve(__dirname, 'client.html'),
          register: resolve(__dirname, 'register.html'),
          imprint: resolve(__dirname, 'imprint.html'),
          privacy: resolve(__dirname, 'privacy.html'),
          contact: resolve(__dirname, 'contact.html'),
          // Si tienes otros archivos HTML en la raíz, añádelos aquí.
          // Por ejemplo, si tienes 'inviajes-de.html':
          // 'inviajes-de': resolve(__dirname, 'inviajes-de.html'),
        }
      }
    },

    // Opciones para el servidor de desarrollo (para 'npm run dev')
    server: {
      // Permite el acceso al sistema de archivos para el servidor de desarrollo.
      // '.' permite acceder a la raíz del proyecto y sus subdirectorios.
      fs: {
        allow: ['.']
      }
    }
  };
});
