import { useState, useEffect, useRef } from 'react';
import {
  Building2, MapPin, Clock, Stethoscope, Users, Shield, Upload, Palette, Bell,
  Plus, X, Check, ChevronDown, Info, ArrowLeft, ArrowRight,
  FileText, CalendarDays, Map, Home, PhoneCall, AlertCircle,
  User, FileCheck, Languages, BriefcaseMedical,
  ClipboardList, FileSignature, FileCheck2, Sunrise, Sunset,
  Calendar as CalendarIcon, Clock as ClockIcon, UserPlus, FileText as FileTextIcon,
  Globe, ClipboardCheck, Map as MapIcon, Phone as PhoneIcon, AlertTriangle,
  User as UserIcon, Users as UsersIcon, FileSignature as FileSignatureIcon,
  FileCheck as FileCheck2Icon, Briefcase, Calendar as CalendarIcon2,
  Clock as ClockIcon2, UserCheck
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


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

// Required field indicator
const RequiredField = () => (
  <span className="text-red-500 ml-1">*</span>
);

// Form Section Component
const FormSection = ({ title, description, icon: Icon, children, required = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      transition={{ delayChildren: 0 }}
      className="bg-linear-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm rounded-2xl border border-white/5 p-6 shadow-xl hover:shadow-blue-500/10 hover:border-white/10 transition-all duration-300 mb-6"
    >
      <motion.div className="flex items-start gap-4 mb-6">
        <motion.div
          className="p-2.5 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-xl text-blue-400"
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <div>
          <motion.h3
            className="text-xl font-semibold text-white flex items-center"
            variants={itemVariants}
          >
            {title} {required && <RequiredField />}
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
  required = false,
  ...props
}) => (
  <motion.div className={`space-y-1.5 ${className}`} variants={itemVariants}>
    <div className="flex items-center">
      {typeof label === 'string' ? (
        <>
          {Icon && <Icon className="w-4 h-4 text-white mr-1.5" />}
          <span className="text-sm font-medium text-gray-300">{label} {required && <span className="ml-1"><RequiredField /></span>}</span>
        </>
      ) : (
        <span className="flex items-center">
          {label}
          {required && <RequiredField />}
        </span>
      )}
    </div>
    <div className="relative">
      <input
        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200"
        {...props}
      />
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      )}
    </div>
  </motion.div>
);

