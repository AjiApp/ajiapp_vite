// src/components/Blog/BlogHero/BlogHero.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogHero.css';
import { formatBlogDate } from '../../../utils/blogHelpers';
import { BLOG_CATEGORIES } from '../../../data/blogPosts';

const BlogHero = ({
  title = "AJI Blog",
  subtitle = "Your ultimate guide to Morocco travel, culture, and experiences",
  showSearch = true,
  showFeatured = true,
  showCategories = true,
  showStats = true,
  featuredPost = null,
  onSearch = null,
  breadcrumbs = [],
  searchPlaceholder = "Search articles, destinations, tips..."
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const stats = [
    { number: '50+', label: 'Articles' },
    { number: '10K+', label: 'Readers' },
    { number: '25+', label: 'Destinations' },
    { number: '4.8★', label: 'Rating' }
  ];

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
    // This would be calculated based on actual posts
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
    <section className="blog-hero" role="banner">
      <div className="blog-hero-container">
        
        {/* Header Section */}
        <header className="hero-header">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="hero-breadcrumbs" aria-label="Breadcrumb navigation">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="breadcrumb-separator" aria-hidden="true">›</span>}
                  {crumb.link ? (
                    <Link to={crumb.link} className="breadcrumb-link">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>
        </header>

        {/* Search Section */}
        {showSearch && (
          <div className="hero-search">
            <form className="search-container" onSubmit={handleSearchSubmit}>
              <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchInputChange}
                aria-label="Search blog articles"
              />
              <button 
                type="submit" 
                className="search-button"
                disabled={!searchQuery.trim()}
                aria-label="Search articles"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Featured Content */}
        {showFeatured && featuredPost && (
          <div className="hero-featured">
            <div className="featured-content">
              <div className="featured-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Featured
              </div>
              
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              
              <div className="featured-meta">
                <div className="featured-author">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="featured-avatar"
                    loading="lazy"
                  />
                  <span className="featured-author-name">{featuredPost.author.name}</span>
                </div>
                <time className="featured-date" dateTime={featuredPost.publishedAt}>
                  {formatBlogDate(featuredPost.publishedAt)}
                </time>
              </div>
              
              <Link to={`/blog/${featuredPost.slug}`} className="featured-cta">
                Read Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </Link>
            </div>
            
            <div className="featured-image">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        )}

        {/* Categories */}
        {showCategories && (
          <div className="hero-categories">
            <h2 className="categories-title">Explore Categories</h2>
            <div className="categories-grid">
              {BLOG_CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  to={`/blog/category/${category.id}`}
                  className="category-card"
                  aria-label={`View ${category.name} articles`}
                >
                  <div 
                    className="category-icon"
                    style={{ backgroundColor: category.color }}
                    aria-hidden="true"
                  >
                    {getCategoryIcon(category.id)}
                  </div>
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-count">
                    {getCategoryPostCount(category.id)} articles
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        {showStats && (
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogHero;