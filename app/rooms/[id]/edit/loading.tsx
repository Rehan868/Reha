import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from "@/components/sidebar"

export default function LoadingEditRoom() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="rooms" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-8 w-64" />
            </div>
            <div className="flex items-center gap-3">
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
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
                <Skeleton className="h-px w-full my-6" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-64 mb-6" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Skeleton className="h-8 w-32 mb-6" />
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Skeleton className="h-8 w-36 mb-6" />
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  </div>
                  <Skeleton className="h-px w-full" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Skeleton className="h-8 w-36 mb-2" />
                <Skeleton className="h-4 w-48 mb-6" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

