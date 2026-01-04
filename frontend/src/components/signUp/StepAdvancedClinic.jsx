import { useState, useEffect, useRef } from 'react';
import { 
  Building2, MapPin, Phone, Clock, Stethoscope, 
  Calendar, Users, Shield, Upload, Palette, Bell, 
  Plus, X, Check, ChevronDown, Info, ArrowLeft, ArrowRight
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
      className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm rounded-2xl border border-white/5 p-6 shadow-xl hover:shadow-blue-500/10 hover:border-white/10 transition-all duration-300 mb-6"
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
}) => (
  <motion.div className={`space-y-1.5 ${className}`} variants={itemVariants}>
    <label className="text-sm font-medium text-gray-300">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
      )}
      <input
        className={`w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2.5 ${Icon ? 'pl-10 pr-4' : 'px-4'} text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200`}
        {...props}
      />
    </div>
  </motion.div>
);

// Select Field Component
const SelectField = ({ 
  label, 
  icon: Icon, 
  options = [], 
  value, 
  onChange, 
  name,
  className = '' 
}) => (
  <motion.div className={`space-y-1.5 ${className}`} variants={itemVariants}>
    <label className="text-sm font-medium text-gray-300">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
      )}
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        className={`w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2.5 ${Icon ? 'pl-10 pr-10' : 'px-4'} text-white appearance-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  </motion.div>
);

// MultiSelect Component
const MultiSelect = ({ 
  label, 
  icon: Icon, 
  options = [], 
  selected = [], 
  onChange, 
  name,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    const newSelected = [...selected];
    const index = newSelected.indexOf(option);
    
    if (index === -1) {
      newSelected.push(option);
    } else {
      newSelected.splice(index, 1);
    }
    
    onChange({ target: { name, value: newSelected } });
  };

  return (
    <motion.div className={`space-y-1.5 ${className}`} variants={itemVariants}>
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2.5 ${Icon ? 'pl-10 pr-10' : 'px-4'} text-left text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200 flex items-center justify-between`}
        >
          <span className="truncate">
            {selected.length === 0 
              ? `Select ${label.toLowerCase()}` 
              : selected.length === 1 
                ? selected[0] 
                : `${selected.length} selected`}
          </span>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-60 overflow-auto"
            >
              {options.map((option) => (
                <div 
                  key={option} 
                  onClick={() => toggleOption(option)}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-700/50 flex items-center justify-between ${selected.includes(option) ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300'}`}
                >
                  <span>{option}</span>
                  {selected.includes(option) && <Check className="h-4 w-4" />}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((item) => (
            <div 
              key={item} 
              className="inline-flex items-center bg-blue-500/20 text-blue-300 text-xs px-2.5 py-1 rounded-full"
            >
              {item}
              <button 
                type="button" 
                onClick={() => toggleOption(item)}
                className="ml-1.5 text-blue-200 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const StepAdvancedClinic = ({ data, setData, submit, back }) => {
  // Initialize form data with default values
  const [formData, setFormData] = useState({
    // Clinic Details
    clinicType: data.clinicType || '',
    specialties: data.specialties || [],
    yearEstablished: data.yearEstablished || '',
    clinicDescription: data.clinicDescription || '',
    
    // Location & Contact
    street: data.street || '',
    city: data.city || '',
    province: data.province || '',
    googleMapsLink: data.googleMapsLink || '',
    phone: data.phone || '',
    emergencyPhone: data.emergencyPhone || '',
    
    // Operating Details
    workingDays: data.workingDays || [],
    openingTime: data.openingTime || '09:00',
    closingTime: data.closingTime || '17:00',
    consultationDuration: data.consultationDuration || '30',
    walkInAvailable: data.walkInAvailable || false,
    
    // Doctor & Staff
    numberOfDoctors: data.numberOfDoctors || '',
    numberOfStaff: data.numberOfStaff || '',
    
    // Legal & Verification
    registrationNumber: data.registrationNumber || '',
    verificationDocument: data.verificationDocument || null,
    
    // Facilities & Services
    facilities: data.facilities || [],
    languages: data.languages || [],
    
    // Branding & Preferences
    logo: data.logo || null,
    themeColor: data.themeColor || '#3b82f6',
    
    // Notification Preferences
    emailNotifications: data.emailNotifications ?? true,
    smsNotifications: data.smsNotifications ?? false,
  });
  
  const [activeSection, setActiveSection] = useState('clinic-details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Clinic types and other options
  const clinicTypes = [
    'General Clinic',
    'Specialty Clinic',
    'Diagnostic Center',
    'Hospital / Medical Center'
  ];
  
  const specialties = [
    'General Medicine',
    'Pediatrics',
    'Dermatology',
    'Cardiology',
    'Gynecology',
    'Dental',
    'Orthopedics',
    'Neurology',
    'Ophthalmology',
    'ENT',
    'Urology',
    'Gastroenterology',
    'Pulmonology',
    'Endocrinology',
    'Psychiatry',
    'Dermatology',
    'Rheumatology',
    'Nephrology',
    'Hematology',
    'Oncology',
    'Other'
  ];
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Validate current section
  const validateCurrentSection = () => {
    switch (activeSection) {
      case 'clinic-details':
        if (!formData.clinicType) {
          throw new Error('Please select a clinic type');
        }
        if (formData.specialties.length === 0) {
          throw new Error('Please select at least one specialty');
        }
        break;
        
      case 'location-contact':
        if (!formData.street || !formData.city || !formData.province) {
          throw new Error('Please fill in all address fields');
        }
        if (!formData.phone) {
          throw new Error('Phone number is required');
        }
        break;
        
      // Add validation for other sections as needed
        
      default:
        // No validation for other sections
        break;
    }
  };
  
  // Handle navigation to next section
  const goToNextSection = (skipValidation = false) => {
    try {
      if (!skipValidation) {
        validateCurrentSection();
      }
      
      // Find current section index
      const currentIndex = navItems.findIndex(item => item.id === activeSection);
      if (currentIndex < navItems.length - 1) {
        const nextSection = navItems[currentIndex + 1].id;
        setActiveSection(nextSection);
        const element = document.getElementById(nextSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      
      // Clear any previous errors
      setError('');
      return true;
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
  };
  
  // Handle skip to next section
  const handleSkip = (e) => {
    e.preventDefault();
    goToNextSection(true);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // If it's the last section, submit the form
      if (activeSection === navItems[navItems.length - 1].id) {
        // Validate all sections before final submission
        for (const section of navItems) {
          const prevSection = activeSection;
          setActiveSection(section.id);
          validateCurrentSection();
          setActiveSection(prevSection);
        }
        
        // If validation passes, submit the form
        setData({
          ...data,
          ...formData
        });
        
        submit();
      } else {
        // Otherwise, go to next section
        goToNextSection();
      }
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };
  
  // Sidebar navigation items
  const navItems = [
    { id: 'clinic-details', icon: Building2, label: 'Clinic Details' },
    { id: 'location-contact', icon: MapPin, label: 'Location & Contact' },
    { id: 'operating-details', icon: Clock, label: 'Operating Details' },
    { id: 'doctor-staff', icon: Users, label: 'Doctor & Staff' },
    { id: 'legal-verification', icon: Shield, label: 'Legal & Verification' },
    { id: 'facilities-services', icon: Stethoscope, label: 'Facilities & Services' },
    { id: 'branding-preferences', icon: Palette, label: 'Branding & Preferences' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
  ];

  // Options for various select fields
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ];
  
  const consultationDurations = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' }
  ];
  
  const facilities = [
    'Parking', 'Wheelchair Access', 'Pharmacy', 'Lab Services',
    'X-ray', 'Ultrasound', 'ECG', 'Ambulance', 'Wifi', 'Cafeteria'
  ];
  
  const languages = [
    'Sinhala', 'Tamil', 'English', 'Hindi', 'Arabic', 'Other'
  ];
  
  // Check if section is active
  const isSectionActive = (sectionId) => activeSection === sectionId;

  return (
    <div className="h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation - Fixed on desktop */}
        <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-64 bg-slate-800/70 border-r border-slate-700/50 overflow-y-auto z-10">
          <div className="p-3 pb-1">
            <a  className="flex items-center text-white">
              <img
                src="/src/assets/images/newLogo.png"
                alt="MediFlow Logo"
                className="h-18 w-auto -ml-6"
              />
              <span className="text-2xl font-semibold text-white -ml-4">MediFlow</span>
            </a>
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-gray-300 hover:bg-slate-700/50'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="text-left">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>
        
        {/* Mobile Navigation - Fixed at top on mobile */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 flex items-center justify-between px-4 h-16">
          <a href="/" className="flex items-center text-white">
            <img
              src="/src/assets/images/newLogo.png"
              alt="MediFlow Logo"
              className="h-8 w-auto"
            />
            <span className="text-lg font-semibold text-white ml-2">MediFlow</span>
          </a>
          <select
            value={activeSection}
            onChange={(e) => scrollToSection(e.target.value)}
            className="w-full bg-slate-700/50 border-0 text-white p-3 text-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
          >
            {navItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          </div>
        
        {/* Main Content - Scrollable area */}
        <main className="flex-1 md:ml-64 p-4 md:p-8 w-full mt-16 md:mt-4 flex justify-center overflow-y-auto">
          <div className="w-full max-w-4xl min-h-0 flex flex-col">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">{error}</h3>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Clinic Details Section */}
            <section 
              id="clinic-details" 
              className={`scroll-mt-24 transition-opacity duration-300 flex-1 ${isSectionActive('clinic-details') ? 'block' : 'hidden'}`}
            >
              <FormSection 
                title="Clinic Details" 
                description="Establish your clinic's identity and credibility"
                icon={Building2}
              >
                <SelectField
                  label="Clinic Type"
                  name="clinicType"
                  value={formData.clinicType}
                  onChange={handleChange}
                  options={clinicTypes}
                  icon={Building2}
                  required
                />
                
                <MultiSelect
                  label="Specialties Offered"
                  name="specialties"
                  selected={formData.specialties}
                  onChange={handleChange}
                  options={specialties}
                  icon={Stethoscope}
                  required
                />
                
                <InputField
                  label="Year Established (Optional)"
                  name="yearEstablished"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.yearEstablished}
                  onChange={handleChange}
                  placeholder="e.g. 2010"
                  icon={Calendar}
                />
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">Clinic Description</label>
                  <textarea
                    name="clinicDescription"
                    value={formData.clinicDescription}
                    onChange={handleChange}
                    placeholder="A brief description of your clinic, services, and what makes you unique..."
                    rows={4}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2.5 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be displayed on your public profile. Max 500 characters.
                  </p>
                </div>
              </FormSection>
            </section>
            
            {/* Location & Contact Section */}
            <section 
              id="location-contact" 
              className={`scroll-mt-24 transition-opacity duration-300 flex-1 ${isSectionActive('location-contact') ? 'block' : 'hidden'}`}
            >
              <FormSection 
                title="Location & Contact" 
                description="Help patients find and contact your clinic"
                icon={MapPin}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Street Address"
                    name="street"
                    type="text"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="123 Medical Center Drive"
                    icon={MapPin}
                    required
                  />
                  <InputField
                    label="City"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Colombo"
                    required
                  />
                  <InputField
                    label="Province/State"
                    name="province"
                    type="text"
                    value={formData.province}
                    onChange={handleChange}
                    placeholder="e.g. Western"
                    required
                  />
                  <InputField
                    label="Google Maps Link (Optional)"
                    name="googleMapsLink"
                    type="url"
                    value={formData.googleMapsLink}
                    onChange={handleChange}
                    placeholder="https://maps.google.com/..."
                    icon={MapPin}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +94 11 234 5678"
                    icon={Phone}
                    required
                  />
                  <InputField
                    label="Emergency Contact (Optional)"
                    name="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    placeholder="e.g. +94 76 123 4567"
                    icon={Phone}
                  />
                </div>
              </FormSection>
            </section>
            
            {/* Operating Details Section */}
            <section 
              id="operating-details" 
              className={`scroll-mt-24 transition-opacity duration-300 flex-1 ${isSectionActive('operating-details') ? 'block' : 'hidden'}`}
            >
              <FormSection 
                title="Operating Details" 
                description="Set your clinic's working hours and availability"
                icon={Clock}
              >
                <div className="space-y-4">
                  <MultiSelect
                    label="Working Days"
                    name="workingDays"
                    selected={formData.workingDays}
                    onChange={handleChange}
                    options={daysOfWeek}
                    icon={Calendar}
                    required
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Opening Time"
                      name="openingTime"
                      type="time"
                      value={formData.openingTime}
                      onChange={handleChange}
                      icon={Clock}
                      required
                    />
                    <InputField
                      label="Closing Time"
                      name="closingTime"
                      type="time"
                      value={formData.closingTime}
                      onChange={handleChange}
                      icon={Clock}
                      required
                    />
                  </div>
                  
                  <SelectField
                    label="Average Consultation Duration"
                    name="consultationDuration"
                    value={formData.consultationDuration}
                    onChange={handleChange}
                    options={consultationDurations}
                    icon={Clock}
                    required
                  />
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="walkInAvailable"
                      name="walkInAvailable"
                      checked={formData.walkInAvailable}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                    />
                    <label htmlFor="walkInAvailable" className="text-sm font-medium text-gray-300">
                      Accept walk-in patients
                    </label>
                  </div>
                </div>
              </FormSection>
            </section>
            
            {/* Doctor & Staff Section */}
            <section 
              id="doctor-staff" 
              className={`scroll-mt-24 transition-opacity duration-300 flex-1 ${isSectionActive('doctor-staff') ? 'block' : 'hidden'}`}
            >
              <FormSection 
                title="Doctor & Staff Overview" 
                description="Provide information about your medical team"
                icon={Users}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Number of Doctors"
                    name="numberOfDoctors"
                    type="number"
                    min="1"
                    value={formData.numberOfDoctors}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    icon={Users}
                    required
                  />
                  <InputField
                    label="Number of Staff (Optional)"
                    name="numberOfStaff"
                    type="number"
                    min="0"
                    value={formData.numberOfStaff}
                    onChange={handleChange}
                    placeholder="e.g. 10"
                    icon={Users}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">Add Lead Doctor (Optional)</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Dr. John Doe"
                      className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2.5 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </button>
                  </div>
                </div>
              </FormSection>
            </section>
            
            {/* Legal & Verification Section */}
            <section 
              id="legal-verification" 
              className={`scroll-mt-24 transition-opacity duration-300 flex-1 ${isSectionActive('legal-verification') ? 'block' : 'hidden'}`}
            >
              <FormSection 
                title="Legal & Verification" 
                description="Verify your clinic's credentials"
                icon={Shield}
              >
                <InputField
                  label="Clinic Registration/License Number"
                  name="registrationNumber"
                  type="text"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="e.g. MOH/CL/2023/1234"
                  icon={Shield}
                  required
                />
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">
                    Upload Verification Document
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-700/50 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-400">
                        <label
                          htmlFor="verification-document"
                          className="relative cursor-pointer bg-slate-800/50 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="verification-document"
                            name="verificationDocument"
                            type="file"
                            className="sr-only"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                handleChange({
                                  target: {
                                    name: 'verificationDocument',
                                    value: file
                                  }
                                });
                              }
                            }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, JPG, PNG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </FormSection>
            </section>
            
            {/* Facilities & Services Section */}
            <section 
              id="facilities-services" 
              className={`scroll-mt-24 transition-opacity duration-300 flex-1 ${isSectionActive('facilities-services') ? 'block' : 'hidden'}`}
            >
              <FormSection 
                title="Facilities & Services" 
                description="What facilities and services does your clinic offer?"
                icon={Stethoscope}
              >
                <MultiSelect
                  label="Available Facilities"
                  name="facilities"
                  selected={formData.facilities}
                  onChange={handleChange}
                  options={facilities}
                  icon={Building2}
                />
                
                <MultiSelect
                  label="Languages Spoken"
                  name="languages"
                  selected={formData.languages}
                  onChange={handleChange}
                  options={languages}
                  icon={Users}
                />
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">Additional Services</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="e.g. Home Visits, Telemedicine"
                      className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2.5 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </button>
                  </div>
                </div>
              </FormSection>
            </section>
            
            {/* Branding & Preferences Section */}
            <section 
              id="branding-preferences" 
              className={`scroll-mt-24 transition-opacity duration-300 flex-1 ${isSectionActive('branding-preferences') ? 'block' : 'hidden'}`}
            >
              <FormSection 
                title="Branding & Preferences" 
                description="Customize your clinic's appearance"
                icon={Palette}
              >
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Clinic Logo</label>
                    <div className="mt-1 flex items-center">
                      <span className="h-12 w-12 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
                        {formData.logo ? (
                          <img src={URL.createObjectURL(formData.logo)} alt="Clinic Logo" className="h-full w-full object-cover" />
                        ) : (
                          <Building2 className="h-6 w-6 text-gray-400" />
                        )}
                      </span>
                      <label
                        htmlFor="logo-upload"
                        className="ml-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {formData.logo ? 'Change Logo' : 'Upload Logo'}
                        <input
                          id="logo-upload"
                          name="logo"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              handleChange({
                                target: {
                                  name: 'logo',
                                  value: file
                                }
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Recommended size: 256x256px, PNG or JPG
                    </p>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Theme Color</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        name="themeColor"
                        value={formData.themeColor}
                        onChange={handleChange}
                        className="h-10 w-16 rounded cursor-pointer"
                      />
                      <span className="text-sm text-gray-300">
                        {formData.themeColor.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </FormSection>
            </section>
            
            {/* Notifications Section */}
            <section 
              id="notifications" 
              className={`scroll-mt-24 transition-opacity duration-300 flex-1 ${isSectionActive('notifications') ? 'block' : 'hidden'}`}
            >
              <FormSection 
                title="Notification Preferences" 
                description="How would you like to receive notifications?"
                icon={Bell}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300">Email Notifications</h4>
                      <p className="text-xs text-gray-400">Receive appointment reminders and updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={formData.emailNotifications}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300">SMS Notifications</h4>
                      <p className="text-xs text-gray-400">Receive important alerts via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="smsNotifications"
                        checked={formData.smsNotifications}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </FormSection>
            </section>
            
            {/* Sticky footer with action buttons */}
            <div className="sticky bottom-0  backdrop-blur-sm py-4 -mx-4 md:-mx-0 px-4 md:px-0 border-t border-slate-800 mt-8">
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>
                <div className="flex flex-col sm:flex-row gap-3">
                  {activeSection !== navItems[navItems.length - 1].id && (
                    <>
                      <button
                        type="button"
                        onClick={() => goToNextSection(false)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Save & Continue
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                      <button
                        type="button"
                        onClick={handleSkip}
                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                      >
                        Skip for Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                    </>
                  )}
                  {activeSection === navItems[navItems.length - 1].id && (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Saving...' : 'Complete Registration'}
                      <Check className="h-4 w-4 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
          {/* Add padding at the bottom to ensure content isn't hidden behind the sticky footer */}
          <div className="h-24 md:h-16"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StepAdvancedClinic;
