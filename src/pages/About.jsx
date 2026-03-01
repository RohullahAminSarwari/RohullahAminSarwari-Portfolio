import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  const { customSkills, aboutData } = useData();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const defaultSkills = [
    { name: "Web & Software Development", percentage: 95, icon: "fa-laptop-code", color: "from-primary-500 to-accent-500" },
    { name: "React.js & JavaScript", percentage: 90, icon: "fa-brands fa-react", color: "from-blue-400 to-cyan-400" },
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
    description: skill.description,
    category: skill.category,
    customColor: skill.color
  }));

  const skills = [...defaultSkills, ...formattedCustomSkills];

  const experiences = aboutData?.experience && aboutData.experience.length > 0 ? aboutData.experience : [
    {
      title: "Web & Software Developer",
      company: "Hushmand Shahar Technology",
      period: "April 2024 - Present",
      description: "Leading the development of modern web applications using the MERN stack and Laravel. Focused on building high-performance, scalable software solutions.",
      achievements: [
        "Developed responsive user interfaces using React.js and Tailwind CSS",
        "Implemented complex backend logic and RESTful API integrations",
        "Optimized application performance and database queries",
        "Collaborated with cross-functional teams to deliver high-quality software"
      ],
      technologies: ["React", "JavaScript", "PHP", "Laravel", "Tailwind CSS", "MySQL", "Git"]
    },
    {
      title: "Web Development Intern",
      company: "Kabul Polytechnic University",
      period: "2023 - 2024",
      description: "Contributed to the development and maintenance of university web systems and Management Information Systems (MIS).",
      achievements: [
        "Supported the development of student and faculty portals",
        "Assisted in database management and optimization tasks",
        "Improved frontend performance and user experience",
        "Gained hands-on experience with industry-standard dev lifecycles"
      ],
      technologies: ["JavaScript", "HTML", "CSS", "PHP", "MySQL", "Bootstrap"]
    }
  ];

  const education = aboutData?.education && aboutData.education.length > 0 ? aboutData.education : [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Kabul Polytechnic University",
      period: "2021 - Present",
      gpa: "3.7/4.0",
      details: "Focusing on Software Engineering, Database Systems, and Web Technologies.",
      courses: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Web Development",
        "Software Engineering",
        "Information Systems",
        "Object Oriented Programming"
      ],
      achievements: [
        "Top Performer in Web Development",
        "Active member of Computer Science Society"
      ]
    },
    {
      degree: "High School Graduation",
      institution: "Hazrat Qais Bin Saad High School",
      period: "2018 - 2021",
      gpa: "3.9/4.0",
      courses: [
        "Mathematics",
        "Physics",
        "Computer Science",
        "English"
      ],
      achievements: [
        "First Position in Graduating Class",
        "Science Excellence Award"
      ]
    }
  ];

  const volunteerWork = [
    {
      role: "Video Editor & Content Creator",
      organization: "Refa Charity Foundation",
      period: "2022 - 2023",
      description: "Volunteered creative skills to support charitable initiatives through compelling video content and visual storytelling.",
      impact: "Produced 50+ promotional videos and increased social media engagement by 200%",
      activities: [
        "Created promotional videos for charity campaigns",
        "Developed brand guidelines and visual identity",
        "Trained team members in video editing techniques",
        "Amplified foundation's reach and impact through quality content"
      ]
    }
  ];

  const certifications = [
    {
      name: "Full Stack Web Development",
      issuer: "Coursera",
      date: "2023",
      credential: "FSWD-2023-001",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 dark:from-blue-500 dark:via-cyan-400 dark:to-emerald-400">
              About Me
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Bridging the gap between design and technology through innovative solutions.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group max-w-md mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[2.5rem] blur-2xl opacity-10 dark:opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white dark:bg-[#1e293b]/30 rounded-[2.5rem] p-2 shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden transition-colors duration-300 backdrop-blur-md">
                <img 
                  src="/profile.jpg" 
                  alt="Rohullah Amin Sarwari" 
                  className="w-full h-auto object-cover rounded-[2.2rem] group-hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>
          </div>

          <div className={`lg:w-1/2 space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">My Journey</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                I'm <span className="text-blue-600 dark:text-blue-400 font-bold">Rohullah Amin Sarwari</span>, 
                a dedicated Computer Science student at Kabul Polytechnic University and a passionate Web & Software Developer. 
                My focus lies in building scalable, user-centric applications using the modern JavaScript ecosystem.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                Since 2021, I've been honing my skills in <span className="font-semibold text-gray-800 dark:text-gray-200">React.js</span>, 
                <span className="font-semibold text-gray-800 dark:text-gray-200">Node.js</span>, and <span className="font-semibold text-gray-800 dark:text-gray-200">Cloud Architecture</span>.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-[#1e293b]/20 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-all duration-300 backdrop-blur-sm">
                <div className="w-10 h-10 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                  <i className="fas fa-briefcase text-blue-600 dark:text-blue-400 text-lg"></i>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Current Role</h3>
                <p className="text-gray-600 dark:text-gray-400 text-[11px]">Software Developer</p>
                <p className="text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-wider">Hushmand Shahar Tech</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-[#1e293b]/20 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-all duration-300 backdrop-blur-sm">
                <div className="w-10 h-10 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                  <i className="fas fa-graduation-cap text-emerald-600 dark:text-emerald-400 text-lg"></i>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Education</h3>
                <p className="text-gray-600 dark:text-gray-400 text-[11px]">BSc Computer Science</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-wider">Kabul Polytechnic Univ.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['skills', 'experience', 'education', 'volunteer', 'certifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-[#1e293b]/40 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e293b]/60 shadow-sm border border-gray-100 dark:border-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-[#1e293b]/20 rounded-[2rem] p-6 md:p-10 shadow-2xl border border-gray-100 dark:border-white/5 backdrop-blur-xl transition-colors duration-300">
            {activeTab === 'skills' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="group p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-gray-800/50 transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-white dark:bg-[#020617] rounded-xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
                          <i className={`${skill.icon} text-lg text-blue-600 dark:text-blue-400`}></i>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white ml-3 tracking-tight">{skill.name}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[9px] font-bold">
                          <span className="text-gray-500 dark:text-gray-400 uppercase tracking-widest">Expertise</span>
                          <span className="text-blue-600 dark:text-blue-400">{skill.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-[#020617] rounded-full h-1.5 overflow-hidden p-[1px]">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                            style={{ width: `${skill.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="animate-fade-in space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-blue-500 before:to-transparent">
                    <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-white dark:bg-[#020617] border-2 border-blue-500 shadow-sm"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                        <span className="px-3 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-500/20">{exp.period}</span>
                      </div>
                      <p className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-tight">{exp.company}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start bg-gray-50 dark:bg-[#020617]/40 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                            <i className="fas fa-arrow-right text-blue-500 mt-1 mr-2 text-[10px]"></i>
                            <span className="text-gray-700 dark:text-gray-300 text-xs">{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="animate-fade-in space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-emerald-500 before:to-transparent">
                    <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-white dark:bg-[#020617] border-2 border-emerald-500 shadow-sm"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                        <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">{edu.period}</span>
                      </div>
                      <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400 tracking-tight">{edu.institution}</p>
                      <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">GPA: {edu.gpa}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {edu.courses.map((course, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-[#020617]/60 rounded text-[10px] font-medium border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'volunteer' && (
              <div className="animate-fade-in space-y-8">
                {volunteerWork.map((vol, index) => (
                  <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-purple-500 before:to-transparent">
                    <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-white dark:bg-[#020617] border-2 border-purple-500 shadow-sm"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{vol.role}</h3>
                        <span className="px-3 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-bold border border-purple-500/20">{vol.period}</span>
                      </div>
                      <p className="text-base font-semibold text-purple-600 dark:text-purple-400 tracking-tight">{vol.organization}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{vol.description}</p>
                      <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-xl border border-purple-100 dark:border-purple-800/20 font-medium text-purple-700 dark:text-purple-300 text-xs">
                        Impact: {vol.impact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'certifications' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {certifications.map((cert, index) => (
                    <div key={index} className="group p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-gray-800/50 transition-all duration-500 hover:shadow-lg">
                      <div className="w-10 h-10 bg-white dark:bg-[#020617] rounded-xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10 mb-4 group-hover:scale-110 transition-transform duration-500 text-yellow-500">
                        <i className="fas fa-certificate text-lg"></i>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{cert.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-bold text-[11px] mb-0.5">{cert.issuer}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-[9px] font-medium mb-3">{cert.date} • {cert.credential}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((skill, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-white dark:bg-[#020617] border border-gray-100 dark:border-white/10 rounded text-[8px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
