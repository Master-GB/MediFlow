import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, RotateCw, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LandingNav from '../components/landingPage/landingNav';

const VerificationCode = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countdown, setCountdown] = useState(180);
    const [isResent, setIsResent] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    const maskEmail = (email) => {
        if (!email) return '';
        const [username, domain] = email.split('@');
        if (!username || !domain) return email;

        // Show first 3 characters, then asterisks, then @domain
        const visiblePart = username.substring(0, 3);
        return `${visiblePart}${'*'.repeat(Math.max(0, username.length - 3))}@${domain}`;
    };

    // Handle code input changes
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1); // Only take the last character
        setCode(newCode);

        // Move to next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6);
        const newCode = [...code];
        pasteData.split('').forEach((char, i) => {
            if (i < 6) newCode[i] = char;
        });
        setCode(newCode);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            // Navigate to success or next page
            // navigate('/success');
        }, 1500);
    };

    // Handle resend code
    const handleResend = () => {
        if (countdown > 0) return;
        setCountdown(180);
        setIsResent(true);
        // Here you would typically call your API to resend the code
        setTimeout(() => setIsResent(false), 3000);
    };

    // Countdown effect
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    return (

        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <LandingNav />
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="src/assets/images/otpBGN.jpg"
                    alt="Medical background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-110 bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
            >
                {/* Header */}
                <div className="py-6 pt-18 text-black text-center ">
                    <div className="mt-4">
                        <h1 className="text-2xl font-bold">Verify Your Account</h1>
                        <p className="text-gray-600 text-sm mt-2  ">
                            Enter OTP Code sent to{' '}
                            <span className="text-blue-600 text-sm ml-1">
                                {email ? maskEmail(email) : 'your email'}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-6">
                        {/* Verification Code Inputs */}
                        <div className="flex justify-between space-x-2">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onPaste={handlePaste}
                                    className="w-12 h-14 text-center text-2xl font-semibold border bg-blue-100 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    disabled={isSubmitting}
                                />
                            ))}
                        </div>

                        {/* Resend Code */}
                        <div className="text-center">
                            {countdown > 0 ? (
                                <p className="text-sm text-gray-500">
                                    Expire code in <span className={`text-sm ${countdown <= 20 ? 'text-red-500 font-medium animate-pulse' : 'text-blue-600'}`}>{Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</span>
                                </p>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={isResent}
                                    className={`flex items-center justify-center w-full text-sm font-medium  cursor-pointer ${isResent ? 'text-green-600' : 'text-blue-600 hover:text-blue-700'
                                        } transition-colors`}
                                >
                                    {isResent ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Code resent successfully!
                                        </>
                                    ) : (
                                        <>
                                            <RotateCw className="w-4 h-4 mr-1" />
                                            Resend Verification Code
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting || code.some(digit => !digit)}
                            className={`w-full py-3 px-4 rounded-lg font-medium mb-4  text-white ${isSubmitting || code.some(digit => !digit)
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                                } transition-colors`}
                        >
                            {isSubmitting ? 'Verifying...' : 'Verify Account'}
                        </motion.button>
                    </div>
                    <p className="text-xs text-gray-500 pt-2 mb-12">
                        Didn't receive OTP code? Check your spam folder or{' '}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isResent || countdown > 0}
                            className="text-blue-600 hover:underline focus:outline-none disabled:opacity-80 cursor-pointer"
                        >
                            request a new one
                        </button>
                    </p>
                </form>
            </motion.div>

        </div>
    );
};

export default VerificationCode;