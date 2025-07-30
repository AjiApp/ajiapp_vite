// src/utils/imageUtils.js - Utilitaires pour l'optimisation des images
import { BLOG_CONFIG } from '../config/blogConfig';

/**
 * Génère une URL d'image optimisée avec les paramètres spécifiés
 * @param {string} src - URL source de l'image
 * @param {object} options - Options d'optimisation
 * @returns {string} URL optimisée
 */
export const getOptimizedImageUrl = (src, options = {}) => {
  if (!src) return BLOG_CONFIG.images.defaultFeaturedImage;
  
  const {
    width,
    height,
    quality = BLOG_CONFIG.images.quality,
    format = 'webp',
    fit = 'cover'
  } = options;
  
  // Si c'est une URL externe, la retourner telle quelle
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // Pour les images locales, vous pourriez utiliser un service comme Cloudinary, ImageKit, etc.
  // Exemple avec une URL de base pour un CDN d'images
  const baseUrl = process.env.REACT_APP_IMAGE_CDN_URL || '';
  
  if (!baseUrl) return src;
  
  const params = new URLSearchParams();
  if (width) params.append('w', width);
  if (height) params.append('h', height);
  if (quality) params.append('q', quality);
  if (format) params.append('f', format);
  if (fit) params.append('c', fit);
  
  return `${baseUrl}${src}?${params.toString()}`;
};

/**
 * Génère un ensemble d'URLs d'images responsives
 * @param {string} src - URL source de l'image
 * @param {array} sizes - Tableaux des tailles désirées
 * @returns {object} Objet contenant srcSet et sizes
 */
export const getResponsiveImageSet = (src, sizes = [400, 800, 1200]) => {
  const srcSet = sizes
    .map(size => `${getOptimizedImageUrl(src, { width: size })} ${size}w`)
    .join(', ');
  
  const sizesAttribute = sizes
    .map((size, index) => {
      if (index === sizes.length - 1) return `${size}px`;
      return `(max-width: ${size}px) ${size}px`;
    })
    .join(', ');
  
  return {
    srcSet,
    sizes: sizesAttribute
  };
};

/**
 * Génère une image placeholder en base64
 * @param {number} width - Largeur du placeholder
 * @param {number} height - Hauteur du placeholder
 * @param {string} color - Couleur de fond
 * @returns {string} Data URL du placeholder
 */
export const generatePlaceholder = (width = 400, height = 300, color = '#f0f0f0') => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  // Ajouter une icône simple
  ctx.fillStyle = '#cccccc';
  ctx.font = `${Math.min(width, height) * 0.2}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('📷', width / 2, height / 2);
  
  return canvas.toDataURL('image/png');
};

/**
 * Charge une image de manière asynchrone avec fallback
 * @param {string} src - URL de l'image
 * @param {string} fallback - URL de fallback
 * @returns {Promise<string>} URL de l'image chargée
 */
export const loadImageWithFallback = (src, fallback = BLOG_CONFIG.images.defaultFeaturedImage) => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => resolve(src);
    img.onerror = () => {
      // Essayer le fallback
      const fallbackImg = new Image();
      fallbackImg.onload = () => resolve(fallback);
      fallbackImg.onerror = () => resolve(generatePlaceholder());
      fallbackImg.src = fallback;
    };
    
    img.src = src;
  });
};

/**
 * Lazy loading avec Intersection Observer
 * @param {HTMLImageElement} img - Élément image
 * @param {object} options - Options pour l'observer
 */
export const setupLazyLoading = (img, options = {}) => {
  const {
    rootMargin = '50px 0px',
    threshold = 0.01,
    placeholder = true
  } = options;
  
  // Définir un placeholder si demandé
  if (placeholder && !img.src) {
    img.src = generatePlaceholder(
      img.dataset.width || 400,
      img.dataset.height || 300
    );
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        const src = image.dataset.src;
        
        if (src) {
          loadImageWithFallback(src).then(finalSrc => {
            image.src = finalSrc;
            image.classList.remove('lazy');
            image.classList.add('loaded');
          });
        }
        
        observer.unobserve(image);
      }
    });
  }, {
    rootMargin,
    threshold
  });
  
  observer.observe(img);
  
  return observer;
};

/**
 * Composant Image optimisée pour React
 * @param {object} props - Props du composant
 * @returns {JSX.Element} Élément image optimisé
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  lazy = true,
  sizes,
  quality,
  format,
  placeholder = true,
  fallback,
  onLoad,
  onError,
  ...props
}) => {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !lazy) return;
    
    const observer = setupLazyLoading(img, { placeholder });
    
    return () => observer.disconnect();
  }, [lazy, placeholder]);
  
  const handleLoad = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };
  
  const handleError = (e) => {
    setError(true);
    onError?.(e);
  };
  
  const optimizedSrc = getOptimizedImageUrl(src, {
    width,
    height,
    quality,
    format
  });
  
  const responsiveSet = sizes ? getResponsiveImageSet(src, sizes) : null;
  
  return (
    <img
      ref={imgRef}
      src={lazy ? undefined : optimizedSrc}
      data-src={lazy ? optimizedSrc : undefined}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${lazy ? 'lazy' : ''} ${loaded ? 'loaded' : ''} ${error ? 'error' : ''}`}
      srcSet={responsiveSet?.srcSet}
      sizes={responsiveSet?.sizes}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

/**
 * Précharge une image
 * @param {string} src - URL de l'image à précharger
 * @returns {Promise<void>}
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.onload = resolve;
    link.onerror = reject;
    
    document.head.appendChild(link);
  });
};

/**
 * Précharge plusieurs images
 * @param {array} urls - Tableau d'URLs à précharger
 * @returns {Promise<void>}
 */
export const preloadImages = async (urls) => {
  const promises = urls.map(url => preloadImage(url));
  return Promise.allSettled(promises);
};

/**
 * Détecte le support WebP du navigateur
 * @returns {Promise<boolean>}
 */
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Obtient les dimensions optimales pour une image
 * @param {number} originalWidth - Largeur originale
 * @param {number} originalHeight - Hauteur originale
 * @param {number} maxWidth - Largeur maximale
 * @param {number} maxHeight - Hauteur maximale
 * @returns {object} Nouvelles dimensions
 */
export const getOptimalDimensions = (originalWidth, originalHeight, maxWidth, maxHeight) => {
  const ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
  
  return {
    width: Math.round(originalWidth * ratio),
    height: Math.round(originalHeight * ratio)
  };
};

/**
 * Convertit une image en format WebP si supporté
 * @param {File} file - Fichier image
 * @param {number} quality - Qualité de compression (0-1)
 * @returns {Promise<Blob>}
 */
export const convertToWebP = (file, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(resolve, 'image/webp', quality);
    };
    
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Valide un fichier image
 * @param {File} file - Fichier à valider
 * @param {object} options - Options de validation
 * @returns {object} Résultat de validation
 */
export const validateImageFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxWidth = 4000,
    maxHeight = 4000
  } = options;
  
  const errors = [];
  
  // Vérifier le type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`Type de fichier non supporté. Types autorisés: ${allowedTypes.join(', ')}`);
  }
  
  // Vérifier la taille
  if (file.size > maxSize) {
    errors.push(`Fichier trop volumineux. Taille maximale: ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export default {
  getOptimizedImageUrl,
  getResponsiveImageSet,
  generatePlaceholder,
  loadImageWithFallback,
  setupLazyLoading,
  OptimizedImage,
  preloadImage,
  preloadImages,
  supportsWebP,
  getOptimalDimensions,
  convertToWebP,
  validateImageFile
};