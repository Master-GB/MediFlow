import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const LandingFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ];

  const services = [
    { name: 'Patient Portal', path: '/services/patient-portal' },
    { name: 'Appointment Scheduling', path: '/services/appointments' },
    { name: 'Electronic Health Records', path: '/services/ehr' },
    { name: 'Telemedicine', path: '/services/telemedicine' },
    { name: 'Medical Billing', path: '/services/billing' },
  ];

  const contactInfo = [
    { 
      icon: <FaMapMarkerAlt />, 
      text: '123 Medical Drive, Health City, HC 12345',
      label: 'Visit Us'
    },
    { 
      icon: <FaPhoneAlt />, 
      text: '+1 (555) 123-4567',
      label: 'Call Us'
    },
    { 
      icon: <FaEnvelope />, 
      text: 'info@mediflow.com',
      label: 'Email Us'
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com', label: 'Facebook', color: 'from-blue-600 to-blue-500' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter', color: 'from-sky-500 to-blue-400' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn', color: 'from-blue-700 to-blue-600' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram', color: 'from-pink-600 via-purple-600 to-orange-500' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden" style={{ zIndex: 10, boxShadow: '0 -30px 50px 5px rgba(29, 78, 216, 0.5), 0 -10px 10px -5px rgba(0, 0, 0, 0.05)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Company Info - Spans 4 columns */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
                  MediFlow
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Transforming healthcare through innovative technology solutions that connect patients and providers seamlessly. Experience the future of medical care.
                </p>
              </div>
              
              {/* Social Links - Enhanced from Version 2 */}
              <div>
                <p className="text-sm font-semibold text-slate-400 mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></span>
                  Connect With Us
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group relative"
                    >
                      <div className={`absolute -inset-1 bg-gradient-to-r ${social.color} rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500`}></div>
                      <div className="relative w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-transparent transition-all duration-300 hover:scale-110 hover:border-transparent overflow-hidden">
                        <span className={`text-slate-300 group-hover:text-white transition-all duration-300 relative z-10 text-lg`}>
                          {social.icon}
                        </span>
                        <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links - Spans 2 columns */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-bold mb-6 text-white relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="group text-slate-300 hover:text-white transition-all duration-300 flex items-center text-sm"
                    >
                      <FaArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-cyan-400" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services - Spans 3 columns */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-bold mb-6 text-white relative inline-block">
                Our Services
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.path}
                      className="group text-slate-300 hover:text-white transition-all duration-300 flex items-center text-sm"
                    >
                      <FaArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-cyan-400" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info - Spans 3 columns */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-bold mb-6 text-white relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mr-3 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                      <span className="text-cyan-400">{item.icon}</span>
                    </span>
                    <span className="text-slate-300 text-sm pt-2">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <h4 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      Stay Updated
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Subscribe to our newsletter for the latest healthcare insights and updates
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-5 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={subscribed}
                      className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {subscribed ? (
                          <>
                            <FaCheckCircle className="w-4 h-4" />
                            Subscribed!
                          </>
                        ) : (
                          <>
                            Subscribe
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">
                &copy; {currentYear} <span className="font-semibold text-slate-300">MediFlow</span>. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link to="/privacy-policy" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;