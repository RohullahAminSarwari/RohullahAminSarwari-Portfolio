import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { blogPosts } = useData();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    ...Array.from(new Set(blogPosts.map(post => post.category)))
      .map(category => ({
        id: category,
        name: category,
        count: blogPosts.filter(post => post.category === category).length
      }))
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Insights & <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">Articles</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Exploring the intersection of technology, design, and software engineering.
          </p>
        </div>

        <div className="mb-12 space-y-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border-2 ${
                  selectedCategory === cat.id
                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                    : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-primary-500'
                }`}
              >
                {cat.name.toUpperCase()} {cat.count !== undefined && `(${cat.count})`}
              </button>
            ))}
          </div>

          <div className="relative max-w-md mx-auto">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Link 
              key={post.id}
              to={`/blog/${post.id}`}
              className="group relative bg-white dark:bg-[#1e293b]/20 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2 flex flex-col backdrop-blur-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Blog Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden m-3 rounded-[2rem]">
                <img 
                  src={post.image || 'https://via.placeholder.com/800x450'} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest border border-white/20 shadow-lg">
                    {post.category}
                  </span>
                </div>
                
                {/* Read indicator on hover */}
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl scale-0 group-hover:scale-100 transition-transform duration-500">
                    <i className="fas fa-book-open"></i>
                  </div>
                </div>
              </div>
              
              {/* Blog Content */}
              <div className="p-8 pt-2 flex flex-col flex-grow space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <i className="far fa-calendar-alt text-blue-500"></i>
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="far fa-clock text-blue-500"></i>
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 font-medium flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-white/5">
                  <span className="text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest flex items-center group-hover:gap-2 transition-all">
                    Read Article <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </span>
                  
                  <div className="flex gap-1">
                    {post.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[9px] font-bold text-gray-400 dark:text-gray-500">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800">
            <i className="fas fa-feather-alt text-6xl text-gray-200 dark:text-gray-800 mb-6"></i>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or category filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
