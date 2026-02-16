import React from 'react'
import {Route,Routes} from 'react-router-dom'

import LandingPage from "./pages/landingPage.jsx"
import Signup from './pages/signUp.jsx';
import ClinicSignUpSuccess from './pages/ClinicSignUpSuccess.jsx';
import VerificationCode from './pages/VerificationCode.jsx';
import SignIn from './pages/signIn.jsx';
import ForgotPassword from './pages/forgotPass.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ContactUs from './pages/ContactUs.jsx';
import PricingPage from './pages/Pricing.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import ForClinic from './pages/HowItWork/forClinic.jsx';
import ForDoctor from './pages/HowItWork/forDoctor.jsx';
import ForPatient from './pages/HowItWork/forPatient.jsx';
import ForPharmacists from './pages/HowItWork/forpharmacists.jsx';
import AISymptomAnalyzer from './pages/Features/AISymptomAnalyzer.jsx';
import SmartClinicManagement from './pages/Features/SmartClinicManagement.jsx';
import DoctorWorkflowOptimization from './pages/Features/DoctorWorkflowOptimization.jsx';
import PharmacyPrescriptionManagement from './pages/Features/PharmacyPrescriptionManagement.jsx';
import AppointmentManagement from './pages/Features/AppointmentManagement.jsx';
import Telemedicine from './pages/Features/Telemedicine.jsx';
import ReportsAnalytics from './pages/Features/ReportsAnalytics.jsx';

const LandingPageLayout = () => {
  return (
    <div>
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path ="/signUp" element ={<Signup/>}/>
        <Route path="/clinic-signup-success" element={<ClinicSignUpSuccess/>}/>
        <Route path="/signUp-verification-code" element={<VerificationCode/>}/>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/contact-us" element={<ContactUs/>}/>
        <Route path="/pricing-page" element={<PricingPage/>}/>
        <Route path ="/patient-dashboard" element={<PatientDashboard/>}/>
        <Route path ="/howItWork-clinic" element={<ForClinic/>}/>
        <Route path ="/howItWork-patient" element={<ForPatient/>}/>
        <Route path ="/howItWork-doctor" element={<ForDoctor/>}/>
        <Route path ="/howItWork-pharmacists" element={<ForPharmacists/>}/>
        <Route path ="/ai-symptom-analyzer" element={<AISymptomAnalyzer/>}/>
        <Route path ="/smart-clinic-management" element={<SmartClinicManagement/>}/>
        <Route path ="/doctor-workflow-optimization" element={<DoctorWorkflowOptimization/>}/>
        <Route path ="/pharmacy-prescription-management" element={<PharmacyPrescriptionManagement/>}/>
        <Route path ="/appointment-management" element={<AppointmentManagement/>}/>
        <Route path ="/telemedicine" element={<Telemedicine/>}/>
        <Route path ="/reports-analytics" element={<ReportsAnalytics/>}/>
      </Routes>
    </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<LandingPageLayout/>}/>
      </Routes>
    </div>
  )
}

export default App