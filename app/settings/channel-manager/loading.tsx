import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ChannelManagerLoading() {
  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" disabled className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all" disabled>
              All Channels
            </TabsTrigger>
            <TabsTrigger value="connected" disabled>
              Connected
            </TabsTrigger>
            <TabsTrigger value="disconnected" disabled>
              Issues
            </TabsTrigger>
            <TabsTrigger value="pending" disabled>
              Pending
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-20 mr-2" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  <div className="flex justify-between text-sm">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-10 rounded-full" />
                  </div>
                </div>
              </CardContent>
              <div className="px-6 py-4 border-t">
                <Skeleton className="h-9 w-full" />
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}

