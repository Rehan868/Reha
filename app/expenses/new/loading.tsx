import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center mb-6">
            <Skeleton className="h-9 w-20 mr-4" />
            <Skeleton className="h-8 w-48" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              <Skeleton className="h-10 w-full" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              <Skeleton className="h-32 w-full" />

              <div className="flex justify-end gap-4 pt-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

