import React, { useEffect, useRef, useState } from 'react'

const LandingWorkFlow = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on section visibility (0 to 1)
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      let progress = 0;
      
      // Start animation earlier - when section is 70% into viewport
      if (sectionTop <= windowHeight * 0.8 && sectionTop + sectionHeight >= 0) {
        const scrolled = (windowHeight * 0.9) - sectionTop;
        const total = (windowHeight * 0.3) + sectionHeight;
        progress = Math.max(0, Math.min(1, scrolled / total)) * 1.3; // Boost progress
      }
      
      setScrollProgress(Math.min(1, progress));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Arrow positions: top (25%), middle (50%), bottom (75%)
  const arrowPositions = ['25%', '50%', '75%'];
  
  // Different colors for each arrow
  const arrowColors = [
    {
      gradient: ['#3B82F6', '#2563EB', '#1D4ED8'], // Blue
      name: 'blue'
    },
    {
      gradient: ['#10B981', '#059669', '#047857'], // Green
      name: 'green'
    },
    {
      gradient: ['#8B5CF6', '#7C3AED', '#6D28D9'], // Purple
      name: 'purple'
    }
  ];

  // Calculate individual arrow progress with proper staggering
  const getArrowProgress = (index) => {
    // Each arrow needs 0.4 of the scroll to complete (overlap for smoother effect)
    const startProgress = index * 0.3;
    const endProgress = startProgress + 0.4;
    
    if (scrollProgress < startProgress) return 0;
    if (scrollProgress > endProgress) return 1;
    
    return (scrollProgress - startProgress) / 0.4;
  };

  return (
    <div className="relative overflow-x-hidden" style={{ zIndex: 100, boxShadow: '0 20px 25px -5px rgba(29, 78, 216, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.05)' }}>
      <section ref={sectionRef} className="pt-0 pb-14 -mt-3 relative overflow-visible bg-linear-to-r from-blue-100 to-emerald-100" >
        
        {/* Left side pulse waves - Healthcare heartbeat style */}
        {arrowPositions.map((position, index) => {
          const waveProgress = getArrowProgress(index);
          const leftTransform = -150 + (waveProgress * 170);
          
          return (
            <div 
              key={`left-${index}`}
              className="absolute left-0 z-[200] pointer-events-none"
              style={{
                top: position,
                transform: `translate(${leftTransform}px, -50%)`,
                opacity: waveProgress,
                transition: 'transform 0.2s ease-out, opacity 0.2s ease-out'
              }}
            >
              <svg
                width="180"
                height="80"
                viewBox="0 0 180 80"
                fill="none"
                style={{
                  filter: `drop-shadow(0 8px 25px ${arrowColors[index].gradient[0]}CC)`,
                }}
              >
                {/* Heartbeat pulse wave */}
                <path
                  d="M5 40 L30 40 L40 25 L50 55 L60 20 L70 60 L80 40 L175 40"
                  stroke={`url(#gradient-left-${index})`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                
                {/* Glow effect layer */}
                <path
                  d="M5 40 L30 40 L40 25 L50 55 L60 20 L70 60 L80 40 L175 40"
                  stroke={arrowColors[index].gradient[1]}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.3"
                />
                
                {/* Flowing particles along the wave */}
                <circle cx="45" cy="40" r="3" fill={arrowColors[index].gradient[0]} opacity="0.8">
                  <animate attributeName="cx" values="45;155" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
                </circle>
                
                <circle cx="35" cy="40" r="2.5" fill={arrowColors[index].gradient[1]} opacity="0.6">
                  <animate attributeName="cx" values="35;145" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0" dur="2.2s" repeatCount="indefinite" />
                </circle>
                
                <circle cx="55" cy="40" r="2" fill={arrowColors[index].gradient[2]} opacity="0.7">
                  <animate attributeName="cx" values="55;165" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
                
                {/* Directional indicator dots */}
                <circle cx="170" cy="40" r="4" fill={arrowColors[index].gradient[0]} opacity="0.9" />
                <circle cx="162" cy="40" r="3" fill={arrowColors[index].gradient[1]} opacity="0.7" />
                <circle cx="154" cy="40" r="2" fill={arrowColors[index].gradient[2]} opacity="0.5" />
                
                <defs>
                  <linearGradient id={`gradient-left-${index}`} x1="5" y1="20" x2="175" y2="60">
                    <stop offset="0%" stopColor={arrowColors[index].gradient[0]} />
                    <stop offset="50%" stopColor={arrowColors[index].gradient[1]} />
                    <stop offset="100%" stopColor={arrowColors[index].gradient[2]} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          );
        })}

        {/* Right side pulse waves - Healthcare heartbeat style */}
        {arrowPositions.map((position, index) => {
          const waveProgress = getArrowProgress(index);
          const rightTransform = 150 - (waveProgress * 170);
          
          return (
            <div 
              key={`right-${index}`}
              className="absolute right-0 z-[200] pointer-events-none"
              style={{
                top: position,
                transform: `translate(${rightTransform}px, -50%)`,
                opacity: waveProgress,
                transition: 'transform 0.2s ease-out, opacity 0.2s ease-out'
              }}
            >
              <svg
                width="180"
                height="80"
                viewBox="0 0 180 80"
                fill="none"
                style={{
                  filter: `drop-shadow(0 8px 25px ${arrowColors[index].gradient[0]}CC)`,
                }}
              >
                {/* Heartbeat pulse wave (mirrored) */}
                <path
                  d="M175 40 L150 40 L140 25 L130 55 L120 20 L110 60 L100 40 L5 40"
                  stroke={`url(#gradient-right-${index})`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                
                {/* Glow effect layer */}
                <path
                  d="M175 40 L150 40 L140 25 L130 55 L120 20 L110 60 L100 40 L5 40"
                  stroke={arrowColors[index].gradient[1]}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.3"
                />
                
                {/* Flowing particles along the wave */}
                <circle cx="135" cy="40" r="3" fill={arrowColors[index].gradient[0]} opacity="0.8">
                  <animate attributeName="cx" values="135;25" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
                </circle>
                
                <circle cx="145" cy="40" r="2.5" fill={arrowColors[index].gradient[1]} opacity="0.6">
                  <animate attributeName="cx" values="145;35" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0" dur="2.2s" repeatCount="indefinite" />
                </circle>
                
                <circle cx="125" cy="40" r="2" fill={arrowColors[index].gradient[2]} opacity="0.7">
                  <animate attributeName="cx" values="125;15" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
                
                {/* Directional indicator dots */}
                <circle cx="10" cy="40" r="4" fill={arrowColors[index].gradient[0]} opacity="0.9" />
                <circle cx="18" cy="40" r="3" fill={arrowColors[index].gradient[1]} opacity="0.7" />
                <circle cx="26" cy="40" r="2" fill={arrowColors[index].gradient[2]} opacity="0.5" />
                
                <defs>
                  <linearGradient id={`gradient-right-${index}`} x1="175" y1="20" x2="5" y2="60">
                    <stop offset="0%" stopColor={arrowColors[index].gradient[0]} />
                    <stop offset="50%" stopColor={arrowColors[index].gradient[1]} />
                    <stop offset="100%" stopColor={arrowColors[index].gradient[2]} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          );
        })}

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-green-500">
                Simple Yet Powerful Workflow
              </span>
            </h2>
            <p className="text-xl text-gray-900  max-w-3xl mx-auto mb-12">
              Get started with MediFlow in just a few simple steps and transform your healthcare practice today.
            </p>
          </div>

          {/* Steps */}
          {/* Steps */}
          <div className="relative">
            {/* Animated connecting line with visible effects */}
            <div className="hidden lg:flex absolute top-24 left-1/2 transform -translate-x-1/2 w-4/5 h-2 rounded-full overflow-hidden">
              {/* Base gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-400 to-blue-500 rounded-full"></div>
              
              {/* Animated flowing light effect */}
              <div 
                className="absolute inset-0 h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.9) 70%, transparent 100%)',
                  animation: 'flowLight 2.5s ease-in-out infinite',
                  width: '40%'
                }}
              ></div>
              
              {/* Pulsing glow overlay */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, transparent 70%)',
                  animation: 'glowPulse 2s ease-in-out infinite alternate'
                }}
              ></div>
            </div>

            {/* Enhanced keyframe animations */}
            <style jsx>{`
              @keyframes flowLight {
                0% {
                  transform: translateX(-120%);
                  opacity: 0;
                }
                10% {
                  opacity: 1;
                }
                90% {
                  opacity: 1;
                }
                100% {
                  transform: translateX(350%);
                  opacity: 0;
                }
              }
              
              @keyframes glowPulse {
                0% {
                  opacity: 0.4;
                  transform: scale(1);
                }
                100% {
                  opacity: 0.8;
                  transform: scale(1.05);
                }
              }
            `}</style>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  number: '01',
                  title: 'Sign Up & Create Profile',
                  description: 'Patients and clinics quickly create secure accounts with role-based access. Each profile is customized to show relevant features.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ),
                  gradient: 'from-blue-500 to-blue-600'
                },
                {
                  number: '02',
                  title: 'Track Health & Appointments',
                  description: 'Monitor health data and manage appointments seamlessly. Get reminders and updates for all your healthcare needs in one place.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                  gradient: 'from-green-500 to-green-600'
                },
                {
                  number: '03',
                  title: 'AI Health Insights',
                  description: 'Get personalized health insights powered by AI. Our system analyzes your data to provide meaningful health recommendations.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0114 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  gradient: 'from-purple-500 to-purple-600'
                },
                {
                  number: '04',
                  title: 'Consult & Follow Up',
                  description: 'Connect with healthcare professionals, receive treatment plans, and track your progress with our comprehensive follow-up system.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  gradient: 'from-indigo-500 to-indigo-600'
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2), 0 2px 4px -1px rgba(16, 185, 129, 0.2)',
                    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out'
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Background number */}
                  <div
                    className="absolute -top-2 -right-2 text-6xl mr-3 font-bold text-gray-50 group-hover:text-gray-100 transition-all duration-500 z-0"
                    style={{
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                      WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    {step.number}
                  </div>

                  <div className="relative z-10">
                    {/* Icon with gradient background */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-linear-to-br ${step.gradient} text-white flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:scale-110`}
                      style={{
                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3), 0 2px 4px -1px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      {step.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className={`absolute inset-0 bg-linear-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-1`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingWorkFlow