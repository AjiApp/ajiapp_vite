// src/hooks/useBlog.js - Hooks personnalisés pour le blog
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  BLOG_POSTS, 
  BLOG_CATEGORIES, 
  getPostsByCategory,
  getFeaturedPosts,
  getRecentPosts,
  getPostBySlug
} from '../data/blogPosts';
import { 
  filterPostsBySearch, 
  generateBlogSEO,
  getRelatedPosts 
} from '../utils/blogHelpers';
import { BLOG_CONFIG } from '../config/blogConfig';

/**
 * Hook pour gérer les posts du blog avec filtrage et pagination
 * @param {object} options - Options de configuration
 * @returns {object} État et méthodes pour les posts
 */
export const useBlogPosts = (options = {}) => {
  const {
    initialPosts = BLOG_POSTS,
    postsPerPage = BLOG_CONFIG.postsPerPage,
    enableCache = true
  } = options;

  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Paramètres d'URL
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'date';
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Synchroniser la page avec l'URL
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // Filtrer et trier les posts
  const processedPosts = useMemo(() => {
    let processed = [...posts];

    // Appliquer le filtre de recherche
    if (searchQuery) {
      processed = filterPostsBySearch(processed, searchQuery);
    }

    // Appliquer le filtre de catégorie
    if (categoryFilter) {
      processed = processed.filter(post => post.category.id === categoryFilter);
    }

    // Appliquer le tri
    processed.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.views + b.likes) - (a.views + a.likes);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return new Date(b.publishedAt) - new Date(a.publishedAt);
      }
    });

    return processed;
  }, [posts, searchQuery, categoryFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = processedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Méthodes de manipulation
  const updateSearchParams = useCallback((newParams) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Réinitialiser la page lors d'un changement de filtre
    if (newParams.search !== undefined || newParams.category !== undefined || newParams.sort !== undefined) {
      params.delete('page');
    }

    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const setSearch = useCallback((query) => {
    updateSearchParams({ search: query });
  }, [updateSearchParams]);

  const setCategory = useCallback((category) => {
    updateSearchParams({ category });
  }, [updateSearchParams]);

  const setSort = useCallback((sort) => {
    updateSearchParams({ sort });
  }, [updateSearchParams]);

  const setPage = useCallback((page) => {
    updateSearchParams({ page: page > 1 ? page : undefined });
  }, [updateSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    // État
    posts: currentPosts,
    allPosts: processedPosts,
    loading,
    error,
    
    // Pagination
    currentPage,
    totalPages,
    totalPosts: processedPosts.length,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    
    // Filtres actifs
    searchQuery,
    categoryFilter,
    sortBy,
    hasActiveFilters: !!(searchQuery || categoryFilter),
    
    // Méthodes
    setSearch,
    setCategory,
    setSort,
    setPage,
    clearFilters,
    
    // Actions de pagination
    nextPage: () => currentPage < totalPages && setPage(currentPage + 1),
    prevPage: () => currentPage > 1 && setPage(currentPage - 1),
    goToPage: setPage
  };
};

/**
 * Hook pour récupérer un post spécifique
 * @param {string} slug - Slug du post
 * @returns {object} Post et état de chargement
 */
export const useBlogPost = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simuler un délai d'API
        await new Promise(resolve => setTimeout(resolve, 300));

        const foundPost = getPostBySlug(slug);
        
        if (!foundPost) {
          throw new Error('Post not found');
        }

        setPost(foundPost);
        
        // Récupérer les posts associés
        const related = getRelatedPosts(foundPost, BLOG_POSTS, 3);
        setRelatedPosts(related);

        // Configurer le SEO
        const seo = generateBlogSEO(foundPost);
        document.title = seo.title;

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return {
    post,
    relatedPosts,
    loading,
    error
  };
};

/**
 * Hook pour gérer les catégories
 * @returns {object} Catégories et méthodes utiles
 */
export const useBlogCategories = () => {
  const categories = useMemo(() => {
    return BLOG_CATEGORIES.map(category => ({
      ...category,
      postCount: getPostsByCategory(category.id).length
    }));
  }, []);

  const getCategoryById = useCallback((id) => {
    return categories.find(cat => cat.id === id);
  }, [categories]);

  const getFeaturedCategories = useCallback(() => {
    return categories.filter(cat => cat.featured !== false);
  }, [categories]);

  return {
    categories,
    getCategoryById,
    getFeaturedCategories
  };
};

/**
 * Hook pour les statistiques du blog
 * @returns {object} Statistiques diverses
 */
export const useBlogStats = () => {
  const stats = useMemo(() => {
    const totalPosts = BLOG_POSTS.length;
    const totalViews = BLOG_POSTS.reduce((sum, post) => sum + post.views, 0);
    const totalLikes = BLOG_POSTS.reduce((sum, post) => sum + post.likes, 0);
    const averageReadTime = Math.round(
      BLOG_POSTS.reduce((sum, post) => sum + post.readTime, 0) / totalPosts
    );

    const categoryStats = BLOG_CATEGORIES.map(category => ({
      ...category,
      postCount: getPostsByCategory(category.id).length
    }));

    const popularPosts = [...BLOG_POSTS]
      .sort((a, b) => (b.views + b.likes) - (a.views + a.likes))
      .slice(0, 5);

    return {
      totalPosts,
      totalViews,
      totalLikes,
      averageReadTime,
      categoryStats,
      popularPosts,
      featuredPostsCount: getFeaturedPosts().length
    };
  }, []);

  return stats;
};

/**
 * Hook pour la recherche en temps réel
 * @param {number} debounceMs - Délai de debounce
 * @returns {object} État et méthodes de recherche
 */
export const useBlogSearch = (debounceMs = 300) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce du terme de recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Effectuer la recherche
  useEffect(() => {
    if (debouncedTerm.length >= BLOG_CONFIG.searchMinLength) {
      setLoading(true);
      
      // Simuler un délai de recherche
      setTimeout(() => {
        const searchResults = filterPostsBySearch(BLOG_POSTS, debouncedTerm);
        setResults(searchResults);
        setLoading(false);
      }, 100);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [debouncedTerm]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setResults([]);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    hasResults: results.length > 0,
    clearSearch
  };
};

/**
 * Hook pour gérer les interactions (likes, partages)
 * @param {string} postId - ID du post
 * @returns {object} État et méthodes d'interaction
 */
export const useBlogInteractions = (postId) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    // Récupérer l'état depuis localStorage
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    setLiked(likedPosts.includes(postId));

    // Récupérer le nombre de likes depuis les données
    const post = BLOG_POSTS.find(p => p.id === postId);
    if (post) {
      setLikeCount(post.likes);
    }
  }, [postId]);

  const toggleLike = useCallback(async () => {
    try {
      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount(prev => newLiked ? prev + 1 : prev - 1);

      // Sauvegarder dans localStorage
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      if (newLiked) {
        likedPosts.push(postId);
      } else {
        const index = likedPosts.indexOf(postId);
        if (index > -1) likedPosts.splice(index, 1);
      }
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

      // Ici vous pourriez faire un appel API pour persister le like
      
    } catch (error) {
      // Revert en cas d'erreur
      setLiked(!liked);
      setLikeCount(prev => liked ? prev + 1 : prev - 1);
      console.error('Erreur lors du like:', error);
    }
  }, [liked, postId]);

  const sharePost = useCallback(async (platform, post) => {
    setSharing(true);
    
    try {
      const url = window.location.href;
      const title = post.title;
      const text = post.excerpt;

      const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
      };

      if (platform === 'copy') {
        await navigator.clipboard.writeText(url);
        // Vous pourriez afficher une notification ici
      } else if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
      }

      // Analytics tracking
      if (window.gtag) {
        window.gtag('event', 'share', {
          method: platform,
          content_type: 'article',
          item_id: postId
        });
      }

    } catch (error) {
      console.error('Erreur lors du partage:', error);
    } finally {
      setSharing(false);
    }
  }, [postId]);

  return {
    liked,
    likeCount,
    sharing,
    toggleLike,
    sharePost
  };
};

