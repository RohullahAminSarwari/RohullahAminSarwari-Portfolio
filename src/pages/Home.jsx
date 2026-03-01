import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const Home = () => {
  const { showAdminAccess, customSkills, homeData, aboutData } = useData();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [animatedCounters, setAnimatedCounters] = useState({
    projects: 0,
    experience: 0,
    technologies: 0,
    contributions: 0
  });
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = homeData.roles;

  const defaultSkills = [
    { name: "Web & Software Development", percentage: 95, icon: "fa-laptop-code", color: "from-blue-500 to-cyan-500" },
    { name: "React.js & JavaScript", percentage: 90, icon: "fa-brands fa-react", color: "from-blue-400 to-indigo-400" },
    { name: "HTML5 & CSS3", percentage: 90, icon: "fa-code", color: "from-orange-500 to-red-500" },
    { name: "Tailwind CSS & UI/UX", percentage: 85, icon: "fa-palette", color: "from-cyan-400 to-blue-500" },
    { name: "PHP & Laravel", percentage: 80, icon: "fa-server", color: "from-indigo-500 to-purple-500" },
    { name: "Database Design", percentage: 85, icon: "fa-database", color: "from-green-500 to-emerald-500" }
  ];

  const formattedCustomSkills = customSkills.map(skill => ({
    name: skill.name,
    percentage: skill.percentage,
    icon: skill.icon,
    color: `from-[${skill.color}] to-[${skill.color}]`,
    customColor: skill.color
  }));

  const skills = aboutData.skills && aboutData.skills.length > 0 ? aboutData.skills : [...defaultSkills, ...formattedCustomSkills];

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        setDisplayedRole(currentRole.substring(0, displayedRole.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayedRole(currentRole.substring(0, displayedRole.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayedRole === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedRole === '') {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex, roles, typingSpeed]);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    const animateCounters = () => {
      const targets = { projects: 10, experience: 2, technologies: 12, contributions: 500 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let step = 0;
      const counterInterval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setAnimatedCounters({
          projects: Math.floor(targets.projects * easeOutQuart),
          experience: Math.floor(targets.experience * easeOutQuart),
          technologies: Math.floor(targets.technologies * easeOutQuart),
          contributions: Math.floor(targets.contributions * easeOutQuart)
        });
        
        if (step >= steps) {
          clearInterval(counterInterval);
        }
      }, stepDuration);
    };
    
    const counterTimeout = setTimeout(animateCounters, 500);
    
    return () => {
      clearInterval(interval);
      clearTimeout(counterTimeout);
    };
  }, []);

  const testimonials = [
    {
      name: "Muhammad Hakeem Wiyar",
      role: "Lead Developer",
      company: "KPU Website Project",
      content: "Rohullah's contribution to the Kabul Polytechnic University website was pivotal. His ability to handle complex frontend challenges and maintain a clean architecture made our collaboration highly effective.",
      avatar: "/profile.jpg",
      rating: 5
    },
    {
      name: "Ahmad Waheb Arifi",
      role: "Software Engineer",
      company: "MIS Development Team",
      content: "Working with Rohullah on the Management Information System (MIS) was a great experience. He is a dedicated developer who consistently delivers high-quality code and innovative solutions to technical problems.",
      avatar: "/profile.jpg",
      rating: 5
    },
    {
      name: "Mohammad Ozair",
      role: "Backend Specialist",
      company: "Alumni System Project",
      content: "In our work on the Alumni system, Rohullah demonstrated exceptional skills in React.js and system integration. He is a reliable teammate who brings both technical expertise and a positive attitude to every project.",
      avatar: "/profile.jpg",
      rating: 5
    }
  ];

  const stats = [
    { value: `${animatedCounters.projects}+`, label: "Software Projects", icon: "fa-project-diagram" },
    { value: `${animatedCounters.contributions}+`, label: "GitHub Commits", icon: "fa-code-branch" },
    { value: `${animatedCounters.experience}+`, label: "Years Experience", icon: "fa-calendar-check" },
    { value: `${animatedCounters.technologies}+`, label: "Dev Technologies", icon: "fa-tools" }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-[#020617]">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-blob" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-600/5 rounded-full blur-[100px] animate-blob" style={{animationDelay: '4s'}}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-hero-pattern opacity-[0.03]"></div>

          {/* Particle Effects (CS Themed) */}
          <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-blue-500 rounded-full animate-pulse-glow"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-cyan-500 rounded-full animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
          
          {/* Decorative Matrix-like Binary Rain effect elements */}
          <div className="absolute top-10 left-10 text-[10px] font-mono text-blue-500/10 dark:text-blue-400/20 select-none animate-pulse-slow">
            01010110 10101010<br/>11001100 00110011
          </div>
          <div className="absolute bottom-20 right-20 text-[10px] font-mono text-emerald-500/10 dark:text-emerald-400/20 select-none animate-pulse-slow" style={{ animationDelay: '2s' }}>
            CODE INNOVATE<br/>DEPLOY SCALE
          </div>

          {/* Subtle Connection Lines (Visual Density) */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="currentColor" strokeWidth="1" className="text-blue-500" />
            <line x1="80%" y1="10%" x2="60%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-purple-500" />
            <line x1="20%" y1="80%" x2="40%" y2="60%" stroke="currentColor" strokeWidth="1" className="text-emerald-500" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 animate-slide-in-left">
              <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-gray-100 dark:bg-[#1e293b]/30 border border-gray-200 dark:border-blue-500/20 backdrop-blur-md transition-colors relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase relative z-10">{homeData.status}</span>
              </div>
              
              <div className="space-y-4">
                <div className="relative inline-block group/title">
                  <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-black leading-[0.85] tracking-tighter text-gray-900 dark:text-white">
                    <span className="inline-block whitespace-nowrap">{homeData.firstName}</span><br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 dark:from-blue-500 dark:via-cyan-400 dark:to-emerald-400 drop-shadow-sm">
                      {homeData.lastName}
                    </span>
                  </h1>
                  {/* Floating Tech Badges on Name */}
                  <div className="absolute -top-4 -right-12 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg backdrop-blur-sm text-[10px] font-mono text-blue-600 dark:text-blue-400 opacity-0 group-hover/title:opacity-100 transition-opacity translate-y-2 group-hover/title:translate-y-0 duration-300">
                    &lt;DEV /&gt;
                  </div>
                </div>
                
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-2xl leading-relaxed mt-8 relative pl-6">
                  <span className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full shadow-glow"></span>
                  <span className="text-gray-900 dark:text-white font-bold">Software Developer</span> crafting <span className="text-gray-900 dark:text-white font-bold">high-performance</span> web applications and advancing modern web frontiers.
                </p>
              </div>

              {/* Hero Info Cards - Expanded with extra density */}
              <div className="flex flex-wrap gap-4 pt-4">
                {[
                  { label: 'Specialization', value: 'Web & Software Dev', icon: 'fa-code', color: 'blue' },
                  { label: 'Stack', value: 'React / Laravel', icon: 'fa-layer-group', color: 'emerald' },
                  { label: 'Research', value: 'Neural Systems', icon: 'fa-microchip', color: 'purple' }
                ].map((card, idx) => (
                  <div key={idx} className="flex items-center gap-4 px-5 py-3.5 bg-gray-50 dark:bg-[#1e293b]/30 rounded-2xl border border-gray-200 dark:border-white/5 backdrop-blur-xl transition-all hover:scale-105 hover:border-blue-500/30 group cursor-default">
                    <div className={`w-9 h-9 bg-${card.color}-500/10 rounded-xl flex items-center justify-center text-${card.color}-600 dark:text-${card.color}-400 text-base group-hover:rotate-12 transition-transform`}>
                      <i className={`fas ${card.icon}`}></i>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none mb-1">{card.label}</p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white whitespace-nowrap">{card.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-5 pt-8">
                <Link to="/projects" className="group relative flex items-center gap-3 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-black rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    <i className="fas fa-rocket text-sm group-hover:animate-bounce"></i> Latest Work
                  </span>
                </Link>
                <a href="/cv.pdf" target="_blank" className="relative group flex items-center gap-3 px-10 py-5 bg-white dark:bg-[#1e293b]/50 text-gray-900 dark:text-white font-black rounded-2xl border border-gray-200 dark:border-white/10 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-[#1e293b] hover:scale-105 backdrop-blur-md overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 dark:bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <i className="fas fa-file-pdf text-sm text-red-500"></i> Resume.pdf
                </a>
              </div>
            </div>
            
            {/* Right Content - Visual - Maxed out with shapes */}
            <div className="lg:col-span-5 relative animate-slide-in-right hidden lg:block">
              <div className="relative w-full max-w-lg mx-auto">
                
                {/* Outer Shape Layers - More intense glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/10 dark:bg-blue-600/20 rounded-[4rem] rotate-12 blur-3xl hidden dark:block animate-pulse-slow"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] bg-purple-600/10 dark:bg-purple-600/20 rounded-[4rem] -rotate-6 blur-2xl hidden dark:block animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                
                {/* Floating CS Platforms & Apps Shapes - Max Density */}
                {[
                  { icon: 'fab fa-github', top: '-top-20', right: '-right-16', size: 'w-24 h-24', color: 'blue', delay: '0s', duration: '4s' },
                  { icon: 'fab fa-react', top: 'top-[15%]', right: '-right-24', size: 'w-20 h-20', color: 'cyan', delay: '1s', duration: '5s' },
                  { icon: 'fas fa-server', bottom: '-bottom-16', right: '-right-12', size: 'w-28 h-28', color: 'emerald', delay: '2s', duration: '6s' },
                  { icon: 'fab fa-node-js', bottom: '-bottom-20', left: 'left-1/4', size: 'w-20 h-20', color: 'purple', delay: '1.5s', duration: '4.5s' },
                  { icon: 'fas fa-database', top: 'top-1/2', left: '-left-24', size: 'w-16 h-16', color: 'orange', delay: '0s', duration: '15s', isOrbit: true },
                  { icon: 'fas fa-cloud', top: '-top-12', left: '-left-16', size: 'w-22 h-22', color: 'cyan', delay: '0.5s', duration: '5.5s' },
                  { icon: 'fas fa-terminal', top: '5%', left: '-20%', size: 'w-14 h-14', color: 'gray', delay: '3s', duration: '7s' },
                  { icon: 'fas fa-shield-alt', bottom: '15%', right: '-20%', size: 'w-16 h-16', color: 'red', delay: '4s', duration: '8s' },
                  { icon: 'fab fa-docker', top: '45%', right: '-right-28', size: 'w-14 h-14', color: 'blue', delay: '2.5s', duration: '6.5s' },
                  { icon: 'fab fa-python', bottom: '10%', left: '-15%', size: 'w-14 h-14', color: 'yellow', delay: '3.5s', duration: '7.5s' }
                ].map((shape, i) => (
                  <div 
                    key={i} 
                    className={`absolute ${shape.top || ''} ${shape.bottom || ''} ${shape.left || ''} ${shape.right || ''} ${shape.size} bg-white/80 dark:bg-[#1e293b]/70 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-center text-${shape.color}-500 text-2xl ${shape.isOrbit ? 'animate-orbit' : 'animate-float'} z-20 hover:scale-110 hover:z-30 transition-all cursor-pointer group/icon`}
                    style={{ animationDelay: shape.delay, animationDuration: shape.duration }}
                  >
                    <i className={`${shape.icon} group-hover/icon:scale-125 transition-transform duration-300`}></i>
                    <div className="absolute inset-0 bg-current opacity-0 group-hover/icon:opacity-10 rounded-2xl transition-opacity"></div>
                  </div>
                ))}
                
                {/* Photo Cover Shapes (Alex.dev style mask) */}
                <div className="relative z-10 aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700 bg-gray-100 dark:bg-[#020617] group/photo">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity z-10"></div>
                  
                  {/* Scanning Animation Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent h-1/2 w-full animate-scan z-20 pointer-events-none opacity-0 group-hover/photo:opacity-100 transition-opacity"></div>

                  <img 
                    src="/profile.jpg" 
                    alt="Rohullah Amin Sarwari" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover/photo:scale-100" 
                  />
                  
                  {/* Location Badge */}
                  <div className="absolute bottom-8 right-8 p-4 bg-white/95 dark:bg-[#1e293b]/90 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 z-20 shadow-2xl transition-all group-hover/photo:translate-y-[-10px] group-hover/photo:border-blue-500/50">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Current Location</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Kabul, Afghanistan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: '01', title: 'Web Development', desc: 'Modern React.js solutions' },
            { id: '02', title: 'Software Engineering', desc: 'Scalable backend systems' },
            { id: '03', title: 'Architecture', desc: 'Clean & maintainable code' },
            { id: '04', title: 'Deployment', desc: 'Optimized cloud workflows' }
          ].map((card, i) => (
            <div key={i} className="group p-6 bg-white dark:bg-[#1e293b]/20 hover:bg-gray-50 dark:hover:bg-[#1e293b]/40 border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-1">
              <span className="text-blue-600 dark:text-blue-500 font-mono text-[10px] font-bold mb-2 block tracking-widest">{card.id}</span>
              <h3 className="text-base font-black text-gray-900 dark:text-white mb-1">{card.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-[11px] font-medium leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <section className="py-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  <i className={`fas ${stat.icon} text-lg text-primary-600 dark:text-primary-400`}></i>
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">{stat.value}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-bold text-[10px] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
                Technical <span className="text-primary-600 dark:text-primary-400">Expertise</span>
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                A specialized toolkit focused on building high-performance web applications and exceptional user interfaces.
              </p>
            </div>
            <Link to="/about" className="text-primary-600 dark:text-primary-400 font-black text-xs flex items-center hover:translate-x-2 transition-transform">
              LEARN MORE ABOUT ME <i className="fas fa-arrow-right ml-2 text-[10px]"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.slice(0, 6).map((skill, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <i className={`${skill.icon} text-2xl text-primary-600 dark:text-primary-400`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{skill.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    <span>Proficiency</span>
                    <span className="text-gray-900 dark:text-white">{skill.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden p-[1px]">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="bg-gray-900 dark:bg-white rounded-[2.5rem] p-10 md:p-16 text-white dark:text-gray-900 shadow-2xl relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px]"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <i className="fas fa-quote-left text-4xl text-primary-500 opacity-50"></i>
                <blockquote className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-primary-500 p-1 overflow-hidden">
                    <img src={testimonials[activeTestimonial].avatar} alt="" className="w-full h-full object-cover rounded-full grayscale" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-primary-400 dark:text-primary-600 font-bold text-xs uppercase tracking-wider">{testimonials[activeTestimonial].role} @ {testimonials[activeTestimonial].company}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end gap-3">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-12 h-1.5 rounded-full transition-all duration-500 ${index === activeTestimonial ? 'bg-primary-500 w-16' : 'bg-gray-700 dark:bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-24 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter">
              WANT TO START A <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 uppercase">PROJECT?</span>
            </h2>
            <Link to="/contact" className="inline-flex px-10 py-4 bg-primary-600 text-white font-black text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-glow-lg">
              GET IN TOUCH <i className="fas fa-paper-plane ml-3 text-sm"></i>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Home;
