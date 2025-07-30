// src/components/Blog/BlogCard/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';
import { formatBlogDate } from '../../../utils/blogHelpers';

const BlogCard = ({ 
  post, 
  variant = 'default', // 'default', 'compact', 'loading'
  showTags = true,
  showStats = true,
  className = '' 
}) => {
  if (variant === 'loading') {
    return (
      <div className={`blog-card loading ${className}`}>
        <div className="card-image-container">
          <div className="card-image"></div>
        </div>
        <div className="card-content">
          <div className="card-category">Loading...</div>
          <div className="card-title">Loading title placeholder text here</div>
          <div className="card-excerpt">Loading excerpt placeholder text that would normally show a preview of the blog post content.</div>
          <div className="card-meta">
            <div className="card-author">
              <div className="author-avatar"></div>
              <div className="author-name">Loading</div>
            </div>
            <div className="card-date">Loading</div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on interactive elements
    if (e.target.closest('.tag, .read-more-btn')) {
      return;
    }
  };

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    // Could navigate to tag search or filter
    console.log('Tag clicked:', tag);
  };

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`blog-card ${variant} ${post.featured ? 'featured' : ''} ${className}`}
      onClick={handleCardClick}
      aria-label={`Read article: ${post.title}`}
    >
      {/* Featured Badge */}
      {post.featured && (
        <div className="featured-badge" aria-label="Featured article">
          Featured
        </div>
      )}

      {/* Image */}
      <div className="card-image-container">
        <img
          src={post.image}
          alt={post.title}
          className="card-image"
          loading="lazy"
          decoding="async"
        />
        <div className="image-overlay" aria-hidden="true"></div>
      </div>

      {/* Content */}
      <div className="card-content">
        {/* Category */}
        <div className="card-category">
          <span 
            className="category-dot" 
            style={{ backgroundColor: post.category.color }}
            aria-hidden="true"
          ></span>
          {post.category.name}
        </div>

        {/* Title */}
        <h3 className="card-title">{post.title}</h3>

        {/* Excerpt */}
        <p className="card-excerpt">{post.excerpt}</p>

        {/* Meta Information */}
        <div className="card-meta">
          <div className="card-author">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="author-avatar"
              loading="lazy"
            />
            <span className="author-name">{post.author.name}</span>
          </div>
          <time className="card-date" dateTime={post.publishedAt}>
            {formatBlogDate(post.publishedAt)}
          </time>
        </div>

        {/* Stats */}
        {showStats && (
          <div className="card-stats">
            <div className="stat-item">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {post.readTime} min read
            </div>
            <div className="stat-item">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              {post.views.toLocaleString()}
            </div>
            <div className="stat-item">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              {post.likes}
            </div>
          </div>
        )}

        {/* Tags */}
        {showTags && post.tags && post.tags.length > 0 && (
          <div className="card-tags">
            {post.tags.slice(0, 3).map((tag, index) => (
              <button
                key={index}
                className="tag"
                onClick={(e) => handleTagClick(e, tag)}
                aria-label={`Filter by ${tag} tag`}
              >
                {tag}
              </button>
            ))}
            {post.tags.length > 3 && (
              <span className="tag">+{post.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Read More Button */}
        <button className="read-more-btn" aria-label={`Read more about ${post.title}`}>
          Read Article
        </button>
      </div>
    </Link>
  );
};

export default BlogCard;