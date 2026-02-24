export default function DataTable({ data }) {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Beneficiary Data</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition">
                        <th>ID</th>
                        <th>Fraud %</th>
                        <th>Risk</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border-b border-gray-700">
                            <td>{item.beneficiary_id}</td>
                            <td>{item.fraud_percentage}%</td>
                            <td>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${item.risk_level === "High"
                                            ? "bg-red-500/20 text-red-400"
                                            : "bg-green-500/20 text-green-400"
                                        }`}
                                >
                                    {item.risk_level}
                                </span>
                            </td>
                            <td>{item.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}