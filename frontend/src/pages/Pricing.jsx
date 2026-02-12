import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Star, 
  ArrowRight, 
  Heart, 
  Shield, 
  Users, 
  Clock,
  Zap,
  Award,
  TrendingUp,
  Headphones,
  Calendar,
  FileText,
  Activity,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../components/landingPage/landingNav';
import LandingFooter from '../components/landingPage/landingFooter';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Clinic',
      subtitle: 'Perfect for small clinics',
      price: billingCycle === 'monthly' ? 9900 : 99000,
      originalPrice: billingCycle === 'monthly' ? 14900 : 149000,
      icon: Heart,
      color: 'from-blue-500 to-blue-600',
      features: [
        { included: true, text: 'Up to 50 patient registrations' },
        { included: true, text: 'Basic appointment scheduling' },
        { included: true, text: 'Patient profile management' },
        { included: true, text: 'Email support' },
        { included: true, text: 'MediFlow platform access' },
        { included: false, text: 'Advanced analytics dashboard' },
        { included: false, text: 'Priority patient matching' },
        { included: false, text: 'Custom branding' }
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Clinic',
      subtitle: 'Most popular choice',
      price: billingCycle === 'monthly' ? 19900 : 199000,
      originalPrice: billingCycle === 'monthly' ? 29900 : 299000,
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      features: [
        { included: true, text: 'Up to 200 patient registrations' },
        { included: true, text: 'Advanced appointment system' },
        { included: true, text: 'Patient analytics dashboard' },
        { included: true, text: 'Priority patient matching' },
        { included: true, text: '24/7 phone support' },
        { included: true, text: 'Online payment processing' },
        { included: true, text: 'MediFlow marketing tools' },
        { included: false, text: 'Dedicated account manager' }
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Clinic',
      subtitle: 'Complete platform solution',
      price: billingCycle === 'monthly' ? 39900 : 399000,
      originalPrice: billingCycle === 'monthly' ? 59900 : 599000,
      icon: Award,
      color: 'from-amber-500 to-amber-600',
      features: [
        { included: true, text: 'Unlimited patient registrations' },
        { included: true, text: 'Complete platform customization' },
        { included: true, text: 'Advanced analytics & insights' },
        { included: true, text: 'Dedicated account manager' },
        { included: true, text: 'Custom branding options' },
        { included: true, text: 'API access for integration' },
        { included: true, text: 'Priority technical support' },
        { included: true, text: 'Multi-location management' }
      ],
      popular: false
    }
  ];

  const addOns = [
    {
      name: 'Marketing Plus',
      price: billingCycle === 'monthly' ? 4900 : 49000,
      description: 'Enhanced marketing tools, SEO optimization, and promotional campaigns to attract more patients',
      icon: '📈'
    },
    {
      name: 'Telemedicine Suite',
      price: billingCycle === 'monthly' ? 3900 : 39000,
      description: 'Video consultation platform, virtual waiting room, and remote monitoring tools',
      icon: '👨‍⚕️'
    },
    {
      name: 'Analytics Pro',
      price: billingCycle === 'monthly' ? 2900 : 29000,
      description: 'Advanced analytics, custom reports & guidance, and business intelligence dashboard',
      icon: '📊'
    },
    {
      name: 'Integration Hub',
      price: billingCycle === 'monthly' ? 5900 : 59000,
      description: 'EMR/EHR integration, billing system connections, and third-party app integrations',
      icon: '�'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Gihan Bandara',
      role: 'Owner, City Medical Clinic',
      content: 'MediFlow Professional plan transformed our clinic operations. Patient bookings increased by 40% in just 3 months!',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    },
    {
      name: 'Nimal Perera',
      role: 'Administrator, HealthPlus Group',
      content: 'The Enterprise plan gives us complete control over our multi-location clinics. The analytics dashboard is invaluable for business decisions.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    },
    {
      name: 'Kasun Kalhara',
      role: 'Manager, Wellness Center',
      content: 'Started with Starter plan and upgraded as we grew. MediFlow scales perfectly with our clinic needs. Highly recommended!',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    }
  ];

  const faqs = [
    {
      question: 'Is there a setup fee for clinics?',
      answer: 'No, there are no setup fees or hidden charges. You only pay for your selected plan and any add-ons you choose.'
    },
    {
      question: 'Can patients join MediFlow for free?',
      answer: 'Yes! Patients can join MediFlow absolutely free. They can browse clinics, book appointments, and manage their healthcare at no cost.'
    },
    {
      question: 'How do patients find my clinic on MediFlow?',
      answer: 'Patients can discover your clinic through our search platform, recommendations, and marketing tools. Higher-tier plans get better visibility.'
    },
    {
      question: 'Can I switch between clinic plans?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.'
    },
    {
      question: 'What happens if I need to cancel?',
      answer: 'You can cancel your subscription anytime. Your access continues until the end of your current billing period, and your patient data remains secure.'
    }
  ];

  return (
    <div>
        <LandingNav/>
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
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
              Choose Your Clinic Plan
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join the MediFlow platform and connect with thousands of patients. Patients join free, clinics grow with us.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 ">
              <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white' : 'text-blue-200'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-16 h-8 bg-white/20 rounded-full transition-colors duration-300 cursor-pointer"
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{ x: billingCycle === 'monthly' ? 4 : 36 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
              <span className={`text-lg ${billingCycle === 'yearly' ? 'text-white' : 'text-blue-200'}`}>
                Yearly
                <span className="ml-2 px-2 py-1 bg-green-500 text-white text-sm rounded-full">Save 20%</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative ${
                  plan.popular 
                    ? 'scale-105 z-10' 
                    : hoveredPlan === plan.id ? 'scale-105 z-10' : ''
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-linear-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  plan.popular ? 'ring-4 ring-purple-500/20' : ''
                }`}>
                  {/* Plan Header */}
                  <div className={`bg-linear-to-r ${plan.color} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                        <plan.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-blue-100 mb-6">{plan.subtitle}</p>
                      
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold">LKR {plan.price}</span>
                        <span className="text-blue-200">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="mt-2 text-sm text-blue-100">
                          Save LKR {(plan.originalPrice - plan.price)} per year
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          {feature.included ? (
                            <div className="shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                              <X className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                          <span className={`text-gray-700 ${!feature.included ? 'text-gray-400' : ''}`}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={`/signup?plan=${plan.id}&billing=${billingCycle}`}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-all transform hover:scale-105 ${
                        plan.popular
                          ? 'bg-linear-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Get Started
                      <ArrowRight className="inline-block ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-15 bg-linear-to-r from-blue-100 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enhance Your Clinic</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Add specialized tools to grow your clinic and improve patient care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addOn, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{addOn.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{addOn.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{addOn.description}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-blue-600">LKR {addOn.price}</span>
                  <span className="text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <button className="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-lg font-medium cursor-pointer hover:bg-blue-200 transition-colors">
                  Add to Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compare All Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See exactly what's included in each plan
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-blue-700">Starter Clinic</th>
                  <th className="text-center py-4 px-6 font-semibold text-purple-600">Professional Clinic</th>
                  <th className="text-center py-4 px-6 font-semibold text-amber-600">Enterprise Clinic</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Patient Limit', basic: '50', professional: '200', premium: 'Unlimited' },
                  { feature: 'Appointment System', basic: 'Basic', professional: 'Advanced', premium: 'Complete' },
                  { feature: 'Analytics Dashboard', basic: 'No', professional: 'Yes', premium: 'Advanced' },
                  { feature: 'Patient Matching', basic: 'Standard', professional: 'Priority', premium: 'Premium' },
                  { feature: 'Marketing Tools', basic: 'No', professional: 'Yes', premium: 'Advanced' },
                  { feature: 'API Access', basic: 'No', professional: 'No', premium: 'Yes' },
                  { feature: 'Custom Branding', basic: 'No', professional: 'No', premium: 'Yes' },
                  { feature: 'Support Level', basic: 'Email', professional: '24/7 Phone', premium: 'Dedicated' }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-blue-700 font-medium">{row.basic}</td>
                    <td className="py-4 px-6 text-center font-medium text-purple-600">{row.professional}</td>
                    <td className="py-4 px-6 text-center text-amber-600 font-medium">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-15 bg-linear-to-r from-blue-100 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clinic Partners Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from clinic owners and administrators
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-400 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about MediFlow pricing
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
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
              Ready to Grow Your Clinic?
            </h2>
            <p className="text-xl font-medium text-blue-600 mb-8">
              Join hundreds of clinics that trust MediFlow to connect them with patients
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signUp"
                className="inline-flex items-center px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all transform hover:scale-102"
              >
                Start Your Clinic
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/contact-us"
                className="inline-flex items-center px-8 py-4  backdrop-blur-sm text-black font-semibold rounded-xl hover:bg-black/10 transition-all border border-black"
              >
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <LandingFooter/>
    </div>
    </div>
  );
};

export default PricingPage;
