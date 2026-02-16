import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, CalendarDays, Users, FileText, ShieldCheck, ArrowRight, Check, BarChart3, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../../components/landingPage/landingNav';
import LandingFooter from '../../components/landingPage/landingFooter';

const SmartClinicManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const highlights = [
    {
      icon: <CalendarDays className="w-6 h-6" />,
      title: 'Centralized scheduling',
      description: 'Manage appointments, queues, and reminders with fewer no-shows.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Unified patient records',
      description: 'Access consistent patient history across doctors, visits, and services.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Billing-ready workflows',
      description: 'Track services and generate accurate records for billing and reporting.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Secure access control',
      description: 'Role-based permissions for clinic admins, doctors, and pharmacy staff.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Clinic onboarding',
      description: 'Add clinic details, services, working hours, and staff roles.'
    },
    {
      number: '02',
      title: 'Configure operations',
      description: 'Set schedules, appointment types, and notification rules.'
    },
    {
      number: '03',
      title: 'Invite staff securely',
      description: 'Issue credentials to doctors and pharmacists with assigned access.'
    },
    {
      number: '04',
      title: 'Run the clinic smarter',
      description: 'Track performance and improve efficiency with reports and analytics.'
    }
  ];

  const benefits = [
    'Reduced operational overhead with automated flows',
    'Fewer scheduling conflicts and better utilization',
    'Faster patient throughput with clearer workflows',
    'Improved staff coordination and accountability',
    'Actionable analytics for clinic growth'
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 to-emerald-50">
      <LandingNav />

      <section
        className="relative overflow-hidden bg-linear-to-br from-green-700 via-emerald-700 to-slate-900 text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(/src/assets/images/clinicW.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-16 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-10 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">Operate Your Clinic Like a Modern Platform</h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto mb-8">
              Scheduling, staff, records, and performance-connected in one streamlined system.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/howItWork-clinic"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg"
              >
                See Clinic Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                Request a Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-15 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-30 w-80 h-80 bg-emerald-300/40 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-30 w-96 h-96 bg-green-300/35 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-700/10 border border-emerald-700/15 text-emerald-800 font-semibold">
                <Building2 className="w-4 h-4" />
                Clinic essentials
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mt-4">Everything your clinic needs</h2>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Designed to reduce admin work and increase patient satisfaction.
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
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-700/10 via-green-700/10 to-slate-900/10 border border-emerald-700/15 flex items-center justify-center text-emerald-800">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-lg font-bold text-gray-900">{item.title}</div>
                          <div className="text-gray-600 mt-2 leading-relaxed">{item.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-linear-to-r from-transparent via-emerald-600/25 to-transparent" />
                    <div className="px-7 py-5 text-sm text-gray-500">Optimized for daily operations and staff alignment.</div>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A clean rollout from setup to daily operations.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-gray-200/70 bg-linear-to-br from-emerald-50 via-white to-green-50 p-8 shadow-lg">
              <div className="text-gray-900 font-bold text-xl">From setup to smooth daily operations</div>
              <div className="text-gray-600 mt-2">A rollout flow designed for busy clinic teams.</div>
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
                      <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-emerald-700 to-green-700 text-white font-extrabold flex items-center justify-center shadow-md">
                        {step.number}
                      </div>
                      {idx < steps.length - 1 && <div className="w-px flex-1 bg-linear-to-b from-emerald-600/35 to-transparent mt-3" />}
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
              <div className="text-gray-900 font-bold text-xl">Benefits for growth</div>
              <div className="text-gray-600 mt-2">From efficiency to visibility—measurable improvements.</div>
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
                      <Check className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
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
          <div className="bg-linear-to-br from-green-700 via-emerald-700 to-slate-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="w-5 h-5" />
                  <span className="font-semibold">Clinic Admin Ready</span>
                </div>
                <h3 className="text-3xl font-bold mb-3">Want a tailored clinic setup?</h3>
                <p className="text-white/90 text-lg max-w-2xl">
                  We can help map your current workflow and configure MediFlow for your services.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact-us"
                  className="inline-flex items-center px-7 py-3 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-all transform hover:scale-105"
                >
                  Request a Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/pricing-page"
                  className="inline-flex items-center px-7 py-3 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                >
                  View Pricing
                  <BarChart3 className="w-5 h-5 ml-2" />
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

export default SmartClinicManagement;
