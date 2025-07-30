// src/components/Blog/BlogSidebar/BlogSidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogSidebar.css';
import { formatBlogDate } from '../../../utils/blogHelpers';
import { BLOG_CATEGORIES, getRecentPosts } from '../../../data/blogPosts';

const BlogSidebar = ({
  showSearch = true,
  showRecentPosts = true,
  showCategories = true,
  showTags = true,
  showNewsletter = true,
  showSocial = true,
  showArchive = false,
  onSearch = null,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  const recentPosts = getRecentPosts(5);
  
  const popularTags = [
    'Morocco', 'Travel Tips', 'Culture', 'Food', 'Marrakech',
    'eSIM', 'Atlas Mountains', 'Casablanca', 'Fes', 'Adventure',
    'Technology', 'Berber', 'Cuisine', 'Heritage', 'Guide'
  ];

  const archiveData = [
    { month: 'January 2025', count: 8 },
    { month: 'December 2024', count: 12 },
    { month: 'November 2024', count: 10 },
    { month: 'October 2024', count: 15 },
    { month: 'September 2024', count: 9 }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus('loading');
    
    // Simulate newsletter subscription
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus(null), 3000);
    }, 1000);
  };

  const getCategoryIcon = (categoryId) => {
    const icons = {
      'travel-tips': '✈️',
      'culture': '🏛️',
      'destinations': '🗺️',
      'food': '🍽️',
      'technology': '📱'
    };
    return icons[categoryId] || '📄';
  };

  const getCategoryPostCount = (categoryId) => {
    const counts = {
      'travel-tips': 12,
      'culture': 8,
      'destinations': 15,
      'food': 10,
      'technology': 6
    };
    return counts[categoryId] || 0;
  };

  return (
    <aside className={`blog-sidebar ${className}`} role="complementary">
      
      {/* Search Widget */}
      {showSearch && (
        <div className="sidebar-widget">
          <h3 className="widget-title">Search Articles</h3>
          <div className="sidebar-search">
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search blog articles"
              />
              <button 
                type="submit" 
                aria-label="Search"
                disabled={!searchQuery.trim()}
              >
                <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Recent Posts Widget */}
      {showRecentPosts && recentPosts.length > 0 && (
        <div className="sidebar-widget">
          <h3 className="widget-title">Recent Articles</h3>
          <ul className="recent-posts-list">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="recent-post-item"
                  aria-label={`Read: ${post.title}`}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="recent-post-image"
                    loading="lazy"
                  />
                  <div className="recent-post-content">
                    <h4 className="recent-post-title">{post.title}</h4>
                    <div className="recent-post-meta">
                      <span className="recent-post-date">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                        </svg>
                        {formatBlogDate(post.publishedAt)}
                      </span>
                      <span className="recent-post-category">
                        <span 
                          className="category-dot"
                          style={{ backgroundColor: post.category.color }}
                        ></span>
                        {post.category.name}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Categories Widget */}
      {showCategories && (
        <div className="sidebar-widget">
          <h3 className="widget-title">Categories</h3>
          <ul className="categories-list">
            {BLOG_CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link 
                  to={`/blog/category/${category.id}`} 
                  className="category-item"
                  aria-label={`View ${category.name} articles`}
                >
                  <div className="category-info">
                    <div 
                      className="category-icon"
                      style={{ backgroundColor: category.color }}
                      aria-hidden="true"
                    >
                      {getCategoryIcon(category.id)}
                    </div>
                    <div className="category-details">
                      <h4 className="category-name">{category.name}</h4>
                      <p className="category-description">{category.description}</p>
                    </div>
                  </div>
                  <span className="category-count">
                    {getCategoryPostCount(category.id)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Popular Tags Widget */}
      {showTags && (
        <div className="sidebar-widget">
          <h3 className="widget-title">Popular Tags</h3>
          <div className="tags-cloud">
            {popularTags.map((tag, index) => (
              <button
                key={index}
                className="tag-item"
                onClick={() => onSearch && onSearch(tag)}
                aria-label={`Search for ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Widget */}
      {showNewsletter && (
        <div className="sidebar-widget">
          <h3 className="widget-title">Stay Updated</h3>
          <p className="newsletter-description">
            Get the latest travel tips and Morocco insights delivered to your inbox.
          </p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              aria-label="Email address for newsletter"
            />
            <button 
              type="submit" 
              className="newsletter-button"
              disabled={newsletterStatus === 'loading'}
            >
              {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
            {newsletterStatus === 'success' && (
              <p className="newsletter-note" style={{ color: '#28a745' }}>
                ✓ Successfully subscribed!
              </p>
            )}
            {!newsletterStatus && (
              <p className="newsletter-note">
                No spam, unsubscribe anytime.
              </p>
            )}
          </form>
        </div>
      )}

      {/* Social Media Widget */}
      {showSocial && (
        <div className="sidebar-widget">
          <h3 className="widget-title">Follow Us</h3>
          <div className="social-links">
            <a 
              href="https://facebook.com/ajiapp" 
              className="social-link facebook"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com/ajiapp" 
              className="social-link twitter"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com/ajiapp" 
              className="social-link instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/company/ajiapp" 
              className="social-link linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Archive Widget */}
      {showArchive && (
        <div className="sidebar-widget">
          <h3 className="widget-title">Archive</h3>
          <ul className="archive-list">
            {archiveData.map((archive, index) => (
              <li key={index}>
                <Link to={`/blog/archive/${archive.month.toLowerCase().replace(' ', '-')}`} className="archive-item">
                  <span className="archive-month">{archive.month}</span>
                  <span className="archive-count">{archive.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default BlogSidebar;