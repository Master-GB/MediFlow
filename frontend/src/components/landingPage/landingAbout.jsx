import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function LandingAbout() {
  const [visibleSections, setVisibleSections] = useState({
    card: false,
    heading: false,
    text: false,
    stats: false,
    button: false
  });

  const refs = {
    card: useRef(null),
    heading: useRef(null),
    text: useRef(null),
    stats: useRef(null),
    button: useRef(null)
  };

  useEffect(() => {
    const observers = [];
    
    Object.entries(refs).forEach(([key, ref], index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [key]: true
            }));
          }
        },
        { 
          threshold: 0.05, // Trigger animation when 5% of element is visible
          rootMargin: '0px 0px -10% 0px' // Slight negative margin at bottom
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
        observers.push({ observer, element: ref.current });
      }
    });

    return () => {
      observers.forEach(({ observer, element }) => {
        observer.unobserve(element);
      });
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Reduced delay between elements
        duration: 0.4,  // Faster animation
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  };

  


  return (
    <div>
        {/* About Us Section */}
        <section
          className="pt-16 relative overflow-hidden"
          style={{
            opacity: 1, // Ensure section is always visible
            transition: 'opacity 0.3s ease-in-out',
            backgroundImage: "url('/src/assets/images/aboutN.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
            minHeight: '90vh',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
          }}
        >
          {/* Top shadow overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(to bottom, rgba(19, 31, 242, 0.5) 0%, transparent 90%)',
            pointerEvents: 'none'
          }}></div>
          <div className="absolute inset-0 bg-linear-to-r from-white/70 via-white/50 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 h-full">
            <div className="flex justify-end h-full">
              <div className="w-full lg:w-1/2 lg:pl-12 lg:pr-8 lg:py-2 rounded-l-2xl">
                {/* Serving Since Card */}
                <motion.div 
                  ref={refs.card}
                  initial="hidden"
                  animate={visibleSections.card ? 'visible' : 'hidden'}
                  variants={fadeInUp}
                  custom={0.5}
                  className="absolute -left-8 top-0 bg-white p-4 rounded-xl shadow-xl border border-gray-100 z-10 transform transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center">
                    <div className="shrink-0 bg-green-500 rounded-lg p-2">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Serving Since</p>
                      <p className="text-xl font-bold text-gray-900">2023</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  ref={refs.heading}
                  initial="hidden"
                  animate={visibleSections.heading ? 'visible' : 'hidden'}
                  variants={fadeInUp}
                  custom={0.7}
                  className="text-left mb-8"
                >
                  <span className="text-green-500 text-sm font-semibold uppercase tracking-wider">About MediFlow</span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#011282] mt-1">Transforming Healthcare with Technology</h2>
                </motion.div>
                <motion.p 
                  ref={refs.text}
                  initial="hidden"
                  animate={visibleSections.text ? 'visible' : 'hidden'}
                  variants={fadeInUp}
                  custom={0.9}
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                >
                  At MediFlow, we're redefining healthcare management through innovative technology solutions. Our platform bridges the gap between healthcare providers and patients, creating a seamless, efficient, and patient-centered experience. By integrating cutting-edge AI with comprehensive medical expertise, we're setting new standards in healthcare delivery.
                </motion.p>

                <motion.div 
                  ref={refs.stats}
                  initial="hidden"
                  animate={visibleSections.stats ? 'visible' : 'hidden'}
                  variants={fadeInUp}
                  custom={1.1}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
                >
                  {/* Patients Served Card */}
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform transition-all duration-300 hover:scale-105">
                    <div className="flex items-start">
                      <div className="shrink-0 bg-green-100 p-2 rounded-lg">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-2xl font-bold text-gray-900">10,000+</p>
                        <p className="text-sm text-gray-500">Patients Served</p>
                      </div>
                    </div>
                  </div>

                  {/* Healthcare Providers Card */}
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform transition-all duration-300 hover:scale-105">
                    <div className="flex items-start">
                      <div className="shrink-0 bg-green-100 p-2 rounded-lg">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-2xl font-bold text-gray-900">500+</p>
                        <p className="text-sm text-gray-500">Healthcare Providers</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  ref={refs.button}
                  initial="hidden"
                  animate={visibleSections.button ? 'visible' : 'hidden'}
                  variants={fadeInUp}
                  custom={1.3}
                  className="mt-8"
                >
                  <a
                    href="/about"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
                  >
                    Discover Our Story
                    <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </motion.div>

                {/* Partner section */}
                <div className="max-w-7xl mx-auto px-2 lg:px-1 -mt-3">

                  <div className="flex items-center space-x-1 animate-marquee whitespace-nowrap -ml-200">
                    {/* Partner 1 */}
                    <div className="flex flex-col items-center mt-0.5 space-y-2 min-w-37.5">
                      <div className="h-30 w-30 mb-1  flex items-center justify-center">
                        <img src="/src/assets/images/partners/p1.png" />
                      </div>
                    </div>

                    {/* Partner 2 */}
                    <div className="flex flex-col items-center  min-w-37.5">
                      <div className="h-29 w-29 mb-3  flex items-center justify-center">
                        <img src="/src/assets/images/partners/p2.png" />
                      </div>
                    </div>

                    {/* Partner 3 */}
                    <div className="flex flex-col ml-6 items-center  space-y-2 min-w-37.5">
                      <div className="h-42 w-42   mb-3 flex items-center justify-center">
                        <img src="/src/assets/images/partners/p4.png" />
                      </div>
                    </div>


                    {/* Partner 4 */}
                    <div className="flex flex-col  ml-4 items-center space-y-2 min-w-37.5">
                      <div className="h-27 w-27  mb-3 flex items-center justify-center">
                        <img src="/src/assets/images/partners/p7.png" />
                      </div>
                    </div>

                    {/* Partner 5*/}
                    <div className="flex flex-col ml-8 items-center space-y-2 min-w-37.5">
                      <div className="h-60 w-60 mb-2  flex items-center justify-center">
                        <img src="/src/assets/images/partners/p8.png" />
                      </div>
                    </div>


                    {/* Partner 6 */}
                    <div className="flex flex-col items-center space-y-2 ml-7   min-w-37.5">
                      <div className="h-30 w-30 mb-2 flex items-center justify-center">
                        <img src="/src/assets/images/partners/p3.png" />
                      </div>
                    </div>



                    {/* Partner 7 */}
                    <div className="flex flex-col items-center space-y-2 ml-2  min-w-37.5">
                      <div className="h-28 w-28  flex items-center justify-center">
                        <img src="/src/assets/images/partners/p5.png" />
                      </div>
                    </div>

                    {/* Partner 8 */}
                    <div className="flex flex-col items-center space-y-2 ml-1 min-w-37.5">
                      <div className="h-35 w-35  flex items-center justify-center">
                        <img src="/src/assets/images/partners/p6.png" />
                      </div>
                    </div>

                    {/* Partner 9 */}
                    <div className="flex flex-col items-center space-y-2 pl-24 min-w-37.5">
                      <div className="h-50 w-50  flex items-center justify-center">
                        <img src="/src/assets/images/partners/p9.png" />
                      </div>
                    </div>

                    {/* Partner 10 */}
                    <div className="flex flex-col items-center space-y-2 pl-36 min-w-37.5">
                      <div className="h-28 w-28  flex items-center justify-center">
                        <img src="/src/assets/images/partners/p10.png" />
                      </div>
                    </div>


                    {/* Partner 1 */}
                    <div className="flex flex-col items-center ml-14 mt-3 space-y-2 min-w-37.5">
                      <div className="h-30 w-30 mb-1  flex items-center justify-center">
                        <img src="/src/assets/images/partners/p1.png" />
                      </div>
                    </div>

                    {/* Partner 2 */}
                    <div className="flex flex-col items-center  min-w-37.5">
                      <div className="h-29 w-29 mb-3  flex items-center justify-center">
                        <img src="/src/assets/images/partners/p2.png" />
                      </div>
                    </div>

                    {/* Partner 3 */}
                    <div className="flex flex-col ml-6 items-center  space-y-2 min-w-37.5">
                      <div className="h-42 w-42   mb-3 flex items-center justify-center">
                        <img src="/src/assets/images/partners/p4.png" />
                      </div>
                    </div>
                  </div>
                </div>

                <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-55%); }
            }
            .animate-marquee {
              animation: marquee 15s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: pause;
            }
          `}</style>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}

export default LandingAbout;
