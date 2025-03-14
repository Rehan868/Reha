import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApiAccessLoading() {
  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" disabled className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </Button>
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="mb-6">
        <Skeleton className="h-12 w-full" />
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="all" disabled>
              All Keys
            </TabsTrigger>
            <TabsTrigger value="active" disabled>
              Active
            </TabsTrigger>
            <TabsTrigger value="revoked" disabled>
              Revoked
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-8 w-full" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-8 w-28" />
                  </div>

                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <div className="flex flex-wrap gap-1">
                      {Array(4)
                        .fill(0)
                        .map((_, j) => (
                          <Skeleton key={j} className="h-6 w-24" />
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </CardContent>
              <div className="px-6 py-4 border-t">
                <div className="flex justify-end">
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}

