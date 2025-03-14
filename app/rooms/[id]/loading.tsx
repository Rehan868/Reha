import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from "@/components/sidebar"

export default function LoadingRoomDetails() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="rooms" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-3 gap-6 p-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-40" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-36" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-40" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-36" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-px w-full my-6" />
                <Skeleton className="h-6 w-32 mb-3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-2" />
                <Skeleton className="h-px w-full my-6" />
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="grid grid-cols-2 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="space-y-6">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Skeleton className="h-8 w-32 mb-6" />
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-px w-full" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-px w-full" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Skeleton className="h-8 w-40 mb-6" />
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-4 w-40" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Skeleton className="h-8 w-32 mb-6" />
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

