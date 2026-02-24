import Papa from "papaparse"
import axios from "axios"

export default function CSVUpload({ setData }) {

  const handleFileUpload = (e) => {
    const file = e.target.files[0]

    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const formattedData = results.data.map((row) => ({
          age: Number(row.age),
          income: Number(row.income),
          claim_amount: Number(row.claim_amount),
          account_age_days: Number(row.account_age_days),
          duplicate_mobile_count: Number(row.duplicate_mobile_count),
          missing_field_count: Number(row.missing_field_count),
        }))

        try {
          const response = await axios.post("/api/predict", formattedData)

          const predictions = response.data

          const merged = formattedData.map((item, index) => ({
            beneficiary_id: `CSV${Date.now()}${index}`,
            fraud_percentage: predictions[index].fraud_percentage,
            risk_level: predictions[index].risk_level,
            score: predictions[index].score,
          }))

          setData((prev) => [...prev, ...merged])

        } catch (error) {
          console.error(error)
          alert("Bulk prediction failed")
        }
      },
    })
  }

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/40 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Bulk CSV Upload
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="block w-full text-sm"
      />
    </div>
  )
}