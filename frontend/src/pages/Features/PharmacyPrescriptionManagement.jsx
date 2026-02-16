import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pill, FileText, Package, Bell, ShieldCheck, ArrowRight, Check, ClipboardCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../../components/landingPage/landingNav';
import LandingFooter from '../../components/landingPage/landingFooter';

const PharmacyPrescriptionManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const highlights = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'E-prescription processing',
      description: 'Receive prescriptions digitally with clearer instructions and better tracking.'
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: 'Medication safety checks',
      description: 'Support safer dispensing with key details like allergies and history visibility.'
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Inventory intelligence',
      description: 'Stock tracking with reorder planning and expiration management.'
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Refill reminders',
      description: 'Keep adherence high with reminders and refill workflows.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Receive clinic credentials',
      description: 'Your clinic provides access so pharmacy workflows align with clinic operations.'
    },
    {
      number: '02',
      title: 'Configure services',
      description: 'Set operating hours, medication catalog, and prescription preferences.'
    },
    {
      number: '03',
      title: 'Set up inventory',
      description: 'Enable automated stock tracking and expiration alerts.'
    },
    {
      number: '04',
      title: 'Fulfill prescriptions',
      description: 'Process digital prescriptions and keep dispensing history up to date.'
    }
  ];

  const benefits = [
    'Faster dispensing with fewer manual steps',
    'Reduced prescription interpretation errors',
    'Better stock visibility and fewer stockouts',
    'Improved adherence via reminders and refills',
    'Audit-friendly digital trail for compliance'
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 to-emerald-50">
      <LandingNav />

      <section
        className="relative overflow-hidden bg-linear-to-br from-orange-700 via-amber-700 to-slate-900 text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(/src/assets/images/pharmacistW.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-16 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
  
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">Safer Dispensing. Smarter Inventory.</h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-8">
              Digital prescriptions, adherence support, and inventory automation for modern pharmacies.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/howItWork-pharmacists"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-800 font-bold rounded-xl hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg"
              >
                See Pharmacist Journey
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
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-300/45 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-30 w-96 h-96 bg-amber-300/35 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-700/10 border border-orange-700/15 text-orange-800 font-semibold">
                <Pill className="w-4 h-4" />
                Pharmacy workflows
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mt-4">Built for daily operations</h2>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Everything you need to manage prescriptions, stock, and patient adherence.
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
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-orange-700/10 via-amber-700/10 to-slate-900/10 border border-orange-700/15 flex items-center justify-center text-orange-800">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-lg font-bold text-gray-900">{item.title}</div>
                          <div className="text-gray-600 mt-2 leading-relaxed">{item.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-linear-to-r from-transparent via-orange-600/25 to-transparent" />
                    <div className="px-7 py-5 text-sm text-gray-500">Designed for accuracy, speed, and traceability.</div>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A flow aligned with clinic-based credentials and operations.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-gray-200/70 bg-linear-to-br from-orange-50 via-white to-amber-50 p-8 shadow-lg">
              <div className="text-gray-900 font-bold text-xl">A smooth prescription-to-dispense loop</div>
              <div className="text-gray-600 mt-2">Clinic-aligned access with clear operational steps.</div>
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
                      <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-orange-700 to-amber-700 text-white font-extrabold flex items-center justify-center shadow-md">
                        {step.number}
                      </div>
                      {idx < steps.length - 1 && <div className="w-px flex-1 bg-linear-to-b from-orange-600/35 to-transparent mt-3" />}
                    </div>
                    <div className="pt-1">
                      <div className="text-lg font-bold text-gray-900">{step.title}</div>
                      <div className="text-gray-600 mt-1 leading-relaxed">{step.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <ShieldCheck className="w-5 h-5" />,
                    title: 'Clinic-managed access',
                    text: 'Credentials and access are issued by clinics to keep operations secure.'
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Faster dispensing',
                    text: 'Reduce back-and-forth with clearer digital prescriptions.'
                  },
                  {
                    icon: <Package className="w-5 h-5" />,
                    title: 'Inventory confidence',
                    text: 'Never get surprised by stockouts or expired medications.'
                  }
                ].map((c, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.05 }}
                    className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-md p-5"
                  >
                    <div className="flex items-center gap-3 text-orange-800 font-bold">
                      {c.icon}
                      <div className="text-sm">{c.title}</div>
                    </div>
                    <div className="text-gray-600 mt-2 text-sm leading-relaxed">{c.text}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200/70 bg-white p-8 shadow-lg">
              <div className="text-gray-900 font-bold text-xl">Benefits</div>
              <div className="text-gray-600 mt-2">Better safety, better efficiency, better patient service.</div>
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
                      <Check className="w-5 h-5 text-orange-800 shrink-0 mt-0.5" />
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
          <div className="bg-linear-to-br from-orange-700 via-amber-700 to-slate-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-3">Ready to streamline pharmacy operations?</h3>
                <p className="text-white/90 text-lg max-w-2xl">
                  Digitize prescription handling and inventory with clinic-connected workflows.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/signIn"
                  className="inline-flex items-center px-7 py-3 bg-white text-orange-800 font-bold rounded-xl hover:bg-orange-50 transition-all transform hover:scale-105"
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

export default PharmacyPrescriptionManagement;
