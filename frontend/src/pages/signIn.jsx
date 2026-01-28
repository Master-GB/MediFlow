import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import FloatingShape from '../components/floatingShape.jsx';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let isValid = true;
    
    // Reset previous errors
    setEmailError('');
    setPasswordError('');
    
    // Validate email
    if (!formData.email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    
    // Validate password
    if (!formData.password) {
      setPasswordError('Password is required');
      isValid = false;
    }
    
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Don't proceed if validation fails
    }
    
    setIsLoading(true);
    
    try {
      // Replace with your actual API endpoint
      // const response = await axios.post('/api/auth/signin', formData);
      // Handle successful sign in
      toast.success('Successfully signed in!');
      // Redirect to dashboard or home
      // navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during sign in';
      toast.error(errorMessage);
      
      // Handle specific error cases if needed
      if (error.response?.status === 401) {
        setPasswordError('Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url("/src/assets/images/signIn-BG.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <FloatingShape className="absolute inset-0 pointer-events-none"/>
     {/* Logo */}
<div className="absolute top-0 left-1 -ml-7 z-10">
  <a href="/" className="flex items-center gap-2">
    <img 
      src="/src/assets/images/newLogo.png" 
      alt="MediFlow Logo" 
      className="h-25 w-auto" 
    />
    <span className="heading2 text-3xl text-white -ml-9">MediFlow</span>
  </a>
</div>
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
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden ">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Welcome Back</h1>
              <p className="text-white/70 text-lg font-medium">Sign in to your MediFlow account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      handleChange(e);
                      // Clear error when user starts typing
                      if (emailError) setEmailError('');
                    }}
                    onBlur={() => {
                      if (formData.email && !validateEmail(formData.email)) {
                        setEmailError('Please enter a valid email address');
                      } else {
                        setEmailError('');
                      }
                    }}
                    placeholder="Email address"
                    className={`block w-full pl-10 pr-3 py-3 border ${emailError ? 'border-red-500' : 'border-white/20'} rounded-2xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 outline-none backdrop-blur-sm mb-1`}
                    onInvalid={(e) => e.preventDefault()}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={(e) => {
                      handleChange(e);
                      // Clear error when user starts typing
                      if (passwordError) setPasswordError('');
                    }}
                    onBlur={() => {
                      if (!formData.password) {
                        setPasswordError('Password is required');
                      } else {
                        setPasswordError('');
                      }
                    }}
                    placeholder="Password"
                    className={`block w-full pl-10 pr-10 py-3 border ${passwordError ? 'border-red-500' : 'border-white/20'} rounded-2xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 outline-none backdrop-blur-sm`}
                    onInvalid={(e) => e.preventDefault()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-white/90">
                      Remember me
                    </label>
                  </div>
                  <a href="/forgot-password" className="font-medium text-white hover:text-white/80 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <motion.button
             
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full inline-flex justify-center py-2 px-4 border border-white rounded-xl shadow-sm  text-md font-bold text-black cursor-pointer hover:bg-white/80 bg-white    ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-white/80">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-white hover:text-white/80 hover:underline transition-colors group inline-flex items-center">
                Sign up
                <ArrowRight className="mt-1 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

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
    </div>
  );
};

export default SignIn;