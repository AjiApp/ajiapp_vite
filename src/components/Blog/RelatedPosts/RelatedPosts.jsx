// src/components/Blog/RelatedPosts/RelatedPosts.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './RelatedPosts.css';
import { formatBlogDate, getRelatedPosts } from '../../../utils/blogHelpers';
import { BLOG_POSTS } from '../../../data/blogPosts';

const RelatedPosts = ({
  currentPost,
  maxPosts = 3,
  showMoreButton = true,
  variant = 'default', // 'default', 'compact'
  title = 'Related Articles',
  subtitle = 'Continue exploring with these handpicked articles',
  className = ''
}) => {
  // Get related posts based on current post
  const relatedPosts = currentPost 
    ? getRelatedPosts(currentPost, BLOG_POSTS, maxPosts)
    : BLOG_POSTS.slice(0, maxPosts);

  if (!relatedPosts || relatedPosts.length === 0) {
    return (
      <section className={`related-posts-section ${variant} ${className}`}>
        <div className="related-posts-container">
          <div className="related-posts-empty">
            <h3>No Related Articles Found</h3>
            <p>Check back soon for more great content, or explore our blog categories.</p>
            {showMoreButton && (
              <Link to="/blog" className="more-articles-btn">
                View All Articles
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`related-posts-section ${variant} ${className}`} role="complementary">
      <div className="related-posts-container">
        
        {/* Header */}
        <header className="related-posts-header">
          <h2 className="related-posts-title">{title}</h2>
          {subtitle && (
            <p className="related-posts-subtitle">{subtitle}</p>
          )}
        </header>

        {/* Posts Grid */}
        <div className="related-posts-grid">
          {relatedPosts.map((post) => (
            <RelatedPostCard 
              key={post.id} 
              post={post} 
              currentPostId={currentPost?.id}
            />
          ))}
        </div>

        {/* More Articles Button */}
        {showMoreButton && (
          <footer className="related-posts-footer">
            <Link to="/blog" className="more-articles-btn">
              View All Articles
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </Link>
          </footer>
        )}
      </div>
    </section>
  );
};

// Individual Related Post Card Component
const RelatedPostCard = ({ post, currentPostId }) => {
  const handleCardClick = (e) => {
    // Prevent navigation if clicking on interactive elements
    if (e.target.closest('.related-read-more')) {
      return;
    }
  };

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="related-post-card"
      onClick={handleCardClick}
      aria-label={`Read article: ${post.title}`}
    >
      {/* Image */}
      <div className="related-post-image">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
        />
        <div className="related-post-overlay" aria-hidden="true"></div>
      </div>

      {/* Content */}
      <div className="related-post-content">
        
        {/* Category */}
        <div className="related-post-category">
          <span 
            className="related-category-dot" 
            style={{ backgroundColor: post.category.color }}
            aria-hidden="true"
          ></span>
          {post.category.name}
        </div>

        {/* Title */}
        <h3 className="related-post-title">{post.title}</h3>

        {/* Excerpt */}
        <p className="related-post-excerpt">{post.excerpt}</p>

        {/* Meta Information */}
        <div className="related-post-meta">
          <div className="related-post-author">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="related-author-avatar"
              loading="lazy"
            />
            <span className="related-author-name">{post.author.name}</span>
          </div>
          <time className="related-post-date" dateTime={post.publishedAt}>
            {formatBlogDate(post.publishedAt)}
          </time>
        </div>

        {/* Stats */}
        <div className="related-post-stats">
          <div className="related-stat-item">
            <svg className="related-stat-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {post.readTime} min
          </div>
          <div className="related-stat-item">
            <svg className="related-stat-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            {post.views > 999 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
          </div>
          <div className="related-stat-item">
            <svg className="related-stat-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            {post.likes}
          </div>
        </div>

        {/* Read More Button */}
        <button 
          className="related-read-more"
          aria-label={`Read more about ${post.title}`}
        >
          Read Article
        </button>
      </div>
    </Link>
  );
};

// Loading component for when posts are being fetched
export const RelatedPostsLoading = ({ count = 3, variant = 'default', className = '' }) => {
  return (
    <section className={`related-posts-section ${variant} ${className}`}>
      <div className="related-posts-container">
        <div className="related-posts-loading">
          <div className="related-loading-spinner" aria-label="Loading related articles"></div>
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;