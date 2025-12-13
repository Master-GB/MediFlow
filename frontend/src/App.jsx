import React from 'react'
import {Route,Routes} from 'react-router-dom'

import LandingPage from "./pages/landingPage.jsx"

const LandingPageLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
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