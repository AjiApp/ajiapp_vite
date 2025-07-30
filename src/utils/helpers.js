// src/utils/helpers.js

/**
 * Smooth scroll to element by ID
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} offset - Optional offset from top (default: 0)
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId.replace('#', ''));
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Check if device is mobile
 * @returns {boolean}
 */
export const isMobile = () => {
  return window.innerWidth <= 768;
};

/**
 * Check if device is tablet
 * @returns {boolean}
 */
export const isTablet = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

/**
 * Get device type
 * @returns {string} - 'mobile', 'tablet', or 'desktop'
 */
export const getDeviceType = () => {
  const width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function}
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function}
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Format email for mailto links
 * @param {string} email - Email address
 * @param {string} subject - Email subject (optional)
 * @param {string} body - Email body (optional)
 * @returns {string}
 */
export const formatMailto = (email, subject = '', body = '') => {
  let mailto = `mailto:${email}`;
  const params = [];
  
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  
  if (params.length > 0) {
    mailto += `?${params.join('&')}`;
  }
  
  return mailto;
};

/**
 * Check if URL is external
 * @param {string} url - URL to check
 * @returns {boolean}
 */
export const isExternalUrl = (url) => {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:');
};

/**
 * Get image path helper
 * @param {string} imagePath - Relative path to image
 * @returns {string}
 */
export const getImagePath = (imagePath) => {
  // Handle both absolute and relative paths
  if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
    return imagePath;
  }
  return `/src/assets/images/${imagePath}`;
};

/**
 * Handle external link clicks (adds security attributes)
 * @param {string} url - URL to open
 * @param {boolean} newTab - Open in new tab (default: true)
 */
export const handleExternalLink = (url, newTab = true) => {
  if (newTab) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = url;
  }
};

/**
 * Lazy load images
 * @param {HTMLImageElement} img - Image element
 * @param {string} src - Image source
 */
export const lazyLoadImage = (img, src) => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = src;
        image.classList.remove('lazy');
        imageObserver.unobserve(image);
      }
    });
  });
  
  imageObserver.observe(img);
};

/**
 * Format app store URLs with fallback
 * @param {string} storeType - 'ios' or 'android'
 * @param {string} appId - App ID or package name
 * @returns {string}
 */
export const getStoreUrl = (storeType, appId) => {
  const baseUrls = {
    ios: 'https://apps.apple.com/app/',
    android: 'https://play.google.com/store/apps/details?id='
  };
  
  return baseUrls[storeType] + appId;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};