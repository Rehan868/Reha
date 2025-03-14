import { Clock, User, FileText, Calendar, Tag, PenToolIcon as Tool, SprayCanIcon as Spray } from "lucide-react"
import { format } from "date-fns"
import type { CalendarEvent } from "./types"

interface TooltipProps {
  event: CalendarEvent
  position: { x: number; y: number }
}

export function EventTooltip({ event, position }: TooltipProps) {
  // Calculate tooltip position to ensure it stays within viewport
  const tooltipStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: "translate(0, 0)",
    transition: "left 0.1s ease, top 0.1s ease",
    pointerEvents: "none",
  }

  // Format dates for display
  const startTimeFormatted = format(event.startTime, "h:mm a")
  const endTimeFormatted = format(event.endTime, "h:mm a")
  const startDateFormatted = format(event.startTime, "EEEE, MMMM d, yyyy")
  const endDateFormatted = format(event.endTime, "EEEE, MMMM d, yyyy")

  // Get icon based on event type
  const getEventIcon = () => {
    switch (event.type) {
      case "maintenance":
        return <Tool className="h-4 w-4 text-purple-500 flex-shrink-0" />
      case "cleaning":
        return <Spray className="h-4 w-4 text-blue-500 flex-shrink-0" />
      default:
        return <Tag className="h-4 w-4 text-gray-500 flex-shrink-0" />
    }
  }

  // Get status badge based on event type and status
  const getStatusBadge = () => {
    if (event.type === "booking") {
      return (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            event.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {event.status === "confirmed" ? "Confirmed" : "Unconfirmed"}
        </span>
      )
    } else if (event.type === "maintenance") {
      return <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">Maintenance</span>
    } else if (event.type === "cleaning") {
      return <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Cleaning</span>
    }
    return null
  }

  return (
    <div
      className="absolute z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-72"
      style={tooltipStyle}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {getEventIcon()}
          <h3 className="font-medium text-gray-900 text-base">{event.title}</h3>
        </div>
        {getStatusBadge()}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span className="text-sm text-gray-700">
            {startDateFormatted === endDateFormatted
              ? startDateFormatted
              : `${format(event.startTime, "MMM d")} - ${format(event.endTime, "MMM d, yyyy")}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span className="text-sm text-gray-700">
            {startTimeFormatted} - {endTimeFormatted}
          </span>
        </div>

        {event.type === "booking" && event.customer && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-700">{event.customer}</span>
          </div>
        )}

        {event.notes && (
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">{event.notes}</span>
          </div>
        )}
      </div>
    </div>
  )
}

