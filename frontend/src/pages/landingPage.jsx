import React, { useEffect, useState, useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import LandingNav from "../components/landingPage/landingNav.jsx";
import LandingFooter from '../components/landingPage/landingFooter.jsx';
import LandingAbout from "../components/landingPage/landingAbout.jsx";
import LandingFeature from "../components/landingPage/landingFeature.jsx";
import LandingWorkFlow from "../components/landingPage/landingWorkFlow.jsx";
import LandingCoreValue from "../components/landingPage/landingCoreValue.jsx";
import LandingTestimonials from "../components/landingPage/landingTestimonials.jsx";
import dnaBg from "../assets/images/newBG2.jpg";
import overBG from "../assets/images/overBG.png";

const LandingPage = () => {
  const [aboutSectionRef, setAboutSectionRef] = useState(null);

  // Particles.js configuration
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (aboutSectionRef) {
        const rect = aboutSectionRef.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        const sectionTop = aboutSectionRef.offsetTop;
        const windowHeight = window.innerHeight;

        // Calculate how much to move the section up (from 0 to -100% of viewport height)
        const moveUp = Math.min(Math.max((scrollPosition - sectionTop + windowHeight) * 0.5, 0), windowHeight);

        // Update the transform style
        aboutSectionRef.style.transform = `translateY(-${moveUp}px)`;
        // Compensate layout gap created by transform by pulling up the following content
        aboutSectionRef.style.marginBottom = `-${moveUp}px`;

        // Adjust z-index when section is moving up
        if (moveUp > 0) {
          aboutSectionRef.style.zIndex = '20';
          aboutSectionRef.style.position = 'relative';
        } else {
          aboutSectionRef.style.zIndex = '10';
          aboutSectionRef.style.marginBottom = '0px';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial trigger
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [aboutSectionRef]);

  return (
    <div className="min-h-screen text-slate-900 antialiased relative">
      {/* DNA Particles Background - Moved this right after the opening main container div */}
      <div
        className="fixed top-0 left-0 w-full h-full "
        style={{
          zIndex: -1  // Make sure this is lower than your content
        }}
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
            },
            particles: {
              color: { value: "#3b82f6" },
              links: {
                color: "#3b82f6",
                distance: 150,
                enable: true,
                opacity: 0.7,  // Increased opacity
                width: 1.5,   // Slightly thicker lines
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 2,     // Slightly faster movement
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 300   // Increased particle density
                },
                value: 40,    // Increased number of particles
              },
              opacity: {
                value: 0.8,   // Increased particle opacity
                random: true
              },
              shape: { type: "circle" },
              size: {
                value: {
                  min: 2,
                  max: 5      // Slightly larger particles
                }
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      <LandingNav className="fixed top-0 left-0 right-0 z-50" />

      {/* Hero Section */}
      <main className="mt-0 relative">
        <section
          className="relative px-0 lg:px-0 pt-0 lg:pt-28 pb-6 lg:pb-28 w-full min-h-screen overflow-hidden"
          style={{
            position: 'relative',
          }}
        >
          {/* Background image with blur effect */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${dnaBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(0px)',
              boxShadow: '0 40px 100px -20px rgba(96, 165, 250, 1)',
              zIndex: -5
            }}
          >

          </div>

          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 0, 40, 0.7) 0%, rgba(0, 10, 60, 0.3) 57%, transparent 100%)',
              backdropFilter: 'blur(2.5px)',
              WebkitBackdropFilter: 'blur(4px)',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          <div
            className="absolute inset-0 w-11/12 h-auto ml-38"
            style={{
              backgroundImage: `url(${overBG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(0px)',
              zIndex: 5
            }}
          ></div>

          {/* Content above image */}
          <div className="relative z-10 w-full px-4 sm:pl-8 sm:pr-1">
            <div className="pt-10 pb-2 mt-14 sm:py-12 lg:py-0 w-full max-w-[60%] mx-1">
              <h1 className="heading2 text-4xl px-4 sm:pl-7 sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white text-left">
                <span className="block sm:whitespace-nowrap">
                  Revolutionizing{" "}
                  <span className="inline-block bg-amber-50 text-black font-bold rounded-full px-2 sm:px-3">
                    Healthcare
                  </span>
                </span>
                <span className="block mt-2 sm:mt-0 text-white text-2xl sm:text-3xl lg:text-6xl">
                  Through Intelligent Technology
                </span>
              </h1>
              <p className="sub mt-5 px-4 sm:pl-7 text-base font-light sm:text-lg text-white w-full max-w-5xl">
                MediFlow is a secure, modern healthcare platform that streamlines clinic operations, enhances patient engagement, and delivers smarter health insights through data-driven workflows.
              </p>

              <div className="mt-12 px-4 sm:pl-7 flex flex-wrap gap-4 items-center">
                <a
                  href="/signUp"
                  className="group relative inline-flex items-center justify-center pl-6 pr-2 py-2.5 text-lg bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center ">
                    Get Started
                    {/* New arrow icon with background */}
                    <span className=" h-7 w-8 ml-6 mr-1 bg-blue-500 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <svg
                        className="w-5 h-5 text-white transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </span>
                  {/* Hover effect background */}
                  <span className="absolute inset-0 bg-linear-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></span>
                </a>

                {/* Keep the Learn More button exactly the same */}
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-10 py-2.5 text-lg bg-transparent text-white border-2 border-white/70 hover:border-white font-semibold shadow-md hover:shadow-lg hover:bg-white/10 transition-all"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Content Wrapper - This will move up with the About section */}
      <div
        ref={setAboutSectionRef}
        className="relative transition-transform duration-300 ease-out"
        style={{
          willChange: 'transform',
          backgroundColor: 'white'
        }}
      >
        <LandingAbout />
        <LandingFeature />
        <LandingWorkFlow />
      </div>

      <LandingCoreValue />
      <LandingTestimonials />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;