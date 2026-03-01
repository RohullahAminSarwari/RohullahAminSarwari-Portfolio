import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';

const Resume = () => {
  const { projects, resumeData, contactData } = useData();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const professionalSummary = resumeData.professionalSummary || `
    Dedicated Computer Science student at Kabul Polytechnic University with a strong foundation in web and software development. 
    Expertise in modern frontend technologies like React.js and Tailwind CSS, coupled with robust backend knowledge in PHP and Laravel. 
    Proven track record of delivering high-quality digital solutions and a passion for creating seamless user experiences.
  `;

  const skills = resumeData.expertise || {
    frontend: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3", "Redux Toolkit", "Framer Motion"],
    backend: ["PHP", "Laravel", "MySQL", "RESTful APIs", "Node.js", "Express"],
    tools: ["Git/GitHub", "Docker", "Figma", "Postman", "Vite", "NPM/Yarn"],
    soft: ["Problem Solving", "Team Leadership", "Clear Communication", "Time Management", "Adaptability"]
  };

  const experience = [
    {
      title: "Web & Software Developer",
      company: "Hushmand Shahar Technology",
      period: "April 2024 - Present",
      location: "Kabul, Afghanistan",
      achievements: [
        "Architecting and developing full-stack web applications using React.js and Laravel.",
        "Engineering high-performance, scalable software solutions with a focus on clean code.",
        "Implementing secure RESTful APIs and optimizing database architectures.",
        "Collaborating with UI/UX designers to translate complex requirements into seamless digital experiences."
      ]
    },
    {
      title: "Web Development Intern",
      company: "Kabul Polytechnic University",
      period: "2023 - 2024",
      location: "Kabul, Afghanistan",
      achievements: [
        "Assisted in the lifecycle development of academic Management Information Systems.",
        "Performed database optimization and query refinement for large-scale student datasets.",
        "Supported the development of university-wide web portals and internal software tools.",
        "Collaborated on frontend performance enhancements and cross-browser compatibility."
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Kabul Polytechnic University",
      period: "2021 - Present",
      location: "Kabul, Afghanistan",
      details: "Focusing on Software Engineering, Database Systems, and Web Technologies."
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300 print:bg-white print:pt-0">
      {/* Print-only Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 1cm; size: portrait; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
          .no-print { display: none !important; }
          .print-shadow-none { box-shadow: none !important; border: 1px solid #e5e7eb !important; }
          .print-text-black { color: black !important; }
          .print-bg-gray { background-color: #f9fafb !important; }
          .print-border-b { border-bottom: 1px solid #e5e7eb !important; }
          .print-gap-4 { gap: 1rem !important; }
          .print-p-6 { padding: 1.5rem !important; }
          .print-m-0 { margin: 0 !important; }
          .print-grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
          .print-hidden { display: none !important; }
          .print-block { display: block !important; }
          .print-rounded-none { border-radius: 0 !important; }
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 print:pt-0 print:px-0">
        {/* Header Actions */}
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 transition-all duration-1000 print:hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight text-center sm:text-left">
            Curriculum <span className="text-blue-600 dark:text-blue-400">Vitae</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href="/cv.pdf"
              download="Rohullah_Amin_Sarwari_CV.pdf"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-black text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-lg whitespace-nowrap"
            >
              <i className="fas fa-file-pdf"></i> DOWNLOAD PDF
            </a>
            <button 
              onClick={handlePrint}
              className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-lg whitespace-nowrap"
            >
              <i className="fas fa-print"></i> PRINT CV
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b]/20 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden print:shadow-none print:border print:border-gray-200 print:rounded-none backdrop-blur-xl">
          {/* Resume Header */}
          <div className="bg-gray-900 dark:bg-[#0f172a] p-6 sm:p-8 md:p-12 text-white flex flex-col-reverse md:flex-row justify-between items-center gap-8 print:bg-gray-900 print:text-white print:p-8">
            <div className="space-y-4 text-center md:text-left print:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase">ROHULLAH AMIN<br />SARWARI</h2>
              <p className="text-lg sm:text-xl font-bold text-blue-400 tracking-tight">Web & Software Developer</p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center justify-center sm:justify-start gap-1.5"><i className="fas fa-map-marker-alt text-blue-500"></i> {contactData.location}</span>
                <span className="flex items-center justify-center sm:justify-start gap-1.5"><i className="fas fa-envelope text-blue-500"></i> {contactData.email}</span>
                <span className="flex items-center justify-center sm:justify-start gap-1.5"><i className="fas fa-phone text-blue-500"></i> {contactData.phone}</span>
              </div>
            </div>
            <div className="shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-3xl border-4 border-blue-500/30 p-1.5 overflow-hidden bg-gray-800 shadow-2xl md:rotate-3 hover:rotate-0 transition-transform duration-500 print:rotate-0 print:w-32 print:h-32">
                <img src="/profile.jpg" alt="Rohullah Amin Sarwari" className="w-full h-full object-cover rounded-2xl transition-all duration-700" />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12 print:p-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-10 md:space-y-12">
              <section className="space-y-4">
                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                  Professional Summary
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  {professionalSummary}
                </p>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                  Experience
                </h3>
                <div className="space-y-8">
                  {experience.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                        <h4 className="text-base font-bold text-gray-900 dark:text-white">{exp.title}</h4>
                        <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-[9px]">{exp.period}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        <span>{exp.company}</span>
                        <span>{exp.location}</span>
                      </div>
                      <ul className="space-y-2 pt-1">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 leading-relaxed font-medium text-xs">
                            <span className="w-1.5 h-1.5 mt-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                  Education
                </h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                        <h4 className="text-base font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                        <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-[9px]">{edu.period}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        <span>{edu.institution}</span>
                        <span>{edu.location}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium text-xs">
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Skills */}
            <div className="space-y-10">
              <section className="space-y-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                  <span className="w-6 h-1 bg-emerald-500 rounded-full"></span>
                  Expertise
                </h3>
                
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Frontend</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.frontend.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-50 dark:bg-[#020617] rounded-lg text-gray-700 dark:text-gray-300 text-[11px] font-bold border border-gray-100 dark:border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Backend</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.backend.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-50 dark:bg-[#020617] rounded-lg text-gray-700 dark:text-gray-300 text-[11px] font-bold border border-gray-100 dark:border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Tools & Tech</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.tools.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-50 dark:bg-[#020617] rounded-lg text-gray-700 dark:text-gray-300 text-[11px] font-bold border border-gray-100 dark:border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Soft Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.soft.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-50 dark:bg-[#020617] rounded-lg text-gray-700 dark:text-gray-300 text-[11px] font-bold border border-gray-100 dark:border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 dark:bg-[#020617]/50 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                <h4 className="text-sm font-black text-gray-900 dark:text-white mb-4 uppercase tracking-widest">Languages</h4>
                <div className="space-y-4">
                  {[
                    { name: 'English', level: 90 },
                    { name: 'Dari/Pashto', level: 100 },
                    { name: 'Turkish', level: 40 }
                  ].map((lang, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        <span>{lang.name}</span>
                        <span>{lang.level}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-200 dark:bg-[#020617] rounded-full overflow-hidden p-[0.5px]">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${lang.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
