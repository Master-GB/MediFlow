// src/pages/forgotPassword/ForgotPassword.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import EmailStep from '../components/forgotPassword/emailStep.jsx';
import VerificationStep from '../components/forgotPassword/verificationStep.jsx';
import ResetPasswordStep from '../components/forgotPassword/resetPasswordStep.jsx';

// Key for localStorage
const FORGOT_PW_STEP_KEY = 'forgotPasswordStep';
const FORGOT_PW_EMAIL_KEY = 'forgotPasswordEmail';

const ForgotPassword = () => {
    // Initialize state with saved step or default to 1
    const [step, setStep] = useState(() => {
        const savedStep = localStorage.getItem(FORGOT_PW_STEP_KEY);
        return savedStep ? parseInt(savedStep, 10) : 1;
    });

    // Initialize email with saved email or empty string
    const [email, setEmail] = useState(() => {
        return localStorage.getItem(FORGOT_PW_EMAIL_KEY) || '';
    });

    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Save step to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(FORGOT_PW_STEP_KEY, step.toString());
    }, [step]);

    // Save email to localStorage whenever it changes
    useEffect(() => {
        if (email) {
            localStorage.setItem(FORGOT_PW_EMAIL_KEY, email);
        }
    }, [email]);

    // Clean up localStorage when component unmounts or when flow is complete
    useEffect(() => {
        return () => {
            // Only clean up if we're not in the middle of the flow
            if (step === 3) {
                localStorage.removeItem(FORGOT_PW_STEP_KEY);
                localStorage.removeItem(FORGOT_PW_EMAIL_KEY);
            }
        };
    }, [step]);

    // Image paths for each step
    const stepImages = [
        '/src/assets/images/11111.png', // Step 1: Email
        '/src/assets/images/22222.png', // Step 2: Verify
        '/src/assets/images/33333.png'  // Step 3: Reset
    ];

    const handleSendCode = async () => {
        if (!email) return;
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStep(2);
            // Save email to localStorage when moving to next step
            localStorage.setItem(FORGOT_PW_EMAIL_KEY, email);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (code.length !== 6) return;
        setIsLoading(true);
        try {
            // Simulate API verification
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStep(3);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        // No need to set loading state here, it's handled in the component
        await new Promise(resolve => setTimeout(resolve, 1000));
        // You might want to reset the timer here if you have one
        // resetTimer();
    };

    const handleResetPassword = async () => {
        if (!newPassword || newPassword !== confirmPassword) return;
        setIsLoading(true);
        try {
            // Simulate password reset
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Clear saved state since we're done
            localStorage.removeItem(FORGOT_PW_STEP_KEY);
            localStorage.removeItem(FORGOT_PW_EMAIL_KEY);
            // Redirect to sign in with success message
            navigate('/signin', { state: { passwordReset: true } });
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <EmailStep
                        email={email}
                        setEmail={setEmail}
                        onNext={handleSendCode}
                        isLoading={isLoading}
                    />
                );
            case 2:
                return (
                    <VerificationStep
                        code={code}
                        setCode={setCode}
                        onVerify={handleVerifyCode}
                        onResend={handleResendCode}
                        onBack={() => setStep(1)} // Add back navigation
                        isLoading={isLoading}
                        email={email}
                    />
                );
            case 3:
                return (
                    <ResetPasswordStep
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        onReset={handleResetPassword}
                        isLoading={isLoading}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#d9e9fc] flex relative">
            {/* Logo */}
            <div className="absolute top-0 left-0 z-20 p-4">
                <Link
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => {
                        // Clear the saved state when explicitly navigating away
                        localStorage.removeItem(FORGOT_PW_STEP_KEY);
                        localStorage.removeItem(FORGOT_PW_EMAIL_KEY);
                    }}
                >
                    <img
                        src="/src/assets/images/logoBlack.png"
                        alt="MediFlow Logo"
                        className="h-16 w-auto"
                    />
                    <span className="heading2 text-3xl text-black">MediFlow</span>
                </Link>
            </div>

            {/* Left side image */}
            <div className="hidden md:flex w-full h-screen overflow-hidden -ml-85 ">
                <img
                    src={stepImages[step - 1]}
                    alt="Forgot Password"
                    className="w-full h-full mt-8  object-cover transform origin-left scale-110 md:scale-130 transition-transform duration-300"
                />
            </div>

            {/* Right side content */}
            <div className="w-full md:w-1/2 flex justify-center items-center  relative mr-20">
                {/* Close button */}
                <Link
                    to="/signin"
                    className="absolute top-6 right-6 text-red-600 hover:text-red-700 transition-colors z-20"
                    onClick={() => {
                        // Clear the saved state when explicitly navigating away
                        localStorage.removeItem(FORGOT_PW_STEP_KEY);
                        localStorage.removeItem(FORGOT_PW_EMAIL_KEY);
                    }}
                >
                    <X className="h-10 w-10" />
                </Link>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md z-10 text-black"
                >
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>

                    <p className="mt-9 text-left text-sm">
                        Remember your password?{' '}
                        <Link
                            to="/signin"
                            className="font-medium text-blue-500 hover:text-blue-600 hover:underline transition-colors inline-flex items-center group"
                        >
                            Sign in
                            <ArrowRight className="mt-1 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default ForgotPassword;