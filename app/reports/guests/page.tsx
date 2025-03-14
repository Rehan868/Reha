import { ArrowLeft, Download, Filter, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GuestReportsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center mb-6">
          <Link href="/reports" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Guest Statistics</h1>
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
        <Tabs defaultValue="demographics" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
          </TabsList>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GuestCard title="Total Guests" value="3,245" change="+8.5%" positive={true} />
              <GuestCard title="New Guests" value="1,432" change="+12.2%" positive={true} />
              <GuestCard title="Returning Guests" value="1,813" change="+5.1%" positive={true} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Guest Age Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Age Distribution Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Guest Geographic Origin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Geographic Map</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Guest Demographics Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Demographics Breakdown Chart</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GuestCard title="Average Rating" value="4.7/5" change="+0.3" positive={true} />
              <GuestCard title="NPS Score" value="72" change="+5" positive={true} />
              <GuestCard title="Complaints" value="32" change="-15%" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Satisfaction Trend Chart</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Category Satisfaction Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Review Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Sentiment Analysis Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GuestCard title="Loyalty Members" value="1,245" change="+18.5%" positive={true} />
              <GuestCard title="Repeat Bookings" value="42%" change="+3.2%" positive={true} />
              <GuestCard title="Avg. Stays per Guest" value="2.3" change="+0.4" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Loyalty Program Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Loyalty Program Chart</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Guest Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Retention Rate Chart</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GuestCard title="Avg. Length of Stay" value="3.2 days" change="+0.5" positive={true} />
              <GuestCard title="Avg. Booking Value" value="$432" change="+7.2%" positive={true} />
              <GuestCard title="Advance Booking" value="24 days" change="+3 days" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Booking Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Booking Patterns Chart</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Services Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Services Usage Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Channels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Booking Channels Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function GuestCard({ title, value, change, positive }) {
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

