// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// mfnews-frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Puedes especificar el puerto si quieres
    open: true // Abre el navegador automáticamente
  },
  optimizeDeps: {
    exclude: ['react-icons'] // <--- ¡Añade esta línea!
  }
});