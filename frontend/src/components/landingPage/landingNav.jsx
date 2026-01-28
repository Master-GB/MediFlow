import React, { useState, useRef, useEffect } from "react";

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

                <div
                  className={`origin-top-left absolute left-0 top-full w-44 rounded-md shadow-lg bg-[#F0F0F0] ring-1 ring-black ring-opacity-5 focus:outline-none ${resourcesOpen ? "block" : "hidden"}`}
                  role="menu"
                  aria-label="Features submenu"
                  style={{ zIndex: 60 }}
                >
                  <div className="py-1">
                    <a href="/docs" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer">Docs</a>
                    <a href="/blog" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer">Blog</a>
                    <a href="/support" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer">Support</a>
                  </div>
                </div>
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

                <div
                  className={`origin-top-left absolute left-0 top-full w-48 rounded-md shadow-lg bg-[#F0F0F0] ring-1 ring-black ring-opacity-5 focus:outline-none ${howItWorksOpen ? "block" : "hidden"}`}
                  role="menu"
                  aria-label="How It Works submenu"
                  style={{ zIndex: 60 }}
                >
                  <div className="py-1">
                    <a href="#for-patients" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">For Patients</a>
                    <a href="#for-doctors" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">For Doctors</a>
                    <a href="#for-clinics" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">For Clinics</a>
                    <a href="#for-pharmacists" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">For Pharmacists</a>
                  </div>
                </div>
              </div>
              
              <a href="#pricing" className={`px-3 py-2 rounded-md font-medium cursor-pointer transition-colors ${
                scrolled 
                  ? 'text-white/90 hover:bg-white/10' 
                  : 'text-white hover:bg-blue-800/30'
              }`}>Pricing</a>

              <a href="#about" className={`px-3 py-2 rounded-md font-medium cursor-pointer transition-colors ${
                scrolled 
                  ? 'text-white/90 hover:bg-white/10' 
                  : 'text-white hover:bg-blue-800/30'
              }`}>About</a>
              <a href="#contact" className={`px-3 py-2 rounded-md font-medium cursor-pointer transition-colors ${
                scrolled 
                  ? 'text-white/90 hover:bg-white/10' 
                  : 'text-white hover:bg-blue-800/30'
              }`}>Contact</a>
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
                    : 'bg-blue-600 text-black hover:bg-blue-700'
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
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-800 hover:bg-slate-100 focus:outline-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                  <path d={open ? "M6 6l12 12M6 18L18 6" : "M3 6h18M3 12h18M3 18h18"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className={`${open ? "block" : "hidden"} sm:hidden`}>
          <div className="pt-4 pb-6 space-y-4 border-t" style={{ borderColor: "#F0F0F0" }}>
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Features</a>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Pricing</a>

            <div className="px-3">
              <button
                onClick={() => setResourcesOpen(s => !s)}
                aria-expanded={resourcesOpen}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-slate-800 hover:bg-slate-50 font-medium"
              >
                <span>Resources</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d={resourcesOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className={`${resourcesOpen ? "block" : "hidden"} mt-2 space-y-1`}>
                <a href="/docs" className="block px-4 py-2 rounded-md text-slate-700 hover:bg-slate-50">Docs</a>
                <a href="/blog" className="block px-4 py-2 rounded-md text-slate-700 hover:bg-slate-50">Blog</a>
                <a href="/support" className="block px-4 py-2 rounded-md text-slate-700 hover:bg-slate-50">Support</a>
              </div>
            </div>

            <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">About</a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50">Contact</a>

            <div className="px-3 pt-2 space-y-2">
              <a href="/login" className="block text-center px-4 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-50">Log in</a>
              <a href="/register" className="block text-center px-4 py-2 rounded-md bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold">Get Started</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default LandingNav;