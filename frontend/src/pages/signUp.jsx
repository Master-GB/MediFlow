import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StepRole from "../components/signUp/StepRole";
import StepBasicPatient from "../components/signUp/StepBasicPatient";
import StepBasicClinic from "../components/signUp/StepBasicClinic";
import StepAdvancedPatient from "../components/signUp/StepAdvancedPatient";
import StepAdvancedClinic from "../components/signUp/StepAdvancedClinic";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  const hasMounted = useRef(false);

  // Load saved state on component mount
  useEffect(() => {
    // Skip if we've already mounted
    if (hasMounted.current) return;
    hasMounted.current = true;

    const savedState = sessionStorage.getItem('signupState');
    if (savedState) {
      const { step: savedStep, role: savedRole, formData: savedFormData } = JSON.parse(savedState);
      // Set all states at once to prevent multiple renders
      setStep(parseInt(savedStep, 10) || 1);
      setRole(savedRole || "");
      setFormData(savedFormData || {});
    }
    // Mark as not loading after a small delay to ensure no flash
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      sessionStorage.setItem('signupState', JSON.stringify({ step, role, formData }));
    }
  }, [step, role, formData, isLoading]);

  // Reset signup state
  const resetSignupState = () => {
    sessionStorage.removeItem('signupState');
    sessionStorage.removeItem('advancedClinicFormData');
    sessionStorage.removeItem('advancedClinicActiveSection');
  };

  // Helper function to filter out 'Other' from arrays
  const filterOutOther = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr.filter(item => item !== 'Other');
  };

  // Handle form submission
  const submit = () => {
    if (role === 'patient') {
      // Filter out 'Other' from arrays
      const filteredAllergies = filterOutOther(formData.allergies);
      const filteredMedications = filterOutOther(formData.medications);
      const filteredConditions = filterOutOther(formData.conditions);
      const filteredHealthGoals = filterOutOther(formData.healthGoals);

      // Create the patient data object with only the specified fields
      const patientData = {
        // Basic Information
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        email: formData.email || '',
        password: formData.password || '',
        confirmPassword: formData.confirmPassword || '',
        dateOfBirth: formData.dateOfBirth || '',
        gender: formData.gender || '',
        height: formData.height || '',
        weight: formData.weight || '',
        bmi: formData.bmi || '',

        // Medical Information
        medicalInfo: {
          bloodType: formData.bloodType || '',
          bloodPressure: {
            systolic: formData.bloodPressure?.systolic || '',
            diastolic: formData.bloodPressure?.diastolic || ''
          },
          allergies: filteredAllergies,
          medications: filteredMedications,
          conditions: filteredConditions,
          lifestyleHabits: {
            smoking: formData.smokingStatus || '',
            alcohol: formData.alcoholConsumption || '',
            exercise: formData.activityLevel || '',
            diet: formData.dietaryPreference || ''
          }
        },

        // Health Goals
        healthGoals: filteredHealthGoals,

        // Emergency Contact
        emergencyContact: {
          name: formData.emergencyName || '',
          relationship: formData.emergencyRelationship || '',
          phone: formData.emergencyPhone || ''
        }
      };

      // Log the data in a clean, readable format
      console.log('=== PATIENT DATA FOR DB STORAGE ===');
      console.log(JSON.stringify(patientData, null, 2));
      console.log('===================================');

      // Clear the form state
      sessionStorage.removeItem('signupState');

      // Navigate to the patient dashboard
      navigate('/patient-dashboard');

    } else if (role === 'clinic') {
      // Create the clinic data object with only the specified fields
      const clinicData = {
        // ===== BASIC INFORMATION =====
        basicInfo: {
          clinicName: formData.clinicName || '',
          email: formData.email || '',
          password: formData.password || '',
          confirmPassword: formData.confirmPassword || '',

          // Clinic Details
          clinicType: formData.clinicType || '',
          specialties: Array.isArray(formData.specialties) ? formData.specialties : [],
          yearEstablished: formData.yearEstablished || '',
          clinicDescription: formData.clinicDescription || '',
        },

        // ===== CONTACT & LOCATION =====
        contactInfo: {
          // Primary Address
          address: {
            street: formData.street || '',
            city: formData.city || '',
            province: formData.province || '',
            googleMapsLink: formData.googleMapsLink || ''
          },

          // Contact Numbers
          phone: formData.phone || '',
          emergencyPhone: formData.emergencyPhone || '',
        },

        // ===== OPERATING HOURS =====
        operatingData: {
          // Regular Hours

          workingDays: formData.workingDays || '',
          openingTime: formData.openingTime || '08.00 AM',
          closingTime: formData.closingTime || '05.00 Pm',


          consultationDuration: formData.consultationDuration || '', // in minutes
          walkInAvailable: formData.walkInAvailable || 'false'
        },

        // ===== STAFF & DOCTORS =====
        staffInfo: {
          // Summary
          totalDoctors: formData.numberOfDoctors || 0,
          totalStaff: formData.numberOfStaff || 0,

          // Doctors List
          leadDoctor: {
            leadDoctorName: formData.leadDoctorName || '',
            leadDoctorSpecialty: formData.leadDoctorSpecialty || '',
            leadDoctorRegistration: formData.leadDoctorRegistration || '',
          }


        },

        // ===== FACILITIES & SERVICES =====
        facilities: {
          // Available Facilities
          availableFacilities: Array.isArray(formData.facilities) ? formData.facilities : [
            ''
          ],


          // Additional Services
          additionalServices: Array.isArray(formData.additionalServices) ? formData.additionalServices : [
            ''
          ],

        },

        // ===== LANGUAGES & ACCESSIBILITY =====
        languages: {
          // Languages Spoken
          languages: Array.isArray(formData.languages) ? formData.languages : [
            'Sinhala'
          ],
        },

        // ===== REGISTRATION & COMPLIANCE =====
        registration: {

          registrationNumber: formData.registrationNumber || '',
          verificationDocument: formData.verificationDocument || '',


        },

        // ===== BRANDING & APPEARANCE =====
        branding: {
          // Visual Identity
          logo: formData.logo || '',
          themeColor: formData.themeColor || '#3B82F6',
        },

        // ===== PREFERENCES & SETTINGS =====

        notifications: {
          emailNotifications: formData.emailNotifications || 'false',
          smsNotifications: formData.smsNotifications || 'false'

        },


      };

      // Log the data in a clean, readable format
      console.log('=== CLINIC DATA FOR DB STORAGE ===');
      console.log(JSON.stringify(clinicData, null, 2));
      console.log('==================================');

      // Clear the form state
      sessionStorage.removeItem('signupState');

     // In signUp.jsx, update the navigation line to:
navigate(`/clinic-signup-success?email=${encodeURIComponent(formData.email)}`);
    }
  };

  // Handle start of new signup
  const handleStartSignup = () => {
    resetSignupState();
    navigate('/signup');
  };

  // Navigation functions
  const goToNextStep = (nextStep) => {
    setDirection(1);
    setStep(nextStep);
  };

  const goToPrevStep = (prevStep) => {
    setDirection(-1);
    setStep(prevStep);
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  // Show nothing while loading to prevent flash
  if (isLoading) {
    return <div className="min-h-screen w-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900" />;
  }

  // Render the appropriate step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepRole
            role={role}
            setRole={(newRole) => {
              setRole(newRole);
              setFormData(prev => ({ ...prev, role: newRole }));
            }}
            next={() => goToNextStep(2)}
            onStartSignup={handleStartSignup}
          />
        );
      case 2:
        if (role === "patient") {
          return (
            <StepBasicPatient
              data={formData}
              setData={setFormData}
              next={() => goToNextStep(3)}
              back={() => goToPrevStep(1)}
            />
          );
        } else if (role === "clinic") {
          return (
            <StepBasicClinic
              data={formData}
              setData={setFormData}
              next={() => goToNextStep(3)}
              back={() => goToPrevStep(1)}
            />
          );
        }
        break;
      case 3:
        if (role === "patient") {
          return (
            <StepAdvancedPatient
              data={formData}
              setData={setFormData}
              submit={() => {
                submit();
                resetSignupState();
              }}
              back={() => goToPrevStep(2)}
            />
          );
        } else if (role === "clinic") {
          return (
            <StepAdvancedClinic
              data={formData}
              setData={setFormData}
              submit={() => {
                submit();
                resetSignupState();
              }}
              back={() => goToPrevStep(2)}
            />
          );
        }
        break;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full max-w-screen-2xl mx-auto p-0 m-0 absolute left-0 right-0"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Signup;