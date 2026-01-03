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
    setStep(1);
    setRole("");
    setFormData({});
  };

  // Handle form submission
  const submit = () => {
    console.log("FINAL DATA:", { role, ...formData });
    sessionStorage.removeItem('signupState');
    navigate('/');
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