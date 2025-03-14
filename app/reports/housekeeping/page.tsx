import { ArrowLeft, Download, Filter, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function HousekeepingReportsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center mb-6">
          <Link href="/reports" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Housekeeping Reports</h1>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </header>

      <div className="flex-1 p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <HousekeepingCard title="Rooms Cleaned Today" value="42" change="+8" positive={true} />
              <HousekeepingCard title="Avg. Cleaning Time" value="32 min" change="-3 min" positive={true} />
              <HousekeepingCard title="Pending Rooms" value="12" change="-5" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Room Cleaning Status</CardTitle>
                  <Select defaultValue="today">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="View by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Room Status Chart</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Staff Performance Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Room Type Cleaning Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Room Type Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cleaning Efficiency Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Efficiency Metrics Chart</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <HousekeepingCard title="Rooms per Staff" value="12.5" change="+1.2" positive={true} />
              <HousekeepingCard title="Avg. Turnaround Time" value="45 min" change="-5 min" positive={true} />
              <HousekeepingCard title="Staff Utilization" value="87%" change="+3%" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Staff Efficiency Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Staff Member</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Rooms Cleaned</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Avg. Time</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Efficiency Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { name: "Maria Garcia", rooms: 14, time: "28 min", score: 95 },
                        { name: "John Smith", rooms: 12, time: "32 min", score: 88 },
                        { name: "Sarah Johnson", rooms: 13, time: "30 min", score: 91 },
                        { name: "David Lee", rooms: 11, time: "35 min", score: 82 },
                        { name: "Lisa Wong", rooms: 15, time: "27 min", score: 97 },
                      ].map((staff, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">{staff.name}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{staff.rooms}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{staff.time}</td>
                          <td className="px-4 py-4 text-sm">
                            <Badge
                              className={
                                staff.score > 90 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {staff.score}/100
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <HousekeepingCard title="Inventory Items" value="32" change="0" positive={true} />
              <HousekeepingCard title="Low Stock Items" value="5" change="+2" positive={false} />
              <HousekeepingCard title="Monthly Expenses" value="$3,245" change="-$320" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Inventory Usage Chart</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Item</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Current Stock</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Usage Rate</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { name: "Cleaning Solution", stock: 24, rate: "3/day", status: "Good" },
                        { name: "Towels", stock: 120, rate: "15/day", status: "Good" },
                        { name: "Bed Sheets", stock: 45, rate: "12/day", status: "Low" },
                        { name: "Toiletries", stock: 85, rate: "10/day", status: "Good" },
                        { name: "Laundry Detergent", stock: 12, rate: "2/day", status: "Low" },
                      ].map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">{item.name}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{item.stock}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{item.rate}</td>
                          <td className="px-4 py-4 text-sm">
                            <Badge
                              className={
                                item.status === "Good" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <HousekeepingCard title="Maintenance Requests" value="18" change="+3" positive={false} />
              <HousekeepingCard title="Completed Requests" value="12" change="+5" positive={true} />
              <HousekeepingCard title="Avg. Resolution Time" value="1.5 days" change="-0.3 days" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Request Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Request Types Chart</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Request Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Room</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Issue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Reported</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { room: "101", issue: "Leaking faucet", reported: "2 days ago", status: "In Progress" },
                        { room: "205", issue: "AC not working", reported: "1 day ago", status: "Pending" },
                        { room: "312", issue: "TV remote broken", reported: "3 days ago", status: "Completed" },
                        { room: "118", issue: "Light fixture", reported: "4 days ago", status: "Completed" },
                        { room: "224", issue: "Shower drain clogged", reported: "1 day ago", status: "In Progress" },
                      ].map((request, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">{request.room}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{request.issue}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{request.reported}</td>
                          <td className="px-4 py-4 text-sm">
                            <Badge
                              className={
                                request.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : request.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {request.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function HousekeepingCard({ title, value, change, positive }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">{title}</div>
          <div className={`text-sm ${positive ? "text-green-600" : "text-red-600"}`}>{change}</div>
        </div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
      </CardContent>
    </Card>
  )
}

