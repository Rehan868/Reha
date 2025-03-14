import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from "@/components/sidebar"

export default function EditBookingLoading() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="bookings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <Skeleton className="h-[150px] w-full rounded-lg" />
          </div>
        </main>
      </div>
    </div>
  )
}

