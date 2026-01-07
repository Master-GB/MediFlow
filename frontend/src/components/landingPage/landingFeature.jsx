import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
    {
        id: 1,
        title: 'AI Symptom Analyzer',
        description: 'Advanced AI that helps patients identify potential health issues based on symptoms and provides preliminary assessments.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        bgColor: 'bg-blue-50',
        hoverColor: 'group-hover:bg-blue-100',
        gradient: 'from-blue-400 to-blue-600',
        bgUrl: "/src/assets/images/ai.webp",
        navigateLink: "/ai-symptom-analyzer"
    },
    {
        id: 2,
        title: 'Smart Clinic Management',
        description: 'Comprehensive clinic management system that handles appointments, patient records, and billing in one place.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        bgColor: 'bg-green-50',
        hoverColor: 'group-hover:bg-green-100',
        gradient: 'from-green-400 to-green-600',
        bgUrl: "/src/assets/images/clinic.webp",
        navigateLink: "/smart-clinic-management"
    },
    {
        id: 3,
        title: 'Doctor Workflow Optimization',
        description: 'Streamlined workflows for doctors with smart scheduling, patient history access, and prescription management.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
        bgColor: 'bg-purple-50',
        hoverColor: 'group-hover:bg-purple-100',
        gradient: 'from-purple-400 to-purple-600',
        bgUrl: "/src/assets/images/doctor1.webp",
        navigateLink: "/doctor-workflow-optimization"
    },
    {
        id: 4,
        title: 'Pharmacy & Prescription Management',
        description: 'Seamless integration with pharmacies for e-prescriptions and medication tracking.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        bgColor: 'bg-yellow-50',
        hoverColor: 'group-hover:bg-yellow-100',
        gradient: 'from-yellow-400 to-yellow-600',
        bgUrl: "/src/assets/images/phamacy.webp",
        navigateLink: "/pharmacy-prescription-management"
    },
    {
        id: 5,
        title: 'Appointment Management',
        description: 'Automated appointment scheduling, reminders, and calendar integration for better time management.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        bgColor: 'bg-red-50',
        hoverColor: 'group-hover:bg-red-100',
        gradient: 'from-red-400 to-red-600',
        bgUrl: "/src/assets/images/book.png",
        navigateLink: "/appointment-management"
    },
    {
        id: 6,
        title: 'Telemedicine',
        description: 'Secure video consultations and remote patient monitoring for virtual healthcare delivery.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
        bgColor: 'bg-indigo-50',
        hoverColor: 'group-hover:bg-indigo-100',
        gradient: 'from-indigo-400 to-indigo-600',
        bgUrl: "/src/assets/images/tele.jpg",
        navigateLink: "/telemedicine"

    },
    {
        id: 7,
        title: 'Reports & Analytics',
        description: 'Comprehensive analytics and reporting tools for tracking clinic performance and patient outcomes.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        bgColor: 'bg-pink-50',
        hoverColor: 'group-hover:bg-pink-100',
        gradient: 'from-pink-400 to-pink-600',
        bgUrl: "/src/assets/images/report.png",
        navigateLink: "/reports-analytics"
    }
];

