import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';

const Contact = () => {
  const { contactData } = useData();
  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactInfo = [
    {
      icon: "fa-envelope",
      label: "Email Me",
      value: contactData.email,
      link: `mailto:${contactData.email}`,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "fa-whatsapp",
      label: "WhatsApp",
      value: contactData.whatsapp,
      link: `https://wa.me/${contactData.whatsapp.replace(/\s+/g, '').replace('+', '')}`,
      color: "from-green-500 to-emerald-500",
      isBrand: true
    },
    {
      icon: "fa-linkedin-in",
      label: "LinkedIn",
      value: "LinkedIn Profile",
      link: contactData.linkedin,
      color: "from-blue-600 to-indigo-600",
      isBrand: true
    },
    {
      icon: "fa-github",
      label: "GitHub",
      value: "GitHub Profile",
      link: contactData.github,
      color: "from-gray-700 to-gray-900",
      isBrand: true
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Create mailto link
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:sarwarirohullahamin6@gmail.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            GET IN <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 dark:from-blue-500 dark:via-cyan-400 dark:to-emerald-400">TOUCH.</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Details */}
          <div className={`lg:col-span-5 space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-8 rounded-[2.5rem] bg-white dark:bg-[#1e293b]/20 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex items-center space-x-6 backdrop-blur-md"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <i className={`${info.isBrand ? 'fab' : 'fas'} ${info.icon}`}></i>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{info.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-10 rounded-[3rem] bg-gray-900 dark:bg-[#1e293b]/40 text-white dark:text-white shadow-2xl relative overflow-hidden border dark:border-white/10 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-black mb-4 relative z-10">Working Hours</h3>
              <p className="text-gray-400 dark:text-gray-400 font-bold mb-6 relative z-10">I'm usually available for quick responses during these times.</p>
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold">Mon - Fri</span>
                  <span className="px-3 py-1 bg-white/10 dark:bg-white/5 rounded-lg font-black border dark:border-white/10 transition-colors">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold">Saturday</span>
                  <span className="px-3 py-1 bg-white/10 dark:bg-white/5 rounded-lg font-black border dark:border-white/10 transition-colors">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold">Sunday</span>
                  <span className="text-blue-400 dark:text-blue-400 font-black uppercase tracking-widest text-[10px]">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-7 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1e293b]/20 p-10 md:p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 dark:border-white/5 space-y-8 transition-all duration-300 backdrop-blur-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-2">Your Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-8 py-5 bg-gray-50 dark:bg-[#020617]/50 border border-gray-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-2">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-8 py-5 bg-gray-50 dark:bg-[#020617]/50 border border-gray-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-2">Subject</label>
                <input
                  required
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration"
                  className="w-full px-8 py-5 bg-gray-50 dark:bg-[#020617]/50 border border-gray-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-2">Your Message</label>
                <textarea
                  required
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full px-8 py-5 bg-gray-50 dark:bg-[#020617]/50 border border-gray-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white font-medium resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className={`w-full py-6 rounded-2xl font-black text-xl transition-all duration-300 flex items-center justify-center gap-4 shadow-xl ${
                  formStatus === 'success' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-blue-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-blue-500/20'
                }`}
              >
                {formStatus === 'idle' && (
                  <>SEND MESSAGE <i className="fas fa-paper-plane"></i></>
                )}
                {formStatus === 'sending' && (
                  <>SENDING... <i className="fas fa-circle-notch animate-spin"></i></>
                )}
                {formStatus === 'success' && (
                  <>MESSAGE SENT! <i className="fas fa-check-circle"></i></>
                )}
              </button>
              
              {formStatus === 'success' && (
                <p className="text-center text-emerald-500 font-bold animate-fade-in">
                  Thank you! I'll get back to you as soon as possible.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
