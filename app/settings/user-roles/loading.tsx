import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function UserRolesLoading() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-6 w-32 ml-2" />
                  </div>
                  <div className="flex space-x-1">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="grid grid-cols-2 gap-2">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-5 w-full" />
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

