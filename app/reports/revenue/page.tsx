import { ArrowLeft, Download, Filter, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RevenueReportsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center mb-6">
          <Link href="/reports" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Revenue Reports</h1>
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
            <TabsTrigger value="by-room">By Room Type</TabsTrigger>
            <TabsTrigger value="by-service">By Service</TabsTrigger>
            <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RevenueCard title="Total Revenue" value="$124,567" change="+12.5%" positive={true} />
              <RevenueCard title="RevPAR" value="$147" change="+8.3%" positive={true} />
              <RevenueCard title="TRevPAR" value="$189" change="+5.7%" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="View by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Revenue Breakdown Chart</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Revenue Source Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Monthly Revenue Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="by-room" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Room Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Room Type Revenue Chart</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RevenueCard title="Standard Rooms" value="$52,345" change="+8.5%" positive={true} />
              <RevenueCard title="Deluxe Rooms" value="$38,921" change="+12.2%" positive={true} />
              <RevenueCard title="Suites" value="$33,301" change="+15.1%" positive={true} />
            </div>
          </TabsContent>

          <TabsContent value="by-service" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Service Revenue Chart</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RevenueCard title="Room Revenue" value="$98,432" change="+8.3%" positive={true} />
              <RevenueCard title="F&B Revenue" value="$15,678" change="+18.2%" positive={true} />
              <RevenueCard title="Other Services" value="$10,457" change="+12.1%" positive={true} />
            </div>
          </TabsContent>

          <TabsContent value="forecasts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Forecast Visualization</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RevenueCard title="Next Month Forecast" value="$132,450" change="+6.3%" positive={true} />
              <RevenueCard title="Next Quarter Forecast" value="$398,750" change="+8.2%" positive={true} />
              <RevenueCard title="Next Year Forecast" value="$1,587,000" change="+12.3%" positive={true} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function RevenueCard({ title, value, change, positive }) {
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

