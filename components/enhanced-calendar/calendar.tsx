"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon, Filter, RefreshCw } from "lucide-react"
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  addWeeks,
  subWeeks,
  isWithinInterval,
} from "date-fns"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { CalendarEvent, Room, EventType, DateRange } from "./types"
import { EventTooltip } from "./event-tooltip"
import { RoomFilter } from "./room-filter"
import { DateRangeSelector } from "./date-range-selector"

interface AvailabilityCalendarProps {
  events: CalendarEvent[]
  rooms: Room[]
  onEventClick?: (event: CalendarEvent) => void
  onSlotClick?: (time: Date, room: Room) => void
  viewMode?: "week" | "month"
}

export function AvailabilityCalendar({
  events = [],
  rooms = [],
  onEventClick,
  onSlotClick,
  viewMode = "week",
}: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms)
  const [filteredEventTypes, setFilteredEventTypes] = useState<EventType[]>(["booking", "maintenance", "cleaning"])
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: startOfWeek(currentDate, { weekStartsOn: 1 }),
    endDate: endOfWeek(currentDate, { weekStartsOn: 1 }),
  })
  const calendarRef = useRef<HTMLDivElement>(null)

  // Calculate the days to display based on view mode and date range
  const daysToShow =
    viewMode === "week"
      ? eachDayOfInterval({
          start: dateRange.startDate,
          end: dateRange.endDate,
        })
      : eachDayOfInterval({
          start: dateRange.startDate,
          end: dateRange.endDate,
        })

  // Handle navigation
  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setDateRange({
      startDate: startOfWeek(today, { weekStartsOn: 1 }),
      endDate: endOfWeek(today, { weekStartsOn: 1 }),
    })
  }

  const goToPrevious = () => {
    if (viewMode === "week") {
      const newDate = subWeeks(currentDate, 1)
      setCurrentDate(newDate)
      setDateRange({
        startDate: startOfWeek(newDate, { weekStartsOn: 1 }),
        endDate: endOfWeek(newDate, { weekStartsOn: 1 }),
      })
    } else {
      // For month view, go back a month
      const newDate = new Date(currentDate)
      newDate.setMonth(newDate.getMonth() - 1)
      setCurrentDate(newDate)
      // Update date range for month view
    }
  }

  const goToNext = () => {
    if (viewMode === "week") {
      const newDate = addWeeks(currentDate, 1)
      setCurrentDate(newDate)
      setDateRange({
        startDate: startOfWeek(newDate, { weekStartsOn: 1 }),
        endDate: endOfWeek(newDate, { weekStartsOn: 1 }),
      })
    } else {
      // For month view, go forward a month
      const newDate = new Date(currentDate)
      newDate.setMonth(newDate.getMonth() + 1)
      setCurrentDate(newDate)
      // Update date range for month view
    }
  }

  // Handle tooltip positioning to follow cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredEvent) {
      const rect = calendarRef.current?.getBoundingClientRect()
      if (rect) {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        // Calculate tooltip dimensions (approximate)
        const tooltipWidth = 288 // w-72
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

  // Filter events based on selected rooms, event types, and date range
  const filteredEvents = events.filter(
    (event) =>
      (filteredRooms.some((room) => room.id === event.room) &&
        filteredEventTypes.includes(event.type) &&
        isWithinInterval(event.startTime, { start: dateRange.startDate, end: dateRange.endDate })) ||
      isWithinInterval(event.endTime, { start: dateRange.startDate, end: dateRange.endDate }),
  )

  // Handle room filtering
  const handleRoomFilterChange = (selectedRooms: Room[]) => {
    setFilteredRooms(selectedRooms)
  }

  // Handle event type filtering
  const handleEventTypeFilterChange = (types: EventType[]) => {
    setFilteredEventTypes(types)
  }

  // Handle date range change
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range)
    setCurrentDate(range.startDate) // Update current date to match the range
  }

  // Get event color based on type and status
  const getEventColor = (event: CalendarEvent) => {
    if (event.type === "maintenance") {
      return "bg-purple-100 border-purple-300 text-purple-800"
    } else if (event.type === "cleaning") {
      return "bg-blue-100 border-blue-300 text-blue-800"
    } else if (event.type === "booking") {
      if (event.status === "confirmed") {
        return "bg-green-100 border-green-300 text-green-800"
      } else {
        return "bg-yellow-100 border-yellow-300 text-yellow-800"
      }
    }
    return "bg-gray-100 border-gray-300 text-gray-800"
  }

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
      ref={calendarRef}
      onMouseMove={handleMouseMove}
    >
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              {`${format(dateRange.startDate, "MMMM d")} - ${format(dateRange.endDate, "MMMM d, yyyy")}`}
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

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <RoomFilter rooms={rooms} selectedRooms={filteredRooms} onChange={handleRoomFilterChange} />

            <div className="flex items-center gap-2">
              <Button
                variant={filteredEventTypes.includes("booking") ? "default" : "outline"}
                size="sm"
                className={cn("text-xs", filteredEventTypes.includes("booking") ? "bg-blue-600" : "")}
                onClick={() => {
                  if (filteredEventTypes.includes("booking")) {
                    setFilteredEventTypes(filteredEventTypes.filter((t) => t !== "booking"))
                  } else {
                    setFilteredEventTypes([...filteredEventTypes, "booking"])
                  }
                }}
              >
                Bookings
              </Button>
              <Button
                variant={filteredEventTypes.includes("maintenance") ? "default" : "outline"}
                size="sm"
                className={cn("text-xs", filteredEventTypes.includes("maintenance") ? "bg-purple-600" : "")}
                onClick={() => {
                  if (filteredEventTypes.includes("maintenance")) {
                    setFilteredEventTypes(filteredEventTypes.filter((t) => t !== "maintenance"))
                  } else {
                    setFilteredEventTypes([...filteredEventTypes, "maintenance"])
                  }
                }}
              >
                Maintenance
              </Button>
              <Button
                variant={filteredEventTypes.includes("cleaning") ? "default" : "outline"}
                size="sm"
                className={cn("text-xs", filteredEventTypes.includes("cleaning") ? "bg-blue-600" : "")}
                onClick={() => {
                  if (filteredEventTypes.includes("cleaning")) {
                    setFilteredEventTypes(filteredEventTypes.filter((t) => t !== "cleaning"))
                  } else {
                    setFilteredEventTypes([...filteredEventTypes, "cleaning"])
                  }
                }}
              >
                Cleaning
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DateRangeSelector dateRange={dateRange} onChange={handleDateRangeChange} />
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button variant="outline" size="icon" title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-auto max-h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(120px,1fr))]">
          {/* Room column */}
          <div className="sticky left-0 z-10 bg-white border-r border-gray-200">
            <div className="h-12 border-b border-gray-200 flex items-center justify-start px-4 font-medium text-gray-700">
              Rooms
            </div>
            {filteredRooms.map((room) => (
              <div key={room.id} className="h-16 border-b border-gray-200 flex flex-col justify-center px-4">
                <div className="font-medium text-gray-900">{room.number}</div>
                <div className="text-xs text-gray-500">{room.type}</div>
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

              {/* Room rows */}
              {filteredRooms.map((room) => {
                // Find events for this room on this day
                const roomEvents = filteredEvents.filter(
                  (event) =>
                    event.room === room.id &&
                    (isSameDay(event.startTime, day) ||
                      isSameDay(event.endTime, day) ||
                      (event.startTime < day && event.endTime > day)),
                )

                return (
                  <div
                    key={`${room.id}-${dayIndex}`}
                    className="h-16 border-b border-gray-200 relative hover:bg-gray-50"
                    onClick={() => onSlotClick && onSlotClick(day, room)}
                  >
                    {roomEvents.map((event, eventIndex) => {
                      // Calculate position and width
                      const eventStart = event.startTime < dateRange.startDate ? dateRange.startDate : event.startTime
                      const eventEnd = event.endTime > dateRange.endDate ? dateRange.endDate : event.endTime

                      const startDayIndex = daysToShow.findIndex((d) => isSameDay(d, eventStart))
                      const endDayIndex = daysToShow.findIndex((d) => isSameDay(d, eventEnd))

                      // Only render if the event starts or continues on this day
                      if (dayIndex >= startDayIndex && dayIndex <= endDayIndex) {
                        const isStart = dayIndex === startDayIndex
                        const isEnd = dayIndex === endDayIndex

                        return (
                          <div
                            key={`${event.id}-${eventIndex}`}
                            className={cn(
                              "absolute top-1 bottom-1",
                              isStart ? "left-1" : "-left-[1px]",
                              isEnd ? "right-1" : "-right-[1px]",
                              "border rounded-md flex items-center px-2 cursor-pointer z-10 hover:shadow-md transition-shadow",
                              getEventColor(event),
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              onEventClick && onEventClick(event)
                            }}
                            onMouseEnter={(e) => {
                              setHoveredEvent(event)
                              const rect = calendarRef.current?.getBoundingClientRect()
                              if (rect) {
                                setTooltipPosition({
                                  x: e.clientX - rect.left + 16,
                                  y: e.clientY - rect.top + 16,
                                })
                              }
                            }}
                            onMouseLeave={() => setHoveredEvent(null)}
                          >
                            {isStart && (
                              <div className="truncate text-xs">
                                <div className="font-medium">{event.title}</div>
                                {event.type === "booking" && event.customer && (
                                  <div className="text-[10px] opacity-80">{event.customer}</div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="p-3 border-t border-gray-200 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-green-100 border border-green-300"></div>
          <span>Confirmed Booking</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-yellow-100 border border-yellow-300"></div>
          <span>Unconfirmed Booking</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-purple-100 border border-purple-300"></div>
          <span>Maintenance</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-blue-100 border border-blue-300"></div>
          <span>Cleaning</span>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredEvent && <EventTooltip event={hoveredEvent} position={tooltipPosition} />}
    </div>
  )
}

