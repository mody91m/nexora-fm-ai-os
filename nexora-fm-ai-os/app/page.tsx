export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-10">
          Nexora FM AI OS
        </h1>

        <nav className="space-y-4">
          <div className="bg-blue-800 rounded-lg px-4 py-3">
            Dashboard
          </div>

          <div className="px-4 py-3 hover:bg-blue-800 rounded-lg cursor-pointer">
            Incidents
          </div>

          <div className="px-4 py-3 hover:bg-blue-800 rounded-lg cursor-pointer">
            Work Orders
          </div>

          <div className="px-4 py-3 hover:bg-blue-800 rounded-lg cursor-pointer">
            Sites
          </div>

          <div className="px-4 py-3 hover:bg-blue-800 rounded-lg cursor-pointer">
            Users
          </div>

          <div className="px-4 py-3 hover:bg-blue-800 rounded-lg cursor-pointer">
            Settings
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-2">
              AI Operating System for Facility Management
            </p>
          </div>

          <div className="bg-white shadow rounded-xl px-5 py-3">
            Admin User
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-gray-500">
              Open Incidents
            </h3>

            <p className="text-4xl font-bold mt-4 text-blue-600">
              24
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-gray-500">
              Open Work Orders
            </h3>

            <p className="text-4xl font-bold mt-4 text-green-600">
              18
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-gray-500">
              SLA Compliance
            </h3>

            <p className="text-4xl font-bold mt-4 text-orange-500">
              94%
            </p>
          </div>

        </div>

        {/* Recent Incidents */}
        <div className="bg-white rounded-2xl shadow mt-10 p-6">

          <h3 className="text-2xl font-bold mb-6">
            Recent Incidents
          </h3>

          <table className="w-full">

            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3">Incident</th>
                <th className="pb-3">Site</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-4">Water Leakage</td>
                <td>Terminal 5</td>
                <td className="text-red-500 font-semibold">
                  High
                </td>
                <td>Open</td>
              </tr>

              <tr className="border-b">
                <td className="py-4">X-Ray Failure</td>
                <td>Terminal 3</td>
                <td className="text-orange-500 font-semibold">
                  Medium
                </td>
                <td>In Progress</td>
              </tr>

              <tr>
                <td className="py-4">Lighting Issue</td>
                <td>Parking Area</td>
                <td className="text-green-600 font-semibold">
                  Low
                </td>
                <td>Completed</td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}
