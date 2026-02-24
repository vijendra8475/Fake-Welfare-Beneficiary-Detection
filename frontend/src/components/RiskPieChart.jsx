import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function RiskPieChart({ data }) {
  const high = data.filter(d => d.risk_level === "High").length
  const low = data.filter(d => d.risk_level === "Low").length

  const chartData = {
    labels: ["High Risk", "Low Risk"],
    datasets: [
      {
        data: [high, low],
        backgroundColor: ["#ef4444", "#22c55e"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="bg-white p-4 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Risk Distribution</h2>
      <Pie data={chartData} />
    </div>
  )
}