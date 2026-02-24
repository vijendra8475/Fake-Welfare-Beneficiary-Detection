export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to from-gray-200 to-gray-300 flex p-6">
      
      {/* Glass Container */}
      <div className="flex w-full rounded-3xl bg-white/40 backdrop-blur-xl shadow-2xl overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white/60 backdrop-blur-lg p-6 border-r border-white/40">
          <h2 className="text-2xl font-bold mb-8">FraudAI</h2>

          <nav className="space-y-4 text-gray-700">
            <SidebarItem label="Dashboard" active />
            <SidebarItem label="Beneficiaries" />
            <SidebarItem label="Analytics" />
            <SidebarItem label="Reports" />
            <SidebarItem label="Settings" />
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  )
}

function SidebarItem({ label, active }) {
  return (
    <div
      className={`px-4 py-2 rounded-xl cursor-pointer transition ${
        active
          ? "bg-black text-white"
          : "hover:bg-white/60"
      }`}
    >
      {label}
    </div>
  )
}