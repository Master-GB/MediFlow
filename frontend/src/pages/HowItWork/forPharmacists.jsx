import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pill, Clock, Shield, Star, ChevronRight, Check, ArrowRight, FileText, Users, BarChart3, Heart, Activity, Smartphone, Package, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../../components/landingPage/landingNav';
import LandingFooter from '../../components/landingPage/landingFooter';

const ForPharmacists = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Pill className="w-6 h-6" />,
      title: "E-Prescription Management",
      description: "Digital prescription processing with automatic doctor verification and insurance integration"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Patient Records",
      description: "Secure access to patient medication history and allergy information for better care"
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Inventory Management",
      description: "Real-time stock tracking, automated reordering, and expiration date management"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Medication Reminders",
      description: "Automated patient notifications for refills and medication adherence tracking"
    }
  ];

  const benefits = [
    "Reduce prescription errors by 80%",
    "Increase patient adherence by 45%",
    "Streamline insurance claim processing",
    "Real-time inventory visibility",
    "Automated compliance reporting",
    "24/7 patient access to medications",
    "Integration with major EMR systems",
    "Secure medication data exchange",
    "Improved pharmacy workflow efficiency"
  ];

  const steps = [
    {
      number: "01",
      title: "Receive Clinic Credentials",
      description: "Get your login credentials from your clinic administrator to access the platform"
    },
    {
      number: "02", 
      title: "Configure Pharmacy Services",
      description: "Set up your medication catalog, operating hours, and prescription processing preferences"
    },
    {
      number: "03",
      title: "Set Up Inventory Management",
      description: "Configure automated stock tracking, reordering, and expiration date management"
    },
    {
      number: "04",
      title: "Start Processing Prescriptions",
      description: "Receive and fulfill digital prescriptions from healthcare providers on the platform"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Heshan Rathnayake",
      role: "Pharmacy Owner",
      content: "MediFlow streamlined our prescription processing. We handle 3x more prescriptions with the same staff.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Janith Perera", 
      role: "Pharmacy Manager",
      content: "The inventory management system is a game-changer. No more stockouts or expired medications.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Nimali Silva",
      role: "Lead Pharmacist", 
      content: "Patient adherence tracking has improved our care quality significantly. Highly recommend this platform.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50">
      <LandingNav/>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-orange-600 via-red-600 to-rose-700 text-white"
         style={{
         backgroundImage:'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(/src/assets/images/forPharmacist.jpg)',
         backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
         
       }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">
              Modernize Your Pharmacy Operations
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-8">
              Join thousands of pharmacies revolutionizing medication management with MediFlow
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signIn" 
                className="inline-flex items-center px-8 py-4 bg-white text-orange-700 font-bold rounded-xl hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Join as Pharmacist
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/pharmacy-prescription-management" 
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
              Complete Pharmacy Management Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Digital tools designed specifically for modern pharmacy operations and patient care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-linear-to-br from-orange-200 via-red-100 to-rose-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
                  <div className="text-orange-600">
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
              How MediFlow Works for Pharmacists
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect your pharmacy to the digital healthcare ecosystem in minutes
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
                  <div className="flex items-center justify-center w-16 h-16 bg-linear-to-br from-orange-500 to-red-600 rounded-full text-white text-2xl font-bold mb-6 mx-auto">
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
              Why Pharmacists Choose MediFlow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your pharmacy operations with these powerful benefits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
              >
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-orange-600 shrink-0 mt-1" />
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
              What Pharmacists Say About MediFlow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from pharmacy professionals who improved their operations and patient care
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
                  <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-red-400 rounded-full"></div>
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
              Ready to Digitize Your Pharmacy?
            </h2>
            <p className="text-xl text-orange-600 font-medium mb-8 max-w-2xl mx-auto">
              Join MediFlow today and connect with healthcare providers for seamless prescription processing
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signIn" 
                className="inline-flex items-center px-8 py-4 bg-orange-700 text-white font-bold rounded-xl hover:bg-orange-800 transition-all transform hover:scale-102 shadow-lg"
              >
                Modernize Your Pharmacy
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

export default ForPharmacists;
