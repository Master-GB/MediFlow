import FloatingInput from "./FloatingInput"

const StepAdvancedClinic = ({ data, setData, submit, back }) => {
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Clinic Information (Optional)</h2>

      <FloatingInput label="Clinic Address" name="address" value={data.address || ""} onChange={handleChange} />
      <FloatingInput label="Registration Number" name="regNo" value={data.regNo || ""} onChange={handleChange} />
      <FloatingInput label="Specialization" name="specialization" value={data.specialization || ""} onChange={handleChange} />

      <div className="flex justify-between">
        <button onClick={back} className="text-gray-600">Back</button>
        <button onClick={submit} className="px-6 py-2 bg-emerald-600 text-white rounded-xl">
          Finish
        </button>
      </div>
    </div>
  )
}

export default StepAdvancedClinic