const landingFeature = () => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [activeFeature, setActiveFeature] = useState(null);
    const navigate = useNavigate();
    // Create duplicated features with unique keys by appending the iteration index to the ID
    const duplicatedFeatures = [
        ...features.map(f => ({ ...f, id: `${f.id}-1` })),
        ...features.map(f => ({ ...f, id: `${f.id}-2` })),
        ...features.map(f => ({ ...f, id: `${f.id}-3` }))
    ];



    const handlePrevious = () => {
        if (!carouselRef.current) return;

        const container = carouselRef.current;
        const card = container.querySelector('.feature-card');
        if (!card) return;

        const cardWidth = card.offsetWidth + 24; // 24px gap
        const currentScroll = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        // Calculate new index
        let newIndex = Math.floor(currentScroll / cardWidth) - 1;

        // If we're at the start of the first set, jump to the middle of the second set
        if (newIndex < 0) {
            newIndex = features.length * 2 - 1;
            // First, jump to the same position in the middle set without animation
            container.scrollLeft = (newIndex + 1) * cardWidth;
            // Then animate to the previous card
            requestAnimationFrame(() => {
                smoothScrollTo(container, newIndex * cardWidth);
            });
        } else {
            // Normal previous scroll
            smoothScrollTo(container, newIndex * cardWidth);
        }
    };

    const handleNext = () => {
        if (!carouselRef.current) return;

        const container = carouselRef.current;
        const card = container.querySelector('.feature-card');
        if (!card) return;

        const cardWidth = card.offsetWidth + 24; // 24px gap
        const currentScroll = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        // Calculate new index
        let newIndex = Math.ceil(currentScroll / cardWidth) + 1;

        // If we're at the end of the last set, jump to the middle of the first set
        if (newIndex * cardWidth >= maxScroll) {
            // First, jump to the same position in the first set without animation
            container.scrollLeft = (newIndex - features.length * 2) * cardWidth;
            // Then animate to the next card
            requestAnimationFrame(() => {
                smoothScrollTo(container, (newIndex - features.length * 2 + 1) * cardWidth);
            });
        } else {
            // Normal next scroll
            smoothScrollTo(container, newIndex * cardWidth);
        }
    };

    // Handle scroll events for infinite loop
    useEffect(() => {
        const container = carouselRef.current;
        if (!container) return;

        const handleScroll = () => {
            const card = container.querySelector('.feature-card');
            if (!card) return;

            const cardWidth = card.offsetWidth + 24; // 24px gap
            const currentScroll = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;

            // Calculate the index within the original features array
            const indexInSet = Math.round((currentScroll % (features.length * cardWidth)) / cardWidth);

            // Update the current index (wrapping around if needed)
            const newIndex = (indexInSet + features.length) % features.length;

            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
            }

            // Handle seamless looping
            if (currentScroll <= 0) {
                // If scrolled to the start of the first set, jump to the middle of the second set
                container.scrollLeft = features.length * cardWidth * 2 - container.clientWidth;
            } else if (currentScroll >= maxScroll) {
                // If scrolled to the end of the last set, jump to the start of the middle set
                container.scrollLeft = features.length * cardWidth;
            }
        };

        container.addEventListener('scroll', handleScroll);

        // Initialize scroll position to the middle set for infinite scrolling in both directions
        if (container.scrollLeft === 0) {
            container.scrollLeft = features.length * (container.firstChild.offsetWidth + 24);
        }

        return () => container.removeEventListener('scroll', handleScroll);
    }, [currentIndex, features.length]);

    // Touch and mouse events for swipe/drag
    const startDragging = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    // Smooth scroll to a specific position
    const smoothScrollTo = (element, target, duration = 500) => {
        const start = element.scrollLeft;
        const change = target - start;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Easing function (easeInOutQuad)
            const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const easeValue = easeInOutQuad(progress);

            element.scrollLeft = start + change * easeValue;

            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    // Add scroll effect for About section to cover hero



    return (
        <div>
            <section id="features" className="pt-0 mt-0 pb-20 relative overflow-hidde bg-linear-to-r from-blue-100 to-emerald-100 z-0">
                {/* Blue background with dots - positioned behind top portion of feature cards */}
                <div className="absolute left-0 right-0 top-0 h-3/5 -mt-7 z-10"
                    style={{
                        backgroundColor: '#011282',
                        backgroundImage: 'linear-gradient(to right, rgba(100, 149, 237, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 149, 237, 0.2) 1px, transparent 1px)',
                        backgroundSize: '15px 15px',
                        backgroundPosition: '0 0',
                        opacity: 0.9,
                        zIndex: 0
                    }}>
                </div>
                <div className="max-w-11/12 mx-auto px-2 lg:px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 px-4">
                        <div className="mb-1 md:mb-0">
                            <span className="text-green-500 text-sm font-semibold uppercase tracking-wider">Our Features</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-1">What We Offer</h2>
                        </div>
                        <div className="max-w-md text-white text-opacity-80 border-l-4 border-green-500 pl-4 pr-2">
                            Discover our comprehensive healthcare solutions designed to enhance patient care and streamline medical practice management with cutting-edge technology.
                        </div>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative z-20">
                        {/* Left Arrow */}
                        <button
                            onClick={handlePrevious}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-transparent  transition-all duration-300 hover:scale-130 focus:outline-none"
                            style={{ marginLeft: '-70px' }}
                            aria-label="Previous features"
                        >
                            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Scrollable Cards Container */}
                        <div
                            ref={carouselRef}
                            className="overflow-hidden px-4 cursor-grab active:cursor-grabbing select-none touch-pan-x"
                            style={{ scrollBehavior: 'smooth' }}
                            onMouseDown={startDragging}
                            onMouseLeave={stopDragging}
                            onMouseUp={stopDragging}
                            onMouseMove={onDrag}
                            onTouchStart={(e) => startDragging(e.touches[0])}
                            onTouchEnd={stopDragging}
                            onTouchMove={(e) => onDrag(e.touches[0])}
                        >
                            <div className="flex gap-6">
                                {duplicatedFeatures.map((feature, idx) => (
                                    <div
                                        key={feature.id}
                                        className="feature-card group relative shrink-0 cursor-grab active:cursor-grabbing"
                                        onMouseEnter={() => setActiveFeature(feature.id)}
                                        onMouseLeave={() => setActiveFeature(null)}
                                        style={{
                                            width: 'calc(25% - 18px)',
                                            minWidth: '280px',
                                            minHeight: '320px',
                                            animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                                        }}
                                    >
                                        <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                                            {/* Background Image with Overlay */}
                                            <div className="absolute inset-0 overflow-hidden">
                                                <div className="absolute inset-0 bg-cover opacity-70 bg-center transition-all duration-700 ease-in-out transform group-hover:scale-110" style={{ backgroundImage: `url(${feature.bgUrl})` }}></div>
                                                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                                            </div>

                                            {/* Main Content */}
                                            <div className="relative px-6 pb-1 h-full flex flex-col justify-end z-10">
                                                <div className="mb-6 relative">
                                                    <div className={`w-16 h-16 mt-4 rounded-2xl bg-white/50 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden`}>
                                                        <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                                                        <div className={`text-${feature.gradient.split('-')[1]}-600 relative z-10 `}>
                                                            {feature.icon}
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="flex-1 flex flex-col justify-end">
                                                    <h3 className="text-xl font-bold text-white group-hover:text-transparent mb-2">
                                                        {feature.title}
                                                    </h3>
                                                    <p className="text-white/90 group-hover:text-transparent text-sm mb-4">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 pointer-events-none group-hover:pointer-events-auto z-20">
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                                    <p className="text-white/90 text-sm mb-4">{feature.description}</p>
                                                    <div className="flex space-x-3" onClick={e => e.stopPropagation()}>
                                                        <button
                                                            type="button"
                                                            className="px-4 py-2 bg-transparent border-2 border-white text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                                                            onClick={(e) => { e.stopPropagation(); if (feature.navigateLink) navigate(feature.navigateLink); }}
                                                            onMouseDown={(e) => e.stopPropagation()}
                                                            onMouseUp={(e) => e.stopPropagation()}
                                                            onMouseMove={(e) => e.stopPropagation()}
                                                            onTouchStart={(e) => e.stopPropagation()}
                                                            onTouchEnd={(e) => e.stopPropagation()}
                                                            aria-label={`Learn more about ${feature.title}`}
                                                        >
                                                            Learn More
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Gradient Corner */}
                                            <div className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-transparent transition-all duration-300 hover:scale-130 focus:outline-none"
                            style={{ marginRight: '-60px' }}
                            aria-label="Next features"
                        >
                            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                <style jsx="true">{`
                    @keyframes fadeInUp {
                      from {
                        opacity: 0;
                        transform: translateY(30px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                    
                    @keyframes blob {
                      0%, 100% {
                        transform: translate(0, 0) scale(1);
                      }
                      33% {
                        transform: translate(30px, -50px) scale(1.1);
                      }
                      66% {
                        transform: translate(-20px, 20px) scale(0.9);
                      }
                    }
                    
                    .animate-blob {
                      animation: blob 7s infinite;
                    }
                    
                    .animation-delay-2000 {
                      animation-delay: 2s;
                    }
                    
                    .animation-delay-4000 {
                      animation-delay: 4s;
                    }
                  `}</style>
            </section>
        </div>
    )
}

export default landingFeature