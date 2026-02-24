export default function StatsCards({ data }) {
  const total = data.length
  const highRisk = data.filter(d => d.risk_level === "High").length
  const lowRisk = data.filter(d => d.risk_level === "Low").length
  const avgFraud =
    (data.reduce((acc, d) => acc + d.fraud_percentage, 0) / total).toFixed(1)

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <Card title="Total Records" value={total} color="text-blue-400" />
      <Card title="High Risk" value={highRisk} color="text-red-500" />
      <Card title="Low Risk" value={lowRisk} color="text-green-400" />
      <Card title="Avg Fraud %" value={`${avgFraud}%`} color="text-purple-400" />
    </div>
  )
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
      <p className="text-gray-400 text-sm uppercase tracking-wider">
        {title}
      </p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  )
}