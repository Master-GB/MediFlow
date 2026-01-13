// src/pages/ClinicSignupSuccess.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, Mail, Info, Home } from 'lucide-react';

const ClinicSignupSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-12 w-12 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Thank You for Trusting Us
            </h1>
            <p className="text-amber-100/90">
              Registration Under Review
            </p>
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-8"
          >
            {/* Status Card */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-700/30 rounded-xl p-6 mb-8 border border-amber-500/20"
            >
              <div className="flex items-start">
                <div className="bg-amber-500/10 p-3 rounded-lg mr-4">
                  <Info className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Your Registration is Being Processed
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Our team is currently reviewing your application. This process typically takes 24-48 hours.
                    You'll receive an email notification once your account is approved. You can then access our platform using your credentials.
                  </p>
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 mb-4">
                    <div className="text-sm text-slate-400">
                      <span>We'll contact you at: </span>
                      <span className="font-mono text-blue-300">{email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-slate-700/50 space-y-4"
            >
              <button
                onClick={() => navigate('/')}
                className="w-full bg-slate-700/50 hover:bg-slate-700/70 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center group"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </button>
              
              <div className="text-center">
                <p className="text-sm text-slate-400 mb-3">
                  Need help? Contact our support team
                </p>
                <a
                  href="mailto:verification@mediflow.com"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  <Mail className="h-4 w-4 mr-1.5" />
                  verification@mediflow.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            You'll receive an email notification once your account is approved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ClinicSignupSuccess;