import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'My PWA App',
        short_name: 'PWA App',
        description: 'My awesome Progressive Web App!',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/assets/icons/192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/icons/512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/assets/icons/192x192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/assets/icons/512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/assets/icons/512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          }
        ]
      }
    })
  ]
});
