import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllImages } from '../utils/imageUpload';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [projectCategories, setProjectCategories] = useState(['Web Development', 'Mobile Development', 'Desktop Application', 'Data Science']);
  const [blogCategories, setBlogCategories] = useState(['React', 'Node.js', 'CSS', 'JavaScript', 'General']);
  const [customSkills, setCustomSkills] = useState([]);
  const [showAdminAccess, setShowAdminAccess] = useState(false);
  
  // New state for all sections
  const [aboutData, setAboutData] = useState({
    experience: [],
    education: [],
    skills: [],
    languages: []
  });
  
  const [resumeData, setResumeData] = useState({
    professionalSummary: '',
    expertise: {
      frontend: [],
      backend: [],
      tools: [],
      soft: []
    }
  });

  const [contactData, setContactData] = useState({
    email: 'sarwarirohullahamin6@gmail.com',
    phone: '+93 77 82 86 313',
    whatsapp: '+93 77 82 86 313',
    linkedin: 'https://www.linkedin.com/in/rohullah-amin-sarwari-515349320',
    github: 'https://github.com/RohullahAminSarwari',
    location: 'Kabul, Afghanistan'
  });

  const [homeData, setHomeData] = useState({
    firstName: 'Rohullah Amin',
    lastName: 'Sarwari',
    roles: ["Software Developer", "React.js Specialist", "UI/UX Enthusiast", "Computer Science Student"],
    status: 'Status: Architecting Solutions Software and Web Development'
  });

  // Check if localStorage is available
  const isLocalStorageAvailable = () => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Secret key combination to show admin access
  useEffect(() => {
    let keySequence = '';
    // Obfuscated secret code - "rohullah" encoded
    const secretCode = btoa('rohullah').toLowerCase().slice(0, 7);
    
    const handleKeyPress = (e) => {
      keySequence += e.key.toLowerCase();
      if (keySequence.length > 7) {
        keySequence = keySequence.slice(-7);
      }
      
      if (keySequence === secretCode) {
        setShowAdminAccess(true);
        keySequence = '';
        // Hide after 10 seconds
        setTimeout(() => setShowAdminAccess(false), 10000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      if (!isLocalStorageAvailable()) {
        console.warn('localStorage is not available, using default data');
        initializeDefaultProjects();
        initializeDefaultBlogPosts();
        return;
      }

      try {
        // Load projects
        const savedProjects = localStorage.getItem('portfolio_projects');
        console.log('Loading projects from localStorage:', savedProjects ? 'found' : 'not found');
        
        if (savedProjects && savedProjects !== 'null' && savedProjects !== 'undefined') {
          const parsedProjects = JSON.parse(savedProjects);
          if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
            setProjects(parsedProjects);
            console.log('Loaded projects:', parsedProjects.length);
          } else {
            console.log('No valid projects found, initializing defaults');
            initializeDefaultProjects();
          }
        } else {
          console.log('No saved projects found, initializing defaults');
          initializeDefaultProjects();
        }

        // Load blog posts
        const savedBlogPosts = localStorage.getItem('portfolio_blog_posts');
        console.log('Loading blog posts from localStorage:', savedBlogPosts ? 'found' : 'not found');
        
        if (savedBlogPosts && savedBlogPosts !== 'null' && savedBlogPosts !== 'undefined') {
          const parsedBlogPosts = JSON.parse(savedBlogPosts);
          if (Array.isArray(parsedBlogPosts) && parsedBlogPosts.length > 0) {
            setBlogPosts(parsedBlogPosts);
            console.log('Loaded blog posts:', parsedBlogPosts.length);
          } else {
            console.log('No valid blog posts found, initializing defaults');
            initializeDefaultBlogPosts();
          }
        } else {
          console.log('No saved blog posts found, initializing defaults');
          initializeDefaultBlogPosts();
        }

        // Load admin status
        const adminStatus = localStorage.getItem('portfolio_admin_mode');
        setIsAdmin(adminStatus === 'true');
        console.log('Admin mode:', adminStatus === 'true');

        // Load categories
        const savedProjectCategories = localStorage.getItem('portfolio_project_categories');
        if (savedProjectCategories) {
          setProjectCategories(JSON.parse(savedProjectCategories));
        }

        const savedBlogCategories = localStorage.getItem('portfolio_blog_categories');
        if (savedBlogCategories) {
          setBlogCategories(JSON.parse(savedBlogCategories));
        }

        // Load custom skills
        // Load home data
        const savedHomeData = localStorage.getItem('portfolio_home_data');
        if (savedHomeData) setHomeData(JSON.parse(savedHomeData));

        // Load about data
        const savedAboutData = localStorage.getItem('portfolio_about_data');
        if (savedAboutData) setAboutData(JSON.parse(savedAboutData));

        // Load resume data
        const savedResumeData = localStorage.getItem('portfolio_resume_data');
        if (savedResumeData) setResumeData(JSON.parse(savedResumeData));

        // Load contact data
        const savedContactData = localStorage.getItem('portfolio_contact_data');
        if (savedContactData) setContactData(JSON.parse(savedContactData));
        
        // Mark data as loaded after all loading is complete
        setDataLoaded(true);
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        // Initialize with defaults if there's an error
        initializeDefaultProjects();
        initializeDefaultBlogPosts();
        setDataLoaded(true);
      }
    };

    const initializeDefaultProjects = () => {
      const defaultProjects = [
        {
          id: 1,
          title: "Upskill Website",
          description: "A professional upskilling platform developed using React.js and Tailwind CSS, featuring a responsive and intuitive user interface for enhanced learning experiences.",
          image: "/1.png",
          category: "Web Development",
          technologies: ["React", "Tailwind CSS", "JavaScript"],
          githubUrl: "https://github.com/RohullahAminSarwari/Upskill-Website-repository",
          liveUrl: "#",
          status: "Completed",
          featured: true,
          date: "2024-01-15"
        },
        {
          id: 2,
          title: "Play Tailwind Template",
          description: "A modern, high-performance landing page template built with React.js and Tailwind CSS, showcasing advanced UI components and smooth responsiveness.",
          image: "/2.png",
          category: "Web Development",
          technologies: ["React", "Tailwind CSS", "JavaScript"],
          githubUrl: "https://github.com/RohullahAminSarwari/Play-tailwind-template",
          liveUrl: "#",
          status: "Completed",
          featured: true,
          date: "2024-02-20"
        },
        {
          id: 3,
          title: "Task Management System",
          description: "A robust software solution for managing projects and team tasks efficiently, focused on scalability and clean architecture.",
          image: "/screen.png",
          category: "Software Development",
          technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
          githubUrl: "https://github.com/RohullahAminSarwari",
          liveUrl: "#",
          status: "Completed",
          featured: true,
          date: "2023-11-10"
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    };

    const initializeDefaultBlogPosts = () => {
      // Start with empty blog posts - only show posts added through admin
      const defaultBlogPosts = [];
      setBlogPosts(defaultBlogPosts);
      localStorage.setItem('portfolio_blog_posts', JSON.stringify(defaultBlogPosts));
    };

    loadData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (projects.length > 0) {
      try {
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
        console.log('Projects saved to localStorage:', projects.length);
      } catch (error) {
        console.error('Error saving projects to localStorage:', error);
      }
    }
  }, [projects]);

  useEffect(() => {
    if (blogPosts.length > 0) {
      try {
        localStorage.setItem('portfolio_blog_posts', JSON.stringify(blogPosts));
        console.log('Blog posts saved to localStorage:', blogPosts.length);
      } catch (error) {
        console.error('Error saving blog posts to localStorage:', error);
      }
    }
  }, [blogPosts]);

  // Track if data has been loaded to prevent overwriting on initial load
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Only save to localStorage if data has been loaded and there are changes
    if (dataLoaded && customSkills.length >= 0) {
      try {
        localStorage.setItem('portfolio_custom_skills', JSON.stringify(customSkills));
        console.log('Custom skills saved to localStorage:', customSkills.length);
      } catch (error) {
        console.error('Error saving custom skills to localStorage:', error);
      }
    }
  }, [customSkills, dataLoaded]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_admin_mode', isAdmin.toString());
    } catch (error) {
      console.error('Error saving admin mode to localStorage:', error);
    }
  }, [isAdmin]);

  // Project management functions
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      imageFileName: project.imageFileName || ''
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id, updatedProject) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updatedProject } : project
    ));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  // Blog post management functions
  const addBlogPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      published: true
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (id, updatedPost) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deleteBlogPost = (id) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  // Admin functions
  const toggleAdminMode = () => {
    setIsAdmin(prev => !prev);
  };

  const loginAdmin = (password) => {
    // Secure password check - password is obfuscated
    const hashedPassword = btoa('rohullah123'); // Base64 encoding for basic obfuscation
    const inputHash = btoa(password);
    
    if (inputHash === hashedPassword) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  // Debug function to clear all data (for testing)
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('portfolio_projects');
      localStorage.removeItem('portfolio_blog_posts');
      localStorage.removeItem('portfolio_images');
      localStorage.removeItem('portfolio_admin_mode');
      localStorage.removeItem('portfolio_project_categories');
      localStorage.removeItem('portfolio_blog_categories');
      localStorage.removeItem('portfolio_custom_skills');
      setProjects([]);
      setBlogPosts([]);
      setCustomSkills([]);
      setIsAdmin(false);
      setProjectCategories(['Web Development', 'Mobile Development', 'Desktop Application', 'Data Science']);
      setBlogCategories(['React', 'Node.js', 'CSS', 'JavaScript', 'General']);
      console.log('All data cleared');
      alert('All data has been cleared successfully!');
    }
  };

  // Debug function to clear only custom skills
  const clearCustomSkills = () => {
    if (window.confirm('Are you sure you want to clear all custom skills? This cannot be undone.')) {
      setCustomSkills([]);
      localStorage.removeItem('portfolio_custom_skills');
      console.log('Custom skills cleared');
      alert('All custom skills have been cleared successfully!');
    }
  };

  // Debug function to check localStorage contents
  const debugLocalStorage = () => {
    const skills = localStorage.getItem('portfolio_custom_skills');
    console.log('Current localStorage custom skills:', skills);
    console.log('Current React state custom skills:', customSkills);
    console.log('Data loaded status:', dataLoaded);
    alert(`localStorage skills: ${skills ? JSON.parse(skills).length : 0}\nReact state skills: ${customSkills.length}\nData loaded: ${dataLoaded}`);
  };

  // Function to clear only blog posts
  const clearBlogPosts = () => {
    if (window.confirm('Are you sure you want to clear all blog posts? This cannot be undone.')) {
      setBlogPosts([]);
      localStorage.setItem('portfolio_blog_posts', JSON.stringify([]));
      console.log('Blog posts cleared');
      alert('All blog posts have been cleared successfully!');
    }
  };

  // Category management functions
  const addProjectCategory = (category) => {
    if (!projectCategories.includes(category)) {
      const newCategories = [...projectCategories, category];
      setProjectCategories(newCategories);
      localStorage.setItem('portfolio_project_categories', JSON.stringify(newCategories));
    }
  };

  const addBlogCategory = (category) => {
    if (!blogCategories.includes(category)) {
      const newCategories = [...blogCategories, category];
      setBlogCategories(newCategories);
      localStorage.setItem('portfolio_blog_categories', JSON.stringify(newCategories));
    }
  };

  const removeProjectCategory = (category) => {
    const newCategories = projectCategories.filter(cat => cat !== category);
    setProjectCategories(newCategories);
    localStorage.setItem('portfolio_project_categories', JSON.stringify(newCategories));
  };

  const removeBlogCategory = (category) => {
    const newCategories = blogCategories.filter(cat => cat !== category);
    setBlogCategories(newCategories);
    localStorage.setItem('portfolio_blog_categories', JSON.stringify(newCategories));
  };

  // Custom Skills functions
  const addCustomSkill = (skill) => {
    console.log('Adding custom skill:', skill);
    const newSkill = {
      id: Date.now(),
      name: skill.name,
      percentage: skill.percentage,
      description: skill.description,
      category: skill.category || 'Technical',
      icon: skill.icon || 'fas fa-code',
      color: skill.color || '#3B82F6',
      createdAt: new Date().toISOString()
    };
    console.log('New skill object:', newSkill);
    const newSkills = [...customSkills, newSkill];
    console.log('Updated skills array:', newSkills);
    setCustomSkills(newSkills);
    // Save immediately to localStorage when adding
    localStorage.setItem('portfolio_custom_skills', JSON.stringify(newSkills));
    console.log('Custom skill saved to localStorage');
  };

  const updateCustomSkill = (id, updatedSkill) => {
    console.log('Updating custom skill:', id, updatedSkill);
    const newSkills = customSkills.map(skill => 
      skill.id === id ? { ...skill, ...updatedSkill, updatedAt: new Date().toISOString() } : skill
    );
    setCustomSkills(newSkills);
    // Save immediately to localStorage when updating
    localStorage.setItem('portfolio_custom_skills', JSON.stringify(newSkills));
    console.log('Custom skill updated and saved to localStorage');
  };

  const deleteCustomSkill = (id) => {
    console.log('Deleting custom skill:', id);
    const newSkills = customSkills.filter(skill => skill.id !== id);
    setCustomSkills(newSkills);
    // Save immediately to localStorage when deleting
    localStorage.setItem('portfolio_custom_skills', JSON.stringify(newSkills));
    console.log('Custom skill deleted and saved to localStorage');
  };

  // Debug function to export data
  const exportData = () => {
    const data = {
      projects,
      blogPosts,
      projectCategories,
      blogCategories,
      images: getAllImages(),
      adminMode: isAdmin,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Save new sections to localStorage
  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem('portfolio_home_data', JSON.stringify(homeData));
      localStorage.setItem('portfolio_about_data', JSON.stringify(aboutData));
      localStorage.setItem('portfolio_resume_data', JSON.stringify(resumeData));
      localStorage.setItem('portfolio_contact_data', JSON.stringify(contactData));
    }
  }, [homeData, aboutData, resumeData, contactData, dataLoaded]);

  // Update functions
  const updateHomeData = (newData) => setHomeData(prev => ({ ...prev, ...newData }));
  const updateAboutData = (newData) => setAboutData(prev => ({ ...prev, ...newData }));
  const updateResumeData = (newData) => setResumeData(prev => ({ ...prev, ...newData }));
  const updateContactData = (newData) => setContactData(prev => ({ ...prev, ...newData }));

  const value = {
    // Data
    projects,
    blogPosts,
    isAdmin,
    projectCategories,
    blogCategories,
    customSkills,
    showAdminAccess,
    homeData,
    aboutData,
    resumeData,
    contactData,
    
    // Update functions
    updateHomeData,
    updateAboutData,
    updateResumeData,
    updateContactData,
    
    // Project functions
    addProject,
    updateProject,
    deleteProject,
    
    // Blog functions
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    
    // Category functions
    addProjectCategory,
    addBlogCategory,
    removeProjectCategory,
    removeBlogCategory,
    
    // Custom Skills functions
    addCustomSkill,
    updateCustomSkill,
    deleteCustomSkill,
    
    // Admin functions
    toggleAdminMode,
    loginAdmin,
    logoutAdmin,
    
    // Debug functions
    clearAllData,
    clearBlogPosts,
    clearCustomSkills,
    debugLocalStorage,
    exportData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
