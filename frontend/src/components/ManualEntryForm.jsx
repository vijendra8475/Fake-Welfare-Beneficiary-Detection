import { useState } from "react"
import axios from "axios"

export default function ManualEntryForm({ setData, data, setLoading, loading }) {


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
      [e.target.name]: Number(e.target.value),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post("/api/predict", [formData])
      const result = response.data[0]

      const newEntry = {
        beneficiary_id: `B${Date.now()}`,
        fraud_percentage: result.fraud_percentage,
        risk_level: result.risk_level,
        score: result.score,
      }

      setData((prev) => [...prev, newEntry])
      showToast("Prediction Successful ✅")

    } catch (error) {
      showToast("Prediction Failed ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/40 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
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
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            required
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-3 bg-black text-white p-3 rounded-xl font-semibold hover:opacity-90"
        >
          {loading ? "Analyzing..." : "Analyze Risk"}
        </button>
      </form>
    </div>
  )
}