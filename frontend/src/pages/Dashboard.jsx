import DashboardLayout from "../layout/DashboardLayout"
import CSVUpload from "../components/CSVUpload"
import { sampleData } from "../data/sampleData"
import StatsCards from "../components/StatsCards"
import RiskPieChart from "../components/RiskPieChart"
import FraudBarChart from "../components/FraudBarChart"
import DataTable from "../components/DataTable"
import ManualEntryForm from "../components/ManualEntryForm"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("fraudData")
    return saved ? JSON.parse(saved) : sampleData
  })
  console.log("Dashboard Data:", data)

  useEffect(() => {
    localStorage.setItem("fraudData", JSON.stringify(data))
  }, [data])

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  return (

    <DashboardLayout>
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-lg">
          {toast}
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl animate-pulse">
            <p className="text-lg font-semibold">Analyzing Data...</p>
          </div>
        </div>
      )}

      <div className="space-y-8">

        {/* Greeting */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Hi, Admin 👋
          </h1>
          <p className="text-gray-600">
            Here's your fraud detection overview
          </p>
        </div>

        <StatsCards data={sampleData} />

        <div className="grid md:grid-cols-2 gap-6">
          <RiskPieChart data={data} />
        </div>
        <FraudBarChart data={data} />
        <CSVUpload showToast={showToast} setData={setData} setLoading={setLoading} />
        <DataTable data={data} />


        <ManualEntryForm showToast={showToast} setData={setData} data={data} loading={loading} setLoading={setLoading} />

      </div>

    </DashboardLayout>
  )
}