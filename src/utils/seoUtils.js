// src/utils/seoUtils.js - Utilitaires SEO pour le blog
import { BLOG_CONFIG } from '../config/blogConfig';

/**
 * Met à jour le titre de la page
 * @param {string} title - Nouveau titre
 * @param {string} suffix - Suffixe à ajouter (optionnel)
 */
export const updatePageTitle = (title, suffix = BLOG_CONFIG.seo.titleSuffix) => {
  document.title = suffix ? `${title}${BLOG_CONFIG.seo.titleSeparator}${suffix}` : title;
};

/**
 * Met à jour ou crée une balise meta
 * @param {string} name - Nom de la balise meta
 * @param {string} content - Contenu de la balise
 * @param {string} property - Propriété (pour Open Graph)
 */
export const updateMetaTag = (name, content, property = null) => {
  const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
  let meta = document.querySelector(selector);
  
  if (!meta) {
    meta = document.createElement('meta');
    if (property) {
      meta.setAttribute('property', property);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
};

/**
 * Supprime une balise meta
 * @param {string} name - Nom de la balise à supprimer
 * @param {string} property - Propriété (pour Open Graph)
 */
export const removeMetaTag = (name, property = null) => {
  const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
  const meta = document.querySelector(selector);
  if (meta) {
    meta.remove();
  }
};

/**
 * Met à jour l'URL canonique
 * @param {string} url - URL canonique
 */
export const updateCanonicalUrl = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]');
  
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  
  canonical.setAttribute('href', url);
};

/**
 * Ajoute des données structurées (JSON-LD)
 * @param {object} data - Données structurées
 * @param {string} id - ID unique pour le script
 */
export const addStructuredData = (data, id = 'structured-data') => {
  // Supprimer le script existant s'il y en a un
  const existingScript = document.querySelector(`script[data-id="${id}"]`);
  if (existingScript) {
    existingScript.remove();
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  script.setAttribute('data-id', id);
  document.head.appendChild(script);
};

/**
 * Génère les métadonnées SEO pour un article de blog
 * @param {object} post - Article de blog
 * @param {object} options - Options supplémentaires
 * @returns {object} Métadonnées SEO complètes
 */
export const generatePostSEO = (post, options = {}) => {
  const {
    baseUrl = window.location.origin,
    defaultImage = BLOG_CONFIG.images.defaultFeaturedImage
  } = options;
  
  const url = `${baseUrl}/blog/${post.slug}`;
  const title = `${post.title}${BLOG_CONFIG.seo.titleSeparator}${BLOG_CONFIG.seo.titleSuffix}`;
  const description = post.excerpt || BLOG_CONFIG.seo.metaDescription;
  const image = post.image || defaultImage;
  const publishedTime = new Date(post.publishedAt).toISOString();
  const modifiedTime = new Date(post.updatedAt || post.publishedAt).toISOString();
  
  // Données structurées Article
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": description,
    "image": image,
    "url": url,
    "datePublished": publishedTime,
    "dateModified": modifiedTime,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "description": post.author.bio,
      "image": post.author.avatar
    },
    "publisher": {
      "@type": "Organization",
      "name": "AJI App",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 200,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": post.category.name,
    "keywords": post.tags.join(', '),
    "wordCount": post.content ? post.content.split(/\s+/).length : 0,
    "timeRequired": `PT${post.readTime}M`,
    "inLanguage": "en-US"
  };
  
  return {
    title,
    description,
    canonical: url,
    openGraph: {
      title: post.title,
      description,
      url,
      type: 'article',
      image,
      siteName: 'AJI Blog',
      locale: BLOG_CONFIG.seo.openGraphLocale,
      article: {
        publishedTime,
        modifiedTime,
        author: post.author.name,
        section: post.category.name,
        tags: post.tags
      }
    },
    twitter: {
      card: 'summary_large_image',
      site: BLOG_CONFIG.seo.twitterHandle,
      creator: post.author.social?.twitter ? `@${post.author.social.twitter}` : BLOG_CONFIG.seo.twitterHandle,
      title: post.title,
      description,
      image
    },
    structuredData
  };
};

/**
 * Génère les métadonnées SEO pour une page de catégorie
 * @param {object} category - Catégorie
 * @param {array} posts - Posts de la catégorie
 * @param {object} options - Options supplémentaires
 * @returns {object} Métadonnées SEO
 */
