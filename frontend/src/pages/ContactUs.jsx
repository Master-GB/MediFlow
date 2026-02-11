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
import LandingNav from '../components/landingPage/landingNav';

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

  const departments = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle, color: 'blue' },
    { value: 'emergency', label: 'Emergency', icon: Shield, color: 'red' },
    { value: 'appointment', label: 'Book Appointment', icon: Calendar, color: 'green' },
    { value: 'billing', label: 'Billing & Insurance', icon: Globe, color: 'purple' },
    { value: 'feedback', label: 'Feedback & Complaints', icon: Star, color: 'yellow' },
    { value: 'careers', label: 'Careers', icon: Users, color: 'indigo' }
  ];

  const contactMethods = [
    {
      id: 'form',
      title: 'Send Message',
      description: 'Fill out our contact form',
      icon: Send,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'phone',
      title: 'Call Us',
      description: 'Speak with our team',
      icon: Phone,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'visit',
      title: 'Visit Us',
      description: 'Stop by our location',
      icon: MapPin,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with support',
      icon: MessageCircle,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const locations = [
    {
      name: 'Main Hospital',
      address: '123 Healthcare Avenue, Medical City, MC 12345',
      phone: '+1 (555) 123-4567',
      hours: '24/7 Emergency, 8AM-8PM General',
      services: ['Emergency Care', 'General Medicine', 'Surgery', 'Diagnostics'],
      image: '/api/placeholder/400/300'
    },
    {
      name: 'Downtown Clinic',
      address: '456 Wellness Street, Downtown, DC 67890',
      phone: '+1 (555) 987-6543',
      hours: '8AM-6PM Weekdays, 9AM-2PM Weekends',
      services: ['Primary Care', 'Pediatrics', 'Mental Health', 'Preventive Care'],
      image: '/api/placeholder/400/300'
    },
    {
      name: 'Specialist Center',
      address: '789 Expert Boulevard, Specialist District, SD 11223',
      phone: '+1 (555) 456-7890',
      hours: '9AM-5PM Weekdays',
      services: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology'],
      image: '/api/placeholder/400/300'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'The care I received was exceptional. The staff was professional and compassionate.',
      rating: 5,
      department: 'Emergency Care'
    },
    {
      name: 'Michael Chen',
      text: 'Best medical facility in the city. Clean, modern, and the doctors are top-notch.',
      rating: 5,
      department: 'General Medicine'
    },
    {
      name: 'Emily Rodriguez',
      text: 'Quick response time and excellent follow-up care. Highly recommend!',
      rating: 5,
      department: 'Surgery'
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      department: 'general'
    });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                <MessageCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              We're here to help you on your healthcare journey. Reach out to our dedicated team for any questions, concerns, or appointments.
            </p>
            
            {/* Quick Contact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Phone, label: "24/7 Support", value: "Always Available" },
                { icon: Clock, label: "Response Time", value: "< 2 Hours" },
                { icon: Users, label: "Expert Staff", value: "150+ Professionals" },
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.button
                key={method.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setActiveContactMethod(method.id)}
                className={`relative p-6 rounded-3xl transition-all duration-300 ${
                  activeContactMethod === method.id
                    ? 'bg-gradient-to-br ' + method.color + ' text-white shadow-2xl scale-105'
                    : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg'
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
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-10 pointer-events-none"
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
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
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
                          placeholder="John Doe"
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
                          placeholder="john@example.com"
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
                          placeholder="+1 (555) 123-4567"
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
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Call Us Directly</h3>
                  <p className="text-gray-600 mb-8">Our friendly staff is ready to assist you</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Emergency Hotline</h4>
                    <div className="text-3xl font-bold text-green-600 mb-2">+1 (555) 123-4567</div>
                    <p className="text-gray-600 mb-4">24/7 Available for medical emergencies</p>
                    <div className="flex items-center space-x-2 text-green-600">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">Emergency Care</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">General Inquiries</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-2">+1 (555) 987-6543</div>
                    <p className="text-gray-600 mb-4">Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM</p>
                    <div className="flex items-center space-x-2 text-blue-600">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">Business Hours</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-yellow-800">When to Call Emergency</h5>
                      <p className="text-yellow-700 text-sm mt-1">
                        For life-threatening emergencies, call our emergency hotline or visit the nearest emergency room immediately.
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
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Locations</h3>
                <p className="text-gray-600">Find the nearest MediFlow facility to you</p>
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
                    <div className="h-48 bg-gradient-to-br from-purple-100 to-indigo-100 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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
                      <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all">
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
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Start a Live Chat</h3>
                  <p className="text-gray-600 mb-8">Get instant answers from our support team</p>
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
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from real patients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg"
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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
                question: "How do I schedule an appointment?",
                answer: "You can schedule an appointment by calling our hotline, using our online booking system, or visiting any of our locations in person."
              },
              {
                question: "What insurance plans do you accept?",
                answer: "We accept most major insurance plans. Please contact our billing department to verify your specific coverage."
              },
              {
                question: "Do you offer emergency services?",
                answer: "Yes, our main hospital provides 24/7 emergency care services for all medical emergencies."
              },
              {
                question: "How can I access my medical records?",
                answer: "You can access your medical records through our patient portal or request them from our medical records department."
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
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
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
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Your Health Journey Starts Here
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Take the first step towards better health. Our compassionate team is ready to support you every step of the way.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/appointments"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                Book Appointment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/about-us"
                className="inline-flex items-center px-8 py-4 bg-blue-500/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-blue-500/30 transition-all border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;