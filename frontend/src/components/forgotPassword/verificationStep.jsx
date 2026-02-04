import { motion } from 'framer-motion';
import { KeyRound, ArrowLeft, RotateCw, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../hooks/useToast.js';
import ToastContainer from '../../contexts/ToastContainer.jsx';

// Key for localStorage
const VERIFICATION_TIMESTAMP_KEY = 'verificationTimestamp';
const VERIFICATION_DURATION = 180; // 3 minutes in seconds

const VerificationStep = ({ code, setCode, onVerify, onResend, isLoading, email, onBack }) => {
  const { toastError, info, toasts, removeToast } = useToast();
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(() => {
    // Check if we have a saved timestamp
    const savedTimestamp = localStorage.getItem(VERIFICATION_TIMESTAMP_KEY);
    if (!savedTimestamp) return VERIFICATION_DURATION;

    const timeElapsed = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
    const remainingTime = VERIFICATION_DURATION - timeElapsed;

    // If time is up or invalid, return to full duration
    return remainingTime > 0 ? remainingTime : VERIFICATION_DURATION;
  });

  const maskEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    if (!username || !domain) return email;

    // Show first 3 characters, then asterisks, then @domain
    const visiblePart = username.substring(0, 3);
    return `${visiblePart}${'*'.repeat(Math.max(0, username.length - 3))}@${domain}`;
  };

  // Handle resend code
  const handleResendClick = async () => {
    if (isResending) return;

    setIsResending(true);
    try {
      if (onResend) {
        await onResend();
      }

      const response = await axios.post('/api/auth/send-reset-otp', { email });

      if (response.data.success) {
        info('OTP is Resending to your email..')
        console.log("OTP is Resending to your email..");
        // Save the current timestamp when resending
        const now = Date.now();
        localStorage.setItem(VERIFICATION_TIMESTAMP_KEY, now.toString());
        setCountdown(VERIFICATION_DURATION);
      } else {
        toastError(response.data.message || 'OTP sending failed');
      }
    } catch (error) {
      toastError(error.response?.data?.message || error.message || 'OTP sending failed');
    }
    finally {
      setIsResending(false);
    }
  };

  // Countdown effect
  useEffect(() => {
    // Save the initial timestamp if not already set
    if (!localStorage.getItem(VERIFICATION_TIMESTAMP_KEY)) {
      localStorage.setItem(VERIFICATION_TIMESTAMP_KEY, Date.now().toString());
    }

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => {
          const newCount = prev - 1;

          // If time's up, clean up the timestamp
          if (newCount <= 0) {
            localStorage.removeItem(VERIFICATION_TIMESTAMP_KEY);
          }

          return newCount;
        });
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Clean up when countdown reaches 0
      localStorage.removeItem(VERIFICATION_TIMESTAMP_KEY);
    }
  }, [countdown]);

  const handleBack = () => {
    // Clear the timestamp when going back
    localStorage.removeItem(VERIFICATION_TIMESTAMP_KEY);
    if (onBack) {
      onBack();
    }
  };

  // Clean up the timestamp when component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem(VERIFICATION_TIMESTAMP_KEY);
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full"
      >
        <div className="text-left mb-8">
          <h2 className="text-5xl font-bold text-white mb-2">Verify <br />Your Email</h2>
          <p className="text-white/70">We've sent a 6-digit code to {email ? maskEmail(email) : 'your email'}</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound className="h-5 w-5 text-black" />
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setCode(value);
              }}
              placeholder="Enter 6-digit code"
              className="block w-full  pr-3 py-3 text-center bg-blue-200 border border-blue-400 rounded-2xl text-black placeholder-black/70 focus:ring-3 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none  text-xl tracking-widest"
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleResendClick}
              disabled={isResending}
              className="text-sm  text-blue-400 hover:text-blue-500 hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
            <span className={`text-sm ${countdown <= 30 ? 'text-red-500 font-medium animate-pulse' : 'text-blue-400'}`}>
              {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 py-3 px-4 border border-gray-400 text-white font-medium rounded-xl hover:bg-black/20 cursor-pointer transition-colors flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <ArrowLeft className="h-4 w-4" />
              Change Email
            </button>
            <motion.button
              type="button"
              whileTap={code.length === 6 && !isLoading ? { scale: 0.98 } : {}}
              onClick={onVerify}
              disabled={isLoading || code.length !== 6}
              className={`flex-1 py-3 px-4 bg-blue-400 text-black font-medium rounded-xl transition-colors ${code.length === 6 && !isLoading
                  ? 'hover:bg-blue-300 cursor-pointer'
                  : 'opacity-70 cursor-not-allowed hover:bg-blue-400'
                }`}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </motion.button>
          </div>
        </div>
      </motion.div>
      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
      />
    </>
  );
};

export default VerificationStep;