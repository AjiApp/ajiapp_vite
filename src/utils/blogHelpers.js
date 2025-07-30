// src/utils/blogHelpers.js - Utilitaires spécifiques au blog
export const formatBlogDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

export const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const generateExcerpt = (content, maxLength = 160) => {
  const textContent = content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ');
  if (textContent.length <= maxLength) {
    return textContent;
  }
  return textContent.substring(0, maxLength).trim() + '...';
};

export const generateBlogSEO = (post) => {
  return {
    title: `${post.title} - AJI Blog | Your Guide to Morocco`,
    description: post.excerpt,
    keywords: [...post.tags, 'Morocco', 'travel', 'guide', 'AJI'],
    canonicalUrl: `${window.location.origin}/blog/${post.slug}`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      image: post.image,
      type: 'article',
      author: post.author.name,
      publishedTime: post.publishedAt,
      section: post.category.name,
      tags: post.tags
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image,
      "author": {
        "@type": "Person",
        "name": post.author.name
      },
      "publisher": {
        "@type": "Organization",
        "name": "AJI App",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        }
      },
      "datePublished": post.publishedAt,
      "dateModified": post.publishedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${window.location.origin}/blog/${post.slug}`
      }
    }
  };
};

export const filterPostsBySearch = (posts, searchTerm) => {
  if (!searchTerm) return posts;
  
  const search = searchTerm.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(search) ||
    post.excerpt.toLowerCase().includes(search) ||
    post.content.toLowerCase().includes(search) ||
    post.tags.some(tag => tag.toLowerCase().includes(search)) ||
    post.author.name.toLowerCase().includes(search) ||
    post.category.name.toLowerCase().includes(search)
  );
};

export const getRelatedPosts = (currentPost, allPosts, maxResults = 3) => {
  return allPosts
    .filter(post => post.id !== currentPost.id)
    .map(post => {
      let score = 0;
      
      // Same category gets high priority
      if (post.category.id === currentPost.category.id) {
        score += 10;
      }
      
      // Shared tags
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      ).length;
      score += sharedTags * 2;
      
      // Recent posts get slight bonus
      const daysDiff = Math.abs(
        new Date(post.publishedAt) - new Date(currentPost.publishedAt)
      ) / (1000 * 60 * 60 * 24);
      
      if (daysDiff < 30) score += 1;
      
      return { ...post, relevanceScore: score };
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxResults);
};