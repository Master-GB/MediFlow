import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, ShieldCheck, HeartPulse, Smartphone, ArrowRight, Check, Clock, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../../components/landingPage/landingNav';
import LandingFooter from '../../components/landingPage/landingFooter';

const Telemedicine = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const highlights = [
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Secure video consultations',
      description: 'Consult with doctors from anywhere using secure video calls.'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile-first experience',
      description: 'Designed to work smoothly on phones and low-bandwidth networks.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Privacy and compliance',
      description: 'Built with secure access patterns and careful data handling.'
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: 'Continuity of care',
      description: 'Keep visits connected with digital notes and patient history.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Book a tele-visit',
      description: 'Select a provider and choose a suitable virtual time slot.'
    },
    {
      number: '02',
      title: 'Join securely',
      description: 'Start the consultation from your device with secure access.'
    },
    {
      number: '03',
      title: 'Get guidance & prescription',
      description: 'Receive medical advice and digital prescriptions when needed.'
    },
    {
      number: '04',
      title: 'Follow up easily',
      description: 'Continue care with records, reminders, and next-step bookings.'
    }
  ];

  const benefits = [
    'Save travel time and reduce waiting',
    'Faster access to doctors and follow-ups',
    'Better continuity with digital records',
    'Convenient care for chronic conditions',
    'Improved access for remote areas'
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 to-emerald-50">
      <LandingNav />

      <section
        className="relative overflow-hidden bg-linear-to-br from-indigo-700 via-blue-700 to-slate-900 text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(/src/assets/images/tele.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-16 left-10 w-72 h-72 bg-indigo-400/25 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-10 w-96 h-96 bg-blue-400/25 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">Care From Anywhere. Without the Wait.</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Secure video consultations that fit your schedule and keep your records connected.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/howItWork-patient"
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-800 font-bold rounded-xl hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg"
              >
                For Patients
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/howItWork-doctor"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                For Doctors
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-15 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-24 w-80 h-80 bg-indigo-300/45 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-300/40 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-700/10 border border-indigo-700/15 text-indigo-800 font-semibold">
                <Video className="w-4 h-4" />
                Virtual care
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mt-4">Modern virtual care tools</h2>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Designed for real-world conditions while staying secure and reliable.
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
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-700/10 via-blue-700/10 to-slate-900/10 border border-indigo-700/15 flex items-center justify-center text-indigo-800">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-lg font-bold text-gray-900">{item.title}</div>
                          <div className="text-gray-600 mt-2 leading-relaxed">{item.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-linear-to-r from-transparent via-indigo-600/25 to-transparent" />
                    <div className="px-7 py-5 text-sm text-gray-500">Care experiences designed for speed and continuity.</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 grid lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Time-efficient',
                    text: 'Less waiting, faster follow-ups, and better time planning.'
                  },
                  {
                    icon: <ShieldCheck className="w-5 h-5" />,
                    title: 'Secure by design',
                    text: 'Role-based access and secure sessions for virtual visits.'
                  },
                  {
                    icon: <Stethoscope className="w-5 h-5" />,
                    title: 'Clinically useful',
                    text: 'Supports doctor documentation and continuity of care.'
                  }
                ].map((c, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    className="rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-md p-7 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-3 text-indigo-800">
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A simple tele-visit flow for everyone.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-gray-200/70 bg-linear-to-br from-indigo-50 via-white to-blue-50 p-8 shadow-lg">
              <div className="text-gray-900 font-bold text-xl">A clear tele-visit timeline</div>
              <div className="text-gray-600 mt-2">From booking to follow-ups—simple and secure.</div>
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
                      <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-indigo-700 to-blue-700 text-white font-extrabold flex items-center justify-center shadow-md">
                        {step.number}
                      </div>
                      {idx < steps.length - 1 && <div className="w-px flex-1 bg-linear-to-b from-indigo-600/35 to-transparent mt-3" />}
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
              <div className="text-gray-600 mt-2">Healthcare access that scales with your life.</div>
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
                      <Check className="w-5 h-5 text-indigo-800 shrink-0 mt-0.5" />
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
          <div className="bg-linear-to-br from-indigo-700 via-blue-700 to-slate-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-3">Try telemedicine with MediFlow</h3>
                <p className="text-white/90 text-lg max-w-2xl">Book a secure video visit and keep your care connected.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/signUp"
                  className="inline-flex items-center px-7 py-3 bg-white text-indigo-800 font-bold rounded-xl hover:bg-indigo-50 transition-all transform hover:scale-105"
                >
                  Get Started
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

export default Telemedicine;
