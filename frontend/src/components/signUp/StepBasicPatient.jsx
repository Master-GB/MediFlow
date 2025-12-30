import FloatingInput from "./FloatingInput"

const StepBasicPatient = ({ data, setData, next, back }) => {
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Patient Details</h2>

      <FloatingInput label="Full Name" name="name" value={data.name} onChange={handleChange} />
      <FloatingInput label="Email" type="email" name="email" value={data.email} onChange={handleChange} />
      <FloatingInput label="Password" type="password" name="password" value={data.password} onChange={handleChange} />
      <FloatingInput label="Confirm Password" type="password" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} />

      <div className="flex justify-between">
        <button onClick={back} className="text-gray-600">Back</button>
        <button onClick={next} className="px-6 py-2 bg-blue-600 text-white rounded-xl">Next</button>
      </div>
    </div>
  )
}

export default StepBasicPatient
