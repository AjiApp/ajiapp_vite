// src/pages/Blog/BlogPost/BlogPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './BlogPost.css';
import BlogSidebar from '../../../components/Blog/BlogSidebar/BlogSidebar';
import RelatedPosts from '../../../components/Blog/RelatedPosts/RelatedPosts';
import { getPostBySlug } from '../../../data/blogPosts';
import { formatBlogDate, generateBlogSEO } from '../../../utils/blogHelpers';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [fontSize, setFontSize] = useState('medium');
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundPost = getPostBySlug(slug);
        
        if (!foundPost) {
          setError('Article not found');
          return;
        }
        
        setPost(foundPost);
        setLikeCount(foundPost.likes);
        
        // Set up SEO
        const seo = generateBlogSEO(foundPost);
        document.title = seo.title;
        
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.name = 'description';
          document.head.appendChild(metaDescription);
        }
        metaDescription.content = seo.description;
        
        // Add structured data
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(seo.structuredData);
        document.head.appendChild(script);
        
      } catch (err) {
        setError('Failed to load article');
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }

    // Cleanup function
    return () => {
      // Remove structured data script when component unmounts
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent.includes(slug)) {
          script.remove();
        }
      });
    };
  }, [slug]);

  // Table of contents generation
  useEffect(() => {
    if (post?.content) {
      const headings = extractHeadings(post.content);
      if (headings.length > 2) {
        setShowTableOfContents(true);
      }
    }
  }, [post]);

  // Scroll spy for table of contents
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('.blog-content h2, .blog-content h3');
      let currentSection = '';

      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = heading.id;
        }
      });

      setActiveSection(currentSection);
    };

    if (showTableOfContents) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showTableOfContents]);

  const extractHeadings = (content) => {
    const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/g;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      headings.push({ level, text, id });
    }

    return headings;
  };

  const addIdsToHeadings = (content) => {
    return content.replace(/<h([2-3])([^>]*)>(.*?)<\/h[2-3]>/g, (match, level, attrs, text) => {
      const id = text.replace(/<[^>]*>/g, '').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    });
  };

  const handleLike = async () => {
    try {
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
      
      // Here you would typically make an API call to update the like count
      // await updatePostLikes(post.id, !isLiked);
    } catch (error) {
      // Revert on error
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
      console.error('Error updating like:', error);
    }
  };

  const handleShare = async (platform) => {
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
      try {
        await navigator.clipboard.writeText(url);
        // Show success message (you could use a toast notification here)
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-container">
          <div className="error-container">
            <div className="error-content">
              <h1>Article Not Found</h1>
              <p>{error || 'The article you\'re looking for doesn\'t exist or has been moved.'}</p>
              <div className="error-actions">
                <button onClick={() => navigate('/blog')} className="btn btn-primary">
                  Back to Blog
                </button>
                <Link to="/" className="btn btn-secondary">
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="blog-post-container">
        
        {/* Breadcrumbs */}
        <nav className="post-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/blog" className="breadcrumb-link">Blog</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to={`/blog/category/${post.category.id}`} className="breadcrumb-link">
            {post.category.name}
          </Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{post.title}</span>
        </nav>

        <div className="post-layout">
          
          {/* Main Content */}
          <main className="post-main">
            <article className="blog-post-article">
              
              {/* Post Header */}
              <header className="post-header">
                <div className="post-category">
                  <Link 
                    to={`/blog/category/${post.category.id}`}
                    className="category-link"
                    style={{ backgroundColor: post.category.color }}
                  >
                    {post.category.name}
                  </Link>
                </div>
                
                <h1 className="post-title">{post.title}</h1>
                
                <div className="post-meta">
                  <div className="post-author">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="author-avatar"
                    />
                    <div className="author-info">
                      <span className="author-name">{post.author.name}</span>
                      <span className="author-bio">{post.author.bio}</span>
                    </div>
                  </div>
                  
                  <div className="post-stats">
                    <time className="post-date" dateTime={post.publishedAt}>
                      {formatBlogDate(post.publishedAt)}
                    </time>
                    <span className="post-read-time">{post.readTime} min read</span>
                    <span className="post-views">{post.views.toLocaleString()} views</span>
                  </div>
                </div>
                
                {/* Featured Image */}
                <div className="post-featured-image">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="eager"
                  />
                </div>
              </header>

              {/* Post Actions */}
              <div className="post-actions">
                <div className="post-controls">
                  <div className="font-size-controls">
                    <span>Font size:</span>
                    <button 
                      className={fontSize === 'small' ? 'active' : ''}
                      onClick={() => setFontSize('small')}
                    >
                      A
                    </button>
                    <button 
                      className={fontSize === 'medium' ? 'active' : ''}
                      onClick={() => setFontSize('medium')}
                    >
                      A
                    </button>
                    <button 
                      className={fontSize === 'large' ? 'active' : ''}
                      onClick={() => setFontSize('large')}
                    >
                      A
                    </button>
                  </div>
                </div>
                
                <div className="post-engagement">
                  <button 
                    className={`like-button ${isLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                    aria-label={`${isLiked ? 'Unlike' : 'Like'} this article`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {likeCount}
                  </button>
                  
                  <div className="share-buttons">
                    <span>Share:</span>
                    <button onClick={() => handleShare('twitter')} aria-label="Share on Twitter">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    <button onClick={() => handleShare('facebook')} aria-label="Share on Facebook">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button onClick={() => handleShare('linkedin')} aria-label="Share on LinkedIn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                    <button onClick={() => handleShare('copy')} aria-label="Copy link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              {showTableOfContents && (
                <div className="table-of-contents">
                  <h3>Table of Contents</h3>
                  <ul>
                    {extractHeadings(post.content).map((heading, index) => (
                      <li key={index} className={`toc-level-${heading.level}`}>
                        <button 
                          onClick={() => scrollToSection(heading.id)}
                          className={activeSection === heading.id ? 'active' : ''}
                        >
                          {heading.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Post Content */}
              <div 
                className={`blog-content font-size-${fontSize}`}
                dangerouslySetInnerHTML={{ __html: addIdsToHeadings(post.content) }}
              />

              {/* Post Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="post-tags">
                  <h3>Tags</h3>
                  <div className="tags-list">
                    {post.tags.map((tag, index) => (
                      <Link 
                        key={index}
                        to={`/blog?search=${encodeURIComponent(tag)}`}
                        className="tag"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="author-bio-section">
                <h3>About the Author</h3>
                <div className="author-bio-card">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="author-bio-avatar"
                  />
                  <div className="author-bio-content">
                    <h4>{post.author.name}</h4>
                    <p>{post.author.bio}</p>
                    {post.author.social && Object.keys(post.author.social).length > 0 && (
                      <div className="author-social">
                        {post.author.social.twitter && (
                          <a 
                            href={`https://twitter.com/${post.author.social.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Follow ${post.author.name} on Twitter`}
                          >
                            Twitter
                          </a>
                        )}
                        {post.author.social.instagram && (
                          <a 
                            href={`https://instagram.com/${post.author.social.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Follow ${post.author.name} on Instagram`}
                          >
                            Instagram
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </main>

          {/* Sidebar */}
          <aside className="post-sidebar">
            <BlogSidebar 
              showSearch={true}
              showRecentPosts={true}
              showCategories={true}
              showTags={true}
              showNewsletter={true}
              showSocial={true}
            />
          </aside>
        </div>

        {/* Related Posts */}
        <RelatedPosts 
          currentPost={post}
          maxPosts={3}
          showMoreButton={true}
          title="Related Articles"
          subtitle="Continue exploring with these handpicked articles"
        />
      </div>
    </div>
  );
};

export default BlogPost;