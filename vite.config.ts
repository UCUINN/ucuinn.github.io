import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import type { PluginOption } from 'vite';
import { reactClickToComponent } from 'vite-plugin-react-click-to-component';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

const reloadTranslations = (): PluginOption => ({
  name: 'reload-translation-files',
  configureServer(server) {
    const localesDir = `${server.config.root}/public/locales`;
    server.watcher.add(localesDir);
    server.watcher.on('change', (filePath) => {
      if (filePath.includes('public/locales') && filePath.endsWith('.json')) {
        server.config.logger.info(`translation updated: ${filePath}`);
        server.ws.send({ type: 'full-reload' });
      }
    });
  },
});

export default defineConfig({
  base: '/',
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]
        ]
      }
    }),
    reactClickToComponent(),
    reloadTranslations(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption,
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'img/*.png', 'img/*.svg'],
      manifest: {
        name: 'UCU INN - Guest Rooms',
        short_name: 'UCU INN',
        description: 'Guest Rooms at Ukrainian Catholic University',
        theme_color: '#6241f5',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': './src',
      '@components': './src/components',
      '@containers': './src/containers',
      '@utils': './src/utils',
    },
  },
  build: {
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            // Framer Motion - heavy animation library
            if (id.includes('framer-motion')) {
              return 'framer-vendor';
            }
            // i18next translation
            if (id.includes('i18next')) {
              return 'i18n-vendor';
            }
            // Swiper carousel
            if (id.includes('swiper')) {
              return 'swiper-vendor';
            }
            // Lightbox
            if (id.includes('yet-another-react-lightbox')) {
              return 'lightbox-vendor';
            }
            // Lucide icons
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            return 'vendor';
          }
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) {
            return `assets/img/[name]-[hash][extname]`;
          }
          if (/\.(css)$/.test(name)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 2048,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    reportCompressedSize: true,
    cssCodeSplit: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    watch: {
      usePolling: true, // Needed for WSL/Docker
      interval: 100,
      binaryInterval: 300,
    },
    host: true, // Listen on all addresses
  },
});