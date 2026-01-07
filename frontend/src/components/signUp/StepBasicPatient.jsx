import { User, Mail, Lock, ArrowLeft, ArrowRight, Shield, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.01,  // Minimal stagger for immediate appearance
      delayChildren: 0,       // No initial delay
      duration: 0.2,         // Shorter duration for container
      ease: "easeOut"        // Smoother easing
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 3 },  // Minimal initial movement
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',           // Using tween for more direct control
      duration: 0.2,           // Very short duration
      ease: 'easeOut'          // Smooth easing
    }
  }
};

const StepBasicPatient = ({ data, setData, next, back }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const canvasRef = useRef(null);

    // Wave animation effect
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas size
        const resizeCanvas = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        // Initial resize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Wave parameters
        let time = 0;
        const wave = {
            y: 0.8,
            length: 0.01,
            amplitude: 20,
            frequency: 0.01
        };

        const colors = [
            { r: 59, g: 130, b: 246, a: 0.8 },  // blue-500
            { r: 6, g: 182, b: 212, a: 0.6 },   // cyan-400
            { r: 139, g: 92, b: 246, a: 0.4 }   // purple-500
        ];

        const animate = () => {
            if (!ctx) return;

            // Clear with transparent background
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.03;

            // Draw multiple waves
            colors.forEach((color, index) => {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height);

                // Calculate wave y position based on canvas height
                const waveY = canvas.height * wave.y - (index * 10);

                // Draw wave
                for (let x = 0; x < canvas.width; x++) {
                    const y = Math.sin(x * wave.length + time + (index * 2)) *
                        (wave.amplitude * (index + 1) / 2) *
                        Math.sin(time * 0.5) +
                        waveY;

                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                // Complete the wave shape
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();

                // Create gradient
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.5})`);
                gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.fill();
            });

            // Add some particles
            for (let i = 0; i < 5; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 2 + 1;
                const alpha = Math.random() * 0.3 + 0.1;

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // Start the animation
        const startAnimation = () => {
            if (!animationFrameId) {
                animate();
            }
        };

        // Start the animation after a short delay
        const animationStartTimeout = setTimeout(startAnimation, 100);

        // Cleanup
        return () => {
            clearTimeout(animationStartTimeout);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setData({ ...data, email });

        if (email && !validateEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const validatePasswords = (password, confirmPassword) => {
        if (password && confirmPassword && password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...data, [name]: value };
        setData(newData);

        if (newData.password && newData.confirmPassword) {
            validatePasswords(newData.password, newData.confirmPassword);
        } else {
            setPasswordError('');
        }
    };

    const handleChange = (e) =>
        setData({ ...data, [e.target.name]: e.target.value });

    const isFormValid =
        data.firstName &&
        data.lastName &&
        data.email &&
        validateEmail(data.email) &&
        data.password &&
        data.password.length >= 8 &&
        /[A-Z]/.test(data.password) &&
        /[a-z]/.test(data.password) &&
        /[0-9]/.test(data.password) &&
        data.confirmPassword &&
        data.password === data.confirmPassword &&
        data.terms;

    const passwordRequirements = [
        { label: 'At least 8 characters', met: data.password?.length >= 8 },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(data.password) },
        { label: 'Contains lowercase letter', met: /[a-z]/.test(data.password) },
        { label: 'Contains number', met: /[0-9]/.test(data.password) }
    ];

    return (
        <>
            <div className="min-h-screen w-screen overflow-x-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Error Messages */}
                {(emailError || passwordError) && (
                    <div className="fixed top-4 right-4 z-50 space-y-2">
                        {emailError && (
                            <div className="bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-64">
                                <span>{emailError}</span>
                                <button
                                    onClick={() => setEmailError('')}
                                    className="ml-4 text-white hover:text-gray-200"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        {passwordError && (
                            <div className="bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-64">
                                <span>{passwordError}</span>
                                <button
                                    onClick={() => setPasswordError('')}
                                    className="ml-4 text-white hover:text-gray-200"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Main Content Card */}
                <div className="w-full flex flex-col md:flex-row m-0 p-0 h-screen">
                    {/* Left Side with Background and Animation */}
                    <div className="hidden md:flex md:w-2/5 relative overflow-hidden m-0">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 w-full h-full"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("/src/assets/images/signUp.jpg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                zIndex: 0
                            }}
                        />

                        {/* Canvas for wave animation */}
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 w-full h-full"
                            style={{
                                mixBlendMode: 'screen',
                                opacity: 1,
                                zIndex: 1
                            }}
                        />

                        {/* Content */}
                        <div className="relative z-10 w-full h-full flex flex-col p-6 md:p-8 lg:p-12">
                            <div className="w-full flex justify-center">
                                <a  className="flex items-center text-white mb-12 -mt-12 mr-128">
                                    <img
                                        src="/src/assets/images/newLogo.png"
                                        alt="MediFlow Logo"
                                        className="h-25 w-auto"
                                    />
                                    <span className="heading2 text-3xl text-white transform -translate-x-7.5">MediFlow</span>
                                </a>
                            </div>

                            <div className="flex-1 flex flex-col justify-center items-center text-center px-4 mt-50">
                                <div className="w-full max-w-2xl">
                                    <h2 className="text-4xl font-semibold text-white mb-6">Your Health, Our Priority</h2>
                                    <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                        Join thousands of patients who trust MediFlow for seamless healthcare management.
                                        Experience the future of medical care with our secure, easy-to-use platform.
                                    </p>
                                </div>

                                <div className="w-full">
                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-600"></div>
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="px-4 bg-slate-800 text-gray-300 text-sm">GET CONNECTED WITH</span>
                                        </div>
                                    </div>

                                    <motion.div className="grid grid-cols-3 gap-4" variants={itemVariants}>
                                        <a
                                            href="https://accounts.google.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-center p-2 bg-white/10 hover:bg-[#DB4437]/10 rounded-xl transition-all duration-200 hover:shadow-[0_0_0_2px_rgba(219,68,55,0.3)]"
                                        >
                                            <FaGoogle className="w-6 h-6 text-[#DB4437] group-hover:drop-shadow-[0_0_8px_rgba(219,68,55,0.6)] transition-all duration-200" />
                                        </a>
                                        <a
                                            href="https://www.facebook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-center p-2 bg-white/10 hover:bg-[#4267B2]/10 rounded-xl transition-all duration-200 hover:shadow-[0_0_0_2px_rgba(66,103,178,0.3)]"
                                        >
                                            <FaFacebookF className="w-6 h-6 text-[#4267B2] group-hover:drop-shadow-[0_0_8px_rgba(66,103,178,0.6)] transition-all duration-200" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-center p-2 bg-white/10 hover:bg-[#0077B5]/10 rounded-xl transition-all duration-200 hover:shadow-[0_0_0_2px_rgba(0,119,181,0.3)]"
                                        >
                                            <FaLinkedinIn className="w-6 h-6 text-[#0077B5] group-hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.6)] transition-all duration-200" />
                                        </a>
                                    </motion.div>
                                </div>

                                <div className="mt-15 w-full flex justify-center">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-green-500 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <div className="w-16 h-0.5 bg-blue-500 mx-2"></div>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-blue-500 text-white">
                                            2
                                        </div>
                                        <div className="w-16 h-0.5 bg-white/20 mx-2"></div>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-white/10 text-gray-400">
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form Section */}
                    <div className="w-full md:w-3/5 p-4 md:p-6 lg:p-8 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto m-0 flex justify-center">
                        <motion.div 
                          className="w-full max-w-2xl px-2 sm:px-4 pt-4"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                            <motion.div className="space-y-6 -mt-3" variants={containerVariants}>
                                <motion.div className="space-y-2 -ml-15" variants={itemVariants}>
                                    <motion.h2 className="text-4xl font-bold text-white leading-tight" variants={itemVariants}>
                                        Create Patient Account
                                    </motion.h2>
                                    <motion.p className="text-gray-400 text-sm" variants={itemVariants}>Please fill this details to continue</motion.p>
                                </motion.div>

                                <motion.div className="space-y-5" variants={containerVariants}>
                                    <motion.div className="grid grid-cols-2 gap-8" variants={itemVariants}>
                                        <motion.div className="relative group" variants={itemVariants}>
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 group-focus-within:text-blue-400 transition-colors">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={data.firstName || ''}
                                                onChange={handleChange}
                                                placeholder="First Name"
                                                className="w-full pl-16 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-all text-base"
                                            />
                                        </motion.div>
                                        <motion.div className="relative group" variants={itemVariants}>
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 group-focus-within:text-blue-400 transition-colors">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={data.lastName || ''}
                                                onChange={handleChange}
                                                placeholder="Last Name"
                                                className="w-full pl-16 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-all text-base"
                                            />
                                        </motion.div>
                                    </motion.div>

                                    <motion.div className="relative group" variants={itemVariants}>
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 group-focus-within:text-blue-400 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email || ''}
                                            onChange={handleEmailChange}
                                            onBlur={(e) => {
                                                if (e.target.value && !validateEmail(e.target.value)) {
                                                    setEmailError('Please enter a valid email address');
                                                } else {
                                                    setEmailError('');
                                                }
                                            }}
                                            placeholder="Email Address"
                                            className={`w-full pl-16 pr-6 py-4 bg-white/5 border ${emailError ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-all text-base`}
                                        />
                                    </motion.div>

                                    <motion.div className="relative group" variants={itemVariants}>
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 group-focus-within:text-blue-400 transition-colors">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password || ''}
                                            onChange={handlePasswordChange}
                                            onBlur={() => {
                                                if (data.password && data.confirmPassword) {
                                                    validatePasswords(data.password, data.confirmPassword);
                                                }
                                            }}
                                            placeholder="Password"
                                            className="w-full pl-16 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-all text-base"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </motion.div>

                                    <motion.div className="relative group" variants={itemVariants}>
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 group-focus-within:text-blue-400 transition-colors">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={data.confirmPassword || ''}
                                            onChange={handlePasswordChange}
                                            onBlur={() => {
                                                if (data.password && data.confirmPassword) {
                                                    validatePasswords(data.password, data.confirmPassword);
                                                }
                                            }}
                                            placeholder="Confirm Password"
                                            className="w-full pl-16 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-all text-base"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </motion.div>

                                    {data.password && (
                                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                                            <p className="text-xs font-medium text-gray-300 mb-2">Password Requirements:</p>
                                            {passwordRequirements.map((req, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-500' : 'bg-gray-600'}`}>
                                                        {req.met && <CheckCircle2 className="w-3 h-3 text-white" />}
                                                    </div>
                                                    <span className={`text-xs ${req.met ? 'text-green-400' : 'text-gray-400'}`}>{req.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start space-x-3">
                                                <input
                                                    type="checkbox"
                                                    id="terms"
                                                    name="terms"
                                                    checked={data.terms || false}
                                                    onChange={(e) => setData({ ...data, terms: e.target.checked })}
                                                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-offset-0 shrink-0"
                                                />
                                                <label htmlFor="terms" className="text-sm text-gray-400">
                                                    I agree to the <a href="/terms" className="text-blue-400 hover:text-cyan-300 hover:underline">Terms & Conditions</a> and <a href="/privacy" className="text-blue-400 hover:text-cyan-300 hover:underline">Privacy Policy</a>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-400 whitespace-nowrap">
                                            <span>Already have an account? </span>
                                            <a href="/signin" className="ml-1 text-blue-400 hover:text-cyan-300 hover:underline font-medium flex items-center gap-1 group">
                                                Sign In
                                                <ArrowRight className="w-3.5 h-3.5 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 my-4"></div>

                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                                        <button
                                            onClick={back}
                                            className="flex items-center gap-2 px-5 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                            <span>Back</span>
                                        </button>

                                        <button
                                            onClick={next}
                                            disabled={!isFormValid}
                                            className={`group px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${isFormValid
                                                    ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer'
                                                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            <span>Continue</span>
                                            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style>{`
                /* Fix for autofill styles */
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-text-fill-color: white !important;
        -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.02) inset !important;
        transition: background-color 5000s ease-in-out 0s;
        caret-color: white;
    }
    /* For Firefox */
    input:autofill,
    input:autofill:hover,
    input:autofill:focus,
    input:autofill:active {
        -webkit-text-fill-color: white !important;
        -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.02) inset !important;
        transition: background-color 5000s ease-in-out 0s;
        caret-color: white;
            `}</style>
        </>
    );
};

export default StepBasicPatient;