import React from 'react'
import {Route,Routes} from 'react-router-dom'

import LandingPage from "./pages/landingPage.jsx"
import Signup from './pages/signUp.jsx';

const LandingPageLayout = () => {
  return (
    <div>
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path ="/signUp" element ={<Signup/>}/>
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