/**
 * Hook pour gérer la table des matières
 * @param {string} content - Contenu HTML de l'article
 * @returns {object} Table des matières et navigation
 */
export const useTableOfContents = (content) => {
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    if (!content) return;

    // Extraire les titres du contenu
    const headingRegex = /<h([2-4])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-4]>/gi;
    const extractedHeadings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const id = match[2];
      const text = match[3].replace(/<[^>]*>/g, '');
      
      extractedHeadings.push({ level, id, text });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return {
    headings,
    activeHeading,
    scrollToHeading,
    hasHeadings: headings.length > 0
  };
};

/**
 * Hook pour gérer les préférences de lecture
 * @returns {object} Préférences et méthodes de mise à jour
 */
export const useReadingPreferences = () => {
  const [fontSize, setFontSize] = useState('medium');
  const [darkMode, setDarkMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Charger les préférences depuis localStorage
    const savedPrefs = JSON.parse(localStorage.getItem('readingPreferences') || '{}');
    
    if (savedPrefs.fontSize) setFontSize(savedPrefs.fontSize);
    if (savedPrefs.darkMode !== undefined) setDarkMode(savedPrefs.darkMode);
    
    // Détecter les préférences système
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);
    
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedPrefs.darkMode === undefined) {
      setDarkMode(prefersDarkMode);
    }
  }, []);

  const updatePreferences = useCallback((newPrefs) => {
    const currentPrefs = JSON.parse(localStorage.getItem('readingPreferences') || '{}');
    const updatedPrefs = { ...currentPrefs, ...newPrefs };
    
    localStorage.setItem('readingPreferences', JSON.stringify(updatedPrefs));
    
    if (newPrefs.fontSize !== undefined) setFontSize(newPrefs.fontSize);
    if (newPrefs.darkMode !== undefined) setDarkMode(newPrefs.darkMode);
  }, []);

  return {
    fontSize,
    darkMode,
    reducedMotion,
    updatePreferences,
    setFontSize: (size) => updatePreferences({ fontSize: size }),
    setDarkMode: (dark) => updatePreferences({ darkMode: dark })
  };
};

export default {
  useBlogPosts,
  useBlogPost,
  useBlogCategories,
  useBlogStats,
  useBlogSearch,
  useBlogInteractions,
  useTableOfContents,
  useReadingPreferences
};