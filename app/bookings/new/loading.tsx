import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <h3 className="text-lg font-medium">Loading booking form...</h3>
      </div>
    </div>
  )
}

