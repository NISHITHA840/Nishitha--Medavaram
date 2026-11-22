import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { app } from './server/app.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sqlite-api-plugin',
      configureServer(server) {
        server.middlewares.use(app);
      }
    }
  ],
  server: {
    port: 3000,
    open: false,
  },
});
