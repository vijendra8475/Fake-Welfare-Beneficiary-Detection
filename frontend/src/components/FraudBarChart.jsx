import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

export default function FraudBarChart({ data }) {
  const chartData = {
    labels: data.map(d => d.beneficiary_id),
    datasets: [
      {
        label: "Fraud Percentage",
        data: data.map(d => d.fraud_percentage),
        backgroundColor: "#3b82f6",
      },
    ],
  }

  return (
    <div className="bg-white p-4 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">
        Fraud % Per Beneficiary
      </h2>
      <Bar data={chartData} />
    </div>
  )
}