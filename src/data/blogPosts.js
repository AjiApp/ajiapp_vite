// src/data/blogPosts.js - Données de démonstration du blog
export const BLOG_CATEGORIES = [
  {
    id: 'travel-tips',
    name: 'Travel Tips',
    description: 'Essential tips for traveling in Morocco',
    color: '#8B181A'
  },
  {
    id: 'culture',
    name: 'Culture & Heritage',
    description: 'Discover Moroccan culture and traditions',
    color: '#D4AF37'
  },
  {
    id: 'destinations',
    name: 'Destinations',
    description: 'Must-visit places in Morocco',
    color: '#2E8B57'
  },
  {
    id: 'food',
    name: 'Food & Cuisine',
    description: 'Authentic Moroccan culinary experiences',
    color: '#FF6B35'
  },
  {
    id: 'technology',
    name: 'Travel Tech',
    description: 'Technology tips for modern travelers',
    color: '#4A90E2'
  }
];

export const BLOG_AUTHORS = [
  {
    id: 'sarah-mohamed',
    name: 'Sarah Mohamed',
    bio: 'Travel writer and Morocco expert with 8+ years of experience',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    social: {
      twitter: 'sarahmohamedma',
      instagram: 'sarahexploresmorocco'
    }
  },
  {
    id: 'ahmed-benali',
    name: 'Ahmed Ben Ali',
    bio: 'Local guide and cultural heritage specialist from Marrakech',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    social: {
      instagram: 'ahmedguides'
    }
  },
  {
    id: 'aji-team',
    name: 'AJI Team',
    bio: 'The official AJI team bringing you the latest travel insights',
    avatar: '/src/assets/images/logos/aji-logo.svg',
    social: {}
  }
];

