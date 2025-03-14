"use client"

import { useState, useRef } from "react"
import { Filter, Info, Plus, ChevronLeft, ChevronRight, User, Calendar, Clock } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

const rooms = [
  {
    number: "101",
    type: "Standard",
    bookings: [{ guest: "Sarah Davis", status: "Check In", startDay: 8, duration: 5 }],
  },
  { number: "102", type: "Standard", bookings: [] },
  { number: "103", type: "Deluxe", bookings: [] },
  {
    number: "201",
    type: "Deluxe",
    bookings: [{ guest: "Jennifer Taylor", status: "Check In", startDay: 8, duration: 3 }],
  },
  {
    number: "202",
    type: "Suite",
    bookings: [{ guest: "Michael Brown", status: "Check In", startDay: 8, duration: 4 }],
  },
  {
    number: "301",
    type: "Presidential",
    bookings: [{ guest: "David Wilson", status: "Check In", startDay: 8, duration: 7 }],
  },
  { number: "104", type: "Standard", bookings: [] },
  { number: "105", type: "Standard", bookings: [] },
  { number: "106", type: "Deluxe", bookings: [] },
  { number: "203", type: "Deluxe", bookings: [{ guest: "Sarah Davis", status: "Check In", startDay: 8, duration: 3 }] },
  { number: "204", type: "Suite", bookings: [] },
  { number: "302", type: "Presidential", bookings: [] },
]

const dates = [
  { day: 8, weekday: "Sat" },
  { day: 9, weekday: "Sun" },
  { day: 10, weekday: "Mon" },
  { day: 11, weekday: "Tue" },
  { day: 12, weekday: "Wed" },
  { day: 13, weekday: "Thu" },
  { day: 14, weekday: "Fri" },
  { day: 15, weekday: "Sat" },
  { day: 16, weekday: "Sun" },
]

