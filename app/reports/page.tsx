import { Download, Share2, ChevronRight, Plus, Clock } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const recentReports = [
  {
    name: "Monthly Revenue Report",
    date: "2024-01-15",
    type: "Financial",
    format: "PDF",
  },
  {
    name: "Occupancy Analysis",
    date: "2024-01-14",
    type: "Occupancy",
    format: "Excel",
  },
  {
    name: "Guest Satisfaction Survey",
    date: "2024-01-13",
    type: "Guest",
    format: "PDF",
  },
  {
    name: "Channel Performance",
    date: "2024-01-12",
    type: "Marketing",
    format: "Excel",
  },
]

const savedReports = [
  {
    name: "Monthly Overview",
    type: "Financial",
    lastRun: "3 days ago",
  },
  {
    name: "Occupancy Trends",
    type: "Occupancy",
    lastRun: "1 week ago",
  },
  {
    name: "Revenue Analysis",
    type: "Revenue",
    lastRun: "2 weeks ago",
  },
]

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="reports" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Reports</h1>
            <div className="flex items-center gap-4">
              <Select defaultValue="30">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Revenue" value="$124,567" change="+12.5%" positive={true} icon="$" />
            <StatCard title="Occupancy Rate" value="78%" change="+5.2%" positive={true} icon="%" />
            <StatCard title="Average Daily Rate" value="$189" change="-2.1%" positive={false} icon="↕" />
            <StatCard title="RevPAR" value="$147" change="+8.3%" positive={true} icon="↗" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ReportCard
              icon="💰"
              title="Financial Reports"
              description="Revenue, expenses, and profit analysis"
              link="/reports/financial"
            />
            <ReportCard
              icon="🏠"
              title="Occupancy Reports"
              description="Room occupancy and availability trends"
              link="/reports/occupancy"
            />
            <ReportCard
              icon="📊"
              title="Revenue Reports"
              description="Revenue by room type and period"
              link="/reports/revenue"
            />
            <ReportCard
              icon="👥"
              title="Guest Statistics"
              description="Guest demographics and preferences"
              link="/reports/guests"
            />
            <ReportCard
              icon="🧹"
              title="Housekeeping Reports"
              description="Cleaning status and efficiency metrics"
              link="/reports/housekeeping"
            />
            <ReportCard
              icon="📈"
              title="Channel Performance"
              description="Booking sources and channel analysis"
              link="/reports/channels"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Reports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Report Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Generated Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Format</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentReports.map((report, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{report.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{report.date}</td>
                      <td className="px-6 py-4">
                        <TypeBadge type={report.type} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{report.format}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Saved Reports</h2>
                </div>
                <div className="p-6 grid gap-4">
                  {savedReports.map((report, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <TypeBadge type={report.type} />
                        <div>
                          <div className="font-medium text-gray-900">{report.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {report.lastRun}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Generate
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 border-dashed p-6 h-full flex flex-col items-center justify-center text-center">
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <h3 className="font-medium text-gray-900">Create Custom Report</h3>
                <p className="text-sm text-gray-500 mb-4">Build a report with your selected metrics</p>
                <Button variant="outline">Start Building</Button>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-600 rounded-lg p-8 text-white flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Create Custom Report</h2>
              <p className="text-blue-100">Build personalized reports with your selected metrics and parameters</p>
            </div>
            <Button variant="secondary" size="lg">
              Start Building
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, positive, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">{icon}</div>
        <div className={`text-sm ${positive ? "text-green-600" : "text-red-600"}`}>{change}</div>
      </div>
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  )
}

function ReportCard({ icon, title, description, link }) {
  return (
    <Card className="p-6 hover:border-blue-200 transition-colors">
      <div className="text-2xl mb-4">{icon}</div>
      <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <Link href={link} className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
        View Reports
        <ChevronRight className="h-4 w-4" />
      </Link>
    </Card>
  )
}

function TypeBadge({ type }) {
  const getTypeStyles = () => {
    switch (type.toLowerCase()) {
      case "financial":
        return "bg-blue-50 text-blue-700 border-blue-100"
      case "occupancy":
        return "bg-green-50 text-green-700 border-green-100"
      case "guest":
        return "bg-purple-50 text-purple-700 border-purple-100"
      case "marketing":
        return "bg-orange-50 text-orange-700 border-orange-100"
      case "revenue":
        return "bg-indigo-50 text-indigo-700 border-indigo-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-100"
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeStyles()}`}>
      {type}
    </span>
  )
}

