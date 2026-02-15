import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Calendar, TrendingUp, Shield, Star, ChevronRight, Check, ArrowRight, BarChart3, FileText, Heart, Activity, Clock, DollarSign, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../../components/landingPage/landingNav';
import LandingFooter from '../../components/landingPage/landingFooter';

const ForClinic = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Patient Acquisition",
      description: "Connect with 5,000+ patients actively seeking healthcare services in your area"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Appointment Management",
      description: "Smart scheduling system with automated reminders and resource optimization"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Practice Analytics",
      description: "Comprehensive insights on clinic performance, revenue trends, and patient satisfaction"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Digital Records",
      description: "Complete EMR integration with secure patient data management and compliance"
    }
  ];

  const benefits = [
    "Increase patient volume by 60%",
    "Reduce operational costs by 35%",
    "Improve staff efficiency by 50%",
    "Enhance patient satisfaction scores",
    "Automate administrative workflows",
    "Access premium marketing tools",
    "24/7 telemedicine revenue stream",
    "Multi-location management",
    "HIPAA compliance guaranteed"
  ];

  const steps = [
    {
      number: "01",
      title: "Register Your Clinic",
      description: "Create your clinic profile with services, specialties, and facility information"
    },
    {
      number: "02", 
      title: "Choose Your Plan",
      description: "Select the perfect subscription tier based on your clinic size and needs"
    },
    {
      number: "03",
      title: "Configure Services",
      description: "Set up appointment types, pricing, and staff roles for seamless operations"
    },
    {
      number: "04",
      title: "Start Growing",
      description: "Begin receiving patients and managing your practice through our unified platform"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Gihan Bandara",
      role: "Clinic Director",
      content: "MediFlow helped us double our patient base in just 6 months. The ROI is incredible!",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Samantha Lee", 
      role: "Practice Manager",
      content: "The analytics dashboard transformed how we manage our clinic. Data-driven decisions improved everything.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Nimal Perera",
      role: "Healthcare Administrator", 
      content: "Best investment we made. Streamlined operations and increased patient satisfaction significantly.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50">
        <LandingNav/>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-purple-600 via-pink-600 to-rose-700 text-white"
        style={{
         backgroundImage:'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(/src/assets/images/forClnic.jpg)',
         backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
         
       }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >

            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">
              Transform Your Clinic Operations
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
              Join hundreds of clinics growing their practice with MediFlow's comprehensive platform
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signUp" 
                className="inline-flex items-center px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Register Your Clinic
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
              Complete Clinic Management Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run a modern, efficient, and patient-centric clinic
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-linear-to-br from-purple-200 via-pink-100 to-rose-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6">
                  <div className="text-purple-600">
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
              How MediFlow Works for Clinics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your clinic online and start receiving patients in just a few days
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
                  <div className="flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-full text-white text-2xl font-bold mb-6 mx-auto">
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
              Why Clinics Choose MediFlow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accelerate your clinic growth with these powerful benefits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100"
              >
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
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
              What Clinic Leaders Say About MediFlow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from clinics that transformed their operations and patient care
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
                  <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-400 rounded-full"></div>
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
              Ready to Modernize Your Clinic?
            </h2>
            <p className="text-xl text-purple-600 font-medium mb-8 max-w-2xl mx-auto">
              Join MediFlow today and transform your clinic into a digital healthcare leader
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signUp" 
                className="inline-flex items-center px-8 py-4 bg-purple-700 text-white font-bold rounded-xl hover:bg-purple-800 transition-all transform hover:scale-102 shadow-lg"
              >
                Transform Your Clinic
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/pricing-page" 
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-black font-bold rounded-xl hover:bg-white/70 transition-all border-2 border-black/50"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <LandingFooter/>
    </div>
  );
};

export default ForClinic;