export default function CalendarPage() {
  const [hoveredBooking, setHoveredBooking] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const calendarRef = useRef(null)

  // Add these new state variables for filters
  const [roomTypeFilter, setRoomTypeFilter] = useState("all-types")
  const [floorFilter, setFloorFilter] = useState("all-floors")
  const [viewMode, setViewMode] = useState("week") // 'week' or 'month'
  const router = useRouter()

  // Filter rooms based on selected filters
  const filteredRooms = rooms.filter((room) => {
    // Filter by room type
    if (roomTypeFilter !== "all-types" && room.type.toLowerCase() !== roomTypeFilter) {
      return false
    }

    // Filter by floor (assuming room number first digit is the floor)
    if (floorFilter !== "all-floors") {
      const floor = room.number.charAt(0)
      if (floor !== floorFilter) {
        return false
      }
    }

    return true
  })

  // Add this function to handle mouse movement
  const handleMouseMove = (e) => {
    if (hoveredBooking) {
      const rect = calendarRef.current?.getBoundingClientRect()
      if (rect) {
        // Position tooltip near the cursor
        setTooltipPosition({
          x: e.clientX - rect.left + 16,
          y: e.clientY - rect.top + 16,
        })
      }
    }
  }

  const [legendDialogOpen, setLegendDialogOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50" ref={calendarRef} onMouseMove={handleMouseMove}>
      <Sidebar activePage="calendar" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Availability Calendar</h1>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Select defaultValue="all-types" onValueChange={setRoomTypeFilter} value={roomTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Room Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Room Types</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="deluxe">Deluxe</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                  <SelectItem value="presidential">Presidential</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-floors" onValueChange={setFloorFilter} value={floorFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Floors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-floors">All Floors</SelectItem>
                  <SelectItem value="1">Floor 1</SelectItem>
                  <SelectItem value="2">Floor 2</SelectItem>
                  <SelectItem value="3">Floor 3</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setLegendDialogOpen(true)}>
                <Info className="h-4 w-4" />
                Legend
              </Button>

              <Button
                className="flex items-center gap-2"
                onClick={() => {
                  window.location.href = "/bookings/new"
                }}
              >
                <Plus className="h-4 w-4" />
                New Booking
              </Button>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-gray-900 font-medium">Mar 8 - Mar 17, 2025</span>
            <div className="flex items-center rounded-md border border-gray-200 bg-white">
              <Button
                variant={viewMode === "week" ? "default" : "ghost"}
                className="rounded-none border-r px-3 hover:bg-gray-50"
                onClick={() => setViewMode("week")}
              >
                Week
              </Button>
              <Button
                variant={viewMode === "month" ? "default" : "ghost"}
                className="rounded-none px-3 hover:bg-gray-50"
                onClick={() => setViewMode("month")}
              >
                Month
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline">Today</Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="min-w-[1200px]">
            <div className="grid grid-cols-[200px_repeat(9,1fr)] border-b border-gray-200 bg-white">
              <div className="p-4 font-medium text-gray-500">Room</div>
              {dates.map((date) => (
                <div key={date.day} className="p-4 text-center border-l border-gray-200">
                  <div className="font-medium text-gray-900">{date.weekday}</div>
                  <div className="text-sm text-gray-500">{date.day}</div>
                </div>
              ))}
            </div>

            <div className="bg-white">
              {filteredRooms.map((room) => (
                <div key={room.number} className="grid grid-cols-[200px_repeat(9,1fr)] border-b border-gray-200">
                  <div className="p-4 flex flex-col justify-center">
                    <div className="font-medium text-gray-900">{room.number}</div>
                    <div className="text-sm text-gray-500">{room.type}</div>
                  </div>
                  {dates.map((date) => (
                    <div key={date.day} className="relative p-2 border-l border-gray-200 min-h-[80px]">
                      {room.bookings.map((booking, index) => {
                        if (date.day >= booking.startDay && date.day < booking.startDay + booking.duration) {
                          const isStart = date.day === booking.startDay
                          const isEnd = date.day === booking.startDay + booking.duration - 1

                          return (
                            <div
                              key={index}
                              className={`absolute top-2 bottom-2 ${isStart ? "left-2" : "-left-[1px]"} ${
                                isEnd ? "right-2" : "-right-[1px]"
                              } ${
                                booking.status === "Check In"
                                  ? "bg-green-100 border-green-200"
                                  : "bg-blue-100 border-blue-200"
                              } border rounded-md flex items-center px-2 cursor-pointer hover:shadow-md transition-shadow`}
                              onMouseEnter={(e) => {
                                const rect = calendarRef.current?.getBoundingClientRect()
                                if (rect) {
                                  setHoveredBooking({
                                    ...booking,
                                    room: room.number,
                                    roomType: room.type,
                                  })
                                  setTooltipPosition({
                                    x: e.clientX - rect.left + 16,
                                    y: e.clientY - rect.top + 16,
                                  })
                                }
                              }}
                              onMouseLeave={() => setHoveredBooking(null)}
                              onClick={() => {
                                setSelectedBooking({ ...booking, room: room.number, roomType: room.type })
                                setEditDialogOpen(true)
                              }}
                            >
                              {isStart && (
                                <div className="truncate">
                                  <div className="text-sm font-medium">{booking.guest}</div>
                                  <div className="text-xs text-gray-500">{booking.status}</div>
                                </div>
                              )}
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {hoveredBooking && (
          <div
            className="absolute z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-64 pointer-events-none"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transition: "left 0.1s ease, top 0.1s ease",
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{hoveredBooking.guest}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  hoveredBooking.status === "Check In" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                }`}
              >
                {hoveredBooking.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{hoveredBooking.guest}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  {`Day ${hoveredBooking.startDay} - Day ${hoveredBooking.startDay + hoveredBooking.duration - 1}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{`${hoveredBooking.duration} days`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{`Room ${hoveredBooking.room} (${hoveredBooking.roomType})`}</span>
              </div>
            </div>
          </div>
        )}

        {/* Booking edit dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Booking</DialogTitle>
            </DialogHeader>
            {selectedBooking && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="guest-name" className="text-right">
                    Guest Name
                  </Label>
                  <Input id="guest-name" defaultValue={selectedBooking.guest} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room-number" className="text-right">
                    Room
                  </Label>
                  <Input id="room-number" defaultValue={selectedBooking.room} className="col-span-3" readOnly />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right">
                    Start Date
                  </Label>
                  <Input id="start-date" defaultValue={`Day ${selectedBooking.startDay}`} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <Input id="duration" type="number" defaultValue={selectedBooking.duration} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select defaultValue={selectedBooking.status}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Check In">Check In</SelectItem>
                      <SelectItem value="Reserved">Reserved</SelectItem>
                      <SelectItem value="Checked Out">Checked Out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input id="notes" className="col-span-3" placeholder="Add notes..." />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  alert("Booking deleted!")
                  setEditDialogOpen(false)
                }}
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  alert("Booking updated successfully!")
                  setEditDialogOpen(false)
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={legendDialogOpen} onOpenChange={setLegendDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Calendar Legend</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-green-100 border border-green-200"></div>
                <span>Check In</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-blue-100 border border-blue-200"></div>
                <span>Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-gray-100 border border-gray-200"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-red-100 border border-red-200"></div>
                <span>Maintenance</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

