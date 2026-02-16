import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Calendar, FileText, Users, TrendingUp, ShieldCheck, ArrowRight, Check, Clock, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../../components/landingPage/landingNav';
import LandingFooter from '../../components/landingPage/landingFooter';

const DoctorWorkflowOptimization = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const highlights = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Smarter scheduling',
      description: 'Cleaner calendar visibility with fewer gaps, conflicts, and no-shows.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Digital prescriptions',
      description: 'Issue prescriptions quickly with better clarity and less manual writing.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Patient context instantly',
      description: 'Access visit history and key info to reduce repeated questions.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Performance insights',
      description: 'Understand demand, patient flow, and time utilization with analytics.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Log in with clinic credentials',
      description: 'Your clinic provides your credentials and access permissions.'
    },
    {
      number: '02',
      title: 'Set availability',
      description: 'Configure hours, consultation types, and appointment duration.'
    },
    {
      number: '03',
      title: 'Consult & document',
      description: 'View patient context, record notes, and prescribe digitally.'
    },
    {
      number: '04',
      title: 'Improve continuously',
      description: 'Use reports to refine scheduling and reduce admin time.'
    }
  ];

  const benefits = [
    'Less admin work and more time for patient care',
    'Improved patient experience through faster workflows',
    'Better schedule utilization and reduced idle gaps',
    'Cleaner records and prescription clarity',
    'Insights that help clinics support doctors effectively'
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 to-emerald-50">
      <LandingNav />

      <section
        className="relative overflow-hidden bg-linear-to-br from-green-700 via-emerald-700 to-slate-900 text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(/src/assets/images/doctorW.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-16 left-10 w-72 h-72 bg-green-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-10 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">Work Faster. Document Better. Care More.</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              Clinic-ready workflows that reduce admin load and make daily practice smoother.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/howItWork-doctor"
                className="inline-flex items-center px-8 py-4 bg-white text-green-800 font-bold rounded-xl hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
              >
                See Doctor Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/signIn"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-15 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-30 w-80 h-80 bg-green-300/35 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-30 w-96 h-96 bg-emerald-300/30 blur-3xl rounded-full" />
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
                <Stethoscope className="w-4 h-4" />
                What you get
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mt-4">A workflow that protects your time</h2>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                A daily system that keeps your focus on patients, not paperwork.
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
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-700/10 via-emerald-700/10 to-slate-900/10 border border-emerald-700/15 flex items-center justify-center text-emerald-800">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-lg font-bold text-gray-900">{item.title}</div>
                          <div className="text-gray-600 mt-2 leading-relaxed">{item.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-linear-to-r from-transparent via-emerald-600/25 to-transparent" />
                    <div className="px-7 py-5 text-sm text-gray-500">Built to reduce friction during busy clinic days.</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 grid lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Save time',
                    text: 'Reduce repetitive steps and streamline common tasks.'
                  },
                  {
                    icon: <ShieldCheck className="w-5 h-5" />,
                    title: 'Clinic-secured access',
                    text: 'Your access is managed by your clinic for safety and compliance.'
                  },
                  {
                    icon: <MessageCircle className="w-5 h-5" />,
                    title: 'Better communication',
                    text: 'Clearer records and summaries reduce confusion for patients and staff.'
                  }
                ].map((c, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    className="rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-md p-7 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-3 text-emerald-800">
                      {c.icon}
                      <div className="font-bold">{c.title}</div>
                    </div>
                    <div className="text-gray-600">{c.text}</div>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Optimized steps that mirror real clinic routines.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-gray-200/70 bg-linear-to-br from-green-50 via-white to-emerald-50 p-8 shadow-lg">
              <div className="text-gray-900 font-bold text-xl">A simple doctor workflow loop</div>
              <div className="text-gray-600 mt-2">Designed around clinic-managed access and daily practice.</div>
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
                      <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-green-700 to-emerald-700 text-white font-extrabold flex items-center justify-center shadow-md">
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
              <div className="text-gray-900 font-bold text-xl">Benefits</div>
              <div className="text-gray-600 mt-2">Concrete value for doctors and clinics.</div>
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
                <h3 className="text-3xl font-bold mb-3">Doctor accounts are clinic-managed</h3>
                <p className="text-white/90 text-lg max-w-2xl">
                  Your clinic issues credentials and permissions. You just sign in and start consulting.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/signIn"
                  className="inline-flex items-center px-7 py-3 bg-white text-green-800 font-bold rounded-xl hover:bg-green-50 transition-all transform hover:scale-105"
                >
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center px-7 py-3 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                >
                  Need Help
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

export default DoctorWorkflowOptimization;
