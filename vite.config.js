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
        "name": "Three of Cups",
        "short_name": "3OC",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "lang": "en",
        "scope": "/",
        "description": "3oC intends to become a global digital network and ecosystem fueled by our core values. A global digital trust system for people to use before they meet in person with someone they have met online. The more types of users and types of reasons, the better the ecosystem will work for everyone.",
        "theme_color": "#ffffff",
        "icons": [
          {
            "src": "/assets/icons/192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/assets/icons/512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "/assets/icons/192x192-maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/assets/icons/512x512-maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/assets/icons/512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          }
        ],
        "id": "com.app.threeofcup",
        "dir": "ltr",
        "orientation": "portrait",
        "categories": [
          "social"
        ],
        "display_override": [
          "standalone",
          "window-controls-overlay"
        ],
        "iarc_rating_id": "18",
        "prefer_related_applications": false
      }
    })
  ]
});
