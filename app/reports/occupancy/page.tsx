import { ArrowLeft, Download, Filter, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OccupancyReportsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center mb-6">
          <Link href="/reports" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Occupancy Reports</h1>
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
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <OccupancyCard title="Average Occupancy" value="78%" change="+5.2%" positive={true} />
              <OccupancyCard title="RevPAR" value="$147" change="+8.3%" positive={true} />
              <OccupancyCard title="ADR" value="$189" change="-2.1%" positive={false} />
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Occupancy Rate Over Time</CardTitle>
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
                  <p className="text-gray-500">Occupancy Rate Chart</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekday vs Weekend Occupancy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Weekday/Weekend Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Occupancy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Seasonal Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="by-room" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy by Room Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Room Type Occupancy Chart</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <OccupancyCard title="Standard Rooms" value="82%" change="+3.5%" positive={true} />
              <OccupancyCard title="Deluxe Rooms" value="76%" change="+7.2%" positive={true} />
              <OccupancyCard title="Suites" value="65%" change="+12.1%" positive={true} />
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Trends Visualization</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Year-over-Year Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">YoY Comparison Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Long-term Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Long-term Trends Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecasts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Forecast Visualization</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <OccupancyCard title="Next Month Forecast" value="81%" change="+3.8%" positive={true} />
              <OccupancyCard title="Next Quarter Forecast" value="75%" change="-3.2%" positive={false} />
              <OccupancyCard title="Next Year Forecast" value="79%" change="+1.3%" positive={true} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function OccupancyCard({ title, value, change, positive }) {
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

