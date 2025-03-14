import { Skeleton } from "@/components/ui/skeleton"
import { Sidebar } from "@/components/sidebar"

export default function LoadingBookingDetails() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="bookings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-[300px] w-full rounded-lg" />
            </div>
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <div className="lg:col-span-2">
              <Skeleton className="h-[350px] w-full rounded-lg" />
            </div>
            <Skeleton className="h-[350px] w-full rounded-lg" />
          </div>
        </main>
      </div>
    </div>
  )
}

