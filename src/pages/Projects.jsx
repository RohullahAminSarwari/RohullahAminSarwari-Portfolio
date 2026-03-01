import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects } = useData();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = ['All', 'Web Development', 'Mobile App', 'UI/UX Design', 'Software'];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'All' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 dark:from-blue-500 dark:via-cyan-400 dark:to-emerald-400">Projects</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            A collection of my recent work, ranging from web applications to complex software solutions.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-300 border-2 ${
                  filter === cat
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-white dark:bg-[#1e293b]/40 border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 backdrop-blur-sm'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative max-w-sm mx-auto">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xs"></i>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#1e293b]/30 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm text-gray-900 dark:text-white shadow-sm backdrop-blur-md"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`group relative bg-white dark:bg-[#1e293b]/20 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fade-in backdrop-blur-md`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={project.image || 'https://via.placeholder.com/800x500'} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex gap-3">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-[#020617] transition-all border border-white/20 text-sm">
                      <i className="fab fa-github"></i>
                    </a>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-[#020617] transition-all border border-white/20 text-sm">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                <span className="px-2 py-0.5 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest border border-blue-500/20">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-gray-50 dark:bg-[#1e293b]/20 rounded-[2.5rem] border border-gray-100 dark:border-white/5 backdrop-blur-sm">
            <i className="fas fa-search text-5xl text-gray-200 dark:text-gray-800 mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
