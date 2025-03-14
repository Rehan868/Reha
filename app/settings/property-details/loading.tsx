import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from "@/components/sidebar"

export default function PropertyDetailsLoading() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Skeleton className="h-10 w-10 rounded-full mr-2" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-[400px] w-full mb-6 rounded-lg" />
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

