import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import ImageUpload from './ImageUpload';
import { deleteImage } from '../utils/imageUpload';

const AdminDashboard = () => {
  const { 
    projects, 
    blogPosts, 
    projectCategories,
    blogCategories,
    customSkills,
    addProject, 
    updateProject, 
    deleteProject, 
    addBlogPost, 
    updateBlogPost, 
    deleteBlogPost,
    addProjectCategory,
    addBlogCategory,
    removeProjectCategory,
    removeBlogCategory,
    addCustomSkill,
    updateCustomSkill,
    deleteCustomSkill,
    logoutAdmin,
    clearAllData,
    clearBlogPosts,
    exportData,
    homeData,
    aboutData,
    resumeData,
    contactData,
    updateHomeData,
    updateAboutData,
    updateResumeData,
    updateContactData
  } = useData();

  const [activeTab, setActiveTab] = useState('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categoryType, setCategoryType] = useState('project'); // project or blog
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    percentage: 80,
    description: '',
    category: 'Technical',
    icon: 'fas fa-code',
    color: '#3B82F6'
  });

  // Default skill icons and colors
  const defaultSkillIcons = [
    'fas fa-code',
    'fas fa-laptop-code',
    'fas fa-server',
    'fas fa-database',
    'fas fa-paint-brush',
    'fas fa-palette',
    'fas fa-cogs',
    'fas fa-tools',
    'fas fa-mobile-alt',
    'fas fa-cloud',
    'fas fa-shield-alt',
    'fas fa-rocket',
    'fas fa-lightbulb',
    'fas fa-star',
    'fas fa-gem'
  ];

  const defaultSkillColors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#EC4899', // Pink
    '#84CC16', // Lime
    '#6366F1', // Indigo
    '#14B8A6', // Teal
    '#F43F5E', // Rose
    '#A855F7', // Violet
    '#0EA5E9', // Sky
    '#22C55E'  // Emerald
  ];

  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    imageFileName: '',
    technologies: '',
    category: 'Web Development',
    status: 'Completed',
    githubUrl: '',
    liveUrl: '',
    featured: false
  });

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    category: 'React',
    tags: '',
    readTime: '',
    featured: false,
    postType: 'text', // text, image, video, youtube
    image: '',
    imageFileName: '',
    videoFile: null,
    videoUrl: '',
    youtubeUrl: '',
    youtubeThumbnail: ''
  });

  const handleImageSelect = (imageUrl, fileName) => {
    setProjectForm(prev => ({
      ...prev,
      image: imageUrl,
      imageFileName: fileName
    }));
  };

  const handleBlogImageSelect = (imageUrl, fileName) => {
    setBlogForm(prev => ({
      ...prev,
      image: imageUrl,
      imageFileName: fileName
    }));
  };

  // Extract YouTube video ID and thumbnail
  const extractYouTubeInfo = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      const videoId = match[2];
      return {
        videoId,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`
      };
    }
    return null;
  };

  const handleYouTubeUrlChange = (url) => {
    setBlogForm(prev => ({
      ...prev,
      youtubeUrl: url
    }));
    
    const youtubeInfo = extractYouTubeInfo(url);
    if (youtubeInfo) {
      setBlogForm(prev => ({
        ...prev,
        youtubeUrl: url,
        youtubeThumbnail: youtubeInfo.thumbnail
      }));
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      if (categoryType === 'project') {
        addProjectCategory(newCategory.trim());
      } else {
        addBlogCategory(newCategory.trim());
      }
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category, type) => {
    if (type === 'project') {
      removeProjectCategory(category);
    } else {
      removeBlogCategory(category);
    }
  };

  // Skill form handlers
  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (editingSkill) {
      updateCustomSkill(editingSkill.id, skillForm);
      setEditingSkill(null);
    } else {
      addCustomSkill(skillForm);
    }
    
    // Reset form with random defaults
    const randomIcon = defaultSkillIcons[Math.floor(Math.random() * defaultSkillIcons.length)];
    const randomColor = defaultSkillColors[Math.floor(Math.random() * defaultSkillColors.length)];
    
    setSkillForm({
      name: '',
      percentage: 80,
      description: '',
      category: 'Technical',
      icon: randomIcon,
      color: randomColor
    });
    setShowSkillForm(false);
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setSkillForm({
      name: skill.name,
      percentage: skill.percentage,
      description: skill.description,
      category: skill.category,
      icon: skill.icon,
      color: skill.color
    });
    setShowSkillForm(true);
  };

  const handleDeleteSkill = (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      deleteCustomSkill(id);
      alert('Skill deleted successfully!');
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(tech => tech.trim()),
      featured: projectForm.featured
    };

    if (editingProject) {
      // Delete old image if it exists and is different
      if (editingProject.imageFileName && editingProject.imageFileName !== projectForm.imageFileName) {
        deleteImage(editingProject.imageFileName);
      }
      updateProject(editingProject.id, projectData);
      setEditingProject(null);
    } else {
      addProject(projectData);
    }

    setProjectForm({
      title: '',
      description: '',
      image: '',
      imageFileName: '',
      technologies: '',
      category: 'Web Development',
      status: 'Completed',
      githubUrl: '',
      liveUrl: '',
      featured: false
    });
    setShowProjectForm(false);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      ...blogForm,
      tags: blogForm.tags.split(',').map(tag => tag.trim()),
      featured: blogForm.featured
    };

    if (editingBlog) {
      updateBlogPost(editingBlog.id, blogData);
      setEditingBlog(null);
    } else {
      addBlogPost(blogData);
    }

    setBlogForm({
      title: '',
      excerpt: '',
      category: 'React',
      tags: '',
      readTime: '',
      featured: false,
      postType: 'text',
      image: '',
      imageFileName: '',
      videoFile: null,
      videoUrl: '',
      youtubeUrl: '',
      youtubeThumbnail: ''
    });
    setShowBlogForm(false);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      ...project,
      technologies: project.technologies.join(', '),
      imageFileName: project.imageFileName || ''
    });
    setShowProjectForm(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      ...blog,
      tags: blog.tags.join(', '),
      postType: blog.postType || 'text',
      image: blog.image || '',
      imageFileName: blog.imageFileName || '',
      videoFile: blog.videoFile || null,
      videoUrl: blog.videoUrl || '',
      youtubeUrl: blog.youtubeUrl || '',
      youtubeThumbnail: blog.youtubeThumbnail || ''
    });
    setShowBlogForm(true);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const project = projects.find(p => p.id === id);
      if (project && project.imageFileName) {
        deleteImage(project.imageFileName);
      }
      deleteProject(id);
      alert('Project deleted successfully!');
    }
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
      alert('Blog post deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <button
              onClick={exportData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              title="Export all data"
            >
              <i className="fas fa-download mr-2"></i>
              Export
            </button>
            <button
              onClick={clearBlogPosts}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
              title="Clear all blog posts"
            >
              <i className="fas fa-blog mr-2"></i>
              Clear Blog
            </button>
            <button
              onClick={clearAllData}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
              title="Clear all data (debug)"
            >
              <i className="fas fa-trash mr-2"></i>
              Clear All
            </button>
            <button
              onClick={logoutAdmin}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'blog'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Blog Posts ({blogPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'skills'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Skills ({customSkills.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <i className="fas fa-cog mr-2"></i>
            Settings
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setShowProjectForm(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add New Project
              </button>
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-800 rounded-lg p-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage Blog Posts</h2>
              <button
                onClick={() => {
                  setEditingBlog(null);
                  setShowBlogForm(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add New Post
              </button>
            </div>

            {/* Blog Posts List */}
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-white">{post.title}</h3>
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                          {post.postType || 'text'}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">{post.excerpt}</p>
                      
                      {/* Show media preview based on post type */}
                      {post.postType === 'image' && post.image && (
                        <div className="mb-2">
                          <img src={post.image} alt="Post preview" className="w-32 h-20 object-cover rounded" />
                        </div>
                      )}
                      
                      {post.postType === 'video' && (post.videoUrl || post.videoFile) && (
                        <div className="mb-2">
                          <video 
                            src={post.videoUrl || URL.createObjectURL(post.videoFile)} 
                            muted 
                            className="w-32 h-20 object-cover rounded"
                            preload="metadata"
                          />
                        </div>
                      )}
                      
                      {post.postType === 'youtube' && post.youtubeThumbnail && (
                        <div className="mb-2">
                          <img src={post.youtubeThumbnail} alt="YouTube preview" className="w-32 h-20 object-cover rounded" />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{post.category}</span>
                        <span>{post.readTime}</span>
                        <span>{post.date}</span>
                        {post.featured && (
                          <span className="px-2 py-1 bg-yellow-600 text-white rounded">Featured</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditBlog(post)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(post.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage Custom Skills</h2>
              <button
                onClick={() => {
                  setEditingSkill(null);
                  // Set random defaults for new skill
                  const randomIcon = defaultSkillIcons[Math.floor(Math.random() * defaultSkillIcons.length)];
                  const randomColor = defaultSkillColors[Math.floor(Math.random() * defaultSkillColors.length)];
                  
                  setSkillForm({
                    name: '',
                    percentage: 80,
                    description: '',
                    category: 'Technical',
                    icon: randomIcon,
                    color: randomColor
                  });
                  setShowSkillForm(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>
                Add New Skill
              </button>
            </div>

            {/* Skills List */}
            <div className="space-y-4">
              {customSkills.map((skill) => (
                <div key={skill.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: skill.color + '20' }}
                        >
                          <i className={`${skill.icon} text-xl`} style={{ color: skill.color }}></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                          <p className="text-gray-400 text-sm">{skill.category}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{skill.description}</p>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm text-gray-400 mb-1">
                            <span>Proficiency</span>
                            <span>{skill.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${skill.percentage}%`,
                                backgroundColor: skill.color
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditSkill(skill)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {customSkills.length === 0 && (
                <div className="text-center py-12">
                  <i className="fas fa-code text-5xl text-gray-600 mb-4"></i>
                  <h3 className="text-2xl font-bold text-white mb-2">No Custom Skills Yet</h3>
                  <p className="text-gray-400 mb-4">Add your custom skills to showcase your expertise</p>
                  <button
                    onClick={() => {
                      // Set random defaults for new skill
                      const randomIcon = defaultSkillIcons[Math.floor(Math.random() * defaultSkillIcons.length)];
                      const randomColor = defaultSkillColors[Math.floor(Math.random() * defaultSkillColors.length)];
                      
                      setSkillForm({
                        name: '',
                        percentage: 80,
                        description: '',
                        category: 'Technical',
                        icon: randomIcon,
                        color: randomColor
                      });
                      setShowSkillForm(true);
                    }}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Add First Skill
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8 pb-20">
            {/* Home Section Settings */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <i className="fas fa-home mr-3 text-blue-500"></i>
                Home Section Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">First Name</label>
                  <input
                    type="text"
                    value={homeData.firstName}
                    onChange={(e) => updateHomeData({ firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Last Name</label>
                  <input
                    type="text"
                    value={homeData.lastName}
                    onChange={(e) => updateHomeData({ lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Hero Status Text</label>
                  <input
                    type="text"
                    value={homeData.status}
                    onChange={(e) => updateHomeData({ status: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact Settings */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <i className="fas fa-address-book mr-3 text-emerald-500"></i>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => updateContactData({ email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">WhatsApp Number</label>
                  <input
                    type="text"
                    value={contactData.whatsapp}
                    onChange={(e) => updateContactData({ whatsapp: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={contactData.linkedin}
                    onChange={(e) => updateContactData({ linkedin: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={contactData.github}
                    onChange={(e) => updateContactData({ github: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                  <input
                    type="text"
                    value={contactData.location}
                    onChange={(e) => updateContactData({ location: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Expertise Section Management */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <i className="fas fa-layer-group mr-3 text-blue-400"></i>
                Resume Expertise Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['frontend', 'backend', 'tools', 'soft'].map((cat) => (
                  <div key={cat} className="space-y-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat}</label>
                    <textarea
                      placeholder="Skill 1, Skill 2..."
                      value={resumeData.expertise?.[cat]?.join(', ')}
                      onChange={(e) => {
                        const newExpertise = { ...resumeData.expertise };
                        newExpertise[cat] = e.target.value.split(',').map(s => s.trim());
                        updateResumeData({ expertise: newExpertise });
                      }}
                      className="w-full px-4 py-2 bg-gray-900 border border-white/10 rounded-xl text-white text-sm h-24 resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <i className="fas fa-file-alt mr-3 text-purple-500"></i>
                Resume Professional Summary
              </h3>
              <div>
                <textarea
                  rows="5"
                  value={resumeData.professionalSummary}
                  onChange={(e) => updateResumeData({ professionalSummary: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none resize-none"
                  placeholder="Enter your professional summary..."
                />
              </div>
            </div>

            {/* Experience Management */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <i className="fas fa-briefcase mr-3 text-orange-500"></i>
                  Manage Experience
                </h3>
                <button
                  onClick={() => {
                    const newExp = { title: '', company: '', period: '', description: '', achievements: [], technologies: [] };
                    updateAboutData({ experience: [...(aboutData.experience || []), newExp] });
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Add Experience
                </button>
              </div>
              <div className="space-y-6">
                {(aboutData.experience || []).map((exp, idx) => (
                  <div key={idx} className="p-6 bg-gray-900 rounded-xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold">Entry #{idx + 1}</h4>
                      <button
                        onClick={() => {
                          const newExp = aboutData.experience.filter((_, i) => i !== idx);
                          updateAboutData({ experience: newExp });
                        }}
                        className="text-red-500 hover:text-red-400"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => {
                          const newExp = [...aboutData.experience];
                          newExp[idx].title = e.target.value;
                          updateAboutData({ experience: newExp });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                      <input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...aboutData.experience];
                          newExp[idx].company = e.target.value;
                          updateAboutData({ experience: newExp });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                      <input
                        placeholder="Period"
                        value={exp.period}
                        onChange={(e) => {
                          const newExp = [...aboutData.experience];
                          newExp[idx].period = e.target.value;
                          updateAboutData({ experience: newExp });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                      <input
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) => {
                          const newExp = [...aboutData.experience];
                          newExp[idx].location = e.target.value;
                          updateAboutData({ experience: newExp });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Achievements (comma-separated)</label>
                      <textarea
                        placeholder="Achievement 1, Achievement 2..."
                        value={exp.achievements?.join(', ')}
                        onChange={(e) => {
                          const newExp = [...aboutData.experience];
                          newExp[idx].achievements = e.target.value.split(',').map(s => s.trim());
                          updateAboutData({ experience: newExp });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm h-20 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Technologies (comma-separated)</label>
                      <input
                        placeholder="React, Node.js..."
                        value={exp.technologies?.join(', ')}
                        onChange={(e) => {
                          const newExp = [...aboutData.experience];
                          newExp[idx].technologies = e.target.value.split(',').map(s => s.trim());
                          updateAboutData({ experience: newExp });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                    </div>
                    <textarea
                      placeholder="General Description"
                      value={exp.description}
                      onChange={(e) => {
                        const newExp = [...aboutData.experience];
                        newExp[idx].description = e.target.value;
                        updateAboutData({ experience: newExp });
                      }}
                      className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm h-20 resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Education Management */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <i className="fas fa-graduation-cap mr-3 text-cyan-500"></i>
                  Manage Education
                </h3>
                <button
                  onClick={() => {
                    const newEdu = { degree: '', institution: '', period: '', details: '' };
                    updateAboutData({ education: [...(aboutData.education || []), newEdu] });
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Add Education
                </button>
              </div>
              <div className="space-y-6">
                {(aboutData.education || []).map((edu, idx) => (
                  <div key={idx} className="p-6 bg-gray-900 rounded-xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold">Entry #{idx + 1}</h4>
                      <button
                        onClick={() => {
                          const newEdu = aboutData.education.filter((_, i) => i !== idx);
                          updateAboutData({ education: newEdu });
                        }}
                        className="text-red-500 hover:text-red-400"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...aboutData.education];
                          newEdu[idx].degree = e.target.value;
                          updateAboutData({ education: newEdu });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                      <input
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => {
                          const newEdu = [...aboutData.education];
                          newEdu[idx].institution = e.target.value;
                          updateAboutData({ education: newEdu });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                      <input
                        placeholder="Period"
                        value={edu.period}
                        onChange={(e) => {
                          const newEdu = [...aboutData.education];
                          newEdu[idx].period = e.target.value;
                          updateAboutData({ education: newEdu });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                    </div>
                    <textarea
                      placeholder="Details"
                      value={edu.details}
                      onChange={(e) => {
                        const newEdu = [...aboutData.education];
                        newEdu[idx].details = e.target.value;
                        updateAboutData({ education: newEdu });
                      }}
                      className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm h-20 resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Main Skill Bars (Home/About) Management */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <i className="fas fa-chart-bar mr-3 text-blue-400"></i>
                  Manage Skill Bars
                </h3>
                <button
                  onClick={() => {
                    const newSkill = { name: '', percentage: 80, icon: 'fa-code', color: 'from-blue-500 to-cyan-500' };
                    updateAboutData({ skills: [...(aboutData.skills || []), newSkill] });
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Add Skill Bar
                </button>
              </div>
              <div className="space-y-6">
                {(aboutData.skills || []).map((skill, idx) => (
                  <div key={idx} className="p-6 bg-gray-900 rounded-xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold">Skill Bar #{idx + 1}</h4>
                      <button
                        onClick={() => {
                          const newSkills = aboutData.skills.filter((_, i) => i !== idx);
                          updateAboutData({ skills: newSkills });
                        }}
                        className="text-red-500 hover:text-red-400"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        placeholder="Skill Name"
                        value={skill.name}
                        onChange={(e) => {
                          const newSkills = [...aboutData.skills];
                          newSkills[idx].name = e.target.value;
                          updateAboutData({ skills: newSkills });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Percentage"
                        value={skill.percentage}
                        onChange={(e) => {
                          const newSkills = [...aboutData.skills];
                          newSkills[idx].percentage = parseInt(e.target.value);
                          updateAboutData({ skills: newSkills });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                      <input
                        placeholder="FontAwesome Icon (e.g. fa-code)"
                        value={skill.icon}
                        onChange={(e) => {
                          const newSkills = [...aboutData.skills];
                          newSkills[idx].icon = e.target.value;
                          updateAboutData({ skills: newSkills });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                      <input
                        placeholder="Tailwind Gradient (e.g. from-blue-500 to-cyan-500)"
                        value={skill.color}
                        onChange={(e) => {
                          const newSkills = [...aboutData.skills];
                          newSkills[idx].color = e.target.value;
                          updateAboutData({ skills: newSkills });
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Project Form Modal */}
        {showProjectForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg h-24"
                    required
                  />
                </div>
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  currentImage={projectForm.image}
                  label="Project Image"
                />
                <div>
                  <label className="block text-white mb-2">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Category</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                    >
                      {projectCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Status</label>
                    <select
                      value={projectForm.status}
                      onChange={(e) => setProjectForm({...projectForm, status: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Planning">Planning</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-white mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({...projectForm, githubUrl: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Live URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({...projectForm, liveUrl: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-white">Featured Project</label>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProjectForm(false);
                      setEditingProject(null);
                    }}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Blog Form Modal */}
        {showBlogForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h3>
              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Title</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Excerpt</label>
                  <textarea
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg h-20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2 font-semibold">Post Type</label>
                  <select
                    value={blogForm.postType}
                    onChange={(e) => setBlogForm({...blogForm, postType: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  >
                    <option value="text">📝 Text Post</option>
                    <option value="image">🖼️ Image Post</option>
                    <option value="video">🎥 Video Post</option>
                    <option value="youtube">📺 YouTube Post</option>
                  </select>
                </div>


                {/* Image Upload for Image Posts */}
                {blogForm.postType === 'image' && (
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-image text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Image Upload</h3>
                        <p className="text-gray-400 text-sm">Upload an image to accompany your post</p>
                      </div>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-500 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-300">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleBlogImageSelect(URL.createObjectURL(file), file.name);
                          }
                        }}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="text-6xl text-gray-400 mb-4">
                          <i className="fas fa-cloud-upload-alt"></i>
                        </div>
                        <h4 className="text-white font-semibold text-lg mb-2">Choose Image File</h4>
                        <p className="text-gray-400 mb-4">PNG, JPG, GIF up to 5MB</p>
                        <div className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                          <i className="fas fa-upload mr-2"></i>
                          Browse Files
                        </div>
                      </label>
                    </div>
                    
                    {blogForm.image && (
                      <div className="mt-6">
                        <h4 className="text-white font-semibold mb-3 flex items-center">
                          <i className="fas fa-eye mr-2"></i>
                          Image Preview
                        </h4>
                        <div className="relative">
                          <img src={blogForm.image} alt="Preview" className="w-full max-h-64 object-cover rounded-lg shadow-lg" />
                          <button
                            type="button"
                            onClick={() => setBlogForm({...blogForm, image: '', imageFileName: ''})}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Video Upload for Video Posts */}
                {blogForm.postType === 'video' && (
                  <div className="space-y-6">
                    {/* Video File Upload */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                          <i className="fas fa-video text-white"></i>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Video Upload</h3>
                          <p className="text-gray-400 text-sm">Upload the video file for your post</p>
                        </div>
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-500 rounded-xl p-8 text-center hover:border-purple-400 transition-colors duration-300">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setBlogForm({...blogForm, videoFile: file, videoUrl: URL.createObjectURL(file)});
                            }
                          }}
                          className="hidden"
                          id="video-upload"
                        />
                        <label htmlFor="video-upload" className="cursor-pointer">
                          <div className="text-6xl text-gray-400 mb-4">
                            <i className="fas fa-video"></i>
                          </div>
                          <h4 className="text-white font-semibold text-lg mb-2">Choose Video File</h4>
                          <p className="text-gray-400 mb-4">MP4, MOV, AVI up to 50MB</p>
                          <div className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300">
                            <i className="fas fa-upload mr-2"></i>
                            Browse Video
                          </div>
                        </label>
                      </div>
                      
                      {blogForm.videoUrl && (
                        <div className="mt-6">
                          <h4 className="text-white font-semibold mb-3 flex items-center">
                            <i className="fas fa-play mr-2"></i>
                            Video Preview
                          </h4>
                          <div className="relative">
                            <video 
                              src={blogForm.videoUrl} 
                              controls 
                              muted 
                              className="w-full max-h-64 rounded-lg shadow-lg"
                              preload="metadata"
                            />
                            <button
                              type="button"
                              onClick={() => setBlogForm({...blogForm, videoFile: null, videoUrl: ''})}
                              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Video Thumbnail Upload */}
                    <div className="bg-gradient-to-r from-green-800 to-green-700 rounded-xl p-6 border border-green-600">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <i className="fas fa-image text-white"></i>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Video Thumbnail</h3>
                          <p className="text-gray-400 text-sm">Upload a thumbnail image for the video (optional)</p>
                        </div>
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-500 rounded-xl p-8 text-center hover:border-green-400 transition-colors duration-300">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              handleBlogImageSelect(URL.createObjectURL(file), file.name);
                            }
                          }}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <label htmlFor="thumbnail-upload" className="cursor-pointer">
                          <div className="text-6xl text-gray-400 mb-4">
                            <i className="fas fa-image"></i>
                          </div>
                          <h4 className="text-white font-semibold text-lg mb-2">Choose Thumbnail Image</h4>
                          <p className="text-gray-400 mb-4">PNG, JPG, GIF up to 5MB</p>
                          <div className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                            <i className="fas fa-upload mr-2"></i>
                            Browse Thumbnail
                          </div>
                        </label>
                      </div>
                      
                      {blogForm.image && (
                        <div className="mt-6">
                          <h4 className="text-white font-semibold mb-3 flex items-center">
                            <i className="fas fa-eye mr-2"></i>
                            Thumbnail Preview
                          </h4>
                          <div className="relative">
                            <img src={blogForm.image} alt="Thumbnail Preview" className="w-full max-h-64 object-cover rounded-lg shadow-lg" />
                            <button
                              type="button"
                              onClick={() => setBlogForm({...blogForm, image: '', imageFileName: ''})}
                              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* YouTube URL for YouTube Posts */}
                {blogForm.postType === 'youtube' && (
                  <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-xl p-6 border border-red-500/30">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                        <i className="fab fa-youtube text-white text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">YouTube Video</h3>
                        <p className="text-gray-400 text-sm">Add a YouTube video to your post</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white mb-2 font-semibold">YouTube URL</label>
                        <input
                          type="url"
                          value={blogForm.youtubeUrl}
                          onChange={(e) => handleYouTubeUrlChange(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                        />
                        <p className="text-gray-400 text-sm mt-2">
                          <i className="fas fa-info-circle mr-1"></i>
                          Paste any YouTube URL (watch, youtu.be, embed, etc.)
                        </p>
                      </div>
                      
                      {blogForm.youtubeThumbnail && (
                        <div className="mt-6">
                          <h4 className="text-white font-semibold mb-3 flex items-center">
                            <i className="fas fa-play mr-2"></i>
                            Video Preview
                          </h4>
                          <div className="relative">
                            <img
                              src={blogForm.youtubeThumbnail}
                              alt="YouTube Thumbnail"
                              className="w-full max-w-md rounded-lg shadow-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
                                <i className="fas fa-play text-white text-xl ml-1"></i>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setBlogForm({...blogForm, youtubeUrl: '', youtubeThumbnail: ''})}
                              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Category</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                    >
                      {blogCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Read Time</label>
                    <input
                      type="text"
                      value={blogForm.readTime}
                      onChange={(e) => setBlogForm({...blogForm, readTime: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                      placeholder="5 min read"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                    placeholder="React, JavaScript, Hooks"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured-blog"
                    checked={blogForm.featured}
                    onChange={(e) => setBlogForm({...blogForm, featured: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="featured-blog" className="text-white">Featured Post</label>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingBlog ? 'Update Post' : 'Add Post'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBlogForm(false);
                      setEditingBlog(null);
                    }}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Skills Form Modal */}
        {showSkillForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <form onSubmit={handleSkillSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2 font-semibold">Skill Name</label>
                    <input
                      type="text"
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({...skillForm, name: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="e.g., React.js"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2 font-semibold">Proficiency (%)</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={skillForm.percentage}
                      onChange={(e) => setSkillForm({...skillForm, percentage: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2 font-semibold">Description</label>
                  <textarea
                    value={skillForm.description}
                    onChange={(e) => setSkillForm({...skillForm, description: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-20"
                    placeholder="Brief description of your expertise in this skill"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2 font-semibold">Category</label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({...skillForm, category: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Soft Skills">Soft Skills</option>
                      <option value="Tools">Tools</option>
                      <option value="Languages">Languages</option>
                      <option value="Frameworks">Frameworks</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white mb-2 font-semibold">Icon</label>
                    <select
                      value={skillForm.icon}
                      onChange={(e) => setSkillForm({...skillForm, icon: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    >
                      {defaultSkillIcons.map((icon, index) => (
                        <option key={index} value={icon}>
                          {icon.replace('fas fa-', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2 font-semibold">Color</label>
                  <div className="space-y-3">
                    {/* Color Palette */}
                    <div className="grid grid-cols-5 gap-2">
                      {defaultSkillColors.map((color, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSkillForm({...skillForm, color: color})}
                          className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 ${
                            skillForm.color === color 
                              ? 'border-white scale-110 shadow-lg' 
                              : 'border-gray-600 hover:border-gray-400 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    
                    {/* Custom Color Input */}
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={skillForm.color}
                        onChange={(e) => setSkillForm({...skillForm, color: e.target.value})}
                        className="w-12 h-10 rounded border border-gray-600 cursor-pointer"
                        title="Custom Color"
                      />
                      <input
                        type="text"
                        value={skillForm.color}
                        onChange={(e) => setSkillForm({...skillForm, color: e.target.value})}
                        className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingSkill ? 'Update Skill' : 'Add Skill'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSkillForm(false);
                      setEditingSkill(null);
                    }}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
