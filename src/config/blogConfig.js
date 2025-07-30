// src/config/blogConfig.js - Configuration du blog AJI
export const BLOG_CONFIG = {
  // Informations générales du blog
  title: 'AJI Blog',
  description: 'Your ultimate guide to Morocco travel, culture, and experiences',
  url: 'https://www.ajiapp.com/blog',
  language: 'en',
  
  // Paramètres de pagination
  postsPerPage: 9,
  postsPerPageSearch: 12,
  postsPerPageCategory: 9,
  
  // Paramètres des articles
  excerptLength: 160,
  readingWordsPerMinute: 200,
  
  // Options d'affichage
  showAuthor: true,
  showPublishDate: true,
  showReadTime: true,
  showViews: true,
  showLikes: true,
  showTags: true,
  showCategories: true,
  showFeaturedImage: true,
  showSocialShare: true,
  showRelatedPosts: true,
  showTableOfContents: true,
  showBreadcrumbs: true,
  
  // Paramètres de recherche
  searchMinLength: 2,
  searchDebounceTime: 300,
  searchHighlight: true,
  
  // Paramètres SEO
  seo: {
    titleSeparator: ' - ',
    titleSuffix: 'AJI Blog | Your Guide to Morocco',
    metaDescription: 'Discover Morocco through expert travel guides, cultural insights, and practical tips. Your ultimate resource for exploring Morocco with confidence.',
    keywords: ['Morocco', 'travel', 'guide', 'culture', 'tourism', 'AJI', 'North Africa'],
    author: 'AJI Team',
    twitterHandle: '@ajiapp',
    facebookAppId: '',
    openGraphType: 'website',
    openGraphLocale: 'en_US'
  },
  
  // Paramètres des réseaux sociaux
  social: {
    facebook: 'https://facebook.com/ajiapp',
    twitter: 'https://twitter.com/ajiapp',
    instagram: 'https://instagram.com/ajiapp',
    linkedin: 'https://linkedin.com/company/ajiapp',
    youtube: '',
    pinterest: ''
  },
  
  // Paramètres de la newsletter
  newsletter: {
    enabled: true,
    title: 'Stay Updated',
    description: 'Get the latest travel tips and Morocco insights delivered to your inbox.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    successMessage: 'Successfully subscribed!',
    errorMessage: 'Subscription failed. Please try again.',
    privacyNote: 'No spam, unsubscribe anytime.'
  },
  
  // Paramètres des commentaires (si implémentés)
  comments: {
    enabled: false,
    provider: 'disqus', // 'disqus', 'facebook', 'custom'
    disqusShortname: '',
    facebookAppId: '',
    moderationRequired: true
  },
  
  // Paramètres d'analytics
  analytics: {
    googleAnalyticsId: '',
    facebookPixelId: '',
    hotjarId: '',
    trackScrollDepth: true,
    trackReadTime: true,
    trackSocialShares: true
  },
  
  // Configuration des images
  images: {
    defaultFeaturedImage: '/src/assets/images/blog/default-featured.jpg',
    defaultAuthorAvatar: '/src/assets/images/blog/default-avatar.jpg',
    lazyLoading: true,
    placeholder: 'blur',
    quality: 85,
    formats: ['webp', 'jpg'],
    sizes: {
      thumbnail: { width: 150, height: 150 },
      small: { width: 400, height: 250 },
      medium: { width: 800, height: 450 },
      large: { width: 1200, height: 630 },
      hero: { width: 1920, height: 800 }
    }
  },
  
  // Configuration du cache
  cache: {
    enabled: true,
    duration: 3600, // 1 heure en secondes
    strategy: 'stale-while-revalidate'
  },
  
  // Configuration de l'accessibilité
  accessibility: {
    skipToContent: true,
    focusManagement: true,
    announceRouteChanges: true,
    highContrast: false,
    reducedMotion: false
  },
  
  // Configuration multilingue (future extension)
  i18n: {
    enabled: false,
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ar'],
    dateFormat: {
      en: 'MMMM DD, YYYY',
      fr: 'DD MMMM YYYY',
      ar: 'DD/MM/YYYY'
    }
  },
  
  // Configuration des thèmes
  theme: {
    primaryColor: '#8B181A',
    secondaryColor: '#f8f9fa',
    darkMode: false,
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.125rem'
    }
  }
};

