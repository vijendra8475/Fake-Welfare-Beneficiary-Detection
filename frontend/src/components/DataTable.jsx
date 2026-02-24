import { useState, useMemo } from "react"

export default function DataTable({ data }) {
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState(null)
  const [sortOrder, setSortOrder] = useState("asc")

  // Filtering + Sorting
  const processedData = useMemo(() => {
    let filtered = data.filter((item) =>
      item.beneficiary_id
        .toLowerCase()
        .includes(search.toLowerCase())
    )

    if (sortField) {
      filtered.sort((a, b) => {
        if (sortField === "fraud_percentage") {
          return sortOrder === "asc"
            ? a.fraud_percentage - b.fraud_percentage
            : b.fraud_percentage - a.fraud_percentage
        }

        if (sortField === "risk_level") {
          return sortOrder === "asc"
            ? a.risk_level.localeCompare(b.risk_level)
            : b.risk_level.localeCompare(a.risk_level)
        }

        return 0
      })
    }

    return filtered
  }, [data, search, sortField, sortOrder])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/40 p-6 rounded-2xl shadow-lg">
      
      {/* Search + Controls */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Beneficiary ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 w-1/3 focus:ring-2 focus:ring-black outline-none"
        />

        <div className="flex gap-3">
          <button
            onClick={() => handleSort("fraud_percentage")}
            className="px-3 py-2 bg-gray-800 text-white rounded-lg"
          >
            Sort by Fraud %
          </button>

          <button
            onClick={() => handleSort("risk_level")}
            className="px-3 py-2 bg-gray-800 text-white rounded-lg"
          >
            Sort by Risk
          </button>
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-300">
            <th>ID</th>
            <th>Fraud %</th>
            <th>Risk</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {processedData.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-white/50 transition">
              <td className="py-3">{item.beneficiary_id}</td>

              {/* Fraud Progress Bar */}
              <td className="py-3">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      item.fraud_percentage > 70
                        ? "bg-red-500"
                        : item.fraud_percentage > 40
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${item.fraud_percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-700 ml-2">
                  {item.fraud_percentage}%
                </span>
              </td>

              {/* Risk Badge */}
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.risk_level === "High"
                      ? "bg-red-500/20 text-red-600"
                      : "bg-green-500/20 text-green-600"
                  }`}
                >
                  {item.risk_level}
                </span>
              </td>

              <td>{item.score.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {processedData.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No matching records found.
        </p>
      )}
    </div>
  )
}