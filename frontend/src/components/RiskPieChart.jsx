import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js"

ChartJS.register(ArcElement, Tooltip)

export default function RiskPieChart({ data }) {
  const avgFraud =
    data.reduce((acc, item) => acc + item.fraud_percentage, 0) /
    (data.length || 1)

  const chartData = {
    datasets: [
      {
        data: [avgFraud, 100 - avgFraud],
        backgroundColor: ["#ef4444", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    cutout: "75%",
    plugins: {
      legend: { display: false },
    },
  }

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/40 p-6 rounded-2xl shadow-lg flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">
        Average Fraud Risk
      </h2>

      <div className="w-40">
        <Doughnut data={chartData} options={options} />
      </div>

      <p className="mt-4 text-2xl font-bold">
        {avgFraud.toFixed(1)}%
      </p>
    </div>
  )
}