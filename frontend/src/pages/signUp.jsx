import { useState } from "react"
import StepRole from "../components/signUp/StepRole"
import StepBasicPatient from "../components/signUp/StepBasicPatient"
import StepBasicClinic from "../components/signUp/StepBasicClinic"
import StepAdvancedPatient from "../components/signUp/StepAdvancedPatient"
import StepAdvancedClinic from "../components/signUp/StepAdvancedClinic"
import LandingNav from "../components/landingPage/landingNav"

const Signup = () => {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState("")
  const [formData, setFormData] = useState({})

  const submit = () => {
    console.log("FINAL DATA:", { role, ...formData })
  }

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-linear-to-br from-blue-50 to-emerald-100">
      
      {step === 1 ? (
        <div className="w-full m-0 p-0">
          <StepRole role={role} setRole={setRole} next={() => setStep(2)} />
        </div>
      ) : (
        <div className="w-full max-w-screen-2xl mx-auto p-0 m-0">
          {step === 2 && role === "patient" && (
            <StepBasicPatient data={formData} setData={setFormData} next={() => setStep(3)} back={() => setStep(1)} />
          )}

          {step === 2 && role === "clinic" && (
            <StepBasicClinic data={formData} setData={setFormData} next={() => setStep(3)} back={() => setStep(1)} />
          )}

          {step === 3 && role === "patient" && (
            <StepAdvancedPatient data={formData} setData={setFormData} submit={submit} back={() => setStep(2)} />
          )}

          {step === 3 && role === "clinic" && (
            <StepAdvancedClinic data={formData} setData={setFormData} submit={submit} back={() => setStep(2)} />
          )}
        </div>
      )}
    </div>
  )
}

export default Signup
