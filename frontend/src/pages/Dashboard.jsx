import { sampleData } from "../data/sampleData"
import StatsCards from "../components/StatsCards"
import RiskPieChart from "../components/RiskPieChart"
import FraudBarChart from "../components/FraudBarChart"
import DataTable from "../components/DataTable"
import ManualEntryForm from "../components/ManualEntryForm"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-8 space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Welfare Fraud Detection Dashboard
      </h1>

      <StatsCards data={sampleData} />

      <div className="grid md:grid-cols-2 gap-6">
        <RiskPieChart data={sampleData} />
        <FraudBarChart data={sampleData} />
      </div>

      <DataTable data={sampleData} />

      <ManualEntryForm />
    </div>
  )
}