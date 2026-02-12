import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Shield, 
  Award, 
  Globe, 
  Stethoscope,
  Activity,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Building
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../components/landingPage/landingNav';
import LandingFooter from '../components/landingPage/landingFooter.jsx';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [stats, setStats] = useState({
    patients: 0,
    clinics: 0,
    years: 0,
    satisfaction: 0
  });
  const statsRef = useRef(null);

  // Animated counter effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const targetStats = {
            patients: 5000,
            clinics: 300,
            years: 15,
            satisfaction: 98
          };
          
          const duration = 2000;
          const steps = 60;
          const stepDuration = duration / steps;
          
          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            setStats({
              patients: Math.floor(targetStats.patients * progress),
              clinics: Math.floor(targetStats.clinics * progress),
              years: Math.floor(targetStats.years * progress),
              satisfaction: Math.floor(targetStats.satisfaction * progress)
            });
            
            if (currentStep >= steps) {
              clearInterval(timer);
            }
          }, stepDuration);
          
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const team = [
    {
      name: "Dr. Michael Chen",
      role: "Chief Medical Advisor",
      image: "/src/assets/images/doctorM.png",
      expertise: "Platform Healthcare Strategy",
      experience: "15+ years"
    },
    {
      name: "Ms. Dulashani Perera",
      role: "Head of Clinic Partnerships",
      image: "src/assets/images/MsD.png",
      expertise: "Clinical Network Development",
      experience: "12+ years"
    },
    {
      name: "Mr. Gihan Bandara",
      role: "Director of Digital Health",
      image: "/src/assets/images/MrG.webp",
      expertise: "Healthcare Technology Integrat",
      experience: "18+ years"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Patient Experience Lead",
      image: "/src/assets/images/doctorE.png",
      expertise: "Digital Patient Care Systems",
      experience: "10+ years"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Innovation",
      description: "Continuously evolving our technology to stay at the forefront of healthcare solutions."
    },
    {
      icon: Shield,
      title: "Excellence",
      description: "Delivering the highest standard of quality in every aspect of our service."
    },
    {
      icon: Users,
      title: "Compassion",
      description: "Putting patients first with empathetic, human-centered design and support."
    },
    {
      icon: Award,
      title: "Integrity",
      description: "Maintaining the highest ethical standards in all our operations and data handling."
    },
    {
      icon: Globe,
      title: "Collaboration",
      description: "Fostering partnerships between patients, providers, and technologists."
    },
    {
      icon: Clock,
      title: "Accessibility",
      description: "Ensuring our platform is usable by everyone, regardless of ability or location."
    }
  ];

  const milestones = [
    { year: "2009", title: "Platform Founded", description: "Started as a digital healthcare startup" },
    { year: "2015", title: "Clinic Network", description: "Expanded to 100+ partner clinics" },
    { year: "2018", title: "Mobile Launch", description: "Released mobile app for on-the-go healthcare access" },
    { year: "2020", title: "Digital Innovation", description: "Launched advanced appointment and management features" },
    { year: "2024", title: "Industry Recognition", description: "Awarded as top healthcare platform" },
    { year: "2026", title: "Global Expansion", description: "Reached international markets with 300+ clinics" }
  ];

  return (
    <div>
        <LandingNav/>
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-blue-50"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">
              About MediFlow
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Revolutionizing Healthcare Through a Digital Platform That Connects Patients and Clinics for Seamless, Accessible, and Quality Medical Care
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signUp"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/contact-us"
                className="inline-flex items-center px-8 py-4 bg-blue-500/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-blue-500/30 transition-all border border-white/20"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Patients Served", value: stats.patients.toLocaleString(), suffix: "+" },
              { icon: Building, label: "Partner Clinics", value: stats.clinics, suffix: "+" },
              { icon: Clock, label: "Years of Excellence", value: stats.years, suffix: "+" },
              { icon: Star, label: "Satisfaction Rate", value: stats.satisfaction, suffix: "%" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision Tabs */}
      <section className="py-15 bg-linear-to-r from-blue-100 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Purpose</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Guided by a commitment to transform healthcare delivery and improve lives
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['mission', 'vision', 'values'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl border border-gray-400 font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg border-none'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            {activeTab === 'mission' && (
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-3xl mb-6">
                  <Heart className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  To create a revolutionary digital healthcare platform that seamlessly connects patients with clinics, empowering both to manage their entire healthcare journey efficiently. We strive to make quality healthcare accessible, transparent, and patient-centered through innovative technology.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {['Seamless Connections', 'Digital Innovation', 'Healthcare Access'].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-3xl mb-6">
                  <Globe className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  To become the world's leading healthcare platform that bridges the gap between patients and clinics through innovative technology. We envision a future where healthcare management is seamless, appointments are accessible, and quality medical care is available to everyone, anywhere, anytime.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {['Platform Leadership', 'Healthcare Technology', 'Universal Access'].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex space-x-4"
                    >
                      <div className="shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <value.icon className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Platform Leadership</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Led by healthcare and technology experts dedicated to transforming digital healthcare
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-linear-to-br from-gray-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-square bg-linear-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-600/10"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">{member.expertise}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.experience} experience</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-15 bg-linear-to-r from-blue-100 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A timeline of growth, innovation, and healthcare excellence
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-300"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="text-blue-600 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-15 bg-white text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Experience Exceptional Healthcare?
            </h2>
            <p className="text-xl font-medium text-blue-600 mb-8">
              Join thousands of satisfied patients and who trust MediFlow with their health
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

      {/* Contact Info */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Hotline</h3>
              <p className="text-gray-600">24/7 Available</p>
              <p className="text-2xl font-bold text-blue-600">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">General Inquiries</p>
              <p className="text-lg font-medium text-blue-600">info@mediflow.com</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">Main Hospital</p>
              <p className="text-lg font-medium text-blue-600">123 Healthcare Ave, Medical City</p>
            </div>
          </div>
        </div>
      </section> */}
      <LandingFooter/>
    </div>
    </div>
  );
};

export default AboutUs;