// src/pages/Blog/BlogHome/BlogHome.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './BlogHome.css';
import BlogHero from '../../../components/Blog/BlogHero/BlogHero';
import BlogCard from '../../../components/Blog/BlogCard/BlogCard';
import BlogSidebar from '../../../components/Blog/BlogSidebar/BlogSidebar';
import { 
  BLOG_POSTS, 
  BLOG_CATEGORIES, 
  getFeaturedPosts,
  getRecentPosts 
} from '../../../data/blogPosts';
import { filterPostsBySearch } from '../../../utils/blogHelpers';

const BlogHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'popularity', 'title'
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  // Get URL parameters
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const sortParam = searchParams.get('sort') || 'date';

  useEffect(() => {
    setSortBy(sortParam);
  }, [sortParam]);

  useEffect(() => {
    document.title = 'AJI Blog - Your Guide to Morocco | Travel Tips & Insights';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover Morocco through expert travel guides, cultural insights, and practical tips. Your ultimate resource for exploring Morocco with confidence.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Discover Morocco through expert travel guides, cultural insights, and practical tips. Your ultimate resource for exploring Morocco with confidence.';
      document.head.appendChild(meta);
    }
  }, []);

  // Filter and sort posts
  useEffect(() => {
    setLoading(true);
    
    let filtered = [...posts];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filterPostsBySearch(filtered, searchQuery);
    }
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(post => post.category.id === categoryFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
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
    
    setTimeout(() => {
      setFilteredPosts(filtered);
      setLoading(false);
      setCurrentPage(1);
    }, 300);
  }, [posts, searchQuery, categoryFilter, sortBy]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSearch = (query) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleCategoryFilter = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId && categoryId !== categoryFilter) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }
    params.delete('search'); // Clear search when filtering by category
    setSearchParams(params);
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

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const getSortLabel = (sort) => {
    const labels = {
      date: 'Latest First',
      popularity: 'Most Popular',
      title: 'Alphabetical'
    };
    return labels[sort] || 'Latest First';
  };

  const featuredPosts = getFeaturedPosts();
  const hasActiveFilters = searchQuery || categoryFilter;

  return (
    <div className="blog-home">
      {/* Hero Section */}
      <BlogHero
        title="AJI Blog"
        subtitle="Your ultimate guide to Morocco travel, culture, and experiences"
        showSearch={true}
        showFeatured={!hasActiveFilters && featuredPosts.length > 0}
        showCategories={!hasActiveFilters}
        showStats={true}
        featuredPost={featuredPosts[0]}
        onSearch={handleSearch}
        searchPlaceholder="Search articles, destinations, tips..."
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Blog' }
        ]}
      />

      <div className="blog-home-container">
        <main className="blog-main-content">
          
          {/* Search Results Header */}
          {searchQuery && (
            <div className="search-results-header">
              <h2 className="search-results-title">
                Search results for "<span className="search-query">{searchQuery}</span>"
              </h2>
              <p className="search-results-meta">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          )}

          {/* Featured Section (only on main page) */}
          {!hasActiveFilters && featuredPosts.length > 1 && (
            <section className="featured-section">
              <div className="featured-header">
                <svg className="featured-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <h2 className="featured-title">Featured Articles</h2>
              </div>
              <div className="featured-posts">
                <div className="featured-main">
                  <BlogCard 
                    post={featuredPosts[0]} 
                    showTags={true}
                    showStats={true}
                  />
                </div>
                <div className="featured-secondary">
                  {featuredPosts.slice(1, 3).map(post => (
                    <BlogCard 
                      key={post.id}
                      post={post} 
                      variant="compact"
                      showTags={false}
                      showStats={false}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Filters Bar */}
          <div className="blog-filters">
            <div className="filters-header">
              <h3 className="filters-title">
                {hasActiveFilters ? 'Filtered Results' : 'All Articles'}
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

            {/* Category Filters */}
            <div className="category-filters">
              <button
                className={`category-filter ${!categoryFilter ? 'active' : ''}`}
                onClick={() => handleCategoryFilter('')}
              >
                All Categories
              </button>
              {BLOG_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  className={`category-filter ${categoryFilter === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter(category.id)}
                >
                  <span 
                    className="category-filter-dot"
                    style={{ backgroundColor: category.color }}
                  ></span>
                  {category.name}
                </button>
              ))}
              {hasActiveFilters && (
                <button
                  className="category-filter"
                  onClick={clearAllFilters}
                  style={{ 
                    background: 'rgba(220, 53, 69, 0.1)',
                    borderColor: 'rgba(220, 53, 69, 0.2)',
                    color: '#dc3545'
                  }}
                >
                  ✕ Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="loading-message">
              <div className="loading-spinner"></div>
              <p>Loading articles...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="empty-state">
              <svg className="empty-state-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <h3>No articles found</h3>
              <p>
                {searchQuery 
                  ? `No articles match "${searchQuery}". Try different keywords or browse our categories.`
                  : 'No articles available in this category. Check back soon for new content!'
                }
              </p>
              <div className="empty-state-actions">
                {hasActiveFilters && (
                  <button 
                    className="empty-state-button"
                    onClick={clearAllFilters}
                  >
                    Clear Filters
                  </button>
                )}
                <button 
                  className="empty-state-button secondary"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <>
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
                <div className="blog-pagination">
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
        </main>

        {/* Sidebar */}
        <BlogSidebar 
          onSearch={handleSearch}
          showSearch={false} // Already have search in hero
          showRecentPosts={true}
          showCategories={true}
          showTags={true}
          showNewsletter={true}
          showSocial={true}
          showArchive={false}
        />
      </div>
    </div>
  );
};

export default BlogHome;