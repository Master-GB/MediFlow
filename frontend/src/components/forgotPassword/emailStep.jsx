import { motion, AnimatePresence } from 'framer-motion';
import { Mail, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const EmailStep = ({ email, setEmail, onNext, isLoading }) => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Update email validation when email changes
  useEffect(() => {
    setIsValidEmail(validateEmail(email));
  }, [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!isTouched) setIsTouched(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full z-20"
    >
      {/* Error Message - Top Right Corner */}
      <AnimatePresence>
        {isTouched && email && !isValidEmail && (
          <div className="fixed top-4 right-4 z-50">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-64"
            >
              <span>Please enter a valid email address</span>
              <button
                onClick={() => setIsTouched(false)}
                className="ml-4 text-white hover:text-gray-200 text-xl"
              >
                ×
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="text-left mb-8 -mt-25">
        <h2 className="text-5xl font-bold text-white mb-2">Reset <br/>Your Password</h2>
        <p className="text-white/70">Enter your email address and we'll send you a verification code</p>
      </div>

      <div className="space-y-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none ">
            <Mail className="h-5 w-5 text-blue-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => setIsTouched(true)}
            placeholder="Enter your email"
            className={`block w-full pl-9 pr-3 py-2 border-b-2 rounded-2xl text-white placeholder-blue-400 duration-200 outline-none ${
              isTouched && !isValidEmail && email ? 'border-red-500' : 'border-blue-500'
            }`}
          />
        </div>

        <div className="relative">
          <motion.button
            whileTap={isValidEmail ? { scale: 0.98 } : {}}
            onClick={onNext}
            disabled={isLoading || !isValidEmail}
            className={`w-full py-3 px-4 bg-blue-400 font-medium rounded-xl  transition-colors ${
              isValidEmail && !isLoading
                ? 'hover:bg-blue-300 cursor-pointer'
                : 'opacity-80 cursor-not-allowed bg-blue-400'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailStep;