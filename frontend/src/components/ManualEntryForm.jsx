import { useState } from "react"

export default function ManualEntryForm() {
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    claim_amount: "",
    account_age_days: "",
    duplicate_mobile_count: "",
    missing_field_count: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Data:", formData)
    alert("Check console for submitted data")
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4">
        Manual Beneficiary Entry
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 gap-4"
      >
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            className="p-3 rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
            required
          />
        ))}

        <button
          type="submit"
          className="md:col-span-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all p-3 rounded-xl font-semibold shadow-lg"
        >
          Analyze Risk
        </button>
      </form>
    </div>
  )
}