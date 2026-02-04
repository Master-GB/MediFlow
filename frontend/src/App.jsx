import React from 'react'
import {Route,Routes} from 'react-router-dom'

import LandingPage from "./pages/landingPage.jsx"
import Signup from './pages/signUp.jsx';
import ClinicSignUpSuccess from './pages/ClinicSignUpSuccess.jsx';
import VerificationCode from './pages/VerificationCode.jsx';
import SignIn from './pages/signIn.jsx';
import ForgotPassword from './pages/forgotPass.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';


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
        <Route path ="/patient-dashboard" element={<PatientDashboard/>}/>
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