import DashboardLayout from "../layout/DashboardLayout"
import { sampleData } from "../data/sampleData"
import StatsCards from "../components/StatsCards"
import RiskPieChart from "../components/RiskPieChart"
import FraudBarChart from "../components/FraudBarChart"
import DataTable from "../components/DataTable"
import ManualEntryForm from "../components/ManualEntryForm"

export default function Dashboard() {
  return (
    <DashboardLayout>
      
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
          <RiskPieChart data={sampleData} />
          <FraudBarChart data={sampleData} />
        </div>

        <DataTable data={sampleData} />

        <ManualEntryForm />

      </div>

    </DashboardLayout>
  )
}