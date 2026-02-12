import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  User,
  Globe,
  Shield,
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Calendar,
  ChevronRight,
  Sparkles,
  Zap,
  Users,
  Award,
  Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import LandingNav from '../components/landingPage/landingNav';
import LandingFooter from '../components/landingPage/landingFooter.jsx';
import { useToast } from '../hooks/useToast.js';
import ToastContainer from '../contexts/ToastContainer.jsx';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeContactMethod, setActiveContactMethod] = useState('form');
   const { toasts, addToast, removeToast, success, toastError, warning, info } = useToast();

  const departments = [
    { value: 'general', label: 'Platform Support', icon: MessageCircle, color: 'blue' },
    { value: 'emergency', label: 'Emergency Support', icon: Shield, color: 'red' },
    { value: 'appointment', label: 'Appointment Booking', icon: Calendar, color: 'green' },
    { value: 'billing', label: 'Platform Billing', icon: Globe, color: 'purple' },
    { value: 'feedback', label: 'Platform Feedback', icon: Star, color: 'yellow' },
    { value: 'careers', label: 'Join Our Platform', icon: Users, color: 'indigo' },
    { value: 'clinic', label: 'Clinic Partnership', icon: Heart, color: 'pink' }
  ];

  const contactMethods = [
    {
      id: 'form',
      title: 'Send Message',
      description: 'Fill out our contact form',
      icon:   Send,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'phone',
      title: 'Call Platform Support',
      description: 'Speak with our platform team',
      icon: Phone,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'email',
      title: 'Email Us',
      description: 'Send us an email',
      icon: Mail,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'visit',
      title: 'Visit Our Offices',
      description: 'Stop by our platform support centers',
      icon: MapPin,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our platform support team',
      icon: MessageCircle,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const locations = [
    {
      name: 'Platform Headquarters',
      address: 'kurunegala',
      phone: '+94 37 3445 678',
      hours: '24/7 Platform Support, 9AM-6PM Office',
      services: ['Platform Support', 'Clinic Partnerships', 'Technical Help', 'Patient Services'],
      image: '/api/placeholder/400/300'
    },
    {
      name: 'Regional Support Center',
      address: 'kurunegala',
      phone: '+94 37 777 4567',
      hours: '8AM-8PM Platform Support, 24/7',
      services: ['Patient Onboarding', 'Clinic Integration', 'Platform Training', 'Account Support'],
      image: '/api/placeholder/400/300'
    },
    {
      name: 'Clinic Partnership Office',
      address: 'kurunegala',
      phone: '+94 37 555 7890',
      hours: '9AM-5PM Weekdays',
      services: ['Clinic Registration', 'Platform Integration', 'Technical Support', 'Partnership Programs'],
      image: '/api/placeholder/400/300'
    }
  ];

  const testimonials = [
    {
      name: 'Gihan Bandara',
      text: 'MediFlow platform made it so easy to connect with the right clinic. Found my doctor and booked appointment in minutes!',
      rating: 5,
      department: 'Patient Platform User'
    },
    {
      name: 'Dr. Sadun Perera',
      text: 'Best healthcare platform for clinics. Our patient management has improved dramatically since joining MediFlow.',
      rating: 5,
      department: 'Partner Clinic'
    },
    {
      name: 'Kasun Kalhara',
      text: 'The platform support team is amazing. Quick response time and excellent help with clinic integration.',
      rating: 5,
      department: 'Clinic Administrator'
    }
  ];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try{
      const response = await axios.post('/api/message/send-message',{
        name: formData.name,
        email:formData.email,
        phone:formData.phone,
        department:formData.department,
        subject:formData.subject,
        message:formData.message,
      });

      if(response.data.success){
        console.log('Message sent successfully:', response.data.data);
        success('Message sent successfully! We will contact you soon.');
        
        // Reset form only on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          department: 'general'
        });
        
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      }else{
        toastError('Failed to send message. Please try again later.');
      }

    }catch(error){
      console.error('Error sending message:', error);
      if(error.response) {
        // Server responded with error status
        toastError(error.response.data.message || 'Server error occurred');
      } else if(error.request) {
        // Network error
        toastError('Network error. Please check your connection.');
      } else {
        // Other error
        toastError('An error occurred while sending your message. Please try again later.');
      }
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-125 h-125 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Connect with MediFlow Platform
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              We're here to help you navigate our healthcare platform. Reach out to our dedicated team for any questions about connecting with clinics, managing appointments, or platform support.
            </p>
            
            {/* Quick Contact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Phone, label: "24/7 Support", value: "Platform Available" },
                { icon: Clock, label: "Response Time", value: "< 2 Hours" },
                { icon: Users, label: "Partner Clinics", value: "300+ Clinics" },
                { icon: Star, label: "Satisfaction", value: "98%" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-sm text-blue-100">{stat.label}</div>
                  <div className="text-lg font-bold">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-15 bg-linear-to-r from-blue-100 to-emerald-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help You?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the most convenient way to reach us
            </p>
          </motion.div>

          <div className="grid grid-cols-5 gap-6 mb-16 max-w-none mx-auto px-4">
            {contactMethods.map((method, index) => (
              <motion.button
                key={method.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setActiveContactMethod(method.id)}
                className={`relative py-5 px-5 rounded-3xl transition-all duration-300 cursor-pointer min-h-50 flex flex-col justify-center w-full ${
                  activeContactMethod === method.id
                    ? 'bg-linear-to-br ' + method.color + ' text-white shadow-2xl scale-105'
                    : 'bg-white border border-black/30 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                  activeContactMethod === method.id
                    ? 'bg-white/20'
                    : 'bg-gray-100'
                }`}>
                  <method.icon className={`w-8 h-8 ${
                    activeContactMethod === method.id ? 'text-white' : 'text-gray-700'
                  }`} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  activeContactMethod === method.id ? 'text-white' : 'text-gray-900'
                }`}>
                  {method.title}
                </h3>
                <p className={`text-sm ${
                  activeContactMethod === method.id ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {method.description}
                </p>
                {activeContactMethod === method.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-3xl bg-linear-to-br opacity-10 pointer-events-none"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Contact Form Section */}
          {activeContactMethod === 'form' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours about platform inquiries</p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600">Thank you for contacting us. We'll be in touch soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="eg; test@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="eg; +94 37 3445 678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MessageCircle className="w-4 h-4 inline mr-2" />
                          Department
                        </label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          {departments.map(dept => (
                            <option key={dept.value} value={dept.value}>
                              {dept.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}

          {/* Phone Contact */}
          {activeContactMethod === 'phone' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Call Our Platform Support</h3>
                  <p className="text-gray-600 mb-8">Our platform team is ready to assist you</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Platform Emergency Hotline</h4>
                    <div className="text-3xl font-bold text-green-600 mb-2">+94 37 433 5757</div>
                    <p className="text-gray-600 mb-4">24/7 Available for platform emergencies</p>
                    <div className="flex items-center space-x-2 text-green-600">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">Platform Emergency Support</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Platform Inquiries</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-2">+94 37 555 6565</div>
                    <p className="text-gray-600 mb-4">Mon-Fri: 9AM-6PM, Sat-Sun: 10AM-4PM</p>
                    <div className="flex items-center space-x-2 text-blue-600">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">Platform Support Hours</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-yellow-800">When to Call Platform Emergency</h5>
                      <p className="text-yellow-700 text-sm mt-1">
                        For platform-related emergencies, urgent clinic access issues, or critical system problems, call our emergency hotline immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Contact */}
          {activeContactMethod === 'email' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Send Us an Email</h3>
                  <p className="text-gray-600 mb-8">We'll respond to your email within 24 hours</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Platform Support</h4>
                    <div className="text-2xl font-bold text-red-600 mb-2">support@mediflow.com</div>
                    <p className="text-gray-600 mb-4">For general platform inquiries and technical support</p>
                    <div className="flex items-center space-x-2 text-red-600">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">General Platform Support</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Clinic Partnerships</h4>
                    <div className="text-2xl font-bold text-red-600 mb-2">partnerships@mediflow.com</div>
                    <p className="text-gray-600 mb-4">For clinics interested in joining our platform</p>
                    <div className="flex items-center space-x-2 text-red-600">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">Partnership Inquiries</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Emergency Support</h4>
                    <div className="text-2xl font-bold text-red-600 mb-2">emergency@mediflow.com</div>
                    <p className="text-gray-600 mb-4">For urgent platform-related issues</p>
                    <div className="flex items-center space-x-2 text-red-600">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">Urgent Support</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Billing & Accounts</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-2">billing@mediflow.com</div>
                    <p className="text-gray-600 mb-4">For billing inquiries and account management</p>
                    <div className="flex items-center space-x-2 text-blue-600">
                      <Globe className="w-5 h-5" />
                      <span className="font-medium">Financial Support</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-blue-800">Email Response Times</h5>
                      <p className="text-blue-700 text-sm mt-1">
                        We typically respond to emails within 24 hours. For urgent matters, please use our emergency hotline or live chat for immediate assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Visit Us */}
          {activeContactMethod === 'visit' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Platform Offices</h3>
                <p className="text-gray-600">Find the nearest MediFlow platform support center</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {locations.map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="h-48 bg-linear-to-br from-purple-100 to-indigo-100 relative">
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-gray-900">{location.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{location.name}</h4>
                      <p className="text-gray-600 mb-4">{location.address}</p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">{location.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">{location.hours}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-semibold text-gray-900 mb-2">Services:</h5>
                        <div className="flex flex-wrap gap-2">
                          {location.services.map((service, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`, '_blank')}
                        className="w-full mt-6 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 cursor-pointer rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all"
                      >
                        Get Directions
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Live Chat */}
          {activeContactMethod === 'chat' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-linear-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Start a Live Chat</h3>
                  <p className="text-gray-600 mb-8">Get instant answers from our platform support team</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-gray-900">Support Team Online</span>
                    </div>
                    <span className="text-sm text-gray-600">Average wait: &lt; 2 min</span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-100 rounded-xl p-4 max-w-[80%]">
                      <p className="text-gray-800">Hello! How can I assist you today?</p>
                      <span className="text-xs text-gray-500">Support Agent • Just now</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button className="bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">24/7</div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">&lt; 2 min</div>
                    <div className="text-sm text-gray-600">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">95%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-25 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Platform Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from patients and clinics using our platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-blue-600">{testimonial.department}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-15 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "How do I find and book appointments with clinics through MediFlow?",
                answer: "You can search for clinics by specialty, location, or availability on our platform, then book appointments instantly through our secure booking system."
              },
              {
                question: "How can my clinic join the MediFlow platform?",
                answer: "Clinics can join by contacting our partnership team. We'll guide you through the integration process and help you set up your clinic profile."
              },
              {
                question: "Is my medical data secure on the MediFlow platform?",
                answer: "Yes, we use industry-standard encryption and comply with healthcare data protection regulations to ensure your medical information remains secure."
              },
              {
                question: "How do I access my appointment history and medical records?",
                answer: "You can access all your appointment history, prescriptions, and medical records through your secure patient dashboard on the MediFlow platform."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-15 bg-linear-to-r from-blue-100 to-emerald-100 text-Black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* <div className="flex justify-center mb-6">
              <div className="p-4 bg-black/10 backdrop-blur-sm rounded-3xl border border-black/20">
                <Heart className="w-12 h-12 text-blue-700" />
              </div>
            </div> */}
            <h2 className="text-4xl font-bold mb-6">
              Your Healthcare Platform Journey Starts Here
            </h2>
            <p className="text-xl text-blue-700 font-medium mb-8 max-w-2xl mx-auto">
              Take the first step towards better healthcare access. Our platform team is ready to help you connect with the right clinics and manage your health journey efficiently.
            </p>
           <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signUp"
                className="inline-flex items-center px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all transform hover:scale-102"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/contact-us"
                className="inline-flex items-center px-8 py-4  backdrop-blur-sm text-black font-semibold rounded-xl hover:bg-black/10 transition-all border border-black"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <LandingFooter/>
    </div>
     <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
      />
    </>
  );
};

export default ContactUs;