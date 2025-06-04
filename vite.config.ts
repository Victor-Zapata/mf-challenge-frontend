// mfnews-frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Usas SWC, que es genial!

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración de servidor para desarrollo local (no afecta el build de producción)
  server: {
    port: 5173, // Puedes especificar el puerto si quieres
    open: true // Abre el navegador automáticamente
  },
  // Opciones de optimización de dependencias para desarrollo (no afecta el build de producción)
  optimizeDeps: {
    exclude: ['react-icons'] 
  },
  
  // *** CAMBIO CLAVE AQUÍ: Configuración de Build para producción ***
  build: {
    outDir: 'dist', // Este es el directorio donde Vite colocará los archivos construidos (HTML, CSS, JS)
                    // Render usará este directorio para el 'Publish Directory'.
  }
});