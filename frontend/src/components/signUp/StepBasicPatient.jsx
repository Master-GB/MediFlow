import { User, Mail, Lock, ArrowLeft, ArrowRight, Shield, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';


const StepBasicPatient = ({ data, setData, next, back }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
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
        
        // Check if both password fields have values
        if (newData.password && newData.confirmPassword) {
            validatePasswords(newData.password, newData.confirmPassword);
        } else {
            // Clear error if one of the fields is empty
            setPasswordError('');
        }
    };

    const handleChange = (e) =>
        setData({ ...data, [e.target.name]: e.target.value });

    const isFormValid = data.name && data.email && data.password && data.confirmPassword && data.password === data.confirmPassword;

    const passwordRequirements = [
        { label: 'At least 8 characters', met: data.password?.length >= 8 },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(data.password) },
        { label: 'Contains lowercase letter', met: /[a-z]/.test(data.password) },
        { label: 'Contains number', met: /[0-9]/.test(data.password) }
    ];

    return (
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
                {/* Left Side - Blue Gradient */}
                <div className="hidden md:flex md:w-2/5 bg-linear-to-br from-blue-600 via-cyan-600 to-blue-700 p-6 md:p-8 lg:p-12 relative overflow-y-auto m-0">
                    

                    <div className="relative z-10 w-full h-full flex flex-col justify-center -mt-22">
                        <div className="flex items-center">
                            <a href="/" className={`flex items-center gap-2 -ml-16 text-white`}>
                                <img
                                    src="/src/assets/images/newLogo.png"
                                    alt="MediFlow Logo"
                                    className={`h-25 w-auto mt-0`}
                                />
                                <span className={`heading2 text-3xl mt-0  -ml-9 text-white`}>MediFlow</span>
                            </a>
                        </div>
                        <div className="space-y-8">                        
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                    <User className="w-4 h-4 text-white" />
                                    <span className="text-sm font-medium text-white">Patient Registration</span>
                                </div>
                                
                                <p className="text-blue-100 text-lg">
                                    Join thousands of patients managing their healthcare journey with ease
                                </p>
                            </div>

                            {/* Features List */}
                            <div className="space-y-4">
                                {[
                                    { icon: '🏥', title: 'Find Doctors Easily', desc: 'Search and book appointments instantly' },
                                    { icon: '📊', title: 'Health Tracking', desc: 'Monitor your health records in one place' },
                                    { icon: '🔒', title: 'Secure & Private', desc: 'Your data is encrypted and protected' }
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                        <div className="text-3xl">{feature.icon}</div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                                            <p className="text-sm text-blue-100">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Section */}
                <div className="w-full md:w-3/5 p-4 md:p-6 lg:p-8 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto m-0 flex justify-center">
                    <div className="w-full max-w-2xl px-2 sm:px-4 pt-4">

                        <div className="space-y-6 -mt-3">
                            {/* Form Header */}
                            <div className="space-y-2">
                                <h2 className="text-4xl font-bold text-white leading-tight">
                                    Create Your Account
                                </h2>
                                <p className="text-gray-400 text-sm">Please fill in your details to continue</p>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={data.firstName || ''}
                                            onChange={handleChange}
                                            placeholder="First Name"
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-all text-base"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={data.lastName || ''}
                                            onChange={handleChange}
                                            placeholder="Last Name"
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-all text-base"
                                        />
                                    </div>
                                </div>

                                <div className="relative group">
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
                                </div>

                                <div className="relative group">
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
                                </div>

                                <div className="relative group">
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
                                </div>

                                {/* Password Requirements */}
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

                            </div>

                            {/* Terms and Conditions with Sign In Link */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            name="terms"
                                            checked={data.terms || false}
                                            onChange={(e) => setData({ ...data, terms: e.target.checked })}
                                            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 shrink-0"
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
                                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0" />
                                    </a>
                                </div>
                            </div>
                            
                            {/* Horizontal Divider */}
                            <div className="border-t border-white/10 my-4"></div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
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
                                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${isFormValid
                                            ? 'bg-linear-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105'
                                            : 'bg-white/5 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <span>Continue</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

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
        input:autofill:focus {
          -webkit-text-fill-color: white !important;
          -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.02 inset !important;
          transition: background-color 5000s ease-in-out 0s;
          caret-color: white;
        }
      `}</style>
        </div>
    );
};

export default StepBasicPatient;