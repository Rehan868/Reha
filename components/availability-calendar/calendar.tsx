"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks, subWeeks } from "date-fns"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip } from "./tooltip"

// Types
export interface Booking {
  id: string
  title: string
  startTime: Date
  endTime: Date
  customer: string
  location?: string
  notes?: string
  status: "confirmed" | "pending" | "cancelled"
  color?: string
}

interface CalendarProps {
  bookings: Booking[]
  onBookingClick?: (booking: Booking) => void
  onSlotClick?: (time: Date) => void
  hourStart?: number
  hourEnd?: number
  viewMode?: "day" | "week"
}

// Helper functions
const getTimeString = (date: Date) => {
  return format(date, "h:mm a")
}

const getBookingDuration = (start: Date, end: Date) => {
  const diffMs = end.getTime() - start.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  return diffHours
}

export function AvailabilityCalendar({
  bookings = [],
  onBookingClick,
  onSlotClick,
  hourStart = 8,
  hourEnd = 22,
  viewMode = "week",
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hoveredBooking, setHoveredBooking] = useState<Booking | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const calendarRef = useRef<HTMLDivElement>(null)

  // Calculate the days to display based on view mode
  const daysToShow =
    viewMode === "day"
      ? [currentDate]
      : eachDayOfInterval({
          start: startOfWeek(currentDate, { weekStartsOn: 1 }),
          end: endOfWeek(currentDate, { weekStartsOn: 1 }),
        })

  // Generate time slots
  const timeSlots = Array.from({ length: (hourEnd - hourStart) * 4 }, (_, i) => {
    const hour = Math.floor(i / 4) + hourStart
    const minutes = (i % 4) * 15
    return new Date(new Date().setHours(hour, minutes, 0, 0))
  })

  // Handle navigation
  const goToToday = () => setCurrentDate(new Date())

  const goToPrevious = () => {
    if (viewMode === "day") {
      setCurrentDate((prev) => addDays(prev, -1))
    } else {
      setCurrentDate((prev) => subWeeks(prev, 1))
    }
  }

  const goToNext = () => {
    if (viewMode === "day") {
      setCurrentDate((prev) => addDays(prev, 1))
    } else {
      setCurrentDate((prev) => addWeeks(prev, 1))
    }
  }

  // Handle tooltip positioning to follow cursor directly
  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredBooking) {
      const rect = calendarRef.current?.getBoundingClientRect()
      if (rect) {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        // Calculate tooltip dimensions (approximate)
        const tooltipWidth = 288 // 72 * 4 = 288px (w-72)
        const tooltipHeight = 200 // approximate height

        // Position tooltip near cursor but ensure it stays within viewport
        let x = e.clientX - rect.left + 16
        let y = e.clientY - rect.top + 16

        // Adjust if tooltip would go off right edge
        if (e.clientX + tooltipWidth + 16 > viewportWidth) {
          x = e.clientX - rect.left - tooltipWidth - 16
        }

        // Adjust if tooltip would go off bottom edge
        if (e.clientY + tooltipHeight + 16 > viewportHeight) {
          y = e.clientY - rect.top - tooltipHeight - 16
        }

        setTooltipPosition({ x, y })
      }
    }
  }

  // Filter bookings for the visible days
  const visibleBookings = bookings.filter((booking) => daysToShow.some((day) => isSameDay(booking.startTime, day)))

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Adjust view mode based on screen width if needed
      // This is just a placeholder - you could implement responsive behavior here
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
      ref={calendarRef}
      onMouseMove={handleMouseMove}
    >
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800">
            {viewMode === "day"
              ? format(currentDate, "MMMM d, yyyy")
              : `${format(daysToShow[0], "MMM d")} - ${format(daysToShow[daysToShow.length - 1], "MMM d, yyyy")}`}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-auto max-h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-[80px_repeat(auto-fill,minmax(120px,1fr))]">
          {/* Time column */}
          <div className="sticky left-0 z-10 bg-white border-r border-gray-200">
            <div className="h-12 border-b border-gray-200"></div> {/* Empty cell for header row */}
            {timeSlots.map((time, i) => (
              <div
                key={i}
                className={cn(
                  "h-12 flex items-center justify-center text-xs text-gray-500 border-b border-gray-200",
                  i % 4 === 0 ? "font-medium" : "text-[10px]",
                )}
              >
                {i % 4 === 0 && format(time, "h a")}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {daysToShow.map((day, dayIndex) => (
            <div key={dayIndex} className="min-w-[120px]">
              {/* Day header */}
              <div className="h-12 border-b border-gray-200 flex flex-col items-center justify-center sticky top-0 bg-white">
                <div className="font-medium text-sm text-gray-800">{format(day, "EEE")}</div>
                <div className="text-xs text-gray-500">{format(day, "MMM d")}</div>
              </div>

              {/* Time slots */}
              {timeSlots.map((time, timeIndex) => {
                // Find bookings that start at this time slot on this day
                const bookingsAtSlot = visibleBookings.filter((booking) => {
                  const bookingHour = booking.startTime.getHours()
                  const bookingMinutes = booking.startTime.getMinutes()
                  const slotHour = time.getHours()
                  const slotMinutes = time.getMinutes()

                  return isSameDay(booking.startTime, day) && bookingHour === slotHour && bookingMinutes === slotMinutes
                })

                return (
                  <div
                    key={timeIndex}
                    className={cn(
                      "h-12 border-b border-gray-200 relative",
                      timeIndex % 4 === 0 ? "border-t-2 border-t-gray-200" : "",
                      "hover:bg-blue-50 transition-colors",
                    )}
                    onClick={() => {
                      if (onSlotClick) {
                        const clickedTime = new Date(day)
                        clickedTime.setHours(time.getHours(), time.getMinutes())
                        onSlotClick(clickedTime)
                      }
                    }}
                  >
                    {bookingsAtSlot.map((booking, bookingIndex) => {
                      // Calculate booking height based on duration
                      const durationInHours = getBookingDuration(booking.startTime, booking.endTime)
                      const heightInSlots = durationInHours * 4 // 4 slots per hour

                      return (
                        <div
                          key={bookingIndex}
                          className={cn(
                            "absolute left-0 right-0 mx-1 px-2 py-1 rounded-md overflow-hidden cursor-pointer z-10",
                            "border transition-shadow hover:shadow-md",
                            booking.status === "confirmed"
                              ? "bg-blue-100 border-blue-200"
                              : booking.status === "pending"
                                ? "bg-yellow-100 border-yellow-200"
                                : "bg-gray-100 border-gray-200",
                          )}
                          style={{
                            height: `${heightInSlots * 3}rem`,
                            backgroundColor: booking.color || undefined,
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (onBookingClick) onBookingClick(booking)
                          }}
                          onMouseEnter={(e) => {
                            setHoveredBooking(booking)
                            // Initialize tooltip position on hover start
                            const rect = calendarRef.current?.getBoundingClientRect()
                            if (rect) {
                              setTooltipPosition({
                                x: e.clientX - rect.left + 16,
                                y: e.clientY - rect.top + 16,
                              })
                            }
                          }}
                          onMouseLeave={() => setHoveredBooking(null)}
                        >
                          <div className="text-xs font-medium truncate">{booking.title}</div>
                          <div className="text-xs truncate">{booking.customer}</div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredBooking && <Tooltip booking={hoveredBooking} position={tooltipPosition} />}
    </div>
  )
}

