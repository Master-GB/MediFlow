import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import StepRole from "../components/signUp/StepRole";
import StepBasicPatient from "../components/signUp/StepBasicPatient";
import StepBasicClinic from "../components/signUp/StepBasicClinic";
import StepAdvancedPatient from "../components/signUp/StepAdvancedPatient";
import StepAdvancedClinic from "../components/signUp/StepAdvancedClinic";
import { useToast } from '../hooks/useToast.js';
import ToastContainer from '../contexts/ToastContainer.jsx';

const Signup = () => {
  const navigate = useNavigate();
  const { toasts, addToast, removeToast, success, toastError, warning, info } = useToast();
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
  const submit = async () => {
    if (role === 'patient') {
      // Filter out 'Other' from arrays
      const filteredAllergies = filterOutOther(formData.allergies);
      const filteredMedications = filterOutOther(formData.medications);
      const filteredConditions = filterOutOther(formData.conditions);
      const filteredHealthGoals = filterOutOther(formData.healthGoals);

      try {

        //for cookie send
        axios.defaults.withCredentials = true

        // 1. AUTH REGISTRATION
        const response = await axios.post('/api/auth/register',
          {
            name: formData.firstName,
            email: formData.email,
            password: formData.password,
            role: 'patient',
          }
        )

        if (response.data.success) {
          // 2. PATIENT PROFILE CREATION
          try {
            const patientProfile = await axios.post('/api/profile/patient-profile-creation', {
              userRef: response.data.user?._id, // Get user ID from auth response
              fullName: `${formData.firstName} ${formData.lastName}`,
              dateOfBirth: formData.dateOfBirth,
              gender: formData.gender,
              height: formData.height,
              weight: formData.weight,
              mobileNumber: formData.mobileNumber,
              bloodType: formData.bloodType,
              medicalInfo: {
                bloodPressure: {
                  systolic: formData.bloodPressure?.systolic,
                  diastolic: formData.bloodPressure?.diastolic
                },
                allergies: filteredAllergies,
                medications: filteredMedications,
                conditions: filteredConditions
              },
              lifestyleHabits: {
                smoking: formData.smokingStatus,
                alcohol: formData.alcoholConsumption,
                exercise: formData.activityLevel,
                diet: formData.dietaryPreference
              },
              healthGoals: filteredHealthGoals,
              emergencyContact: {
                name: formData.emergencyName,
                relationship: formData.emergencyRelationship,
                phone: formData.emergencyPhone
              }
            })

            if (patientProfile.data.success) {
              try {
                const verifyData = await axios.post('/api/auth/send-otp')

                if (verifyData.data.success) {
                  console.log('Patient registration and profile created successfully');
                  sessionStorage.removeItem('signupState');
                  console.log('OTP sending successfully');
                  navigate(`/signUp-verification-code?email=${encodeURIComponent(formData.email)}`);
                }
                else {
                  console.error('OTP sending failed:', verifyData.data.message);
                  toastError('OTP sending failed:', verifyData.data.message);
                  await axios.delete('/api/auth/delete-auth-user/' + response.data.user?._id, {
                    withCredentials: true
                  })
                }
              } catch (Otperror) {
                console.error('OTP sending failed:', Otperror);
                toastError(`OTP sending failed: ${Otperror.response?.data?.message || 'Unknown error'}`)
                await axios.delete('/api/auth/delete-auth-user/' + response.data.user?._id, {
                  withCredentials: true
                })
              }
            } else {
              console.error('Patient profile creation failed:', patientProfile.data.message);
              toastError(`Profile creation failed: ${patientProfile.data.message}`)
              await axios.delete('/api/auth/delete-auth-user/' + response.data.user?._id, {
                withCredentials: true
              })
            }
          } catch (profileError) {
            console.error('Patient profile creation failed:', profileError);
            toastError(`Profile creation failed: ${profileError.response?.data?.message || 'Unknown error'}`)
            await axios.delete('/api/auth/delete-auth-user/' + response.data.user?._id, {
              withCredentials: true
            })
          }
        } else {
          console.error('Patient registration failed:', response.data.message);
          toastError(`Registration failed: ${response.data.message}`);
        }
      } catch (error) {

        if (error.response?.data?.isUserExist) {
          toastError("Registration failed,Email already exists")
          return;
        }

        const errorMessage = error.response?.data?.message || 'Unknown error,please try again';
        toastError(errorMessage)
        return;
      }


    } else if (role === 'clinic') {

      const filterSpecialties = filterOutOther(formData.specialties);
      const filtereAvailableFacilities = filterOutOther(formData.facilities);
      const filtereAdditionalServices = filterOutOther(formData.additionalServices);


      try {
        axios.defaults.withCredentials = true

        // 1. AUTH REGISTRATION
        const response = await axios.post('/api/auth/register',
          {
            name: formData.clinicName,
            email: formData.email,
            password: formData.password,
            role: 'clinic',
          }
        )

        if (response.data.success) {

          try {

            const clinicData = {
              clinicBasicData: {
                clinicName: formData.clinicName,
                clinicType: formData.clinicType,
                specialties: filterSpecialties,
                yearEstablished: parseInt(formData.yearEstablished),
                clinicDescription: formData.clinicDescription,
              },
              contactInfo: {
                phone: formData.phone,
                emergencyPhone: formData.emergencyPhone,
                address: {
                  street: formData.street,
                  city: formData.city,
                  province: formData.province,
                  country: 'Sri Lanka',
                  googleMapsLink: formData.googleMapsLink,
                },
              },
              operatingHours: {
                workingDays: formData.workingDays,
                openingTime: formData.openingTime,
                closingTime: formData.closingTime,
                consultationDuration: parseInt(formData.consultationDuration),
                walkInAvailable: Boolean(formData.walkInAvailable),
              },
              staffInfo: {
                totalDoctors: formData.numberOfDoctors,
                totalStaff: formData.numberOfStaff,
                leadDoctor: {
                  leadDoctorName: formData.leadDoctorName,
                  leadDoctorSpecialty: formData.leadDoctorSpecialty,
                  leadDoctorRegistration: formData.leadDoctorRegistration,
                },
              },
              legalVerification: {
                registrationNumber: formData.registrationNumber,
              },
              facilities: {
                availableFacilities: filtereAvailableFacilities,
                additionalServices: filtereAdditionalServices,
              },
              languages: Array.isArray(formData.languages) ? formData.languages : ['Sinhala'],
              branding: {
                themeColor: formData.themeColor,
              },
              notifications: {
                emailNotifications: Boolean(formData.emailNotifications),
                smsNotifications: Boolean(formData.smsNotifications),
              },
              userRef: response.data.user?._id,
            };



            if (!formData.verificationDocument || formData.verificationDocument === '' || !(formData.verificationDocument instanceof File)) {
              console.log('Verification document missing or invalid - showing error');
              toastError('Registration failed,Verification Document not exists');
              await axios.delete('/api/auth/delete-auth-user/' + response.data.user?._id, {
                withCredentials: true
              })
              return;
            }
            const payload = new FormData();
            payload.append('clinicData', JSON.stringify(clinicData));
            if (formData.logo && formData.logo instanceof File) {
              payload.append('logo', formData.logo);
            }
            if (formData.verificationDocument && formData.verificationDocument instanceof File) {
              payload.append('verificationDocument', formData.verificationDocument);
            }

            const clinicProfile = await axios.post('/api/profile/clinic-profile-creation', payload, {
              withCredentials: true,
            })

            if (clinicProfile.data.success) {
              sessionStorage.removeItem('signupState');
              sessionStorage.removeItem('advancedClinicFormData');
              sessionStorage.removeItem('advancedClinicActiveSection');


              // Revoke object URLs to avoid memory leaks
              try {
                if (formData.logoPreview) URL.revokeObjectURL(formData.logoPreview);
                if (formData.verificationDocumentPreview) URL.revokeObjectURL(formData.verificationDocumentPreview);
                if (formData.verificationDocumentUrl) URL.revokeObjectURL(formData.verificationDocumentUrl);
              } catch (_) { }

              navigate(`/clinic-signup-success?email=${encodeURIComponent(formData.email)}`);
              console.log('Clinic registration and profile created successfully');
            } else {
              console.error('Clinic profile creation failed:', clinicProfile.data.message);
              toastError('Clinic profile creation failed:', clinicProfile.data.message);
              await axios.delete('/api/auth/delete-auth-user/' + response.data.user?._id, {
                withCredentials: true
              })
            }
          } catch (profileError) {

            if (profileError.response?.data?.isRegExist) {
              toastError('Registration failed,registration Number already exists');
              await axios.delete('/api/auth/delete-auth-user/' + response.data.user?._id, {
                withCredentials: true
              })
              return;
            }
            const backendMessage = profileError.response?.data?.message;
            const backendError = profileError.response?.data?.error;
            const errorMessage = backendMessage || backendError || profileError.message || 'Unknown error';
            toastError(`Clinic Profile creation failed: ${errorMessage}`);
            await axios.delete('/api/auth/delete-auth-user/' + response.data.user?._id, {
              withCredentials: true
            })

          }
        } else {
          console.error('Clinic registration failed:', response.data.message);
          toastError(`Registration failed: ${response.data.message}`);
        }
      } catch (error) {

        if (error.response?.data?.isUserExist) {
          toastError('Registration failed,Email already exists' )
          return;
        }

        const errorMessage = error.response?.data?.message || 'Unknown error';
        toastError(errorMessage);
        return;
      }
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
              }}
              back={() => goToPrevStep(2)}
            />
          );
        } else if (role === "clinic") {
          return (
            <StepAdvancedClinic
              data={formData}
              setData={setFormData}
              submit={async () => {
                await submit();
                //resetSignupState();
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
    <>
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
      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
      />
    </>
  );

};

export default Signup;