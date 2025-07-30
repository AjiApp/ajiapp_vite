// src/pages/Blog/BlogCategory/BlogCategory.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './BlogCategory.css';
import BlogCard from '../../../components/Blog/BlogCard/BlogCard';
import BlogSidebar from '../../../components/Blog/BlogSidebar/BlogSidebar';
import { 
  BLOG_CATEGORIES, 
  getPostsByCategory,
  BLOG_POSTS 
} from '../../../data/blogPosts';

const BlogCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  // Get URL parameters
  const sortParam = searchParams.get('sort') || 'date';

  useEffect(() => {
    setSortBy(sortParam);
  }, [sortParam]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        
        // Find category
        const foundCategory = BLOG_CATEGORIES.find(cat => cat.id === categoryId);
        if (!foundCategory) {
          setError('Category not found');
          return;
        }
        
        // Get posts for this category
        const categoryPosts = getPostsByCategory(categoryId);
        
        setCategory(foundCategory);
        setPosts(categoryPosts);
        
        // Set up SEO
        document.title = `${foundCategory.name} Articles - AJI Blog | Your Guide to Morocco`;
        
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.name = 'description';
          document.head.appendChild(metaDescription);
        }
        metaDescription.content = `Explore ${foundCategory.name.toLowerCase()} articles about Morocco. ${foundCategory.description}`;
        
      } catch (err) {
        setError('Failed to load category');
        console.error('Error loading category:', err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

  // Sort posts
  useEffect(() => {
    let sorted = [...posts];
    
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.views + b.likes) - (a.views + a.likes);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return new Date(b.publishedAt) - new Date(a.publishedAt);
      }
    });
    
    setFilteredPosts(sorted);
    setCurrentPage(1);
  }, [posts, sortBy]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSearch = (query) => {
    navigate(`/blog?search=${encodeURIComponent(query)}`);
  };

  const handleSortChange = (newSort) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    setSearchParams(params);
    setSortDropdownOpen(false);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSortLabel = (sort) => {
    const labels = {
      date: 'Latest First',
      popularity: 'Most Popular',
      title: 'Alphabetical'
    };
    return labels[sort] || 'Latest First';
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

  if (loading) {
    return (
      <div className="blog-category-page">
        <div className="blog-category-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading category...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="blog-category-page">
        <div className="blog-category-container">
          <div className="error-container">
            <div className="error-content">
              <h1>Category Not Found</h1>
              <p>{error || 'The category you\'re looking for doesn\'t exist.'}</p>
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
    <div className="blog-category-page">
      
      {/* Category Hero */}
      <div className="category-hero">
        <div className="category-hero-container">
          
          {/* Breadcrumbs */}
          <nav className="category-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <Link to="/blog" className="breadcrumb-link">Blog</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{category.name}</span>
          </nav>

          {/* Category Info */}
          <div className="category-info">
            <div 
              className="category-icon"
              style={{ backgroundColor: category.color }}
            >
              {getCategoryIcon(category.id)}
            </div>
            <div className="category-details">
              <h1 className="category-title">{category.name}</h1>
              <p className="category-description">{category.description}</p>
              <div className="category-stats">
                <span className="post-count">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-category-container">
        <div className="category-layout">
          
          {/* Main Content */}
          <main className="category-main">
            
            {/* Other Categories */}
            <div className="other-categories">
              <h2>Browse Other Categories</h2>
              <div className="categories-grid">
                {BLOG_CATEGORIES.filter(cat => cat.id !== categoryId).map(cat => (
                  <Link
                    key={cat.id}
                    to={`/blog/category/${cat.id}`}
                    className="category-card"
                  >
                    <div 
                      className="category-card-icon"
                      style={{ backgroundColor: cat.color }}
                    >
                      {getCategoryIcon(cat.id)}
                    </div>
                    <div className="category-card-content">
                      <h3>{cat.name}</h3>
                      <p>{cat.description}</p>
                      <span className="category-card-count">
                        {getPostsByCategory(cat.id).length} articles
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {filteredPosts.length > 0 && (
              <>
                {/* Filters Bar */}
                <div className="category-filters">
                  <div className="filters-header">
                    <h3 className="filters-title">
                      {category.name} Articles
                    </h3>
                    <span className="results-count">
                      {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                    </span>
                    <div className="filters-controls">
                      {/* View Toggle */}
                      <div className="view-toggle">
                        <button
                          className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                          onClick={() => handleViewModeChange('grid')}
                          aria-label="Grid view"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
                          </svg>
                        </button>
                        <button
                          className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                          onClick={() => handleViewModeChange('list')}
                          aria-label="List view"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                          </svg>
                        </button>
                      </div>

                      {/* Sort Dropdown */}
                      <div className="sort-dropdown">
                        <button
                          className="sort-button"
                          onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                          aria-label="Sort options"
                        >
                          Sort: {getSortLabel(sortBy)}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z"/>
                          </svg>
                        </button>
                        {sortDropdownOpen && (
                          <div className="sort-dropdown-menu">
                            <button
                              className={`sort-option ${sortBy === 'date' ? 'active' : ''}`}
                              onClick={() => handleSortChange('date')}
                            >
                              Latest First
                            </button>
                            <button
                              className={`sort-option ${sortBy === 'popularity' ? 'active' : ''}`}
                              onClick={() => handleSortChange('popularity')}
                            >
                              Most Popular
                            </button>
                            <button
                              className={`sort-option ${sortBy === 'title' ? 'active' : ''}`}
                              onClick={() => handleSortChange('title')}
                            >
                              Alphabetical
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posts Grid */}
                <div className={`posts-grid ${viewMode}-view`}>
                  {currentPosts.map(post => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      variant={viewMode === 'list' ? 'compact' : 'default'}
                      showTags={true}
                      showStats={true}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="category-pagination">
                    <button
                      className="pagination-button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => {
                      const page = index + 1;
                      const isVisible = 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 2 && page <= currentPage + 2);
                      
                      if (!isVisible) {
                        if (page === currentPage - 3 || page === currentPage + 3) {
                          return <span key={page}>...</span>;
                        }
                        return null;
                      }
                      
                      return (
                        <button
                          key={page}
                          className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      className="pagination-button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                      </svg>
                    </button>

                    <div className="pagination-info">
                      Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="empty-state">
                <div 
                  className="empty-state-icon"
                  style={{ backgroundColor: category.color }}
                >
                  {getCategoryIcon(category.id)}
                </div>
                <h3>No articles yet</h3>
                <p>
                  We haven't published any articles in the {category.name.toLowerCase()} category yet. 
                  Check back soon for new content!
                </p>
                <div className="empty-state-actions">
                  <Link to="/blog" className="empty-state-button">
                    Browse All Articles
                  </Link>
                  <Link to="/" className="empty-state-button secondary">
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="category-sidebar">
            <BlogSidebar 
              onSearch={handleSearch}
              showSearch={true}
              showRecentPosts={true}
              showCategories={true}
              showTags={true}
              showNewsletter={true}
              showSocial={true}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogCategory;