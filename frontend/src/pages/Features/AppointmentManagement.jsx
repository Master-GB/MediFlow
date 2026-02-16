import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, Clock, Users, ArrowRight, Check, ShieldCheck, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../../components/landingPage/landingNav';
import LandingFooter from '../../components/landingPage/landingFooter';

const AppointmentManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const highlights = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Automated scheduling',
      description: 'Patients book faster and clinics maintain cleaner schedules.'
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Smart reminders',
      description: 'Reduce no-shows with notifications and confirmations.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Queue visibility',
      description: 'Better time management with smoother patient flow.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Multi-staff coordination',
      description: 'Coordinate doctors, rooms, and services with fewer conflicts.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Patients search & select',
      description: 'Find clinics/doctors by specialty, location, and availability.'
    },
    {
      number: '02',
      title: 'Book instantly',
      description: 'Choose a time slot and receive confirmation in seconds.'
    },
    {
      number: '03',
      title: 'Automated reminders',
      description: 'Smart notifications help patients arrive prepared and on time.'
    },
    {
      number: '04',
      title: 'Clinic runs smoother',
      description: 'Schedules stay organized and staff stays aligned.'
    }
  ];

  const benefits = [
    'Fewer no-shows and late arrivals',
    'More predictable clinic operations',
    'Reduced scheduling conflicts',
    'Better patient satisfaction and throughput',
    'A single source of truth for appointments'
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 to-emerald-50">
      <LandingNav />

      <section
        className="relative overflow-hidden bg-linear-to-br from-rose-700 via-red-700 to-slate-900 text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(/src/assets/images/book.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-16 left-10 w-72 h-72 bg-rose-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-10 w-96 h-96 bg-red-400/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">Scheduling That Actually Saves Time</h1>
            <p className="text-xl md:text-2xl text-rose-100 max-w-3xl mx-auto mb-8">
              Automated booking, reminders, and clinic coordination—built for real-world flow.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/howItWork-patient"
                className="inline-flex items-center px-8 py-4 bg-white text-rose-800 font-bold rounded-xl hover:bg-rose-50 transition-all transform hover:scale-105 shadow-lg"
              >
                For Patients
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/howItWork-clinic"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                For Clinics
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-15 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-24 w-80 h-80 bg-rose-300/45 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-300/40 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-700/10 border border-rose-700/15 text-rose-800 font-semibold">
                <Calendar className="w-4 h-4" />
                Booking essentials
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mt-4">A modern booking experience</h2>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Reduce chaos and increase predictability with a connected scheduling system.
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
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-rose-700/10 via-red-700/10 to-slate-900/10 border border-rose-700/15 flex items-center justify-center text-rose-800">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-lg font-bold text-gray-900">{item.title}</div>
                          <div className="text-gray-600 mt-2 leading-relaxed">{item.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-linear-to-r from-transparent via-rose-600/25 to-transparent" />
                    <div className="px-7 py-5 text-sm text-gray-500">Cleaner scheduling for patients and clinic teams.</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 grid lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <ShieldCheck className="w-5 h-5" />,
                    title: 'Reliable and secure',
                    text: 'Appointments and reminders stay consistent with secure handling.'
                  },
                  {
                    icon: <Layers className="w-5 h-5" />,
                    title: 'One schedule source',
                    text: 'No more multiple spreadsheets and mixed calendars.'
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Better time control',
                    text: 'Clinics can improve patient flow and reduce waiting time.'
                  }
                ].map((c, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    className="rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-md p-7 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-3 text-rose-800">
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A clear booking loop from search to visit.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-gray-200/70 bg-linear-to-br from-rose-50 via-white to-red-50 p-8 shadow-lg">
              <div className="text-gray-900 font-bold text-xl">A simple booking timeline</div>
              <div className="text-gray-600 mt-2">From discovery to visit—clear and predictable.</div>
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
                      <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-rose-700 to-red-700 text-white font-extrabold flex items-center justify-center shadow-md">
                        {step.number}
                      </div>
                      {idx < steps.length - 1 && <div className="w-px flex-1 bg-linear-to-b from-rose-600/35 to-transparent mt-3" />}
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
              <div className="text-gray-600 mt-2">Built to help both patients and clinics.</div>
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
                      <Check className="w-5 h-5 text-rose-800 shrink-0 mt-0.5" />
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
          <div className="bg-linear-to-br from-rose-700 via-red-700 to-slate-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-3">Ready to improve your booking flow?</h3>
                <p className="text-white/90 text-lg max-w-2xl">Start with MediFlow and make scheduling effortless.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/signUp"
                  className="inline-flex items-center px-7 py-3 bg-white text-rose-800 font-bold rounded-xl hover:bg-rose-50 transition-all transform hover:scale-105"
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

export default AppointmentManagement;
