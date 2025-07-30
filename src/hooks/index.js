// src/hooks/index.js - Custom Hooks for AJI App

import { useState, useEffect, useCallback, useRef } from 'react';
import { getDeviceType, debounce, throttle } from '../utils/helpers';

/**
 * Hook for managing device type detection
 * @returns {string} - 'mobile', 'tablet', or 'desktop'
 */
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    const handleResize = debounce(() => {
      setDeviceType(getDeviceType());
    }, 250);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
};

/**
 * Hook for managing scroll position
 * @returns {object} - { scrollY, scrollDirection, isScrolling }
 */
export const useScroll = () => {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollDirection: null,
    isScrolling: false
  });

  const timeoutRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      
      setScrollState(prevState => ({
        scrollY: currentScrollY,
        scrollDirection: currentScrollY > lastScrollY ? 'down' : 'up',
        isScrolling: true
      }));

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set scrolling to false after scroll stops
      timeoutRef.current = setTimeout(() => {
        setScrollState(prevState => ({
          ...prevState,
          isScrolling: false
        }));
      }, 150);

      lastScrollY = currentScrollY;
    }, 10);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return scrollState;
};

/**
 * Hook for managing intersection observer
 * @param {object} options - Intersection observer options
 * @returns {array} - [ref, isIntersecting, entry]
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return [elementRef, isIntersecting, entry];
};

/**
 * Hook for managing local storage with JSON serialization
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @returns {array} - [value, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for managing form state and validation
 * @param {object} initialValues - Initial form values
 * @param {function} validationSchema - Validation function
 * @returns {object} - Form state and handlers
 */
export const useForm = (initialValues = {}, validationSchema = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validateField = useCallback((name, value) => {
    if (!validationSchema) return null;
    
    try {
      const fieldSchema = validationSchema[name];
      if (fieldSchema) {
        fieldSchema(value);
        return null;
      }
    } catch (error) {
      return error.message;
    }
    
    return null;
  }, [validationSchema]);

  const validateForm = useCallback(() => {
    if (!validationSchema) return {};
    
    const newErrors = {};
    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    return newErrors;
  }, [values, validateField, validationSchema]);

  const handleSubmit = useCallback((onSubmit) => {
    return async (event) => {
      if (event) event.preventDefault();
      
      setIsSubmitting(true);
      const formErrors = validateForm();
      
      if (Object.keys(formErrors).length === 0) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
        }
      }
      
      setIsSubmitting(false);
    };
  }, [values, validateForm]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    handleSubmit,
    resetForm
  };
};

/**
 * Hook for managing async operations
 * @param {function} asyncFunction - Async function to execute
 * @returns {object} - { execute, loading, error, data }
 */
export const useAsync = (asyncFunction) => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null
  });

  const execute = useCallback(async (...args) => {
    setState({ loading: true, error: null, data: null });
    
    try {
      const result = await asyncFunction(...args);
      setState({ loading: false, error: null, data: result });
      return result;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, [asyncFunction]);

  return { ...state, execute };
};

/**
 * Hook for managing click outside detection
 * @param {function} handler - Function to call when clicked outside
 * @returns {ref} - Ref to attach to element
 */
export const useClickOutside = (handler) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler]);

  return ref;
};

/**
 * Hook for managing keyboard shortcuts
 * @param {object} shortcuts - Object mapping key combinations to handlers
 */
export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const combo = [
        event.ctrlKey && 'ctrl',
        event.metaKey && 'meta',
        event.shiftKey && 'shift',
        event.altKey && 'alt',
        key
      ].filter(Boolean).join('+');

      if (shortcuts[combo]) {
        event.preventDefault();
        shortcuts[combo](event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

/**
 * Hook for managing media queries
 * @param {string} query - Media query string
 * @returns {boolean} - Whether the media query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

/**
 * Hook for managing document title
 * @param {string} title - Document title
 * @param {string} suffix - Optional suffix (default: app name)
 */
export const useDocumentTitle = (title, suffix = 'AJI App') => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = suffix ? `${title} - ${suffix}` : title;

    return () => {
      document.title = previousTitle;
    };
  }, [title, suffix]);
};

/**
 * Hook for managing focus trap (accessibility)
 * @param {boolean} isActive - Whether the focus trap is active
 * @returns {ref} - Ref to attach to container element
 */
export const useFocusTrap = (isActive = true) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
};

/**
 * Hook for managing prefers-reduced-motion
 * @returns {boolean} - Whether user prefers reduced motion
 */
export const usePrefersReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

/**
 * Hook for managing online/offline status
 * @returns {boolean} - Whether the user is online
 */
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};