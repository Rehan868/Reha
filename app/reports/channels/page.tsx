import { ArrowLeft, Download, Filter, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ChannelReportsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center mb-6">
          <Link href="/reports" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Channel Performance</h1>
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
            <TabsTrigger value="comparison">Channel Comparison</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Rates</TabsTrigger>
            <TabsTrigger value="costs">Acquisition Costs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ChannelCard title="Total Bookings" value="845" change="+12.5%" positive={true} />
              <ChannelCard title="Direct Bookings" value="324" change="+18.3%" positive={true} />
              <ChannelCard title="OTA Bookings" value="521" change="+8.7%" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Booking Sources</CardTitle>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="View by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Booking Sources Chart</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Channel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Revenue by Channel Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Trends by Channel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Booking Trends Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Channel Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Channel</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Bookings</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Avg. Booking Value</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Growth</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { name: "Direct Website", bookings: 324, revenue: "$58,320", avg: "$180", growth: "+18.3%" },
                        { name: "Booking.com", bookings: 215, revenue: "$36,550", avg: "$170", growth: "+7.2%" },
                        { name: "Expedia", bookings: 142, revenue: "$24,140", avg: "$170", growth: "+5.8%" },
                        { name: "Airbnb", bookings: 98, revenue: "$19,600", avg: "$200", growth: "+12.4%" },
                        { name: "TripAdvisor", bookings: 66, revenue: "$11,220", avg: "$170", growth: "+3.5%" },
                      ].map((channel, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">{channel.name}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{channel.bookings}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{channel.revenue}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{channel.avg}</td>
                          <td className="px-4 py-4 text-sm text-green-600">{channel.growth}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Channel Market Share</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Market Share Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Channel Growth Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Growth Comparison Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conversion" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ChannelCard title="Avg. Conversion Rate" value="3.2%" change="+0.5%" positive={true} />
              <ChannelCard title="Direct Website CR" value="4.5%" change="+0.8%" positive={true} />
              <ChannelCard title="OTA Referral CR" value="2.7%" change="+0.3%" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Conversion Rate Chart</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Conversion Funnel Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Abandonment Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Abandonment Rate Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ChannelCard title="Avg. Acquisition Cost" value="$24.50" change="-$2.30" positive={true} />
              <ChannelCard title="Commission Expenses" value="$12,450" change="+$1,250" positive={false} />
              <ChannelCard title="Marketing ROI" value="320%" change="+45%" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cost per Acquisition by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">CPA by Channel Chart</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Channel</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Commission %</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total Cost</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Cost per Booking</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ROI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { name: "Direct Website", commission: "0%", cost: "$4,860", cpb: "$15", roi: "450%" },
                        { name: "Booking.com", commission: "15%", cost: "$5,482", cpb: "$25.50", roi: "280%" },
                        { name: "Expedia", commission: "18%", cost: "$4,345", cpb: "$30.60", roi: "240%" },
                        { name: "Airbnb", commission: "12%", cost: "$2,352", cpb: "$24", roi: "320%" },
                        { name: "TripAdvisor", commission: "14%", cost: "$1,570", cpb: "$23.80", roi: "290%" },
                      ].map((channel, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">{channel.name}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{channel.commission}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{channel.cost}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{channel.cpb}</td>
                          <td className="px-4 py-4 text-sm text-green-600">{channel.roi}</td>
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

function ChannelCard({ title, value, change, positive }) {
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