export const generateCategorySEO = (category, posts = [], options = {}) => {
  const { baseUrl = window.location.origin } = options;
  
  const url = `${baseUrl}/blog/category/${category.id}`;
  const title = `${category.name} Articles${BLOG_CONFIG.seo.titleSeparator}${BLOG_CONFIG.seo.titleSuffix}`;
  const description = `Explore ${category.name.toLowerCase()} articles about Morocco. ${category.description} - ${posts.length} articles available.`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} Articles`,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "AJI App"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": posts.length,
      "itemListElement": posts.slice(0, 10).map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": post.title,
          "url": `${baseUrl}/blog/${post.slug}`,
          "datePublished": post.publishedAt,
          "author": {
            "@type": "Person",
            "name": post.author.name
          }
        }
      }))
    }
  };
  
  return {
    title,
    description,
    canonical: url,
    openGraph: {
      title: `${category.name} Articles`,
      description,
      url,
      type: 'website',
      siteName: 'AJI Blog'
    },
    twitter: {
      card: 'summary',
      site: BLOG_CONFIG.seo.twitterHandle,
      title: `${category.name} Articles`,
      description
    },
    structuredData
  };
};

/**
 * Génère les métadonnées SEO pour la page d'accueil du blog
 * @param {object} options - Options supplémentaires
 * @returns {object} Métadonnées SEO
 */
export const generateBlogHomeSEO = (options = {}) => {
  const { 
    baseUrl = window.location.origin,
    featuredPosts = [],
    totalPosts = 0 
  } = options;
  
  const url = `${baseUrl}/blog`;
  const title = `${BLOG_CONFIG.title}${BLOG_CONFIG.seo.titleSeparator}${BLOG_CONFIG.seo.titleSuffix}`;
  const description = BLOG_CONFIG.seo.metaDescription;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": BLOG_CONFIG.title,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "AJI App",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": totalPosts,
      "itemListElement": featuredPosts.slice(0, 5).map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": post.title,
          "url": `${baseUrl}/blog/${post.slug}`,
          "datePublished": post.publishedAt,
          "author": {
            "@type": "Person",
            "name": post.author.name
          },
          "image": post.image
        }
      }))
    }
  };
  
  return {
    title,
    description,
    canonical: url,
    openGraph: {
      title: BLOG_CONFIG.title,
      description,
      url,
      type: 'website',
      siteName: 'AJI Blog'
    },
    twitter: {
      card: 'summary_large_image',
      site: BLOG_CONFIG.seo.twitterHandle,
      title: BLOG_CONFIG.title,
      description
    },
    structuredData
  };
};

/**
 * Applique les métadonnées SEO à la page
 * @param {object} seoData - Données SEO à appliquer
 */
export const applySEO = (seoData) => {
  const {
    title,
    description,
    canonical,
    openGraph = {},
    twitter = {},
    structuredData
  } = seoData;
  
  // Titre de la page
  if (title) {
    updatePageTitle(title, '');
  }
  
  // Description
  if (description) {
    updateMetaTag('description', description);
  }
  
  // URL canonique
  if (canonical) {
    updateCanonicalUrl(canonical);
  }
  
  // Open Graph
  Object.entries(openGraph).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      // Pour les objets imbriqués comme article
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        if (Array.isArray(nestedValue)) {
          // Pour les tableaux comme tags
          nestedValue.forEach(item => {
            updateMetaTag('', item, `${key}:${nestedKey}`);
          });
        } else {
          updateMetaTag('', nestedValue, `${key}:${nestedKey}`);
        }
      });
    } else {
      updateMetaTag('', value, `og:${key}`);
    }
  });
  
  // Twitter Cards
  Object.entries(twitter).forEach(([key, value]) => {
    updateMetaTag('', value, `twitter:${key}`);
  });
  
  // Données structurées
  if (structuredData) {
    addStructuredData(structuredData);
  }
};

/**
 * Nettoie les métadonnées SEO (à utiliser lors du changement de page)
 */
export const cleanupSEO = () => {
  // Supprimer les métadonnées Open Graph et Twitter
  const metaSelectors = [
    'meta[property^="og:"]',
    'meta[property^="twitter:"]',
    'meta[property^="article:"]',
    'script[type="application/ld+json"]'
  ];
  
  metaSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.remove();
    });
  });
};

/**
 * Génère un sitemap XML (côté client - pour référence)
 * @param {array} posts - Liste des posts
 * @param {string} baseUrl - URL de base
 * @returns {string} XML du sitemap
 */
export const generateSitemap = (posts, baseUrl = window.location.origin) => {
  const urls = [
    { loc: `${baseUrl}/blog`, priority: '1.0', changefreq: 'daily' },
    ...BLOG_CONFIG.categories?.map(cat => ({
      loc: `${baseUrl}/blog/category/${cat.id}`,
      priority: '0.8',
      changefreq: 'weekly'
    })) || [],
    ...posts.map(post => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: new Date(post.updatedAt || post.publishedAt).toISOString().split('T')[0],
      priority: '0.7',
      changefreq: 'monthly'
    }))
  ];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
};

/**
 * Génère un flux RSS (côté client - pour référence)
 * @param {array} posts - Liste des posts
 * @param {string} baseUrl - URL de base
 * @returns {string} XML du flux RSS
 */
export const generateRSSFeed = (posts, baseUrl = window.location.origin) => {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${BLOG_CONFIG.title}</title>
    <description>${BLOG_CONFIG.description}</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.slice(0, 20).map(post => `<item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${post.author.email} (${post.author.name})</author>
      <category>${post.category.name}</category>
      ${post.image ? `<enclosure url="${post.image}" type="image/jpeg"/>` : ''}
    </item>`).join('\n    ')}
  </channel>
</rss>`;
  
  return rss;
};

export default {
  updatePageTitle,
  updateMetaTag,
  removeMetaTag,
  updateCanonicalUrl,
  addStructuredData,
  generatePostSEO,
  generateCategorySEO,
  generateBlogHomeSEO,
  applySEO,
  cleanupSEO,
  generateSitemap,
  generateRSSFeed
};