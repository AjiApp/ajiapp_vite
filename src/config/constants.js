// src/config/constants.js

// App Store URLs
export const STORE_URLS = {
  appStore: "https://apps.apple.com/us/app/aji-morocco-travel-guide/id123456789", // Remplacez par vos vrais IDs
  playStore: "https://play.google.com/store/apps/details?id=com.ajiapp.morocco" // Remplacez par votre vrai package name
};

// Contact Information
export const CONTACT_INFO = {
  email: "aji@ajiapp.com",
  supportEmail: "support@ajiapp.com",
  website: "https://www.ajiapp.com"
};

// Social Media Links (si applicable)
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/ajiapp",
  instagram: "https://instagram.com/ajiapp",
  twitter: "https://twitter.com/ajiapp"
};

// Navigation Menu Items
export const NAVIGATION_ITEMS = [
  { id: "whyaji", label: "Why Aji", href: "#whyaji" },
  { id: "howitworks", label: "How It Works", href: "#howitworks" },
  { id: "services", label: "Services", href: "#services" },
  { id: "download", label: "Download", href: "#download" },
  { id: "footer", label: "Contact", href: "#footer" }
];

// App Features/Services
export const SERVICES = [
  {
    id: "flights",
    title: "Flight Booking",
    description: "Find and book the best flights to Morocco",
    icon: "Door.svg"
  },
  {
    id: "food",
    title: "Local Cuisine",
    description: "Discover authentic Moroccan restaurants",
    icon: "Door1.svg"
  },
  {
    id: "discover",
    title: "Discover Places",
    description: "Explore Morocco's hidden gems",
    icon: "Door2.svg"
  },
  {
    id: "esim",
    title: "eSIM Service",
    description: "Stay connected with local eSIM",
    icon: "Door3.svg"
  },
  {
    id: "accommodation",
    title: "Accommodation",
    description: "Book hotels and riads",
    icon: "Door4.svg"
  }
];

// Steps for "How It Works" section
export const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: "Download the app",
    description: "Get AJI from App Store or Google Play"
  },
  {
    id: 2,
    title: "Discover our services",
    description: "Explore all available travel services"
  },
  {
    id: 3,
    title: "Enjoy your trip",
    description: "Experience Morocco like never before"
  }
];

// Theme Colors
export const THEME = {
  primary: "#8B181A",
  primaryHover: "#a02024",
  primaryLight: "#f7e7e7",
  textPrimary: "#333",
  textSecondary: "#555",
  textMuted: "#666",
  backgroundPrimary: "#fff",
  backgroundSecondary: "#f8f8f8"
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  large: "1200px"
};

// Animation durations
export const ANIMATIONS = {
  fast: "0.15s",
  normal: "0.3s",
  slow: "0.5s"
};