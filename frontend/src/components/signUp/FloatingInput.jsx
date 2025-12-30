const FloatingInput = ({ label, type = "text", name, value, onChange }) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="peer w-full rounded-xl border border-gray-300 px-4 pt-5 pb-2 text-gray-900
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
      />
      <label
        className="absolute left-4 top-3 text-gray-500 text-sm transition-all
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
        peer-placeholder-shown:text-gray-400
        peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
      >
        {label}
      </label>
    </div>
  )
}

export default FloatingInput
