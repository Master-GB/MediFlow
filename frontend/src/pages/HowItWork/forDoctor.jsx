import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Calendar, Users, FileText, TrendingUp, Clock, Shield, Star, ChevronRight, Check, ArrowRight, Heart, Activity, BarChart3, Video, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../../components/landingPage/landingNav';
import LandingFooter from '../../components/landingPage/landingFooter';

const ForDoctor = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Scheduling",
      description: "AI-powered appointment management with automatic reminders and patient preparation"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Patient Management",
      description: "Comprehensive patient profiles with medical history and treatment tracking"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Digital Prescriptions",
      description: "E-prescribe medications with automatic pharmacy integration and compliance tracking"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description: "Track practice performance, patient outcomes, and revenue insights"
    }
  ];

  const benefits = [
    "Increase patient acquisition by 40%",
    "Reduce no-shows by 60%",
    "Streamline administrative tasks",
    "Improve patient care coordination",
    "Build digital reputation",
    "24/7 telemedicine capabilities"
  ];

  const steps = [
    {
      number: "01",
      title: "Receive Clinic Credentials",
      description: "Get your login credentials from your clinic administrator to access the platform"
    },
    {
      number: "02", 
      title: "Configure Availability",
      description: "Set your working hours, consultation types, and appointment preferences"
    },
    {
      number: "03",
      title: "Start Receiving Patients",
      description: "Get matched with patients based on your specialties and availability"
    },
    {
      number: "04",
      title: "Grow Your Practice",
      description: "Use analytics and marketing tools to expand your patient base"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sunil Kumara",
      role: "Cardiologist",
      content: "MediFlow transformed my practice. I'm seeing 40% more patients and spending less time on admin work.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Dr. Ayesha Perera", 
      role: "General Practitioner",
      content: "The telemedicine features are incredible. I can consult with patients from anywhere.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Dr. Nimal Silva",
      role: "Pediatrician", 
      content: "Patient management has never been easier. The digital prescriptions save hours weekly.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50">
        <LandingNav/>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-green-600 via-emerald-600 to-teal-700 text-white"
         style={{
         backgroundImage:'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(/src/assets/images/forDoctor.jpg)',
         backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
         
       }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
           
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">
              Elevate Your Medical Practice
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              Join thousands of doctors who are growing their practice with MediFlow's digital platform
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signIn" 
                className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Join as Doctor
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
              Powerful Tools for Modern Doctors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run a successful medical practice in the digital age
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-linear-to-br from-green-200 via-emerald-100 to-teal-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6">
                  <div className="text-green-600">
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
              How MediFlow Works for Doctors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Set up your practice and start receiving patients in under 10 minutes
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
                  <div className="flex items-center justify-center w-16 h-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-full text-white text-2xl font-bold mb-6 mx-auto">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Doctors Choose MediFlow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your practice with these powerful benefits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100"
              >
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
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
              What Doctors Say About MediFlow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from medical professionals who transformed their practice
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
                  <div className="w-12 h-12 bg-linear-to-br from-green-400 to-emerald-400 rounded-full"></div>
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
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-green-600 font-medium mb-8 max-w-2xl mx-auto">
              Join MediFlow today and connect with thousands of patients seeking your expertise
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signIn" 
                className="inline-flex items-center px-8 py-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-all transform hover:scale-102 shadow-lg"
              >
                Start Your Practice
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/contact-us" 
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-black font-bold rounded-xl hover:bg-white/70 transition-all border-2 border-black/50"
              >
                Need Help
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <LandingFooter/>
    </div>
  );
};

export default ForDoctor;