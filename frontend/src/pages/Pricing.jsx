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

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Care',
      subtitle: 'Perfect for individuals',
      price: billingCycle === 'monthly' ? 29 : 290,
      originalPrice: billingCycle === 'monthly' ? 49 : 490,
      icon: Heart,
      color: 'from-blue-500 to-blue-600',
      features: [
        { included: true, text: 'Basic health checkups' },
        { included: true, text: 'Email support' },
        { included: true, text: 'Health tracking app' },
        { included: true, text: 'Monthly reports' },
        { included: false, text: 'Video consultations' },
        { included: false, text: 'Specialist access' },
        { included: false, text: 'Emergency priority' },
        { included: false, text: 'Family members (up to 3)' }
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Care',
      subtitle: 'Most popular choice',
      price: billingCycle === 'monthly' ? 79 : 790,
      originalPrice: billingCycle === 'monthly' ? 129 : 1290,
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      features: [
        { included: true, text: 'Everything in Basic' },
        { included: true, text: 'Unlimited video consultations' },
        { included: true, text: 'Specialist access' },
        { included: true, text: 'Priority appointments' },
        { included: true, text: 'Advanced health analytics' },
        { included: true, text: '24/7 phone support' },
        { included: false, text: 'Emergency priority' },
        { included: false, text: 'Family members (up to 5)' }
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Care',
      subtitle: 'Complete healthcare solution',
      price: billingCycle === 'monthly' ? 149 : 1490,
      originalPrice: billingCycle === 'monthly' ? 249 : 2490,
      icon: Award,
      color: 'from-amber-500 to-amber-600',
      features: [
        { included: true, text: 'Everything in Professional' },
        { included: true, text: 'Emergency priority care' },
        { included: true, text: 'Family members (up to 5)' },
        { included: true, text: 'Home visit consultations' },
        { included: true, text: 'Personal health coach' },
        { included: true, text: 'International coverage' },
        { included: true, text: 'VIP support team' },
        { included: true, text: 'Annual executive health checkup' }
      ],
      popular: false
    }
  ];

  const addOns = [
    {
      name: 'Dental Care Plus',
      price: billingCycle === 'monthly' ? 19 : 190,
      description: 'Comprehensive dental coverage including cleanings, fillings, and orthodontics',
      icon: '🦷'
    },
    {
      name: 'Vision Care',
      price: billingCycle === 'monthly' ? 15 : 150,
      description: 'Eye exams, prescription glasses, and contact lens coverage',
      icon: '👁️'
    },
    {
      name: 'Mental Wellness',
      price: billingCycle === 'monthly' ? 25 : 250,
      description: 'Therapy sessions, counseling, and mental health support',
      icon: '🧠'
    },
    {
      name: 'Fitness & Nutrition',
      price: billingCycle === 'monthly' ? 12 : 120,
      description: 'Personalized fitness plans and nutritionist consultations',
      icon: '💪'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, Tech Company',
      content: 'MediFlow Professional Care has transformed how our team manages healthcare. The convenience and quality are unmatched.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    },
    {
      name: 'Michael Chen',
      role: 'Family Father',
      content: 'With Premium Care, my entire family is covered. The peace of mind knowing we have priority emergency care is priceless.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Freelance Designer',
      content: 'Basic Care gives me everything I need at an affordable price. The health tracking app keeps me motivated!',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    }
  ];

  const faqs = [
    {
      question: 'Can I switch between plans?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No, there are no setup fees or hidden charges. You only pay for your selected plan and any add-ons you choose.'
    },
    {
      question: 'What if I need to cancel?',
      answer: 'You can cancel your subscription anytime. Your access continues until the end of your current billing period.'
    },
    {
      question: 'Are family members included?',
      answer: 'Family coverage is included in our Premium plan. Professional plan covers you plus one family member.'
    },
    {
      question: 'Do you accept insurance?',
      answer: 'Yes, we work with most major insurance providers. We can help you maximize your insurance benefits.'
    }
  ];

  return (
    <div>
        <LandingNav/>
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
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
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your Healthcare Plan
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Transparent pricing for comprehensive healthcare that fits your needs and budget
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white' : 'text-blue-200'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-16 h-8 bg-white/20 rounded-full transition-colors duration-300"
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
      <section className="py-20">
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
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  plan.popular ? 'ring-4 ring-purple-500/20' : ''
                }`}>
                  {/* Plan Header */}
                  <div className={`bg-gradient-to-r ${plan.color} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                        <plan.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-blue-100 mb-6">{plan.subtitle}</p>
                      
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold">${plan.price}</span>
                        <span className="text-blue-200">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="mt-2 text-sm text-blue-100">
                          Save ${(plan.originalPrice - plan.price)} per year
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
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
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
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enhance Your Coverage</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Add specialized care options to customize your health plan
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
                  <span className="text-3xl font-bold text-blue-600">${addOn.price}</span>
                  <span className="text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <button className="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                  Add to Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
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
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Basic Care</th>
                  <th className="text-center py-4 px-6 font-semibold text-purple-600">Professional Care</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Premium Care</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Health Checkups', basic: 'Annual', professional: 'Quarterly', premium: 'Monthly' },
                  { feature: 'Video Consultations', basic: 'Limited', professional: 'Unlimited', premium: 'Unlimited' },
                  { feature: 'Specialist Access', basic: 'No', professional: 'Yes', premium: 'Priority' },
                  { feature: 'Emergency Care', basic: 'Standard', professional: 'Priority', premium: 'VIP Priority' },
                  { feature: 'Family Members', basic: 'Just you', professional: '+1', premium: '+5' },
                  { feature: 'Home Visits', basic: 'No', professional: 'No', premium: 'Yes' },
                  { feature: 'International Coverage', basic: 'No', professional: 'No', premium: 'Yes' },
                  { feature: 'Health Coach', basic: 'No', professional: 'Group', premium: 'Personal' }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row.basic}</td>
                    <td className="py-4 px-6 text-center font-medium text-purple-600">{row.professional}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"></div>
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
              Everything you need to know about our pricing
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
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Healthcare Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied patients who trust MediFlow with their health
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/signup"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-500/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-blue-500/30 transition-all border border-white/20"
              >
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default PricingPage;
