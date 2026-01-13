import React from 'react'
import {Route,Routes} from 'react-router-dom'

import LandingPage from "./pages/landingPage.jsx"
import Signup from './pages/signUp.jsx';
import ClinicSignUpSuccess from './pages/ClinicSignUpSuccess.jsx';
import VerificationCode from './pages/VerificationCode.jsx';


const LandingPageLayout = () => {
  return (
    <div>
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path ="/signUp" element ={<Signup/>}/>
        <Route path="/clinic-signup-success" element={<ClinicSignUpSuccess/>}/>
        <Route path="/signUp-verification-code" element={<VerificationCode/>}/>
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