import { ArrowLeft, Download, Filter, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FinancialReportsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center mb-6">
          <Link href="/reports" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Financial Reports</h1>
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
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="profit">Profit & Loss</TabsTrigger>
            <TabsTrigger value="tax">Tax Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FinancialCard title="Total Revenue" value="$124,567" change="+12.5%" positive={true} />
              <FinancialCard title="Room Revenue" value="$98,432" change="+8.3%" positive={true} />
              <FinancialCard title="Additional Services" value="$26,135" change="+15.2%" positive={true} />
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
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Revenue Chart Visualization</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Room Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Room Type Revenue Chart</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Channel Revenue Chart</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FinancialCard title="Total Expenses" value="$78,921" change="+5.2%" positive={false} />
              <FinancialCard title="Staff Costs" value="$42,567" change="+3.1%" positive={false} />
              <FinancialCard title="Operational Costs" value="$36,354" change="+7.8%" positive={false} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Expense Categories Chart</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profit" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FinancialCard title="Gross Profit" value="$45,646" change="+18.3%" positive={true} />
              <FinancialCard title="Net Profit" value="$38,245" change="+21.5%" positive={true} />
              <FinancialCard title="Profit Margin" value="30.7%" change="+2.4%" positive={true} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">P&L Statement Visualization</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FinancialCard title="Total Tax" value="$12,457" change="+8.1%" positive={false} />
              <FinancialCard title="VAT/GST" value="$8,932" change="+7.5%" positive={false} />
              <FinancialCard title="Other Taxes" value="$3,525" change="+9.2%" positive={false} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tax Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Tax Summary Visualization</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function FinancialCard({ title, value, change, positive }) {
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

