// src/pages/forgotPassword/ForgotPassword.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import EmailStep from '../components/forgotPassword/emailStep.jsx';
import VerificationStep from '../components/forgotPassword/verificationStep.jsx';
import ResetPasswordStep from '../components/forgotPassword/resetPasswordStep.jsx';
import axios from 'axios';
import { useToast } from '../hooks/useToast.js';
import ToastContainer from '../contexts/ToastContainer.jsx';


// Key for localStorage
const FORGOT_PW_STEP_KEY = 'forgotPasswordStep';
const FORGOT_PW_EMAIL_KEY = 'forgotPasswordEmail';

const ForgotPassword = () => {
    const { toasts, removeToast, toastError,success, info } = useToast();
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
        '/src/assets/images/emailEnterStep.png', // Step 1: Email
        '/src/assets/images/verEnterStep.png', // Step 2: Verify
        '/src/assets/images/resetPassStep.png'  // Step 3: Reset
    ];

    const handleSendCode = async () => {
        if (!email) return;
        setIsLoading(true);
        try {

            const response = await axios.post('/api/auth/send-reset-otp', { email })

            if (response.data.success) {
                info('OTP is sending to your email..')
                setStep(2);
            } else {
                toastError('OTP sending failed:', response?.data?.message || 'OTP sending failed' );
            }

        } catch (error) {
            toastError(error.response?.data?.message || error.message || 'OTP sending failed');
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (code.length !== 6) {
            toastError('Please enter 6 digit OTP')
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post('/api/auth/verify-reset-otp', { email, code })

            if (response.data.success) {
                info('Email Verification successfull...');
                setStep(3);
            } else {
                toastError('Email Verification failed', response?.data?.message || 'Email Verification failed');
            }

        } catch (error) {
            toastError(error.response?.data?.message || error.message || 'Email verification sending failed');
        }
        finally {
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
        if (!newPassword || newPassword !== confirmPassword) {
            toastError('Password reset failed,missing details')
            return;
        }
        setIsLoading(true);
        try {

            const response = await axios.post('api/auth/reset-password', { email, newPassword })
            if (response.data.success) {
                localStorage.removeItem(FORGOT_PW_STEP_KEY);
                localStorage.removeItem(FORGOT_PW_EMAIL_KEY);
                // Redirect to sign in with success message
                navigate('/signin', { state: { passwordReset: true } });
            }else{
                toastError(response?.data?.message || 'Password reset failed')
            }

        }catch(error){
            toastError(error.response?.data?.message ||  'Password reset failed');
        }
         finally {
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
        <>
            <div className="min-h-screen  flex relative"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url("/src/assets/images/forgotPassBG.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'
                }}>
               

                {/* Background image for current step */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: `url("${stepImages[step - 1]}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />


                {/* Logo */}
                <div className="absolute top-8 left-8 z-20">
                    <a href="/" className="flex items-center -mt-8 -ml-15" onClick={() => {
                        // Clear the saved state when explicitly navigating away
                        localStorage.removeItem(FORGOT_PW_STEP_KEY);
                        localStorage.removeItem(FORGOT_PW_EMAIL_KEY);
                    }}>
                        <img
                            src="/src/assets/images/newLogo.png"
                            alt="MediFlow Logo"
                            className="h-25 w-auto"
                        />
                        <span className="heading2 text-3xl text-white transform -translate-x-7.5">MediFlow</span>
                    </a>
                </div>

                {/* Right side content - positioned on the right side of the full page */}
                <div className="w-full md:w-1/2 flex justify-center items-center min-h-screen relative ml-auto lg:mr-2">
                    {/* Close button */}
                    <Link
                        to="/signin"
                        className="absolute top-6 right-10 text-white hover:text-white/80 transition-colors"
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
                        className="w-full max-w-md z-20"
                    >
                        <AnimatePresence mode="wait">
                            {renderStep()}
                        </AnimatePresence>

                        <p className="mt-9 text-left text-sm text-white">
                            Remember your password?{' '}
                            <Link
                                to="/signin"
                                className="font-medium text-blue-400 hover:text-cyan-300 hover:underline transition-colors inline-flex items-center group"
                                onClick={() => {
                                    // Clear the saved state when explicitly navigating away
                                    localStorage.removeItem(FORGOT_PW_STEP_KEY);
                                    localStorage.removeItem(FORGOT_PW_EMAIL_KEY);
                                }}
                            >
                                Sign in
                                <ArrowRight className="mt-1 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
            <ToastContainer
                toasts={toasts}
                removeToast={removeToast}
            />
        </>
    );
};

export default ForgotPassword;