// Paramètres des catégories avec configuration étendue
export const CATEGORY_SETTINGS = {
  'travel-tips': {
    icon: '✈️',
    color: '#8B181A',
    description: 'Essential tips for traveling in Morocco',
    metaKeywords: ['travel tips', 'Morocco advice', 'travel guide'],
    featured: true,
    sortOrder: 1
  },
  'culture': {
    icon: '🏛️',
    color: '#D4AF37',
    description: 'Discover Moroccan culture and traditions',
    metaKeywords: ['Moroccan culture', 'traditions', 'heritage'],
    featured: true,
    sortOrder: 2
  },
  'destinations': {
    icon: '🗺️',
    color: '#2E8B57',
    description: 'Must-visit places in Morocco',
    metaKeywords: ['Morocco destinations', 'places to visit', 'attractions'],
    featured: true,
    sortOrder: 3
  },
  'food': {
    icon: '🍽️',
    color: '#FF6B35',
    description: 'Authentic Moroccan culinary experiences',
    metaKeywords: ['Moroccan food', 'cuisine', 'recipes', 'restaurants'],
    featured: true,
    sortOrder: 4
  },
  'technology': {
    icon: '📱',
    color: '#4A90E2',
    description: 'Technology tips for modern travelers',
    metaKeywords: ['travel tech', 'eSIM', 'apps', 'connectivity'],
    featured: false,
    sortOrder: 5
  }
};

// Configuration des auteurs
export const AUTHOR_SETTINGS = {
  defaultRole: 'Contributor',
  showBio: true,
  showSocial: true,
  showAvatar: true,
  bioLength: 200
};

// Paramètres de validation
export const VALIDATION_RULES = {
  title: {
    minLength: 10,
    maxLength: 100,
    required: true
  },
  excerpt: {
    minLength: 50,
    maxLength: 200,
    required: true
  },
  content: {
    minLength: 500,
    required: true
  },
  tags: {
    minCount: 1,
    maxCount: 10,
    maxLength: 30
  },
  slug: {
    pattern: /^[a-z0-9-]+$/,
    maxLength: 100,
    required: true,
    unique: true
  }
};

// Configuration des filtres de recherche
export const SEARCH_FILTERS = {
  fields: ['title', 'excerpt', 'content', 'tags', 'author.name', 'category.name'],
  weights: {
    title: 3,
    excerpt: 2,
    tags: 2,
    content: 1,
    'author.name': 1,
    'category.name': 1
  },
  fuzzySearch: false,
  stemming: false
};

// Configuration des métadonnées par défaut
export const DEFAULT_META = {
  title: 'AJI Blog - Your Guide to Morocco',
  description: 'Discover Morocco through expert travel guides, cultural insights, and practical tips.',
  image: '/src/assets/images/blog/og-default.jpg',
  type: 'website',
  locale: 'en_US'
};

// Configuration des formats de date
export const DATE_FORMATS = {
  full: 'EEEE, MMMM do, yyyy',
  long: 'MMMM do, yyyy',
  medium: 'MMM d, yyyy',
  short: 'MM/dd/yyyy',
  relative: true // Utilise "2 days ago" au lieu de la date exacte
};

// Configuration des performances
export const PERFORMANCE_CONFIG = {
  lazyLoading: true,
  imageOptimization: true,
  codesplitting: true,
  prefetchLinks: true,
  serviceWorker: false,
  compressionLevel: 9
};

// Configuration de sécurité
export const SECURITY_CONFIG = {
  sanitizeHtml: true,
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'strong', 'em', 'u', 's',
    'a', 'img', 'ul', 'ol', 'li',
    'blockquote', 'code', 'pre',
    'table', 'thead', 'tbody', 'tr', 'td', 'th'
  ],
  allowedAttributes: {
    'a': ['href', 'title', 'target'],
    'img': ['src', 'alt', 'title', 'width', 'height'],
    'blockquote': ['cite']
  },
  csrf: true,
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limite de 100 requêtes par IP
  }
};

// Export par défaut
export default BLOG_CONFIG;