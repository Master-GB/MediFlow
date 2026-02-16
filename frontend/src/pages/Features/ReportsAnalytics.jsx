import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, Users, ClipboardList, ShieldCheck, ArrowRight, Check, TrendingUp, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNav from '../../components/landingPage/landingNav';
import LandingFooter from '../../components/landingPage/landingFooter';

const ReportsAnalytics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const highlights = [
    {
      icon: <LineChart className="w-6 h-6" />,
      title: 'Performance dashboards',
      description: 'Track appointments, outcomes, demand, and operational metrics.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Patient flow insights',
      description: 'Identify bottlenecks and improve waiting time and throughput.'
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: 'Operational reporting',
      description: 'Generate reports for management decisions and compliance needs.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Secure access',
      description: 'Role-based visibility so the right people see the right data.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Capture activity',
      description: 'Appointments, prescriptions, and operations generate structured data.'
    },
    {
      number: '02',
      title: 'Visualize metrics',
      description: 'Dashboards show trends, demand, and performance indicators.'
    },
    {
      number: '03',
      title: 'Spot improvements',
      description: 'Identify what’s working and what needs adjustment.'
    },
    {
      number: '04',
      title: 'Decide & optimize',
      description: 'Make data-driven changes and track the impact over time.'
    }
  ];

  const benefits = [
    'Better decisions using real operational data',
    'Increased efficiency through bottleneck detection',
    'Improved staff allocation and scheduling strategy',
    'Clearer growth measurement and ROI visibility',
    'Stronger compliance readiness with reporting trails'
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 to-emerald-50">
      <LandingNav />

      <section
        className="relative overflow-hidden bg-linear-to-br from-pink-700 via-fuchsia-700 to-slate-900 text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(/src/assets/images/report.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-16 left-10 w-72 h-72 bg-pink-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-10 w-96 h-96 bg-fuchsia-400/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-5">Data That Helps Clinics Grow</h1>
            <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto mb-8">
              Turn daily operations into actionable insights for better performance and patient outcomes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/howItWork-clinic"
                className="inline-flex items-center px-8 py-4 bg-white text-fuchsia-800 font-bold rounded-xl hover:bg-pink-50 transition-all transform hover:scale-105 shadow-lg"
              >
                For Clinics
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/pricing-page"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-15 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-24 w-80 h-80 bg-pink-300/45 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-fuchsia-300/40 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-700/10 border border-fuchsia-700/15 text-fuchsia-800 font-semibold">
                <BarChart3 className="w-4 h-4" />
                Clinic insights
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mt-4">See what matters</h2>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Dashboards and reports designed for real clinic decisions.
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
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-pink-700/10 via-fuchsia-700/10 to-slate-900/10 border border-fuchsia-700/15 flex items-center justify-center text-fuchsia-800">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-lg font-bold text-gray-900">{item.title}</div>
                          <div className="text-gray-600 mt-2 leading-relaxed">{item.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-linear-to-r from-transparent via-fuchsia-600/25 to-transparent" />
                    <div className="px-7 py-5 text-sm text-gray-500">Turn operational data into measurable improvements.</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 grid lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <TrendingUp className="w-5 h-5" />,
                    title: 'Trend visibility',
                    text: 'Track performance over time and measure the impact of improvements.'
                  },
                  {
                    icon: <Building2 className="w-5 h-5" />,
                    title: 'Clinic-level insights',
                    text: 'Make better decisions on staffing, scheduling, and services.'
                  },
                  {
                    icon: <ShieldCheck className="w-5 h-5" />,
                    title: 'Secure access',
                    text: 'Sensitive metrics are visible only to authorized roles.'
                  }
                ].map((c, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    className="rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-md p-7 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-3 text-fuchsia-800">
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From daily activity to actionable insights.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-gray-200/70 bg-linear-to-br from-pink-50 via-white to-fuchsia-50 p-8 shadow-lg">
              <div className="text-gray-900 font-bold text-xl">From activity to decisions</div>
              <div className="text-gray-600 mt-2">A simple analytics pipeline your team can trust.</div>
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
                      <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-pink-700 to-fuchsia-700 text-white font-extrabold flex items-center justify-center shadow-md">
                        {step.number}
                      </div>
                      {idx < steps.length - 1 && <div className="w-px flex-1 bg-linear-to-b from-fuchsia-600/35 to-transparent mt-3" />}
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
              <div className="text-gray-600 mt-2">Make improvements you can measure.</div>
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
                      <Check className="w-5 h-5 text-fuchsia-800 shrink-0 mt-0.5" />
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
          <div className="bg-linear-to-br from-pink-700 via-fuchsia-700 to-slate-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-3">Use reports to improve outcomes</h3>
                <p className="text-white/90 text-lg max-w-2xl">
                  Transform clinic operations with data-driven decisions and clear visibility.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/pricing-page"
                  className="inline-flex items-center px-7 py-3 bg-white text-fuchsia-800 font-bold rounded-xl hover:bg-pink-50 transition-all transform hover:scale-105"
                >
                  View Pricing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center px-7 py-3 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                >
                  Request a Demo
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

export default ReportsAnalytics;
