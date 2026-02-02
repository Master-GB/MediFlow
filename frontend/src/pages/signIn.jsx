import { useState, useRef, useEffect } from 'react';
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
    <div className="w-full flex flex-col md:flex-row m-0 p-0 h-screen">
      {/* Left Side - Sign In Card */}
      <div className="w-full md:w-2/5 p-4 md:p-6 lg:p-8 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto m-0 flex justify-center items-center">
        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <a href="/" className="flex items-center -mt-8 -ml-15">
            <img 
              src="/src/assets/images/newLogo.png" 
              alt="MediFlow Logo" 
              className="h-25 w-auto" 
            />
            <span className="heading2 text-3xl text-white transform -translate-x-7.5">MediFlow</span>
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
          className="w-11/12 max-w-2xl px-2 sm:px-4"
        >
          <div className="space-y-6 -mt-3">
            <div className="space-y-2 ">
              <h2 className="text-4xl font-bold text-white leading-tight">Sign In to Your Account</h2>
              <p className="text-gray-400 text-sm">Please enter your credentials to log in</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-5">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 group-focus-within:text-blue-400 transition-colors">
                    <Mail className="mb-2 w-5 h-5" />
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
                    placeholder="Email Address"
                    className={`w-full pl-16 pr-6 py-4 mb-2 bg-white/5 border ${emailError ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-all text-base`}
                    onInvalid={(e) => e.preventDefault()}
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 group-focus-within:text-blue-400 transition-colors">
                    <Lock className="w-5 h-5" />
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
                    className={`w-full pl-16 pr-12 py-4 bg-white/5 border ${passwordError ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/5 transition-all text-base`}
                    onInvalid={(e) => e.preventDefault()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/20 bg-white/5 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-offset-0 shrink-0"
                    />
                    <label htmlFor="remember-me" className="text-sm text-gray-400">
                      Remember me
                    </label>
                  </div>
                  <a href="/forgot-password" className="text-sm text-blue-400 hover:text-cyan-300 hover:underline font-medium">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="border-t border-white/10 my-4"></div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`group w-full px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${!isLoading
                    ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
                <ArrowRight className={`mt-1 w-5 h-5 transition-transform duration-300 ${!isLoading ? 'group-hover:translate-x-1' : ''}`} />
              </motion.button>

              <p className="mt-6 text- text-sm text-white/80">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-400 hover:text-cyan-300  hover:underline transition-colors group inline-flex items-center">
                  Sign up
                  <ArrowRight className="mt-1 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              </p>
            </form>
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
          }
        `}</style>
      </div>

      {/* Right Side with Background Image */}
      <div className="hidden md:flex md:w-3/5 relative overflow-hidden m-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url("/src/assets/images/signInBG.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Floating Shape Animation */}
        <FloatingShape className="absolute inset-0 pointer-events-none"/>

        {/* Canvas for wave animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            mixBlendMode: 'screen',
            opacity: 0.6
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col p-6 md:p-8 lg:p-12 justify-center items-center text-center">
          <div className="w-full max-w-2xl">
            <motion.p 
              className='text-white/50 sub text-2xl font-normal mt-45'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Nice to see you again
            </motion.p>
            <motion.h2 
              className="text-8xl font-medium text-white mb-6 heading3 uppercase -mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Welcome Back to
              <span className="block -mt-6">MediFlow</span>
            </motion.h2>
          
            <motion.div 
              className="w-full pt-35"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-blue-100 text-md leading-relaxed">
                Access your personalized healthcare dashboard and manage your medical journey with ease.
              </p>
            
              <motion.div 
                className="relative my-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-slate-800 text-gray-300 text-sm">SECURE ACCESS</span>
                </div>
              </motion.div>

              <motion.div 
                className="flex justify-center space-x-16 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center space-x-2 text-white/80">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-green-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-sm">Secure Login</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-blue-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <span className="text-sm">Protected Data</span>
                </div>
              </motion.div>

      

              {/* Stats Section */}
              <motion.div 
                className="grid grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-xs text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white ml-2">50+</div>
                  <div className="text-xs text-gray-400">Clinics</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs text-gray-400">Support</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;