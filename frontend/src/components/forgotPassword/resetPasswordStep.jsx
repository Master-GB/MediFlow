import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const ResetPasswordStep = ({ newPassword, setNewPassword, confirmPassword, setConfirmPassword, onReset, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUppercase: false,
    hasLowercase: false,
    passwordsMatch: false
  });

  useEffect(() => {
    // Check password requirements
    setRequirements({
      minLength: newPassword.length >= 8,
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      passwordsMatch: newPassword === confirmPassword && newPassword.length > 0
    });
  }, [newPassword, confirmPassword]);

  const allRequirementsMet = Object.values(requirements).every(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <div className="text-left mb-6">
        <h2 className="text-5xl font-bold text-white mb-2">Create <br/> New Password</h2>
        <p className="text-white/80 mb-4">Create a strong and secure password</p>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-2">
          {/* Row 1 */}
          <div className="flex items-center">
            {requirements.minLength ? (
              <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2 shrink-0" />
            )}
            <span className={`text-sm ${requirements.minLength ? 'text-green-600' : 'text-white/60'}`}>
              At least 8 characters long
            </span>
          </div>
          <div className="flex items-center">
            {requirements.hasNumber ? (
              <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2 shrink-0" />
            )}
            <span className={`text-sm ${requirements.hasNumber ? 'text-green-600' : 'text-white/60'}`}>
              At least one number
            </span>
          </div>
          
          {/* Row 2 */}
          <div className="flex items-center">
            {requirements.hasUppercase ? (
              <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2 shrink-0" />
            )}
            <span className={`text-sm ${requirements.hasUppercase ? 'text-green-600' : 'text-white/60'}`}>
              At least one uppercase letter
            </span>
          </div>
          <div className="flex items-center">
            {requirements.hasLowercase ? (
              <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2 shrink-0" />
            )}
            <span className={`text-sm ${requirements.hasLowercase ? 'text-green-600' : 'text-white/60'}`}>
              At least one lowercase letter
            </span>
          </div>
          
          {/* Row 3 */}
          <div className="flex items-center">
            {requirements.hasSpecialChar ? (
              <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2 shrink-0" />
            )}
            <span className={`text-sm ${requirements.hasSpecialChar ? 'text-green-600' : 'text-white/60'}`}>
             At least one special character
            </span>
          </div>
          <div className="flex items-center">
            {!confirmPassword ? (
              <X className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
            ) : requirements.passwordsMatch ? (
              <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2 shrink-0" />
            )}
            <span className={`text-sm ${
              !confirmPassword 
                ? 'text-white/60' 
                : (requirements.passwordsMatch ? 'text-green-600' : 'text-red-500')
            }`}>
              {!confirmPassword 
                ? 'Match passwords' 
                : (requirements.passwordsMatch ? 'Passwords match' : "Passwords don't match")}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            placeholder="Enter your new password"
            className="block w-full pl-10 pr-10 py-3 bg-white/5 border border-white/40 rounded-2xl text-white placeholder-black/80 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/80 hover:text-white transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            placeholder="Confirm your new password"
            className="block w-full pl-10 pr-10 py-3 bg-white/5 border border-white/40 rounded-2xl text-white placeholder-black/80 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/80 hover:text-white transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <motion.button
          whileTap={allRequirementsMet ? { scale: 0.98 } : {}}
          onClick={onReset}
          disabled={isLoading || !allRequirementsMet}
          className={`w-full py-3 px-4 bg-blue-400 text-black font-medium rounded-xl transition-colors ${
            allRequirementsMet 
              ? 'hover:bg-blue-300 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Updating...' : 'Reset Password'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ResetPasswordStep;