import { useState, useEffect, useRef } from 'react';
import { 
  Calendar, ChevronDown, Plus, X, User, HeartPulse, Shield, 
  Activity, Droplets, Pill, Stethoscope, AlertTriangle, 
  ChevronRight, ChevronLeft, Check, Info, Thermometer, 
  Droplet, ActivitySquare, Utensils, Wine, Cigarette,
  Users, Ruler, Phone, Scale, UserCog, Droplets as BloodDrop, 
  HeartPulse as BloodPressure, Pill as Medication, HelpCircle, Target,ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
      mass: 0.5
    }
  }
};

// Button Variants
const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
    transition: { type: 'spring', stiffness: 300 }
  },
  tap: { 
    scale: 0.98,
    transition: { type: 'spring', stiffness: 500 }
  }
};

// Form Section Component
const FormSection = ({ title, description, icon: Icon, children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      transition={{ delayChildren: delay }}
      className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm rounded-2xl border border-white/5 p-6 shadow-xl hover:shadow-blue-500/10 hover:border-white/10 transition-all duration-300"
    >
      <motion.div className="flex items-start gap-4 mb-6">
        <motion.div 
          className="p-2.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl text-blue-400"
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <div>
          <motion.h3 
            className="text-xl font-semibold text-white flex items-center gap-2"
            variants={itemVariants}
          >
            {title}
          </motion.h3>
          {description && (
            <motion.p 
              className="text-sm text-gray-400 mt-1"
              variants={itemVariants}
            >
              {description}
            </motion.p>
          )}
        </div>
      </motion.div>
      <motion.div className="space-y-5" variants={containerVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
};

// Input Field Component
const InputField = ({ 
  label, 
  icon: Icon, 
  className = '', 
  ...props 
}) => {
  const inputRef = useRef(null);
  
  return (
    <motion.div 
      variants={itemVariants}
      className={`space-y-1.5 ${className}`}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {label && (
        <label 
          className="block text-sm font-medium text-gray-300 flex items-center gap-1.5"
          onClick={() => inputRef.current?.focus()}
        >
          {Icon && <Icon className="w-4 h-4" />}
          {label}
        </label>
      )}
      <div className="relative group">
        {props.type === 'select' ? (
          <div className="relative w-full">
            <select
              ref={inputRef}
              {...props}
              className="w-full px-4 pl-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/50 
              hover:border-white/20 transition-all duration-200 backdrop-blur-sm
              appearance-none pr-10"
            >
              {props.children}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        ) : (
          <>
            <input
              ref={inputRef}
              {...props}
              className="w-full px-4 pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white 
              placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/50 
              hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
            />
          </>
        )}
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white group-hover:text-white transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Tag Component
const Tag = ({ children, onRemove, color = 'blue', icon: Icon }) => {
  const colorMap = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      text: 'text-blue-300',
      border: 'border-blue-500/30',
      hover: 'hover:from-blue-500/30 hover:to-cyan-500/30'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20',
      text: 'text-purple-300',
      border: 'border-purple-500/30',
      hover: 'hover:from-purple-500/30 hover:to-fuchsia-500/30'
    },
    green: {
      bg: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20',
      text: 'text-emerald-300',
      border: 'border-emerald-500/30',
      hover: 'hover:from-emerald-500/30 hover:to-teal-500/30'
    },
    red: {
      bg: 'bg-gradient-to-br from-rose-500/20 to-pink-500/20',
      text: 'text-rose-300',
      border: 'border-rose-500/30',
      hover: 'hover:from-rose-500/30 hover:to-pink-500/30'
    }
  };

  return (
    <motion.span 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium border 
      ${colorMap[color].bg} ${colorMap[color].text} ${colorMap[color].border} 
      ${colorMap[color].hover} transition-all duration-200`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
      {onRemove && (
        <button 
          type="button" 
          onClick={onRemove}
          className="opacity-70 hover:opacity-100 transition-opacity ml-0.5"
          aria-label={`Remove ${children}`}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.span>
  );
};

const StepAdvancedPatient = ({ data, setData, submit, back }) => {
  // Initialize data with default values if not present
  useEffect(() => {
    if (!data.allergies) setData({ ...data, allergies: [] });
    if (!data.medications) setData({ ...data, medications: [] });
    if (!data.conditions) setData({ ...data, conditions: [] });
  }, []);

  const [customInputs, setCustomInputs] = useState({
    allergy: '',
    medication: '',
    condition: '',
    goal: ''
  });
  const [bloodPressure, setBloodPressure] = useState({
    systolic: data.bloodPressure?.systolic || '',
    diastolic: data.bloodPressure?.diastolic || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const formRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];
  
  const allergies = [
    'Penicillin', 'Aspirin', 'Ibuprofen', 'Sulfa Drugs', 'Latex',
    'Peanuts', 'Tree Nuts', 'Shellfish', 'Eggs', 'Dairy', 'Soy', 'Wheat',
    'Pollen', 'Dust Mites', 'Mold', 'Pet Dander', 'Insect Stings', 'None', 'Other'
  ];

  const chronicConditions = [
    'Diabetes Type 1', 'Diabetes Type 2', 'High Blood Pressure', 'High Cholesterol',
    'Asthma', 'COPD', 'Heart Disease', 'Heart Failure', 'Arrhythmia',
    'Arthritis', 'Osteoporosis', 'Osteoarthritis', 'Rheumatoid Arthritis',
    'Depression', 'Anxiety', 'Bipolar Disorder', 'ADHD',
    'Hypothyroidism', 'Hyperthyroidism', 'Hashimoto\'s', 'Graves\' Disease',
    'IBS', 'Crohn\'s Disease', 'Ulcerative Colitis', 'GERD',
    'Migraines', 'Epilepsy', 'Multiple Sclerosis', 'Parkinson\'s',
    'Chronic Kidney Disease', 'Liver Disease', 'None', 'Other'
  ];

  const medications = [
    'Metformin', 'Insulin', 'Lisinopril', 'Amlodipine', 'Atorvastatin',
    'Levothyroxine', 'Albuterol', 'Fluticasone', 'Omeprazole',
    'Sertraline', 'Escitalopram', 'Bupropion', 'None', 'Other'
  ];

  const healthGoals = [
    'Lose Weight', 'Gain Weight', 'Improve Diet', 'Exercise More',
    'Reduce Stress', 'Improve Sleep', 'Quit Smoking', 'Reduce Alcohol',
    'Manage Blood Pressure', 'Lower Cholesterol', 'Control Blood Sugar',
    'Build Muscle', 'Increase Energy', 'Improve Mental Health', 'Other'
  ];

  // Validate a specific field
  const validateField = (fieldName, value, allErrors = []) => {
    let isValid = true;
    const fieldErrors = [];
    
    switch (fieldName) {
      case 'dateOfBirth':
        if (value) {
          const selectedDate = new Date(value);
          const today = new Date();
          const minDate = new Date();
          minDate.setFullYear(today.getFullYear() - 120);
          today.setHours(0, 0, 0, 0);
          
          if (selectedDate > today) {
            fieldErrors.push('Date of birth cannot be in the future');
            isValid = false;
          } else if (selectedDate < minDate) {
            fieldErrors.push('Please enter a valid date of birth');
            isValid = false;
          }
        }
        break;
        
      case 'height':
        if (value) {
          const height = parseFloat(value);
          if (isNaN(height) || height < 40) {
            fieldErrors.push('Height must be at least 40cm');
            isValid = false;
          } else if (height > 300) {
            fieldErrors.push('Please enter a valid height (max 300cm)');
            isValid = false;
          }
        }
        break;
        
      case 'weight':
        if (value) {
          const weight = parseFloat(value);
          if (isNaN(weight) || weight < 2) {
            fieldErrors.push('Weight must be at least 2kg');
            isValid = false;
          } else if (weight > 600) {
            fieldErrors.push('Please enter a valid weight (max 600kg)');
            isValid = false;
          }
        }
        break;
        
      case 'emergencyPhone':
        if (value) {
          const phoneRegex = /^[0-9+\-() ]+$/;
          const digitsOnly = value.replace(/[^0-9]/g, '');
          
          if (!phoneRegex.test(value)) {
            fieldErrors.push('Please enter a valid phone number');
            isValid = false;
          } else if (digitsOnly.length < 8) {
            fieldErrors.push('Phone number must be at least 8 digits');
            isValid = false;
          }
        }
        break;
        
      default:
        break;
    }
    
    // Update error messages for this field
    const newErrors = allErrors.filter(err => !err.field || err.field !== fieldName);
    if (fieldErrors.length > 0) {
      fieldErrors.forEach(msg => newErrors.push({ field: fieldName, message: msg }));
    }
    
    setErrorMessages(newErrors);
    return isValid;
  };
  
  // Validation function for form submission
  const validateForm = () => {
    // Check all required fields
    const fieldsToValidate = ['dateOfBirth', 'height', 'weight', 'emergencyPhone'];
    let allValid = true;
    const allErrors = [];
    
    for (const field of fieldsToValidate) {
      const isValid = validateField(field, data[field], allErrors);
      if (!isValid) {
        allValid = false;
      }
    }
    
    return allValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Update the data first
    const newData = {
      ...data,
      [name]: type === 'checkbox' ? checked : value
    };
    
    setData(newData);
    
    // Validate the field that was just changed
    validateField(name, type === 'checkbox' ? checked : value, [...errorMessages]);
  };

  const handleAllergyChange = (allergy) => {
    const currentAllergies = Array.isArray(data.allergies) ? [...data.allergies] : [];
    
    if (allergy === 'None') {
      setData({ ...data, allergies: ['None'] });
    } else if (allergy === 'Other') {
      if (!currentAllergies.includes('Other')) {
        setData({ 
          ...data, 
          allergies: [...currentAllergies.filter(a => a !== 'None'), 'Other']
        });
      }
    } else {
      const newAllergies = currentAllergies.includes(allergy)
        ? currentAllergies.filter(a => a !== allergy && a !== 'None' && a !== 'Other')
        : [...currentAllergies.filter(a => a !== 'None' && a !== 'Other'), allergy];
      
      setData({
        ...data,
        allergies: newAllergies
      });
    }
  };

  const addCustomAllergy = () => {
    if (customInputs.allergy.trim()) {
      const currentAllergies = Array.isArray(data.allergies) ? [...data.allergies] : [];
      const newAllergies = [
        ...currentAllergies.filter(a => a !== 'Other'), 
        customInputs.allergy,
        'Other'
      ];
      
      setData({
        ...data,
        allergies: newAllergies,
        showCustomAllergy: true
      });
      
      setCustomInputs({...customInputs, allergy: ''});
    }
  };

  const handleMedicationChange = (medication) => {
    const currentMeds = Array.isArray(data.medications) ? [...data.medications] : [];
    
    if (medication === 'None') {
      setData({ ...data, medications: ['None'], showCustomMedication: false });
    } else if (medication === 'Other') {
      if (!currentMeds.includes('Other')) {
        setData({ 
          ...data, 
          medications: [...currentMeds.filter(m => m !== 'None' && m !== 'Other'), 'Other'],
          showCustomMedication: true
        });
      } else {
        // Toggle off 'Other' if it's already selected
        const newMeds = currentMeds.filter(m => m !== 'Other' && m !== 'None');
        setData({
          ...data,
          medications: newMeds.length > 0 ? newMeds : ['None'],
          showCustomMedication: false
        });
      }
    } else {
      const newMeds = currentMeds.includes(medication)
        ? currentMeds.filter(m => m !== medication && m !== 'None' && m !== 'Other')
        : [...currentMeds.filter(m => m !== 'None' && m !== 'Other'), medication];
      
      setData({
        ...data,
        medications: newMeds.length > 0 ? newMeds : ['None'],
        showCustomMedication: currentMeds.includes('Other') && newMeds.includes(medication)
      });
    }
  };

  const addCustomMedication = () => {
    if (customInputs.medication.trim()) {
      const currentMeds = Array.isArray(data.medications) ? [...data.medications] : [];
      const newMeds = [
        ...currentMeds.filter(m => m !== 'Other'),
        customInputs.medication,
        'Other'
      ];
      
      setData({
        ...data,
        medications: newMeds,
        showCustomMedication: true
      });
      
      setCustomInputs({...customInputs, medication: ''});
    }
  };

  const handleConditionChange = (condition) => {
    const currentConditions = Array.isArray(data.conditions) ? [...data.conditions] : [];
    
    if (condition === 'None') {
      setData({ ...data, conditions: ['None'], showCustomCondition: false });
    } else if (condition === 'Other') {
      if (!currentConditions.includes('Other')) {
        setData({ 
          ...data, 
          conditions: [...currentConditions.filter(c => c !== 'None' && c !== 'Other'), 'Other'],
          showCustomCondition: true
        });
      } else {
        // Toggle off 'Other' if it's already selected
        const newConditions = currentConditions.filter(c => c !== 'Other' && c !== 'None');
        setData({
          ...data,
          conditions: newConditions.length > 0 ? newConditions : ['None'],
          showCustomCondition: false
        });
      }
    } else {
      const newConditions = currentConditions.includes(condition)
        ? currentConditions.filter(c => c !== condition && c !== 'None' && c !== 'Other')
        : [...currentConditions.filter(c => c !== 'None' && c !== 'Other'), condition];
      
      setData({
        ...data,
        conditions: newConditions.length > 0 ? newConditions : ['None'],
        showCustomCondition: currentConditions.includes('Other') && newConditions.includes(condition)
      });
    }
  };

  const addCustomCondition = () => {
    if (customInputs.condition.trim()) {
      const currentConditions = Array.isArray(data.conditions) ? [...data.conditions] : [];
      const newConditions = [
        ...currentConditions.filter(c => c !== 'Other'),
        customInputs.condition,
        'Other'
      ];
      
      setData({
        ...data,
        conditions: newConditions,
        showCustomCondition: true
      });
      
      setCustomInputs({...customInputs, condition: ''});
    }
  };

  const handleBloodPressureChange = (type, value) => {
    const updatedBP = { ...bloodPressure, [type]: value };
    setBloodPressure(updatedBP);
    setData({ ...data, bloodPressure: updatedBP });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      submit();
      setIsSubmitting(false);
    }, 800);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Style the dropdown arrow */
      select {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='[http://www.w3.org/2000/svg'](http://www.w3.org/2000/svg') width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        background-size: 1em;
      }

      /* Style the dropdown list */
      select option {
        background-color: #1e293b; /* slate-800 */
        color: #f8fafc; /* slate-50 */
        padding: 0.5rem;
      }

      /* For Firefox */
      select:focus {
        outline: none;
      }

      /* For IE10+ */
      select::-ms-expand {
        display: none;
      }
      /* Hide default arrow in Firefox */
      select {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
      }
      /* Custom scrollbar for error messages */
      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
      }
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Error Message */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-h-[calc(100vh-2rem)] overflow-y-auto pr-1 custom-scrollbar">
        <AnimatePresence>
          {errorMessages.map((error, index) => (
            <motion.div
              key={`${error.field}-${index}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100, height: 0, marginBottom: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-64"
            >
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{error.message}</span>
              </div>
              <button
                onClick={() => setErrorMessages(prev => prev.filter((_, i) => i !== index))}
                className="ml-4 text-white hover:text-gray-200 text-xl"
                aria-label="Dismiss error"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style jsx global>{`

          /* Style the date picker icon */
      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1);
        opacity: 0.8;
      }

        /* Style the dropdown arrow */
        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='[http://www.w3.org/2000/svg'](http://www.w3.org/2000/svg') width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1em;
        }

        /* Style the dropdown list */
        select option {
          background-color: #1e293b; /* slate-800 */
          color: #f8fafc; /* slate-50 */
          padding: 0.5rem;
        }

        /* For Firefox */
        select:focus {
          outline: none;
        }

        /* For IE10+ */
        select::-ms-expand {
          display: none;
        }
        /* Hide default arrow in Firefox */
        select {
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
        }
        /* Custom scrollbar for error messages */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
      `}</style>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3">
          <HeartPulse className="w-9 h-9 text-white" />
          <h2 className="text-3xl md:text-4xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-gray-300">
            Health Profile
            <span className="text-base font-normal ml-2">(Optional step)</span>
          </h2>
        </div>
        <motion.p 
          className="text-gray-400 max-w-2xl mx-auto text-lg mt-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Help us personalize your healthcare experience. This information is secure and can be updated anytime.
        </motion.p>
      </motion.div>

      <motion.form 
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Personal Information */}
        <FormSection 
          title="Personal Information" 
          description="Tell us a bit about yourself"
          icon={User}
          delay={0.1}
        >
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={data.dateOfBirth || ''}
            onChange={handleChange}
            icon={Calendar}
            iconClassName="text-white"
            max={new Date().toISOString().split('T')[0]}
          />

            <InputField
              label="Gender"
              type="select"
              name="gender"
              value={data.gender || ''}
              onChange={handleChange}
              icon={User}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other</option>
            </InputField>

            <InputField
              label="Height (cm)"
              type="number"
              name="height"
              value={data.height || ''}
              onChange={handleChange}
              placeholder="e.g. 175"
              min="40"
              max="300"
              step="0.1"
              icon={Ruler}
            />

            <InputField
              label="Weight (kg)"
              type="number"
              name="weight"
              value={data.weight || ''}
              onChange={handleChange}
              placeholder="e.g. 70"
              min="2"
              max="300"
              step="0.1"
              icon={Scale}
            />

            {data.height && data.weight && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-2 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
                    <Activity className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Your BMI</p>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                        {((data.weight / ((data.height / 100) * (data.height / 100))).toFixed(1))}
                      </span>
                      <span className="text-sm text-gray-300">
                        {(() => {
                          const bmi = data.weight / ((data.height / 100) * (data.height / 100));
                          if (bmi < 18.5) return 'Underweight';
                          if (bmi < 25) return 'Healthy weight';
                          if (bmi < 30) return 'Overweight';
                          return 'Obese';
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    style={{
                      width: `${Math.min(100, Math.max(5, ((data.weight / ((data.height / 100) * (data.height / 100))) / 40) * 100))}%`
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>BMI is a general indicator of health. Consult a healthcare provider for advice.</span>
                </p>
              </motion.div>
            )}
          </div>
        </FormSection>

        {/* Health Information */}
        <FormSection 
          title="Health Information" 
          description="Help us provide you with the best possible care by sharing your health details"
          icon={HeartPulse}
          delay={0.2}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blood Pressure */}
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
                <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                  <ActivitySquare className="w-4 h-4 text-red-400" />
                  Blood Pressure
                  <div className="group relative">
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Normal blood pressure is typically around 120/80 mmHg.
                    </div>
                  </div>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Systolic (top)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={data.bloodPressure?.systolic || ''}
                        onChange={(e) => setData({
                          ...data,
                          bloodPressure: {
                            ...data.bloodPressure,
                            systolic: e.target.value
                          }
                        })}
                        placeholder="120"
                        className="w-full px-4 pl-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 
                        focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/50 
                        hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        <ActivitySquare className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Diastolic (bottom)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={data.bloodPressure?.diastolic || ''}
                        onChange={(e) => setData({
                          ...data,
                          bloodPressure: {
                            ...data.bloodPressure,
                            diastolic: e.target.value
                          }
                        })}
                        placeholder="80"
                        className="w-full px-4 pl-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 
                        focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/50 
                        hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        <ActivitySquare className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
                {data.bloodPressure?.systolic && data.bloodPressure?.diastolic && (
                  <div className="mt-2 text-xs text-gray-400">
                    {data.bloodPressure.systolic < 120 && data.bloodPressure.diastolic < 80 ? (
                      <span className="text-green-400">✓ Normal blood pressure</span>
                    ) : data.bloodPressure.systolic >= 180 || data.bloodPressure.diastolic >= 120 ? (
                      <span className="text-red-400">⚠️ Hypertensive Crisis - Seek medical attention</span>
                    ) : data.bloodPressure.systolic >= 140 || data.bloodPressure.diastolic >= 90 ? (
                      <span className="text-orange-400">⚠️ High blood pressure</span>
                    ) : (
                      <span className="text-yellow-400">⚠️ Elevated blood pressure</span>
                    )}
                  </div>
                )}
              </div>

              {/* Blood Type */}
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
                <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-red-400" />
                  Blood Type
                  <div className="group relative">
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Your blood type is important for medical emergencies and procedures.
                    </div>
                  </div>
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                    <motion.button
                      key={type}
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setData({ ...data, bloodType: type })}
                      className={`py-2 px-1 text-sm rounded-lg transition-all ${
                        data.bloodType === type
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5 hover:border-white/10'
                      }`}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Allergies */}
            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
              <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                Allergies
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Please list any allergies to medications, foods, or environmental factors.
                  </div>
                </div>
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {/* Render predefined allergy options */}
                {allergies.map((allergy, index) => (
                  <motion.button
                    key={`option-${allergy}`}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAllergyChange(allergy)}
                    className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 transition-all ${
                      data.allergies?.includes(allergy) || (allergy === 'Other' && data.showCustomAllergy)
                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5 hover:border-white/10'
                    }`}
                    style={{ transitionDelay: `${index * 20}ms` }}
                  >
                    {allergy}
                    {data.allergies?.includes(allergy) && !['None', 'Other'].includes(allergy) && (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </motion.button>
                ))}
                
                {/* Render selected custom allergies */}
                {data.allergies?.filter(a => !allergies.includes(a) && a !== 'None' && a !== 'Other').map((allergy, index) => (
                  <motion.div
                    key={`custom-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                  >
                    {allergy}
                    <button 
                      type="button"
                      onClick={() => handleAllergyChange(allergy)}
                      className="opacity-70 hover:opacity-100"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
              {data.allergies?.includes('Other') && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={customInputs.allergy}
                    onChange={(e) => setCustomInputs({...customInputs, allergy: e.target.value})}
                    placeholder="Specify allergy"
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                  />
                  <button
                    type="button"
                    onClick={addCustomAllergy}
                    className="px-4 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Current Medications */}
            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
              <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Pill className="w-4 h-4 text-blue-400" />
                Current Medications
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    List all prescription and over-the-counter medications you're currently taking.
                  </div>
                </div>
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {/* Render predefined medication options */}
                {medications.map((med, index) => (
                  <motion.button
                    key={`option-${med}`}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMedicationChange(med)}
                    className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 transition-all ${
                      data.medications?.includes(med) || (med === 'Other' && data.showCustomMedication)
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5 hover:border-white/10'
                    }`}
                    style={{ transitionDelay: `${index * 20}ms` }}
                  >
                    {med}
                    {data.medications?.includes(med) && !['None', 'Other'].includes(med) && (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </motion.button>
                ))}
                
                {/* Render selected custom medications */}
                {data.medications?.filter(m => !medications.includes(m) && m !== 'None' && m !== 'Other').map((med, index) => (
                  <motion.div
                    key={`custom-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  >
                    {med}
                    <button 
                      type="button"
                      onClick={() => handleMedicationChange(med)}
                      className="opacity-70 hover:opacity-100"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
              {data.medications?.includes('Other') && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={customInputs.medication}
                    onChange={(e) => setCustomInputs({...customInputs, medication: e.target.value})}
                    placeholder="Specify medication"
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addCustomMedication}
                    className="px-4 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Chronic Conditions */}
            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
              <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                Chronic Conditions
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Please list any ongoing medical conditions you've been diagnosed with.
                  </div>
                </div>
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {chronicConditions.map((condition, index) => (
                  <motion.button
                    key={condition}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleConditionChange(condition)}
                    className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 transition-all ${
                      data.conditions?.includes(condition) || (condition === 'Other' && data.showCustomCondition)
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5 hover:border-white/10'
                    }`}
                    style={{ transitionDelay: `${index * 20}ms` }}
                  >
                    {condition}
                    {data.conditions?.includes(condition) && !['None', 'Other'].includes(condition) && (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </motion.button>
                ))}
                
                {/* Render selected custom conditions */}
                {data.conditions?.filter(c => !chronicConditions.includes(c) && c !== 'None' && c !== 'Other').map((condition, index) => (
                  <motion.div
                    key={`custom-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  >
                    {condition}
                    <button 
                      type="button"
                      onClick={() => handleConditionChange(condition)}
                      className="opacity-70 hover:opacity-100"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
              {(data.conditions?.includes('Other') || data.showCustomCondition) && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={customInputs.condition}
                    onChange={(e) => setCustomInputs({...customInputs, condition: e.target.value})}
                    placeholder="Specify condition"
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={addCustomCondition}
                    className="px-4 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Health Goals */}
            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
              <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-green-400" />
                Health Goals
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Select your top health and wellness goals to help us personalize your experience.
                  </div>
                </div>
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {healthGoals.map((goal, index) => (
                  <motion.button
                    key={goal}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const currentGoals = data.healthGoals || [];
                      if (goal === 'Other' && !currentGoals.includes('Other')) {
                        setData({
                          ...data,
                          healthGoals: [...currentGoals, 'Other'],
                          showCustomGoal: true
                        });
                      } else if (goal === 'Other' && currentGoals.includes('Other')) {
                        setData({
                          ...data,
                          healthGoals: currentGoals.filter(g => g !== 'Other'),
                          showCustomGoal: false
                        });
                      } else if (currentGoals.includes(goal)) {
                        setData({
                          ...data,
                          healthGoals: currentGoals.filter(g => g !== goal && g !== 'Other')
                        });
                      } else {
                        setData({
                          ...data,
                          healthGoals: [...currentGoals.filter(g => g !== 'Other'), goal]
                        });
                      }
                    }}
                    className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 transition-all ${
                      data.healthGoals?.includes(goal) || (goal === 'Other' && data.showCustomGoal)
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5 hover:border-white/10'
                    }`}
                    style={{ transitionDelay: `${index * 20}ms` }}
                  >
                    {goal}
                    {data.healthGoals?.includes(goal) && !['Other'].includes(goal) && (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </motion.button>
                ))}
                
                {/* Render selected custom goals */}
                {data.healthGoals?.filter(g => !healthGoals.includes(g) && g !== 'Other').map((goal, index) => (
                  <motion.div
                    key={`custom-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 bg-green-500/20 text-green-300 border border-green-500/30"
                  >
                    {goal}
                    <button 
                      type="button"
                      onClick={() => {
                        const currentGoals = data.healthGoals || [];
                        setData({
                          ...data,
                          healthGoals: currentGoals.filter(g => g !== goal)
                        });
                      }}
                      className="opacity-70 hover:opacity-100"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
              
              {/* Custom goal input */}
              {data.healthGoals?.includes('Other') && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={customInputs.goal || ''}
                    onChange={(e) => setCustomInputs({...customInputs, goal: e.target.value})}
                    placeholder="Specify your health goal"
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customInputs.goal?.trim()) {
                        const currentGoals = data.healthGoals || [];
                        setData({
                          ...data,
                          healthGoals: [...currentGoals.filter(g => g !== 'Other'), customInputs.goal, 'Other']
                        });
                        setCustomInputs({...customInputs, goal: ''});
                      }
                    }}
                    className="px-4 bg-green-500/20 text-green-300 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-8">

          </div>
        </FormSection>

        {/* Emergency Contact */}
        <FormSection 
          title="Emergency Contact" 
          description="In case of emergency, who should we contact?"
          icon={Shield}
          delay={0.3}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              type="text"
              name="emergencyName"
              value={data.emergencyName || ''}
              onChange={handleChange}
              placeholder="Emergency contact name"
              icon={User}
            />

            <InputField
              label="Relationship"
              type="text"
              name="emergencyRelationship"
              value={data.emergencyRelationship || ''}
              onChange={handleChange}
              placeholder="e.g. Spouse, Parent, Sibling"
              icon={UserCog}
            />

            <div className="md:col-span-2">
              <InputField
                label="Phone Number"
                type="tel"
                name="emergencyPhone"
                value={data.emergencyPhone || ''}
                onChange={handleChange}
                placeholder="Emergency contact number"
                icon={Phone}
              />
            </div>
          </div>
        </FormSection>

        {/* Lifestyle */}
        <FormSection 
          title="Lifestyle" 
          description="Help us understand your daily habits for better care"
          icon={Activity}
          delay={0.4}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Activity Level"
              type="select"
              name="activityLevel"
              value={data.activityLevel || ''}
              onChange={handleChange}
              icon={Activity}
            >
              <option value="">Select activity level</option>
              <option value="Sedentary (little or no exercise)">Sedentary (little or no exercise)</option>
              <option value="Lightly Active (light exercise/sports 1-3 days/week)">Lightly Active (light exercise/sports 1-3 days/week)</option>
              <option value="Moderately Active (moderate exercise/sports 3-5 days/week)">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
              <option value="Very Active (hard exercise/sports 6-7 days a week)">Very Active (hard exercise/sports 6-7 days a week)</option>
              <option value="Extra Active (very hard exercise/sports & physical job or 2x training)">Extra Active (very hard exercise/sports & physical job or 2x training)</option>
            </InputField>

            <InputField
              label="Dietary Preference"
              type="select"
              name="dietaryPreference"
              value={data.dietaryPreference || ''}
              onChange={handleChange}
              icon={Utensils}
            >
              <option value="">Select dietary preference</option>
              <option value="No restrictions">No restrictions</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Pescatarian">Pescatarian</option>
              <option value="Gluten-free">Gluten-free</option>
              <option value="Dairy-free">Dairy-free</option>
              <option value="Other">Other</option>
            </InputField>

            <InputField
              label="Smoking Status"
              type="select"
              name="smokingStatus"
              value={data.smokingStatus || ''}
              onChange={handleChange}
              icon={Cigarette}
            >
              <option value="">Select smoking status</option>
              <option value="Never smoked">Never smoked</option>
              <option value="Former smoker">Former smoker</option>
              <option value="Current smoker">Current smoker</option>
              <option value="Occasional smoker">Occasional smoker</option>
            </InputField>

            <InputField
              label="Alcohol Consumption"
              type="select"
              name="alcoholConsumption"
              value={data.alcoholConsumption || ''}
              onChange={handleChange}
              icon={Wine}
            >
              <option value="">Select alcohol consumption</option>
              <option value="Never">Never</option>
              <option value="Rarely (special occasions only)">Rarely (special occasions only)</option>
              <option value="Occasionally (1-3 drinks/week)">Occasionally (1-3 drinks/week)</option>
              <option value="Regularly (4-7 drinks/week)">Regularly (4-7 drinks/week)</option>
              <option value="Frequently (8+ drinks/week)">Frequently (8+ drinks/week)</option>
            </InputField>
          </div>
        </FormSection>

         {/* Navigation Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5"
        >
          <button
            onClick={back}
            className="flex items-center gap-2 px-5 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <motion.p 
            className="text-sm text-gray-400 text-center"
            variants={itemVariants}
          >
            All fields are optional. You can update this information later in your profile.
          </motion.p>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`group px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
              isSubmitting 
                ? 'bg-white/10 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer'
            }`}
          >
            {isSubmitting ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Processing...
              </>
            ) : (
              <>
                <span>Complete Profile</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1`} />
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>

      {/* Step Indicator */}
      <div className="w-full flex justify-center mb-12 mt-10">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-green-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="w-16 h-0.5 bg-blue-500 mx-2"></div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-green-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="w-16 h-0.5 bg-blue-500 mx-2"></div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-blue-500 text-white">
            3
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepAdvancedPatient;