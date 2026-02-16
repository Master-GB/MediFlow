import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles, ClipboardList, ShieldCheck, Brain, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../../components/landingPage/landingNav';
import LandingFooter from '../../components/landingPage/landingFooter';

const AISymptomAnalyzer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const highlights = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-powered symptom insights',
      description: 'Get instant, structured guidance based on the symptoms you enter.'
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: 'Smart triage suggestions',
      description: 'Know what to do next: self-care, clinic visit, specialist, or urgent care.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Privacy-first',
      description: 'Designed with secure handling of health data and minimal data exposure.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Personalized recommendations',
      description: 'Get next-step guidance and what details to mention during your consultation.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Describe symptoms',
      description: 'Enter key symptoms, duration, severity, and any relevant context.'
    },
    {
      number: '02',
      title: 'Review insights',
      description: 'See possible causes, red flags, and recommended next actions.'
    },
    {
      number: '03',
      title: 'Book the right care',
      description: 'Schedule an appointment with the right provider based on suggestions.'
    },
    {
      number: '04',
      title: 'Share a summary',
      description: 'Bring a clean symptom summary to your consultation for faster care.'
    }
  ];

  const benefits = [
    'Faster decision-making when you’re unsure what to do next',
    'Clear symptom summary for better doctor communication',
    'Early awareness of warning signs and urgency',
    'More accurate provider selection and reduced unnecessary visits',
    'Smoother care journey with integrated booking'
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 to-emerald-50">
      <LandingNav />

      <section
        className="relative overflow-hidden bg-linear-to-br from-blue-700 via-indigo-700 to-slate-900 text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(/src/assets/images/aiFeatw.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-16 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
          
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">Understand Symptoms. Choose the Right Care.</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Get instant, AI-assisted guidance and a clean summary you can share with your doctor.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/howItWork-patient"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                See Patient Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/signUp"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-15 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 -left-30 w-80 h-80 bg-blue-300/40 blur-3xl rounded-full" />
          <div className="absolute bottom-10 -right-30 w-96 h-96 bg-indigo-300/45 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/15 text-blue-700 font-semibold">
                <Sparkles className="w-4 h-4" />
                Built for clarity
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mt-4">Built for confidence</h2>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                A modern symptom experience that helps you prepare, act faster, and communicate better.
              </p>
            </motion.div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {highlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: idx * 0.06 }}
                    className="group rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="p-7">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600/10 via-indigo-600/10 to-slate-900/10 border border-blue-600/15 flex items-center justify-center text-blue-700">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-lg font-bold text-gray-900">{item.title}</div>
                          <div className="text-gray-600 mt-2 leading-relaxed">{item.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />
                    <div className="px-7 py-5 text-sm text-gray-500">
                      Designed to reduce uncertainty and speed up the next step.
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A simple flow that fits your day and respects your time.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-gray-200/70 bg-linear-to-br from-blue-50 via-white to-indigo-50 p-8 shadow-lg">
              <div className="text-gray-900 font-bold text-xl">A guided symptom-to-care timeline</div>
              <div className="text-gray-600 mt-2">Structured steps that help you act with clarity.</div>
              <div className="mt-8 space-y-6">
                {steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 text-white font-extrabold flex items-center justify-center shadow-md">
                        {step.number}
                      </div>
                      {idx < steps.length - 1 && <div className="w-px flex-1 bg-linear-to-b from-blue-500/40 to-transparent mt-3" />}
                    </div>
                    <div className="pt-1">
                      <div className="text-lg font-bold text-gray-900">{step.title}</div>
                      <div className="text-gray-600 mt-1 leading-relaxed">{step.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200/70 bg-white p-8 shadow-lg">
              <div className="text-gray-900 font-bold text-xl">What you’ll gain</div>
              <div className="text-gray-600 mt-2">Practical outcomes that make healthcare easier.</div>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {benefits.map((b, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.04 }}
                    className="rounded-2xl border border-gray-200/70 bg-gray-50/70 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                      <div className="text-gray-700 font-medium leading-relaxed">{b}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-15 bg-linear-to-r from-blue-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-3">Need help choosing what to do next?</h3>
                <p className="text-white/90 text-lg max-w-2xl">
                  Use MediFlow to analyze symptoms, then book the right provider in minutes.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/signUp"
                  className="inline-flex items-center px-7 py-3 bg-white text-blue-800 font-bold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center px-7 py-3 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default AISymptomAnalyzer;
