import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
  console.error('Erreur globale capturée:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesse rejetée non gérée:', event.reason)
})

// Fonction pour initialiser l'application
function initializeApp() {
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    throw new Error('Élément root non trouvé')
  }

  // Amélioration de l'accessibilité
  document.documentElement.lang = 'fr'
  
  // Métadonnées pour l'optimisation
  const metaDescription = document.createElement('meta')
  metaDescription.name = 'description'
  metaDescription.content = 'Application React moderne avec Vite - Compteur interactif'
  document.head.appendChild(metaDescription)

  const metaViewport = document.querySelector('meta[name="viewport"]')
  if (metaViewport) {
    metaViewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover'
  }

  // Création de la racine React
  const root = createRoot(rootElement)
  
  // Rendu de l'application
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

// Initialisation lorsque le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  initializeApp()
}