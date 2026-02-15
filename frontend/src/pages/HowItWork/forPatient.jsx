import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Heart, Shield, Clock, Star, ChevronRight, Check, ArrowRight, User, FileText, Video, MessageCircle, Smartphone, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../../components/landingPage/landingNav';
import LandingFooter from '../../components/landingPage/landingFooter';

const ForPatient = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Search",
      description: "Find the right healthcare providers based on your symptoms, location, and preferences"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Easy Booking",
      description: "Schedule appointments instantly with real-time availability and instant confirmations"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health Tracking",
      description: "Monitor your health progress with comprehensive digital health records"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "AI Symptoms Analyzer",
      description: "Get instant AI-powered symptom analysis and preliminary health assessments"
    },
    
  ];

  const benefits = [
    "Completely free to use - no hidden charges",
    "Access to 500+ verified healthcare providers",
    "24/7 emergency support and telemedicine",
    "Personalized health recommendations",
    "Digital health records management",
    "Get instant AI-powered symptom analysis "
  ];

  const steps = [
    {
      number: "01",
      title: "Sign Up Free",
      description: "Create your account in less than 2 minutes with just your email and basic information"
    },
    {
      number: "02", 
      title: "Complete Profile",
      description: "Add your medical history, preferences, and insurance information for personalized care"
    },
    {
      number: "03",
      title: "Search & Book",
      description: "Find doctors, clinics, or pharmacies and book appointments instantly"
    },
    {
      number: "04",
      title: "Get Care",
      description: "Receive care through in-person visits or video consultations"
    }
  ];

  const testimonials = [
    {
      name: "Gihan Bandara",
      role: "Patient",
      content: "MediFlow made finding a specialist so easy. I booked an appointment within minutes and got the care I needed.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "kamal Perera", 
      role: "Patient",
      content: "The health tracking feature is amazing. I can monitor all my medical information in one place.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Nadeesha Silva",
      role: "Patient", 
      content: "Free telemedicine consultations saved me time and money. Highly recommend!",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
        <LandingNav/>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-purple-600 to-indigo-700 text-white"
       style={{
         backgroundImage:'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(/src/assets/images/forPatient.jpg)',
         backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
         
       }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">
              Healthcare at Your Fingertips
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join thousands of patients who are already experiencing better healthcare with MediFlow
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signUp" 
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/#features" 
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to make your healthcare journey simple and effective
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-linear-to-br from-blue-200 via-purple-100 to-indigo-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     

      {/* How It Works */}
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How MediFlow Works for Patients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and take control of your healthcare journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full text-white text-2xl font-bold mb-6 mx-auto">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4">
                      <ChevronRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-15 bg-linear-to-r from-blue-100 to-emerald-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Patients Choose MediFlow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of healthcare with these amazing benefits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-green-100"
              >
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                  <span className="text-gray-700 font-medium">
                    {benefit}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Patients Say About MediFlow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real patients who transformed their healthcare experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-400 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-15 bg-linear-to-r from-blue-100 to-emerald-100 text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl text-blue-600 font-medium mb-8 max-w-2xl mx-auto">
              Join MediFlow today and experience healthcare the way it should be - simple, accessible, and patient-focused
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signUp" 
                className="inline-flex items-center px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all transform hover:scale-102 shadow-lg"
              >
                Start Your Health Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/contact-us" 
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-black font-bold rounded-xl hover:bg-white/70 transition-all border-2 border-black/50"
              >
                Talk to Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <LandingFooter/>
    </div>
  );
};

export default ForPatient;