// Select Field Component
const SelectField = ({
  label,
  icon: Icon,
  options = [],
  value = '',
  onChange,
  name,
  className = '',
  required = false,
  ...props
}) => {
  // Generate ID safely whether label is a string or React element
  const id = typeof label === 'string'
    ? label.toLowerCase().replace(/\s+/g, '-')
    : `select-${Math.random().toString(36).substr(2, 9)}`;

  // Handle default value for select
  const selectValue = value === undefined ? '' : value;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {typeof label === 'string' ? (
          <span className="flex items-center">
            {Icon && <Icon className="w-4 h-4 text-white mr-1.5" />}
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        ) : (
          // If label is a React element, render it as is
          <span className="flex items-center">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        )}
      </label>

      <div className="relative">
        <select
          id={id}
          value={selectValue}
          onChange={(e) => {
            // Create a synthetic event object that matches what handleChange expects
            const syntheticEvent = {
              target: {
                name: name,
                value: e.target.value,
                type: 'select-one'
              }
            };
            onChange(syntheticEvent);
          }}
          className="block w-full bg-slate-800/80 border-2 border-slate-600/50 hover:border-blue-500/50 rounded-lg py-2.5 pl-10 pr-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none transition-all duration-200 cursor-pointer"
          required={required}
          name={name}
          {...props}
        >
          {options.map((option) => {
            const optionValue = typeof option === 'object' ? option.value : option;
            const optionLabel = typeof option === 'object' ? option.label : option;
            const isDisabled = typeof option === 'object' ? option.disabled : false;

            return (
              <option
                key={optionValue}
                value={optionValue}
                disabled={isDisabled}
              >
                {optionLabel}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-300" />
        </div>
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};


const StepAdvancedClinic = ({ data, setData, submit, back }) => {
  // State for mobile menu and file upload
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');

  // Allowed file types
  const ALLOWED_FILE_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // Initialize form data with default values
  const [logoError, setLogoError] = useState('');
  // Controls when to actively show errors without clicking Save/Continue
  const [showErrors, setShowErrors] = useState(false);
  const [formData, setFormData] = useState({
    // Clinic Details
    clinicType: data.clinicType || '',
    specialties: data.specialties || [],
    additionalServices: data.additionalServices || [],
    showCustomSpecialty: data.showCustomSpecialty || false,
    customSpecialty: data.customSpecialty || '',
    showCustomFacility: data.showCustomFacility || false,
    customFacility: data.customFacility || '',
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

  const [additionalService, setAdditionalService] = useState('');
  const [activeSection, setActiveSection] = useState('clinic-details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  // Restore active section on mount (so refresh doesn't jump to first inner section)
  useEffect(() => {
    const savedSection = sessionStorage.getItem('advancedClinicActiveSection');
    if (savedSection) {
      setActiveSection(savedSection);
    }
    // Also restore any saved form data backup if present
    try {
      const savedForm = sessionStorage.getItem('advancedClinicFormData');
      if (savedForm) {
        const parsed = JSON.parse(savedForm);
        if (parsed && typeof parsed === 'object') {
          setFormData(prev => ({ ...prev, ...parsed }));
        }
      }
    } catch (_) {
      // ignore JSON/storage errors
    }
  }, []);

  // Persist active section when it changes
  useEffect(() => {
    sessionStorage.setItem('advancedClinicActiveSection', activeSection);
  }, [activeSection]);

  // Sync local formData to parent formData and persist locally for resilience
  useEffect(() => {
    // Push changes upward so the shared signup sessionStorage (in pages/signUp.jsx) captures them
    if (typeof setData === 'function') {
      setData(prev => ({ ...(prev || {}), ...formData }));
    }
    // Optional: keep a local backup to guard against any timing issues
    try {
      // Exclude transient blob/object URL fields and file previews from persistence
      const sanitized = Object.fromEntries(
        Object.entries(formData).filter(([key]) => !key.endsWith('Preview') && !key.endsWith('Url'))
      );
      sessionStorage.setItem('advancedClinicFormData', JSON.stringify(sanitized));
    } catch (_) {
      // ignore storage errors
    }
  }, [formData, setData]);

  // Clinic types and other options
  const clinicTypes = [
    'General Clinic',
    'Specialty Clinic',
    'Diagnostic Center',
    'Hospital / Medical Center'
  ];

  const specialties = [
    'Alternative Medicine',
    'Cardiology',
    'Dental',
    'Dermatology',
    'Endocrinology',
    'ENT',
    'Gastroenterology',
    'Gynecology',
    'Hematology',
    'Nephrology',
    'Neurology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Pulmonology',
    'Rheumatology',
    'Urology',
    'None',
    'Other'
  ];

  // Handle phone number input with validation
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    // Only allow numbers and +, limit to 15 characters, must start with +
    if (value === '' || /^\+?[0-9]{0,14}$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        phone: value
      }));
    }
  };

    // Handle phone number input with validation
  const handleEmergencyPhoneChange = (e) => {
    const { value } = e.target;
    // Only allow numbers and +, limit to 15 characters, must start with +
    if (value === '' || /^\+?[0-9]{0,14}$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        emergencyPhone: value
      }));
    }
  };

 

  // Validate file type and size
  const validateFile = (file) => {
    setFileError('');

    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError('Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file.');
      return false;
    }

    // Check file size (5MB)
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File is too large. Maximum size is 5MB.');
      return false;
    }

    return true;
  };

  // Handle file selection
  const handleFileSelect = (file, name = 'verificationDocument') => {
    if (!file) return;

    // Clear any previous errors
    if (name === 'logo') {
      setLogoError('');
    } else {
      setFileError('');
    }

    // Validate file
    if (name === 'logo') {
      // Special validation for logo
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setLogoError('Invalid file type. Please upload a PNG, JPG, or WebP image.');
        // Reset file input
        const fileInput = document.getElementById('logo-upload');
        if (fileInput) fileInput.value = '';
        return;
      }

      if (file.size > maxSize) {
        setLogoError('File is too large. Maximum size is 5MB.');
        // Reset file input
        const fileInput = document.getElementById('logo-upload');
        if (fileInput) fileInput.value = '';
        return;
      }
    } else if (!validateFile(file)) {
      // For other file types (verification documents)
      const fileInput = document.getElementById('verification-document');
      if (fileInput) fileInput.value = '';
      return;
    }

    // Revoke any previous object URLs to avoid leaks
    try {
      const prevPreview = formData[`${name}Preview`];
      const prevUrl = formData[`${name}Url`];
      if (prevPreview) URL.revokeObjectURL(prevPreview);
      if (prevUrl) URL.revokeObjectURL(prevUrl);
    } catch (_) {
      // ignore revoke errors
    }

    // Create a preview URL for images
    const filePreview = file.type.startsWith('image/')
      ? URL.createObjectURL(file)
      : null;

    // For PDFs, create an object URL for preview
    const fileUrl = file.type === 'application/pdf'
      ? URL.createObjectURL(file)
      : filePreview;

    setFormData(prev => ({
      ...prev,
      [name]: file,
      [`${name}Preview`]: filePreview,
      [`${name}Url`]: fileUrl,
      [`${name}Name`]: file.name,
      [`${name}Type`]: file.type
    }));
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, type, files, value, checked } = e.target;

    if (type === 'file' && files && files[0]) {
      handleFileSelect(files[0], name);
      return;
    }

    // Handle checkbox inputs
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }

    // Handle all other input types
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSpecialty = (specialty) => {
    const newSpecialties = [...(formData.specialties || [])];
    const index = newSpecialties.indexOf(specialty);

    if (index === -1) {
      if (specialty === 'Other') {
        setFormData(prev => ({
          ...prev,
          showCustomSpecialty: true,
          specialties: [...newSpecialties.filter(s => s !== 'None' && s !== 'Other'), 'Other']
        }));
      } else if (specialty === 'None') {
        setFormData(prev => ({
          ...prev,
          specialties: ['None'],
          showCustomSpecialty: false,
          customSpecialty: ''
        }));
      } else {
        const updated = [...newSpecialties.filter(s => s !== 'None' && s !== 'Other'), specialty];
        setFormData(prev => ({
          ...prev,
          specialties: updated,
          showCustomSpecialty: false
        }));
      }
    } else {
      if (specialty === 'Other') {
        setFormData(prev => ({
          ...prev,
          showCustomSpecialty: false,
          specialties: newSpecialties.filter(s => s !== 'Other'),
          customSpecialty: ''
        }));
      } else {
        newSpecialties.splice(index, 1);
        setFormData(prev => ({
          ...prev,
          specialties: newSpecialties
        }));
      }
    }
  };

  const toggleFacility = (facility) => {
    const newFacilities = [...(formData.facilities || [])];
    const index = newFacilities.indexOf(facility);

    if (index === -1) {
      if (facility === 'Other') {
        setFormData(prev => ({
          ...prev,
          showCustomFacility: true,
          facilities: [...newFacilities.filter(f => f !== 'None' && f !== 'Other'), 'Other']
        }));
      } else if (facility === 'None') {
        setFormData(prev => ({
          ...prev,
          facilities: ['None'],
          showCustomFacility: false,
          customFacility: ''
        }));
      } else {
        const updated = [...newFacilities.filter(f => f !== 'None' && f !== 'Other'), facility];
        setFormData(prev => ({
          ...prev,
          facilities: updated,
          showCustomFacility: false
        }));
      }
    } else {
      if (facility === 'Other') {
        setFormData(prev => ({
          ...prev,
          showCustomFacility: false,
          facilities: newFacilities.filter(f => f !== 'Other'),
          customFacility: ''
        }));
      } else {
        newFacilities.splice(index, 1);
        setFormData(prev => ({
          ...prev,
          facilities: newFacilities
        }));
      }
    }
  };

  const addCustomSpecialty = () => {
    if (formData.customSpecialty.trim() && !formData.specialties.includes(formData.customSpecialty)) {
      const updatedSpecialties = [
        ...formData.specialties.filter(s => s !== 'Other'),
        formData.customSpecialty.trim()
      ];

      setFormData(prev => ({
        ...prev,
        specialties: updatedSpecialties,
        customSpecialty: ''
        // Don't close the input box after adding a custom specialty
        // The input box will stay open until the 'Other' tag is clicked again
      }));
    }
  };

  const addCustomFacility = () => {
    if (formData.customFacility.trim() && !formData.facilities.includes(formData.customFacility)) {
      const updatedFacilities = [
        ...formData.facilities.filter(f => f !== 'Other'),
        formData.customFacility.trim()
      ];

      setFormData(prev => ({
        ...prev,
        facilities: updatedFacilities,
        customFacility: ''
        // Don't close the input box after adding a custom facility
        // The input box will stay open until the 'Other' tag is clicked again
      }));
    }
  };

  // Helper function to add error message
  const addError = (message) => {
    setErrors(prev => [...prev.filter(e => e.message !== message), { id: Date.now(), message }]);
  };

  // Validate current section
  const validateCurrentSection = () => {
    // Clear any existing errors for this section
    if (errors.length > 0) {
      setErrors([]);
    }

    let hasErrors = false;
    const newErrors = [];

    // Clinic Details Section
    if (activeSection === 'clinic-details') {
      if (!formData.clinicType) {
        newErrors.push('Please select a clinic type');
        hasErrors = true;
      }

      if (formData.specialties.length === 0) {
        newErrors.push('Please select at least one specialty');
        hasErrors = true;
      }

      // Year Established validation (if provided)
      if (formData.yearEstablished) {
        const currentYear = new Date().getFullYear();
        const year = parseInt(formData.yearEstablished);

        if (isNaN(year) || year < 1800 || year > currentYear) {
          newErrors.push(`Year established must be between 1800 and ${currentYear}`);
          hasErrors = true;
        }
      }
    }

    // Location & Contact Section
    if (activeSection === 'location-contact') {
      if (!formData.street) {
        newErrors.push('Street address is required');
        hasErrors = true;
      }

      if (!formData.city) {
        newErrors.push('City is required');
        hasErrors = true;
      }

      if (!formData.province) {
        newErrors.push('Province/State is required');
        hasErrors = true;
      }

      if (!formData.phone) {
        newErrors.push('Phone number is required');
        hasErrors = true;
      } else if (!/^[0-9+]{8,15}$/.test(formData.phone)) {
        newErrors.push('Phone number must be 8-15 digits and can only contain numbers and +');
        hasErrors = true;
      }

 
        if (formData.emergencyPhone) {
        if (formData.emergencyPhone === formData.phone) {
          newErrors.push('Emergency contact number must be different from primary phone number');
          hasErrors = true;
        }

        if (!/^[0-9+]{8,15}$/.test(formData.emergencyPhone)) {
        newErrors.push('Phone number must be 8-15 digits and can only contain numbers and +');
        hasErrors = true;
      }

        }
      
       
    }

    // Operating Details Section
    if (activeSection === 'operating-details') {
      if (!formData.openingTime) {
        newErrors.push('Opening time is required');
        hasErrors = true;
      }

      if (!formData.closingTime) {
        newErrors.push('Closing time is required');
        hasErrors = true;
      }

      if (formData.workingDays.length === 0) {
        newErrors.push('Please select at least one working day');
        hasErrors = true;
      }
    }

    // Legal & Verification Section
    if (activeSection === 'legal-verification') {
      if (!formData.registrationNumber) {
        newErrors.push('Clinic registration/license number is required');
        hasErrors = true;
      }

      if (!formData.verificationDocument) {
        newErrors.push('Please upload verification document');
        hasErrors = true;
      }
    }

    // Facilities & Services Section
    if (activeSection === 'facilities-services') {
      // Validate Languages Spoken
      if (!formData.languages || formData.languages.length === 0) {
        newErrors.push('Please select at least one language');
        hasErrors = true;
      }

      // Validate Available Facilities
      if (!formData.facilities || formData.facilities.length === 0) {
        newErrors.push('Please select at least one facility');
        hasErrors = true;
      }
    }

    // Return all errors collected for the active section
    return newErrors;
  };

  // Handle navigation to next section
  const goToNextSection = (skipValidation = false) => {
    if (!skipValidation) {
      const sectionErrors = validateCurrentSection();
      if (sectionErrors.length > 0) {
        setErrors(sectionErrors.map((message, idx) => ({ id: `${activeSection}-${idx}-${Date.now()}`, message })));
        setShowErrors(true);
        return false;
      }
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

    // Clear any previous errors on successful navigation
    if (errors.length > 0) {
      setErrors([]);
    }
    setShowErrors(false);
    return true;
  };


  // Handle form submission
 const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowErrors(false);
    setErrors([]);

    try {
        // If it's the last section, validate all sections before final submission
        if (activeSection === navItems[navItems.length - 1].id) {
            // Validate all sections
            for (const section of navItems) {
                setActiveSection(section.id);
                const sectionErrors = validateCurrentSection();
                if (sectionErrors.length > 0) {
                    setErrors(sectionErrors.map((message, idx) => ({ 
                        id: `${section.id}-${idx}-${Date.now()}`, 
                        message 
                    })));
                    const element = document.getElementById(section.id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    setShowErrors(true);
                    setIsSubmitting(false);
                    return;
                }
            }
            
            // If validation passes, submit the form
            await submit();
            // Clear local storage only after successful submission
            // sessionStorage.removeItem('signupState');
            // sessionStorage.removeItem('advancedClinicFormData');
            // sessionStorage.removeItem('advancedClinicActiveSection');
        } else {
            // Go to next section if not the last section
            goToNextSection();
        }
    } catch (error) {
        console.error('Form submission error:', error);
        // Optionally show error to user
        setErrors([{ 
            id: `submit-error-${Date.now()}`, 
            message: 'Failed to submit form. Please try again.' 
        }]);
        setShowErrors(true);
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
    { id: 'facilities-services', icon: ClipboardList, label: 'Facilities & Services' },
    { id: 'branding-preferences', icon: Palette, label: 'Branding & Preferences' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
  ];

  // Days of the week with abbreviations and full names
  const daysOfWeek = [
    { short: 'Mon', full: 'Monday' },
    { short: 'Tue', full: 'Tuesday' },
    { short: 'Wed', full: 'Wednesday' },
    { short: 'Thu', full: 'Thursday' },
    { short: 'Fri', full: 'Friday' },
    { short: 'Sat', full: 'Saturday' },
    { short: 'Sun', full: 'Sunday' }
  ];

  const consultationDurations = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' }
  ];

  const facilities = [
    'Parking', 'Wheelchair Access', 'Pharmacy', 'Lab Services',
    'X-ray', 'Ultrasound', 'ECG', 'Ambulance', 'Wifi', 'Cafeteria',
    'Other'
  ];

  const languages = [
    'Sinhala', 'Tamil', 'English', 'Hindi', 'Arabic', 'Other'
  ];

  // Check if section is active
  const isSectionActive = (sectionId) => activeSection === sectionId;

  // Only show live errors when:
  // - User pressed Save & Continue and there are errors (showErrors = true)
  // - Or user started filling specific fields that warrant immediate feedback
  const shouldRealtimeValidate = () => {
    if (showErrors) return true;
    // Field-specific immediate validation
    if (activeSection === 'location-contact' && formData.phone) return true;
    if (activeSection === 'clinic-details' && formData.yearEstablished) return true;
    return false;
  };

  // Revalidate current section on input changes based on the above rules
  useEffect(() => {
    if (!shouldRealtimeValidate()) {
      // Do not show errors proactively; clear any lingering errors for a clean UI
      if (errors.length > 0) setErrors([]);
      return;
    }

    const sectionErrors = validateCurrentSection();
    if (sectionErrors.length > 0) {
      setErrors(sectionErrors.map((message, idx) => ({ id: `${activeSection}-${idx}`, message })));
    } else if (errors.length > 0) {
      setErrors([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, activeSection, showErrors]);

  return (
    <div className="h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col overflow-hidden">
      <style>{`
        /* Style the time picker icon */
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(1) brightness(2);
        }
        
        /* For Firefox */
        input[type="time"] {
          color-scheme: dark;
        }
      `}</style>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50 z-20 shrink-0">
        <div className="h-full w-full flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <button
              onClick={back}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg hover:bg-slate-700/60 transition-all duration-200 group "
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-md font-bold text-gray-300 group-hover:text-white transition-colors">
                Back
              </span>
            </button>

          </div>
          <div className="flex items-center space-x-2  px-4 py-1 ">
            <Building2 className="h-12 w-12 text-blue-400" />
            <span className="font-medium text-2xl">Clinic Profile</span>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>
 

      <div className="flex flex-1 pt-20 overflow-y-auto">
        {/* Sidebar Navigation - Fixed on desktop */}
        <aside className={`fixed md:fixed top-20 bottom-0 left-0 w-70 bg-slate-800/90 backdrop-blur-sm border-r border-slate-700/50 overflow-y-auto transition-transform duration-300 ease-in-out z-10 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          {/* Page Indicator */}
          <div className="px-6 py-4 border-b border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-400">Step {navItems.findIndex(item => item.id === activeSection) + 1} of {navItems.length}</span>
              <span className="text-xs font-medium text-blue-400">
                {Math.round(((navItems.findIndex(item => item.id === activeSection) + 1) / navItems.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${((navItems.findIndex(item => item.id === activeSection) + 1) / navItems.length) * 100}%`
                }}
              />
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium cursor-default ${activeSection === item.id
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-gray-300'
                  }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="text-left flex-1">{item.label}</span>
                {activeSection === item.id && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                )}
              </div>
            ))}
          </nav>
          
          {/* main Step Indicator */}
          <div className="border-t border-slate-700/50 my-4 mt-40 w-full"></div>
          <div className="w-full flex justify-center mb-5 mt 4 z-20">
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
        </aside>

        {/* Mobile Navigation - Now part of the main header */}

        {/* Error Messages */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {errors.map(error => (
            <motion.div
              key={error.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-64"
            >
              <span className="flex-1">{error.message}</span>
              <button
                onClick={() => setErrors(prev => prev.filter(e => e.id !== error.id))}
                className="ml-4 text-white hover:text-gray-200 text-xl font-bold"
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>

        {/* Main Content - Scrollable area */}
        <main className="flex-1 p-4 md:p-8 w-full md:ml-64  flex justify-center overflow-y-auto">
          <div className="w-full max-w-4xl flex flex-col">

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                    label={
                      <span className="flex items-center mb-1.5">
                        <BriefcaseMedical className="w-4 h-4 text-white mr-1.5" />
                        Clinic Type <span className="text-red-500 ml-1">*</span>
                      </span>
                    }
                    name="clinicType"
                    value={formData.clinicType || ''}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        clinicType: e.target.value
                      }));
                    }}
                    options={[
                      { value: '', label: 'Select clinic type', disabled: true },
                      ...clinicTypes.map(type => ({ value: type, label: type }))
                    ]}
                    icon={BriefcaseMedical}
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <Stethoscope className="w-4 h-4 text-white mr-1.5" />
                      Specialties Offered <div className="group relative">
                        <Info className="w-3.5 h-3.5 text-gray-400 cursor-help ml-1" />
                        <div className="absolute left-0 bottom-full mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          Select all medical specialties your clinic offers
                        </div>
                      </div><span className="text-red-500 ml-1">*</span>

                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {specialties.map((specialty, index) => (
                        <motion.button
                          key={specialty}
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleSpecialty(specialty)}
                          className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 transition-all ${formData.specialties?.includes(specialty) || (specialty === 'Other' && formData.showCustomSpecialty)
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5 hover:border-white/10'
                            }`}
                          style={{ transitionDelay: `${index * 20}ms` }}
                        >
                          {specialty}
                          {formData.specialties?.includes(specialty) && !['None', 'Other'].includes(specialty) && (
                            <X className="w-3.5 h-3.5" />
                          )}
                        </motion.button>
                      ))}

                      {/* Render selected custom specialties */}
                      {formData.specialties?.filter(s => !specialties.includes(s) && s !== 'None' && s !== 'Other').map((specialty, index) => (
                        <motion.div
                          key={`custom-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        >
                          {specialty}
                          <button
                            type="button"
                            onClick={() => toggleSpecialty(specialty)}
                            className="opacity-70 hover:opacity-100"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                    {formData.showCustomSpecialty && (
                      <div className="mt-2 flex gap-1">
                        <input
                          type="text"
                          value={formData.customSpecialty || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, customSpecialty: e.target.value }))}
                          placeholder="Enter specialty name"
                          className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={addCustomSpecialty}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>

                  <InputField
                    label="Year Established"
                    name="yearEstablished"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.yearEstablished}
                    onChange={handleChange}
                    placeholder="e.g. 2010"
                    icon={CalendarDays}
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <FileText className="w-4 h-4 text-white mr-1.5" />
                      Clinic Description
                    </label>
                    <textarea
                      name="clinicDescription"
                      value={formData.clinicDescription}
                      onChange={handleChange}
                      placeholder="A brief description of your clinic, services, and what makes you unique..."
                      rows={4}
                      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2.5 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200"
                      required
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
                      label={<><Map className="w-4 h-4 text-white mr-1.5" /> Street Address</>}
                      name="street"
                      type="text"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="123 Medical Center Drive"
                      icon={Map}
                      required
                    />
                    <InputField
                      label={<><Map className="w-4 h-4 text-white mr-1.5" /> City</>}
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Colombo"
                      icon={Map}
                      required
                    />
                    <InputField
                      label={<><Map className="w-4 h-4 text-white mr-1.5" /> Province/State</>}
                      name="province"
                      type="text"
                      value={formData.province}
                      onChange={handleChange}
                      placeholder="e.g. Western"
                      icon={Map}
                      required
                    />
                    <div className="space-y-1.5 mt-1.5">
                      <label className="text-sm font-medium text-gray-300 flex items-center">
                        <MapPin className="w-4 h-4 text-white mr-1.5" />
                        Google Maps Location 
                      </label>
                      <div className="relative">
                        <div className="flex rounded-md shadow-sm">
                          <div className="relative flex items-stretch grow focus-within:z-10">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="url"
                              name="googleMapsLink"
                              value={formData.googleMapsLink || ''}
                              onChange={handleChange}
                              placeholder="https://maps.google.com/..."
                              className="block w-full rounded-l-md border-0 py-2.5 pl-10 text-white bg-slate-800/50 border-slate-700/50 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all autofill:bg-slate-800/50"
                              required
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (formData.googleMapsLink) {
                                window.open(formData.googleMapsLink, '_blank');
                              }
                            }}
                            disabled={!formData.googleMapsLink}
                            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-slate-700/50 text-sm font-medium rounded-r-md text-gray-300 bg-slate-800/50 hover:bg-slate-700/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-2 flex space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              const mapsUrl = 'https://www.google.com/maps/place/';
                              window.open(mapsUrl, '_blank');
                            }}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50"
                          >
                            📍 Open Location Picker
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (navigator.geolocation) {
                                setFormData(prev => ({ ...prev, googleMapsLink: 'Getting location...' }));
                                navigator.geolocation.getCurrentPosition(
                                  (position) => {
                                    const { latitude, longitude } = position.coords;
                                    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                                    setFormData(prev => ({
                                      ...prev,
                                      googleMapsLink: mapsUrl
                                    }));
                                  },
                                  (error) => {
                                    console.error('Error getting location:', error);
                                    let errorMessage = 'Error getting your location. Please enter it manually.';
                                    if (error.code === error.PERMISSION_DENIED) {
                                      errorMessage = 'Location access was denied. Please enable location services or enter the address manually.';
                                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                                      errorMessage = 'Location information is unavailable. Please try again or enter the address manually.';
                                    } else if (error.code === error.TIMEOUT) {
                                      errorMessage = 'The request to get your location timed out. Please try again.';
                                    }
                                    addError(errorMessage);
                                    setFormData(prev => ({ ...prev, googleMapsLink: '' }));
                                  },
                                  {
                                    enableHighAccuracy: true,
                                    timeout: 15000,
                                    maximumAge: 0
                                  }
                                );
                              } else {
                                addError('Geolocation is not supported by your browser. Please enter the location manually.');
                              }
                            }}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-400 bg-green-500/10 hover:bg-green-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500/50 transition-colors duration-200"
                            title="Click to use your current location"
                          >
                            📍 Use Current Location
                          </button>
                        </div>
                        {formData.googleMapsLink && (
                          <div className="mt-2 text-xs text-gray-400">
                            <p>Preview: <span className="text-blue-400 break-all">{formData.googleMapsLink}</span></p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label={<><PhoneCall className="w-4 h-4 text-white mr-1.5" /> Phone Number</>}
                      name="phone"
                      type="tel"
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="e.g. +94 11 234 5678"
                      icon={PhoneCall}
                      required
                    />
                    <InputField
                      label={<><AlertCircle className="w-4 h-4 text-white mr-1.5" /> Emergency Contact</>}
                      name="emergencyPhone"
                      type="tel"
                      pattern="[0-9]{10}"
                      value={formData.emergencyPhone}
                      onChange={handleEmergencyPhoneChange}
                      placeholder="e.g. +94 76 123 4567"
                      icon={AlertCircle}
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
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CalendarDays className="w-4 h-4 text-white mr-2" />
                        <label className="text-sm font-medium text-gray-300">
                          Working Days <span className="text-red-500">*</span>
                        </label>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                        <div className="grid grid-cols-7 gap-3">
                          {daysOfWeek.map((day) => {
                            const isSelected = formData.workingDays.includes(day.full);
                            return (
                              <button
                                key={day.full}
                                type="button"
                                onClick={() => {
                                  const newDays = [...formData.workingDays];
                                  const dayIndex = newDays.indexOf(day.full);

                                  if (dayIndex === -1) {
                                    newDays.push(day.full);
                                  } else {
                                    newDays.splice(dayIndex, 1);
                                  }

                                  setFormData(prev => ({
                                    ...prev,
                                    workingDays: newDays
                                  }));
                                }}
                                className={`flex items-center justify-between px-3 py-1 rounded-md transition-colors duration-200 w-full ${isSelected
                                    ? 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                                    : 'bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 text-gray-300 hover:border-slate-600/70'
                                  }`}
                                title={day.full}
                              >
                                <span className="text-sm font-medium">{day.short}</span>
                                {isSelected && (
                                  <Check className="h-3.5 w-3.5 text-blue-400" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {formData.workingDays.length > 0 ? (
                          <p className="text-xs text-gray-400 mt-3">
                            Selected: {formData.workingDays.sort((a, b) => {
                              const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                              return days.indexOf(a) - days.indexOf(b);
                            }).join(', ')}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500 italic mt-3">
                            No days selected. Please select at least one working day.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label={
                          <span className="flex items-center">
                            <Sunrise className="w-4 h-4 text-white mr-1.5" />
                            Opening Time <span className="text-red-500 ml-1">*</span>
                          </span>
                        }
                        name="openingTime"
                        type="time"
                        value={formData.openingTime}
                        onChange={handleChange}
                        icon={Sunrise}
                      />
                      <InputField
                        label={
                          <span className="flex items-center">
                            <Sunset className="w-4 h-4 text-white mr-1.5" />
                            Closing Time <span className="text-red-500 ml-1">*</span>
                          </span>
                        }
                        name="closingTime"
                        type="time"
                        value={formData.closingTime}
                        onChange={handleChange}
                        icon={Sunset}
                      />
                    </div>

                    <SelectField
                      label={
                        <span className="flex items-center mb-1.5">
                          <Clock className="w-4 h-4 text-white mr-1.5" />
                          Average Consultation Duration
                        </span>
                      }
                      name="consultationDuration"
                      value={formData.consultationDuration}
                      onChange={handleChange}
                      options={consultationDurations}
                      icon={Clock}
                    />

                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <UserCheck className="w-4 h-4 text-white mr-2" />
                          <span className="text-sm font-medium text-gray-300">Walk-in Availability</span>
                          <div className="group relative ml-1">
                            <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                            <div className="absolute left-0 bottom-full mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                              Indicate if patients can visit without an appointment
                            </div>
                          </div>
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 ml-6 mt-2">
                        <label className="inline-flex items-center group cursor-pointer">
                          <div className={`relative w-5 h-5 rounded-full border-2 ${formData.walkInAvailable === true ? 'border-blue-500 bg-blue-500' : 'border-gray-500'} transition-colors duration-200 flex items-center justify-center`}>
                            {formData.walkInAvailable === true && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                            <input
                              type="radio"
                              name="walkInAvailable"
                              checked={formData.walkInAvailable === true}
                              onChange={() => setFormData(prev => ({
                                ...prev,
                                walkInAvailable: true
                              }))}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </div>
                          <span className={`ml-3 text-sm ${formData.walkInAvailable === true ? 'text-white' : 'text-gray-400'}`}>
                            Yes, we accept walk-ins
                          </span>
                        </label>
                        
                        <label className="inline-flex items-center group cursor-pointer">
                          <div className={`relative w-5 h-5 rounded-full border-2 ${formData.walkInAvailable === false ? 'border-blue-500 bg-blue-500' : 'border-gray-500'} transition-colors duration-200 flex items-center justify-center`}>
                            {formData.walkInAvailable === false && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                            <input
                              type="radio"
                              name="walkInAvailable"
                              checked={formData.walkInAvailable === false}
                              onChange={() => setFormData(prev => ({
                                ...prev,
                                walkInAvailable: false
                              }))}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </div>
                          <span className={`ml-3 text-sm ${formData.walkInAvailable === false ? 'text-white' : 'text-gray-400'}`}>
                            No, appointment only
                          </span>
                        </label>
                      </div>
                      
                      {formData.walkInAvailable === true && (
                        <div className="mt-2 ml-6 p-3 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                          <p className="text-xs text-blue-300">
                            Great! Patients will know they can visit your clinic without an appointment.
                          </p>
                        </div>
                      )}
                      
                      {formData.walkInAvailable === false && (
                        <div className="mt-2 ml-6 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                          <p className="text-xs text-gray-400">
                            Patients will be informed that appointments are required for all visits.
                          </p>
                        </div>
                      )}
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
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label={
                          <span className="flex items-center">
                            <Users className="w-4 h-4 text-white mr-1.5" />
                            Number of Doctors
                          </span>
                        }
                        name="numberOfDoctors"
                        type="number"
                        min="0"
                        value={formData.numberOfDoctors}
                        onChange={handleChange}
                        placeholder="e.g. 5"
                        icon={Users}
                      />
                      <InputField
                        label={
                          <span className="flex items-center">
                            <Users className="w-4 h-4 text-white mr-1.5" />
                            Number of Staff
                          </span>
                        }
                        name="numberOfStaff"
                        type="number"
                        min="0"
                        value={formData.numberOfStaff}
                        onChange={handleChange}
                        placeholder="e.g. 10"
                        icon={Users}
                      />
                    </div>

                    <div className="space-y-3 pt-4">
                      <div className="text-sm font-medium text-gray-300 flex items-center">
                        <UserPlus className="w-4 h-4 text-white mr-1.5" />
                        Add Lead Doctor
                      </div>
                      <div className="pl-3 border-l-2 border-slate-700 space-y-3">
                        <InputField
                          label={
                            <span className="flex items-center">
                              <User className="w-4 h-4 text-white mr-1.5" />
                              Doctor Name
                            </span>
                          }
                          name="leadDoctorName"
                          type="text"
                          value={formData.leadDoctorName || ''}
                          onChange={handleChange}
                          placeholder="Enter doctor's full name"
                          className="bg-slate-800/50"
                          icon={User}
                        />
                        <InputField
                          label={
                            <span className="flex items-center">
                              <BriefcaseMedical className="w-4 h-4 text-white mr-1.5" />
                              Specialty
                            </span>
                          }
                          name="leadDoctorSpecialty"
                          type="text"
                          value={formData.leadDoctorSpecialty || ''}
                          onChange={handleChange}
                          placeholder="Enter doctor's specialty"
                          className="bg-slate-800/50"
                          icon={BriefcaseMedical}
                        />
                        <InputField
                          label={
                            <span className="flex items-center">
                              <FileSignature className="w-4 h-4 text-white mr-1.5" />
                              Registration Number
                            </span>
                          }
                          name="leadDoctorRegistration"
                          type="text"
                          value={formData.leadDoctorRegistration || ''}
                          onChange={handleChange}
                          placeholder="Enter registration number"
                          className="bg-slate-800/50"
                          icon={FileSignature}
                        />
                      </div>
                      <p className="text-xs text-gray-400 pl-3">
                        You can add more doctors later in your profile
                      </p>
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
                    label={
                      <span className="flex items-center">
                        <FileSignature className="w-4 h-4 text-white mr-1.5" />
                        Clinic Registration/License Number
                      </span>
                    }
                    name="registrationNumber"
                    type="text"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g. MOH/CL/2023/1234"
                    icon={FileSignature}
                    required
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <FileCheck2 className="w-4 h-4 text-white mr-1.5" />
                      Verification Document <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div
                      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${dragActive
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700/50 hover:border-slate-600/70'
                        }`}
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                    >
                      {formData.verificationDocument ? (
                        <div className="text-center w-full">
                          {formData.verificationDocumentType?.startsWith('image/') ? (
                            <div className="mb-3 max-h-40 overflow-hidden rounded-lg border border-slate-700/50">
                              <img
                                src={formData.verificationDocumentPreview}
                                alt="Preview"
                                className="w-full h-auto max-h-40 object-contain mx-auto"
                              />
                            </div>
                          ) : formData.verificationDocumentType === 'application/pdf' ? (
                            <div className="flex flex-col items-center justify-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 mb-3">
                              <FileText className="h-16 w-16 text-blue-400 mb-2" />
                              <p className="text-xs text-blue-300 font-medium truncate max-w-full">
                                {formData.verificationDocumentName}
                              </p>
                              <span className="text-xs text-gray-400 mt-1">PDF Document</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 mb-3">
                              <FileText className="h-10 w-10 text-blue-400" />
                            </div>
                          )}
                          <div className="mt-2 flex justify-center space-x-3">
                            <button
                              type="button"
                              onClick={() => {
                                // Revoke object URLs to avoid memory leaks
                                if (formData.verificationDocumentPreview) {
                                  URL.revokeObjectURL(formData.verificationDocumentPreview);
                                }
                                if (formData.verificationDocumentUrl) {
                                  URL.revokeObjectURL(formData.verificationDocumentUrl);
                                }

                                setFormData(prev => ({
                                  ...prev,
                                  verificationDocument: null,
                                  verificationDocumentName: '',
                                  verificationDocumentPreview: null,
                                  verificationDocumentUrl: null,
                                  verificationDocumentType: ''
                                }));

                                // Reset the file input
                                const fileInput = document.getElementById('verification-document');
                                if (fileInput) fileInput.value = '';
                              }}
                              className="text-sm text-red-400 hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1 text-center">
                          <svg
                            className={`mx-auto h-12 w-12 ${dragActive ? 'text-blue-400' : 'text-gray-400'}`}
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
                          <div className="flex flex-col items-center text-sm text-gray-400">
                            <div className="flex">
                              <label
                                htmlFor="verification-document"
                                className="relative cursor-pointer bg-slate-800/50 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                              >
                                <span>Choose a file</span>
                                <input
                                  id="verification-document"
                                  name="verificationDocument"
                                  type="file"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  className="sr-only"
                                  onChange={handleChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              PDF, JPG, PNG up to 5MB
                            </p>
                            {fileError && (
                              <p className="text-xs text-red-400 mt-2">
                                {fileError}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
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
                  icon={ClipboardList}
                >
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <ClipboardList className="w-4 h-4 text-white mr-1.5" />
                      Available Facilities <div className="group relative">
                        <Info className="w-3.5 h-3.5 text-gray-400 cursor-help ml-1" />
                        <div className="absolute left-0 bottom-full mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          Select all facilities your clinic offers
                        </div>
                      </div><span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {facilities.map((facility, index) => (
                        <motion.button
                          key={facility}
                          type="button"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleFacility(facility)}
                          className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 transition-all ${formData.facilities?.includes(facility) || (facility === 'Other' && formData.showCustomFacility)
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5 hover:border-white/10'
                            }`}
                          style={{ transitionDelay: `${index * 20}ms` }}
                        >
                          {facility}
                          {formData.facilities?.includes(facility) && facility !== 'Other' && facility !== 'None' && (
                            <X className="w-3.5 h-3.5" />
                          )}
                        </motion.button>
                      ))}

                      {/* Render selected custom facilities */}
                      {formData.facilities?.filter(f => !facilities.includes(f) && f !== 'None' && f !== 'Other').map((facility, index) => (
                        <motion.div
                          key={`custom-facility-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="px-3 py-1.5 text-sm rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5"
                        >
                          {facility}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.facilities.filter(f => f !== facility);
                              setFormData(prev => ({
                                ...prev,
                                facilities: updated
                              }));
                            }}
                            className="text-blue-200 hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {formData.showCustomFacility && (
                      <div className="mt-2 flex gap-1">
                        <input
                          type="text"
                          value={formData.customFacility}
                          onChange={(e) => setFormData(prev => ({ ...prev, customFacility: e.target.value }))}
                          placeholder="Enter facility name"
                          className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={addCustomFacility}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Languages className="w-4 h-4 text-white mr-2" />
                      <label className="text-sm font-medium text-gray-300">
                        Languages Spoken <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex flex-wrap gap-2">
                        {languages.map((language) => {
                          const isSelected = formData.languages?.includes(language);
                          return (
                            <button
                              key={language}
                              type="button"
                              onClick={() => {
                                const newLanguages = [...(formData.languages || [])];
                                const langIndex = newLanguages.indexOf(language);

                                if (langIndex === -1) {
                                  newLanguages.push(language);
                                } else {
                                  newLanguages.splice(langIndex, 1);
                                }

                                setFormData(prev => ({
                                  ...prev,
                                  languages: newLanguages
                                }));
                              }}
                              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${isSelected
                                  ? 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                                  : 'bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 text-gray-300 hover:border-slate-600/70'
                                }`}
                            >
                              {language}
                            </button>
                          );
                        })}
                      </div>

                      {formData.languages?.length > 0 ? (
                        <p className="text-xs text-gray-400 mt-3">
                          Selected: {formData.languages.sort().join(', ')}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500 italic mt-3">
                          No languages selected. Please select at least one language.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <ClipboardCheck className="w-4 h-4 text-white mr-1.5" />
                      Additional Services
                      <div className="group relative ml-1">
                        <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                        <div className="absolute left-0 bottom-full mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          List any extra services your clinic provides (e.g., home visits, telemedicine, lab tests)
                        </div>
                      </div>
                    </label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <ClipboardCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={additionalService}
                          onChange={(e) => setAdditionalService(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && additionalService.trim()) {
                              e.preventDefault();
                              setFormData(prev => ({
                                ...prev,
                                additionalServices: [...(prev.additionalServices || []), additionalService.trim()]
                              }));
                              setAdditionalService('');
                            }
                          }}
                          placeholder="e.g. Home Visits, Telemedicine"
                          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (additionalService.trim()) {
                            setFormData(prev => ({
                              ...prev,
                              additionalServices: [...(prev.additionalServices || []), additionalService.trim()]
                            }));
                            setAdditionalService('');
                          }
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </button>
                    </div>
                    {formData.additionalServices?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {formData.additionalServices.map((service, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="px-3 py-1.5 text-sm rounded-lg bg-white/5 text-white border border-white/5 hover:border-white/10 flex items-center gap-1.5 transition-colors"
                          >
                            {service}
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  additionalServices: prev.additionalServices.filter((_, i) => i !== index)
                                }));
                              }}
                              className="text-gray-400 hover:text-white focus:outline-none"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
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
                            <img src={formData.logoPreview} alt="Clinic Logo" className="h-full w-full object-cover" />
                          ) : (
                            <Building2 className="h-6 w-6 text-gray-400" />
                          )}
                        </span>
                        <label
                          htmlFor="logo-upload"
                          className="ml-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Upload className="h-4 w-4" />
                          {formData.logo ? 'Change Logo' : 'Upload Logo'}
                          <input
                            id="logo-upload"
                            name="logo"
                            type="file"
                            className="sr-only"
                            accept=".png, .jpg, .jpeg, .webp, image/png, image/jpg, image/jpeg, image/webp"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                handleFileSelect(file, 'logo');
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  logo: null,
                                  logoPreview: null,
                                  logoName: '',
                                  logoType: ''
                                }));
                                setLogoError('');
                              }
                            }}
                          />
                        </label>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Recommended size: 256x256px  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Accepted formats: .png, .jpg, .jpeg or  .webp
                      </p>

                      {logoError && (
                        <p className="text-xs text-red-500 mt-1">
                          {logoError}
                        </p>
                      )}
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
                      <p className="mt-1 text-xs text-gray-500">
                        you choosen color will use for your dashboard
                      </p>
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
                        <p className="text-xs text-gray-400">Receive important alerts via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </FormSection>
              </section>

              {/* Footer with action buttons */}
              <div className=" backdrop-blur-sm py-4 -mx-4 md:mx-0 px-4 md:px-0 border-t border-slate-700 mt-8">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = navItems.findIndex(item => item.id === activeSection);
                      if (currentIndex > 0) {
                        scrollToSection(navItems[currentIndex - 1].id);
                      } else {
                        back();
                      }
                    }}
                    className="flex items-center px-5 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Back</span>
                  </button>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {activeSection !== navItems[navItems.length - 1].id && (
                      <button
                        type="button"
                        onClick={() => goToNextSection(false)}
                        className="group px-8 py-3 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
                      >
                        <span>Save & Continue</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                      </button>
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
            <div className="h-2 md:h-1"></div>
          </div>
        </main>
        <style>{`

         /* Time picker icon styling for all browsers */
  input[type="time"] {
    color-scheme: white;  /* For Firefox */
  }
  
  /* WebKit browsers (Chrome, Safari, newer Edge) */
  input[type="time"]::-webkit-calendar-picker-indicator {
    filter: invert(1) brightness(2) contrast(0.8);
    opacity: 0.9;
  }
  
  /* Firefox */
  input[type="time"]::-moz-calendar-picker-indicator {
    filter: invert(1) brightness(2) contrast(0.8);
    opacity: 0.9;
  }
  
  /* Edge */
  input[type="time"]::-ms-clear {
    color: white;
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
          -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.02) inset !important;
          transition: background-color 5000s ease-in-out 0s;
          caret-color: white;
        }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #1e293b inset !important;
    -webkit-text-fill-color: #f1f5f9 !important;
    transition: background-color 5000s ease-in-out 0s;
  }
      `}</style>
      </div>
    </div>
  );
};

export default StepAdvancedClinic;
