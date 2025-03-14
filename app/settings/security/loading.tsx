import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from "@/components/sidebar"

export default function SecuritySettingsLoading() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full mr-4" />
            <Skeleton className="h-8 w-64" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div key={j} className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-end space-x-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

