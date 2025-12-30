import FloatingInput from "./FloatingInput"

const StepAdvancedPatient = ({ data, setData, submit, back }) => {
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Additional Information (Optional)</h2>

      <FloatingInput label="Age" name="age" value={data.age || ""} onChange={handleChange} />
      <FloatingInput label="Gender" name="gender" value={data.gender || ""} onChange={handleChange} />
      <FloatingInput label="Address" name="address" value={data.address || ""} onChange={handleChange} />
      <FloatingInput label="Medical Condition" name="condition" value={data.condition || ""} onChange={handleChange} />

      <div className="flex justify-between">
        <button onClick={back} className="text-gray-600">Back</button>
        <button onClick={submit} className="px-6 py-2 bg-emerald-600 text-white rounded-xl">
          Finish
        </button>
      </div>
    </div>
  )
}

export default StepAdvancedPatient
