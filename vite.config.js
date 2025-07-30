import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Configuration Vite optimisée
export default defineConfig({
  plugins: [
    react({
      // Configuration React avec Fast Refresh optimisé
      fastRefresh: true,
      // Inclure les dépendances React DevTools en développement
      include: "**/*.{jsx,tsx}",
    })
  ],
  
  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true, // Ouvre automatiquement le navigateur
    host: true, // Permet l'accès depuis d'autres appareils sur le réseau
    cors: true,
    hmr: {
      overlay: true // Affiche les erreurs en overlay
    }
  },

  // Configuration du build de production
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true, // Génère les source maps pour le debug
    minify: 'esbuild', // Utilise esbuild pour la minification (plus rapide)
    
    // Optimisation des chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Sépare React dans son propre chunk
          react: ['react', 'react-dom'],
        },
        // Nommage des fichiers optimisé
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    // Optimisation de la taille des chunks
    chunkSizeWarningLimit: 1000,
  },

  // Configuration des alias pour les imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },

  // Optimisation des dépendances
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // Pré-bundle les dépendances pour améliorer les performances
    force: false, // Ne force pas le re-bundling à chaque démarrage
  },

  // Configuration CSS
  css: {
    devSourcemap: true, // Source maps CSS en développement
    preprocessorOptions: {
      // Configuration pour SCSS si vous l'ajoutez plus tard
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },

  // Configuration pour le PWA (si nécessaire)
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },

  // Configuration des variables d'environnement
  envPrefix: 'VITE_',
  
  // Performance et optimisations avancées
  esbuild: {
    // Supprime les console.log en production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },

  // Configuration pour les tests (si vous utilisez Vitest)
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})