import { Clock, User, FileText, MapPin, Calendar } from "lucide-react"
import { format } from "date-fns"
import type { Booking } from "./calendar"

interface TooltipProps {
  booking: Booking
  position: { x: number; y: number }
}

export function Tooltip({ booking, position }: TooltipProps) {
  // Calculate tooltip position to ensure it stays within viewport
  const tooltipStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: "translate(0, 0)", // This helps with positioning
    transition: "left 0.1s ease, top 0.1s ease", // Smooth movement
    pointerEvents: "none", // Ensure tooltip doesn't interfere with mouse events
  }

  // Format dates for display
  const startTimeFormatted = format(booking.startTime, "h:mm a")
  const endTimeFormatted = format(booking.endTime, "h:mm a")
  const dateFormatted = format(booking.startTime, "EEEE, MMMM d, yyyy")

  return (
    <div
      className="absolute z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-72"
      style={tooltipStyle}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900 text-base">{booking.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            booking.status === "confirmed"
              ? "bg-green-100 text-green-800"
              : booking.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span className="text-sm text-gray-700">{dateFormatted}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span className="text-sm text-gray-700">
            {startTimeFormatted} - {endTimeFormatted}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span className="text-sm text-gray-700">{booking.customer}</span>
        </div>

        {booking.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-700">{booking.location}</span>
          </div>
        )}

        {booking.notes && (
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">{booking.notes}</span>
          </div>
        )}
      </div>
    </div>
  )
}

