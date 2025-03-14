import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from "@/components/sidebar"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-10 w-36" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <Skeleton className="h-10 w-full md:w-96" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="w-full">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                      <Skeleton className="h-5 w-3/4 mt-2" />
                      <div className="flex items-center gap-4 mt-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

