import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || !hasBeenVisible) {
          setIntersecting(entry.isIntersecting);
          if (entry.isIntersecting) {
            setHasBeenVisible(true);
          }
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasBeenVisible]);

  return isIntersecting;
};

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 15,
    transition: {
      duration: 0.3
    }
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  })
};

const LandingTestimonials = () => {
  const [ctaElements, setCtaElements] = useState({
    heading: false,
    text: false,
    button1: false,
    button2: false
  });

  const ctaRef = useRef(null);
  const isCtaVisible = useOnScreen(ctaRef);

  useEffect(() => {
    if (isCtaVisible) {
      const timer1 = setTimeout(() => setCtaElements(p => ({...p, heading: true})), 200);
      const timer2 = setTimeout(() => setCtaElements(p => ({...p, text: true})), 400);
      const timer3 = setTimeout(() => setCtaElements(p => ({...p, button1: true})), 600);
      const timer4 = setTimeout(() => setCtaElements(p => ({...p, button2: true})), 800);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    } else {
      setCtaElements({
        heading: false,
        text: false,
        button1: false,
        button2: false
      });
    }
  }, [isCtaVisible]);

  return (
    <div>
      <section className="pt-10 pb-16 bg-linear-to-r from-blue-100 to-emerald-100 relative overflow-hidden" style={{ zIndex: 10, boxShadow: '0 -50px 25px -3px rgba(29, 78, 216, 0.5), 0 -10px 10px -5px rgba(0, 0, 0, 0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {[
              {
                quote: "MediFlow reduced our patient wait time by 35% within two months. The interface is intuitive and our staff adapted to it within days.",
                author: "Dr. Asha Perera",
                role: "Clinic Director, Colombo Health",
                image: "/src/assets/images/doctor11.webp"
              },
              {
                quote: "The support team was incredibly helpful during our transition. They made the onboarding process smooth and addressed all our concerns promptly.",
                author: "Nimal Silva",
                role: "IT Lead, City Hospital",
                image: "/src/assets/images/testimonials/it-lead.jpg"
              },
              {
                quote: "Secure, performant, and perfectly tailored for clinical workflows. Our team's productivity has increased significantly since implementation.",
                author: "Priya Fernando",
                role: "Operations Manager, Regional Health",
                image: "/src/assets/images/testimonials/manager.jpg"
              }
            ].map((testimonial, index) => {
              const ref = useRef(null);
              const isVisible = useOnScreen(ref);
              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  variants={fadeInUp}
                  custom={index * 0.15}
                  className="group bg-white rounded-2xl px-6 py-4 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full"
                >
                  <div className="text-blue-100 mb-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <blockquote className="mb-2 grow">
                    <p className="text-gray-700 text-base leading-relaxed line-clamp-4">"{testimonial.quote}"</p>
                  </blockquote>
                  <div className="flex items-center mt-4">
                    <div className="shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=random`;
                          }}
                        />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{testimonial.author}</p>
                      <p className="text-xs text-gray-600 truncate">{testimonial.role}</p>
                      <div className="flex mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div ref={ctaRef} className="mt-16 relative">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
            
            <motion.h3 
              initial="hidden"
              animate={ctaElements.heading ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className="text-3xl font-bold text-black mb-2 text-center"
            >
              Ready to Transform Healthcare with Us?
            </motion.h3>
            
            <motion.p 
              initial="hidden"
              animate={ctaElements.text ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className="text-xl text-black mb-8 max-w-2xl mx-auto text-center"
            >
              Join thousands of healthcare providers and patients already experiencing the future of healthcare.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                initial="hidden"
                animate={ctaElements.button1 ? 'visible' : 'hidden'}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/signUp"
                className="px-8 py-4 bg-green-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-600/30 transition-all"
              >
                Get Started Free
              </motion.a>
              <motion.a
                initial="hidden"
                animate={ctaElements.button2 ? 'visible' : 'hidden'}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="px-8 py-4 bg-blue-50 text-gray-700 font-semibold border-2 border-gray-400 rounded-full hover:border-blue-500 hover:text-blue-600 transition-all"
              >
                Contact Sales
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingTestimonials;