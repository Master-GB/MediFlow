import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Users, Stethoscope, Building, FileText, Phone } from 'lucide-react';

const LandingNav = ({ className = '' }) => {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // close menus when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
        setResourcesOpen(false);
        setHowItWorksOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header 
      className={`w-full z-50 fixed top-0 left-0 right-0 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      } ${className}`}
    >
      <nav
        className="w-full px-4 sm:px-5 lg:px-8 relative"
        ref={navRef}
        aria-label="Main navigation"
        style={{ zIndex: 50 }}
      >
        <div className="flex items-center justify-between h-16 w-full mb-3 pt-2">
          <div className="flex items-center">
            <a href="/" className={`flex items-center gap-2 -ml-10 ${scrolled ? 'text-white' : 'text-white'}`}>
              <img 
                src="/src/assets/images/newLogo.png" 
                alt="MediFlow Logo" 
                className={`h-25 w-auto mt-2`} 
              />
              <span className={`heading2 text-3xl mt-2  -ml-9 -${scrolled ? 'text-white' : 'text-white'}`}>MediFlow</span>
            </a>
          </div>

          <div className="flex-1 flex justify-end ml-auto pt-3">
            {/* Desktop links */}
            <div className="hidden sm:flex items-center space-x-5">
              <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={resourcesOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    setResourcesOpen(s => !s);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium cursor-pointer transition-colors ${
                    scrolled 
                      ? 'text-white/90 hover:bg-white/10' 
                      : 'text-white hover:bg-blue-800/30'
                  }`}
                >
                  Features
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d={resourcesOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`absolute left-0 top-full mt-2 w-125 rounded-2xl shadow-2xl bg-black/75 backdrop-blur-xl border border-white/20 ${resourcesOpen ? "block" : "hidden"}`}
                      role="menu"
                      aria-label="Platform submenu"
                      style={{ zIndex: 1000 }}
                    >
                      <div className="p-3">
                        <div className="grid grid-cols-2 gap-2">
                          
                          <a href="/ai-symptom-analyzer" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-100 hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-200 group">
                            <FileText className="w-4 h-4 text-gray-300" />
                            <span className="font-medium text-sm">AI Symptom Analyzer</span>
                          </a>
                          <a href="/smart-clinic-management" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-100 hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-200 group">
                            <Building className="w-4 h-4 text-gray-300" />
                            <span className="font-medium text-sm">Clinic Management</span>
                          </a>
                          <a href="/doctor-workflow-optimization" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-100 hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-200 group">
                            <Stethoscope className="w-4 h-4 text-gray-300" />
                            <span className="font-medium text-sm">Doctor Workflow</span>
                          </a>
                          <a href="/pharmacy-prescription-management" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-100 hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-200 group">
                            <FileText className="w-4 h-4 text-gray-300" />
                            <span className="font-medium text-sm">Pharmacy Management</span>
                          </a>
                          <a href="/appointment-management" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-100 hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-200 group">
                            <Users className="w-4 h-4 text-gray-300" />
                            <span className="font-medium text-sm">Appointment Management</span>
                          </a>
                          <a href="/telemedicine" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-100 hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-200 group">
                            <Phone className="w-4 h-4 text-gray-300" />
                            <span className="font-medium text-sm">Telemedicine</span>
                          </a>
                          <a href="/reports-analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-100 hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-200 group">
                            <FileText className="w-4 h-4 text-gray-300" />
                            <span className="font-medium text-sm">Reports & Analytics</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setHowItWorksOpen(true)}
                onMouseLeave={() => setHowItWorksOpen(false)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={howItWorksOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHowItWorksOpen(s => !s);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium cursor-pointer transition-colors ${
                    scrolled 
                      ? 'text-white/90 hover:bg-white/10' 
                      : 'text-white hover:bg-blue-800/30'
                  }`}
                >
                  How It Works
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d={howItWorksOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <AnimatePresence>
                  {howItWorksOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`absolute left-0 top-full mt-2 w-106 rounded-2xl shadow-2xl bg-black/75 backdrop-blur-xl border border-white/20 ${howItWorksOpen ? "block" : "hidden"}`}
                      role="menu"
                      aria-label="For Users submenu"
                      style={{ zIndex: 1000 }}
                    >
                      <div className="p-3">
                        <div className="grid grid-cols-2 gap-2">
                          <a href="/howItWork-patient" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-100 hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-200 group">
                            <Users className="w-4 h-4 text-gray-300" />
                            <span className="font-medium text-sm">For Patients</span>
                          </a>
                          <a href="/howItWork-doctor" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-100 hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-200 group">
                            <Stethoscope className="w-4 h-4 text-gray-300" />
                            <span className="font-medium text-sm">For Doctors</span>
                          </a>
                          <a href="/howItWork-clinic" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-100 hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-200 group">
                            <Building className="w-4 h-4 text-gray-300" />
                            <span className="font-medium text-sm">For Clinics</span>
                          </a>
                          <a href="/howItWork-pharmacists" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-100 hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-200 group">
                            <FileText className="w-4 h-4 text-gray-300" />
                            <span className="font-medium text-sm">For Pharmacists</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <a href="/pricing-page" className={`px-3 py-2 rounded-md font-medium cursor-pointer transition-colors ${
                scrolled 
                  ? 'text-white/90 hover:bg-white/10' 
                  : 'text-white hover:bg-blue-800/30'
              }`}>Pricing</a>

              <a href="/about-us" className={`px-3 py-2 rounded-md font-medium cursor-pointer transition-colors ${
                scrolled 
                  ? 'text-white/90 hover:bg-white/10' 
                  : 'text-white hover:bg-blue-800/30'
              }`}>About Us</a>
              <a href="/contact-us" className={`px-3 py-2 rounded-md font-medium cursor-pointer transition-colors ${
                scrolled 
                  ? 'text-white/90 hover:bg-white/10' 
                  : 'text-white hover:bg-blue-800/30'
              }`}>Contact Us</a>
            </div>

            {/* CTA (desktop) */}
            <div className="hidden sm:flex sm:items-center sm:space-x-3 ml-12 mr-4">
              <a 
                href="/signUp" 
                className={`inline-flex items-center gap-2 px-4 py-1.5 font-bold rounded-lg transition-all ${
                  scrolled 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-blue-400/40 text-white hover:bg-blue-400/60'
                }`}
              >
                Sign Up
              </a>
              <a
                href="/signIn"
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold shadow-md transition-all ${
                  scrolled 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-blue-600 text-black hover:bg-blue-500'
                }`}
              >
                Sign In
              </a>
            </div>

            {/* Mobile hamburger */}
            <div className="sm:hidden ml-2">
              <button
                onClick={() => setOpen(s => !s)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="relative inline-flex items-center justify-center p-3 rounded-xl text-slate-800 hover:bg-slate-100 focus:outline-none transition-all duration-300 hover:scale-110"
              >
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Menu width="24" height="24" className="w-6 h-6" />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              id="mobile-menu" 
              className="fixed inset-0 top-16 z-50 sm:hidden"
            >
              <div className="bg-black/98 backdrop-blur-xl h-full overflow-y-auto">
                <div className="px-4 py-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white mb-3">Platform</h3>
                    <a href="/docs" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 transition-all duration-200">
                      <FileText className="w-5 h-5 text-gray-300" />
                      <span className="font-medium">Documentation</span>
                    </a>
                    <a href="/blog" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 transition-all duration-200">
                      <FileText className="w-5 h-5 text-gray-300" />
                      <span className="font-medium">Blog & Resources</span>
                    </a>
                    <a href="/support" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 transition-all duration-200">
                      <Phone className="w-5 h-5 text-gray-300" />
                      <span className="font-medium">Support Center</span>
                    </a>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white mb-3">For Users</h3>
                    <a href="#for-patients" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 transition-all duration-200">
                      <Users className="w-5 h-5 text-gray-300" />
                      <span className="font-medium">For Patients</span>
                    </a>
                    <a href="/howItWork-doctor" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 transition-all duration-200">
                      <Stethoscope className="w-5 h-5 text-gray-300" />
                      <span className="font-medium">For Doctors</span>
                    </a>
                    <a href="/howItWork-clinic" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 transition-all duration-200">
                      <Building className="w-5 h-5 text-gray-300" />
                      <span className="font-medium">For Clinics</span>
                    </a>
                    <a href="/howItWork-pharmacists" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 transition-all duration-200">
                      <FileText className="w-5 h-5 text-gray-300" />
                      <span className="font-medium">For Pharmacists</span>
                    </a>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <a href="/about-us" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 transition-all duration-200">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <span className="font-medium">About Us</span>
                    </a>
                    <a href="/contact-us" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-linear-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-700 transition-all duration-200">
                      <Phone className="w-5 h-5 text-pink-600" />
                      <span className="font-medium">Contact Us</span>
                    </a>
                    <a href="/pricing" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-linear-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all duration-200">
                      <FileText className="w-5 h-5 text-amber-600" />
                      <span className="font-medium">Pricing</span>
                    </a>
                  </div>
                  
                  <div className="px-3 pt-4 space-y-2">
                    <a href="/signIn" className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-800 hover:bg-linear-to-r hover:from-slate-100 hover:to-slate-200 hover:text-slate-900 transition-all duration-200">
                      <span>Sign In</span>
                    </a>
                    <a href="/signUp" className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105">
                      <span>Get Started</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default LandingNav;