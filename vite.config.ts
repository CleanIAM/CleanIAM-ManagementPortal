import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert()],
  server: {
    port: 3001,
    proxy: {}
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
