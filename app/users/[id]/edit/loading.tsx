import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from "@/components/sidebar"

export default function LoadingUserEdit() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="users" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-9 w-32" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-64 mb-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-64 mb-6" />

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <Skeleton className="h-6 w-36 mb-2" />
                  <Skeleton className="h-4 w-48 mb-6" />

                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2 mb-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-48 mb-6" />

                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full mb-2" />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-36 mb-6" />
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