export const BLOG_POSTS = [
  {
    id: '1',
    title: 'Complete Guide to Using eSIM in Morocco',
    slug: 'complete-guide-esim-morocco',
    excerpt: 'Everything you need to know about staying connected in Morocco with eSIM technology. Compare providers, plans, and get setup tips.',
    content: `
      <h2>Why Choose eSIM for Morocco?</h2>
      <p>Traveling to Morocco has never been easier with eSIM technology. Gone are the days of hunting for local SIM cards or paying expensive roaming charges.</p>
      
      <h3>Benefits of eSIM in Morocco</h3>
      <ul>
        <li>Instant activation before you travel</li>
        <li>No physical SIM card needed</li>
        <li>Multiple data plans available</li>
        <li>Works with major Moroccan networks</li>
      </ul>
      
      <h2>Best eSIM Providers for Morocco</h2>
      <p>After testing various providers, here are our top recommendations:</p>
      
      <h3>1. Orange Morocco eSIM</h3>
      <p>Orange offers excellent coverage across Morocco with competitive rates. Their eSIM plans start from 50 MAD for 1GB and go up to 200 MAD for 10GB.</p>
      
      <h3>2. Maroc Telecom eSIM</h3>
      <p>The largest network in Morocco, providing reliable coverage even in remote areas. Perfect for Atlas Mountain adventures.</p>
      
      <h2>Setup Instructions</h2>
      <p>Setting up your eSIM is straightforward:</p>
      <ol>
        <li>Purchase your eSIM plan through the AJI app</li>
        <li>Scan the QR code provided</li>
        <li>Follow the on-screen setup instructions</li>
        <li>Activate your plan once you arrive in Morocco</li>
      </ol>
      
      <h2>Coverage Areas</h2>
      <p>eSIM coverage in Morocco is excellent in major cities including Casablanca, Rabat, Marrakech, and Fes. Rural areas and mountain regions may have limited coverage.</p>
      
      <h2>Tips for Best Experience</h2>
      <ul>
        <li>Download your eSIM profile before traveling</li>
        <li>Keep your primary SIM active for emergencies</li>
        <li>Monitor your data usage through the AJI app</li>
        <li>Consider unlimited plans for longer stays</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    category: BLOG_CATEGORIES.find(cat => cat.id === 'technology'),
    author: BLOG_AUTHORS.find(author => author.id === 'aji-team'),
    publishedAt: '2025-01-25T10:00:00Z',
    readTime: 6,
    tags: ['eSIM', 'connectivity', 'technology', 'mobile data', 'travel tech'],
    featured: true,
    views: 2453,
    likes: 89
  },
  {
    id: '2',
    title: 'Hidden Gems of the Atlas Mountains',
    slug: 'hidden-gems-atlas-mountains',
    excerpt: 'Discover breathtaking villages and secret trails in Morocco\'s Atlas Mountains that most tourists never see.',
    content: `
      <h2>Beyond the Tourist Trail</h2>
      <p>The Atlas Mountains hide some of Morocco's most spectacular secrets. While most visitors stick to popular routes, these hidden gems offer authentic experiences away from the crowds.</p>
      
      <h3>Ait Bouguemez Valley</h3>
      <p>Known as the "Happy Valley," this remote paradise is home to traditional Berber villages where time seems to have stopped. The valley offers incredible hiking opportunities and authentic cultural encounters.</p>
      
      <h3>Imlil Village</h3>
      <p>Your gateway to Mount Toubkal, North Africa's highest peak. The village itself is charming, with traditional architecture and welcoming locals eager to share their mountain wisdom.</p>
      
      <h2>Best Time to Visit</h2>
      <p>Spring (March-May) and autumn (September-November) offer the best weather for mountain exploration. Summer can be hot in lower elevations, while winter brings snow to higher peaks.</p>
      
      <h2>What to Pack</h2>
      <ul>
        <li>Sturdy hiking boots</li>
        <li>Layered clothing for temperature changes</li>
        <li>Sun protection and plenty of water</li>
        <li>Camera for stunning landscape shots</li>
      </ul>
      
      <h2>Responsible Tourism</h2>
      <p>When visiting these pristine areas, remember to:</p>
      <ul>
        <li>Respect local customs and traditions</li>
        <li>Support local businesses and guides</li>
        <li>Leave no trace behind</li>
        <li>Ask permission before photographing people</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=400&fit=crop',
    category: BLOG_CATEGORIES.find(cat => cat.id === 'destinations'),
    author: BLOG_AUTHORS.find(author => author.id === 'ahmed-benali'),
    publishedAt: '2025-01-22T14:30:00Z',
    readTime: 8,
    tags: ['Atlas Mountains', 'hiking', 'Berber culture', 'adventure', 'nature'],
    featured: true,
    views: 1876,
    likes: 67
  },
  {
    id: '3',
    title: 'Moroccan Tagine: A Culinary Journey',
    slug: 'moroccan-tagine-culinary-journey',
    excerpt: 'Master the art of authentic Moroccan tagine cooking with traditional recipes and modern twists from local chefs.',
    content: `
      <h2>The Art of Tagine Cooking</h2>
      <p>The tagine is more than just a cooking vessel – it's a symbol of Moroccan hospitality and tradition. This iconic cone-shaped pot creates the perfect environment for slow, flavorful cooking.</p>
      
      <h3>Traditional Chicken Tagine with Preserved Lemons</h3>
      <p>This classic recipe showcases the perfect balance of savory and citrusy flavors that Moroccan cuisine is famous for.</p>
      
      <h4>Ingredients:</h4>
      <ul>
        <li>1 whole chicken, cut into pieces</li>
        <li>2 preserved lemons, quartered</li>
        <li>1 cup green olives</li>
        <li>2 onions, sliced</li>
        <li>Fresh ginger and garlic</li>
        <li>Moroccan spice blend (ras el hanout)</li>
      </ul>
      
      <h2>Vegetarian Options</h2>
      <p>Vegetable tagines are equally delicious and nutritious. Try combinations like:</p>
      <ul>
        <li>Sweet potato and chickpea tagine</li>
        <li>Seasonal vegetable medley with preserved lemons</li>
        <li>Dried fruit and nut tagine with couscous</li>
      </ul>
      
      <h2>Cooking Tips from Local Chefs</h2>
      <p>Marrakech's renowned chefs share their secrets:</p>
      <ul>
        <li>Season the tagine pot properly before first use</li>
        <li>Cook low and slow for best flavor development</li>
        <li>Layer ingredients strategically for even cooking</li>
        <li>Don't lift the lid too often during cooking</li>
      </ul>
      
      <h2>Where to Learn</h2>
      <p>For hands-on experience, join a cooking class in Morocco. Popular locations include:</p>
      <ul>
        <li>La Maison Arabe in Marrakech</li>
        <li>Cooking workshops in Fes medina</li>
        <li>Rural farm-to-table experiences</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop',
    category: BLOG_CATEGORIES.find(cat => cat.id === 'food'),
    author: BLOG_AUTHORS.find(author => author.id === 'sarah-mohamed'),
    publishedAt: '2025-01-20T09:15:00Z',
    readTime: 7,
    tags: ['tagine', 'cooking', 'recipes', 'Moroccan cuisine', 'food culture'],
    featured: false,
    views: 1432,
    likes: 54
  },
  {
    id: '4',
    title: 'Navigating Marrakech Medina Like a Local',
    slug: 'navigating-marrakech-medina-local',
    excerpt: 'Essential tips and insider secrets for exploring the historic Marrakech medina without getting lost or overwhelmed.',
    content: `
      <h2>Welcome to the Medina</h2>
      <p>Marrakech's medina is a UNESCO World Heritage site and one of the largest medieval cities in the world. With over 1000 years of history packed into narrow alleyways, it can be overwhelming for first-time visitors.</p>
      
      <h3>Getting Your Bearings</h3>
      <p>The medina is roughly circular, with Jemaa el-Fnaa square at its heart. Use these landmarks to navigate:</p>
      <ul>
        <li>Kutubiyya Mosque - visible from most parts of the medina</li>
        <li>Main gates: Bab Agnaou, Bab Doukkala, Bab el-Khemis</li>
        <li>Major streets: Rue Riad Zitoun, Rue de la Kasbah</li>
      </ul>
      
      <h2>Shopping Like a Pro</h2>
      <p>The souks are divided into sections by trade:</p>
      <ul>
        <li>Leather goods in the Souk des Tanneurs</li>
        <li>Textiles in Souk des Teinturiers</li>
        <li>Metalwork in Souk des Ferblantiers</li>
        <li>Spices in Souk el Attarin</li>
      </ul>
      
      <h3>Haggling Tips</h3>
      <ul>
        <li>Start at 30-40% of the asking price</li>
        <li>Be prepared to walk away</li>
        <li>Show genuine interest in the craftsmanship</li>
        <li>Buy multiple items for better prices</li>
      </ul>
      
      <h2>Cultural Etiquette</h2>
      <p>Respect local customs:</p>
      <ul>
        <li>Dress modestly, especially in religious areas</li>
        <li>Ask permission before photographing people</li>
        <li>Remove shoes when entering mosques (if allowed)</li>
        <li>Use your right hand for eating and greetings</li>
      </ul>
      
      <h2>Safety Tips</h2>
      <ul>
        <li>Stay aware of your surroundings</li>
        <li>Don't carry large amounts of cash</li>
        <li>Be cautious of overly friendly strangers</li>
        <li>Keep copies of important documents</li>
      </ul>
      
      <h2>Must-Visit Spots</h2>
      <ul>
        <li>Bahia Palace - stunning 19th-century architecture</li>
        <li>Saadian Tombs - recently discovered royal burial ground</li>
        <li>El Badi Palace - impressive ruins with stork nests</li>
        <li>Secret gardens - peaceful retreats from the bustle</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=400&fit=crop',
    category: BLOG_CATEGORIES.find(cat => cat.id === 'travel-tips'),
    author: BLOG_AUTHORS.find(author => author.id === 'ahmed-benali'),
    publishedAt: '2025-01-18T16:45:00Z',
    readTime: 9,
    tags: ['Marrakech', 'medina', 'navigation', 'souks', 'local tips'],
    featured: true,
    views: 3201,
    likes: 128
  },
  {
    id: '5',
    title: 'Traditional Berber Wedding Ceremonies',
    slug: 'traditional-berber-wedding-ceremonies',
    excerpt: 'Discover the rich traditions and beautiful customs of Berber wedding ceremonies in the Atlas Mountains.',
    content: `
      <h2>A Celebration of Love and Heritage</h2>
      <p>Berber wedding ceremonies are vibrant celebrations that can last for several days, showcasing centuries-old traditions passed down through generations.</p>
      
      <h3>Pre-Wedding Rituals</h3>
      <p>The celebration begins days before the actual ceremony:</p>
      <ul>
        <li>Henna night - intricate designs painted on the bride's hands</li>
        <li>Traditional baths with rose water and argan oil</li>
        <li>Family gathering to discuss dowry and arrangements</li>
        <li>Preparation of traditional wedding costumes</li>
      </ul>
      
      <h2>The Wedding Day</h2>
      <p>The ceremony itself is a feast for the senses:</p>
      
      <h3>Traditional Attire</h3>
      <ul>
        <li>Bride wears a colorful kaftan with silver jewelry</li>
        <li>Groom dons a white djellaba and traditional cap</li>
        <li>Guests dress in their finest traditional clothing</li>
      </ul>
      
      <h3>Music and Dance</h3>
      <p>No Berber wedding is complete without:</p>
      <ul>
        <li>Traditional drumming and folk songs</li>
        <li>Ahidous - circular group dance</li>
        <li>Poetry recitation in Amazigh language</li>
        <li>Instrumental performances on oud and flute</li>
      </ul>
      
      <h2>Symbolic Elements</h2>
      <p>Every aspect has meaning:</p>
      <ul>
        <li>Seven outfit changes representing life stages</li>
        <li>Sharing of dates and milk for sweetness in marriage</li>
        <li>Exchange of silver jewelry as protection</li>
        <li>Throwing of rose petals for fertility</li>
      </ul>
      
      <h2>Feast and Hospitality</h2>
      <p>The wedding feast includes:</p>
      <ul>
        <li>Mechoui - whole roasted lamb</li>
        <li>Couscous with seasonal vegetables</li>
        <li>Traditional sweets and pastries</li>
        <li>Fresh mint tea served throughout</li>
      </ul>
      
      <h2>Respecting Traditions</h2>
      <p>If invited to a Berber wedding:</p>
      <ul>
        <li>Dress conservatively and appropriately</li>
        <li>Bring a gift for the couple</li>
        <li>Participate respectfully in customs</li>
        <li>Ask before taking photographs</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=400&fit=crop',
    category: BLOG_CATEGORIES.find(cat => cat.id === 'culture'),
    author: BLOG_AUTHORS.find(author => author.id === 'sarah-mohamed'),
    publishedAt: '2025-01-15T11:20:00Z',
    readTime: 10,
    tags: ['Berber culture', 'weddings', 'traditions', 'Atlas Mountains', 'ceremonies'],
    featured: false,
    views: 987,
    likes: 43
  },
  {
    id: '6',
    title: 'Essential Apps for Morocco Travel',
    slug: 'essential-apps-morocco-travel',
    excerpt: 'Must-have mobile apps to enhance your Morocco travel experience, from translation tools to offline maps.',
    content: `
      <h2>Digital Tools for Modern Travelers</h2>
      <p>Technology can greatly enhance your Morocco travel experience. Here are the essential apps every traveler should have.</p>
      
      <h3>Navigation and Maps</h3>
      <ul>
        <li><strong>Google Maps Offline</strong> - Download Morocco maps before traveling</li>
        <li><strong>Maps.me</strong> - Excellent for remote areas and hiking trails</li>
        <li><strong>Waze</strong> - Real-time traffic updates in major cities</li>
      </ul>
      
      <h3>Language and Communication</h3>
      <ul>
        <li><strong>Google Translate</strong> - Camera translation for Arabic and French</li>
        <li><strong>Darija App</strong> - Learn Moroccan Arabic phrases</li>
        <li><strong>Microsoft Translator</strong> - Offline translation capabilities</li>
      </ul>
      
      <h3>Transportation</h3>
      <ul>
        <li><strong>Careem</strong> - Ride-hailing service in major cities</li>
        <li><strong>Heetch</strong> - Popular local taxi app</li>
        <li><strong>ONCF Connect</strong> - Official train booking app</li>
      </ul>
      
      <h3>Food and Dining</h3>
      <ul>
        <li><strong>Glovo</strong> - Food delivery in cities</li>
        <li><strong>Jumia Food</strong> - Restaurant discovery and delivery</li>
        <li><strong>TripAdvisor</strong> - Restaurant reviews and recommendations</li>
      </ul>
      
      <h3>Banking and Payments</h3>
      <ul>
        <li><strong>Wise</strong> - Best exchange rates for money transfers</li>
        <li><strong>XE Currency</strong> - Real-time exchange rate calculator</li>
        <li><strong>Revolut</strong> - Multi-currency travel card</li>
      </ul>
      
      <h3>Weather and Environment</h3>
      <ul>
        <li><strong>Weather Underground</strong> - Accurate local forecasts</li>
        <li><strong>UV Index</strong> - Sun protection guidance</li>
        <li><strong>Air Quality Index</strong> - Pollution levels in cities</li>
      </ul>
      
      <h2>AJI App Features</h2>
      <p>Don't forget that the AJI app combines many of these features:</p>
      <ul>
        <li>eSIM purchase and activation</li>
        <li>Visa information and guidance</li>
        <li>Hotel and flight booking</li>
        <li>Local transportation options</li>
        <li>Emergency contacts and assistance</li>
        <li>Cultural guides and tips</li>
      </ul>
      
      <h2>Offline Preparation</h2>
      <p>Before leaving WiFi:</p>
      <ul>
        <li>Download offline maps of your destinations</li>
        <li>Save important phone numbers and addresses</li>
        <li>Download translation packs for offline use</li>
        <li>Save screenshots of bookings and reservations</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    category: BLOG_CATEGORIES.find(cat => cat.id === 'technology'),
    author: BLOG_AUTHORS.find(author => author.id === 'aji-team'),
    publishedAt: '2025-01-12T13:10:00Z',
    readTime: 5,
    tags: ['mobile apps', 'travel tech', 'Morocco', 'digital tools', 'travel preparation'],
    featured: false,
    views: 1654,
    likes: 72
  }
];

// Fonction utilitaire pour récupérer les posts par catégorie
export const getPostsByCategory = (categoryId) => {
  return BLOG_POSTS.filter(post => post.category.id === categoryId);
};

// Fonction utilitaire pour récupérer les posts vedettes
export const getFeaturedPosts = () => {
  return BLOG_POSTS.filter(post => post.featured);
};

// Fonction utilitaire pour récupérer les posts récents
export const getRecentPosts = (limit = 5) => {
  return BLOG_POSTS
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
};

// Fonction utilitaire pour récupérer un post par slug
export const getPostBySlug = (slug) => {
  return BLOG_POSTS.find(post => post.slug === slug);
};