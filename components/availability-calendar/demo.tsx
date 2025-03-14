"use client"

import { useState } from "react"
import { addDays, addHours, setHours, setMinutes } from "date-fns"
import { AvailabilityCalendar, type Booking } from "./calendar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Generate sample bookings
const generateSampleBookings = (): Booking[] => {
  const today = new Date()
  const startOfDay = setHours(setMinutes(today, 0), 9)

  return [
    {
      id: "1",
      title: "Executive Meeting",
      startTime: startOfDay,
      endTime: addHours(startOfDay, 1.5),
      customer: "John Smith",
      location: "Conference Room A",
      notes: "Prepare quarterly reports and sales projections",
      status: "confirmed",
    },
    {
      id: "2",
      title: "Team Lunch",
      startTime: setHours(today, 12),
      endTime: setHours(today, 13),
      customer: "Marketing Team",
      location: "Cafeteria",
      status: "confirmed",
    },
    {
      id: "3",
      title: "Client Call",
      startTime: setHours(addDays(today, 1), 10),
      endTime: setHours(addDays(today, 1), 11),
      customer: "Acme Corp",
      notes: "Discuss new project requirements",
      status: "pending",
    },
    {
      id: "4",
      title: "Product Demo",
      startTime: setHours(addDays(today, 2), 14),
      endTime: setHours(addDays(today, 2), 15),
      customer: "Potential Clients",
      location: "Demo Room",
      status: "confirmed",
    },
    {
      id: "5",
      title: "Interview",
      startTime: setHours(addDays(today, 3), 11),
      endTime: setHours(addDays(today, 3), 12),
      customer: "Developer Candidate",
      location: "Meeting Room B",
      notes: "Senior developer position",
      status: "confirmed",
    },
    {
      id: "6",
      title: "Maintenance",
      startTime: setHours(today, 15),
      endTime: setHours(today, 17),
      customer: "IT Department",
      location: "Server Room",
      status: "confirmed",
    },
  ]
}

export function CalendarDemo() {
  const [bookings, setBookings] = useState<Booking[]>(generateSampleBookings())
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isNewBookingDialogOpen, setIsNewBookingDialogOpen] = useState(false)
  const [newBookingTime, setNewBookingTime] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<"day" | "week">("week")

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsEditDialogOpen(true)
  }

  const handleSlotClick = (time: Date) => {
    setNewBookingTime(time)
    setIsNewBookingDialogOpen(true)
  }

  const handleSaveBooking = () => {
    // In a real app, you would save the changes to the booking
    alert("Booking updated successfully!")
    setIsEditDialogOpen(false)
  }

  const handleCreateBooking = () => {
    // In a real app, you would create a new booking
    alert("New booking created successfully!")
    setIsNewBookingDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Availability Calendar</h1>
        <div className="flex items-center gap-4">
          <Select value={viewMode} onValueChange={(value: "day" | "week") => setViewMode(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
            </SelectContent>
          </Select>
          <Button>New Booking</Button>
        </div>
      </div>

      <AvailabilityCalendar
        bookings={bookings}
        onBookingClick={handleBookingClick}
        onSlotClick={handleSlotClick}
        viewMode={viewMode}
      />

      {/* Edit Booking Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" defaultValue={selectedBooking.title} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">
                  Customer
                </Label>
                <Input id="customer" defaultValue={selectedBooking.customer} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input id="location" defaultValue={selectedBooking.location} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-time" className="text-right">
                  Start Time
                </Label>
                <Input
                  id="start-time"
                  type="datetime-local"
                  defaultValue={selectedBooking.startTime.toISOString().slice(0, 16)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end-time" className="text-right">
                  End Time
                </Label>
                <Input
                  id="end-time"
                  type="datetime-local"
                  defaultValue={selectedBooking.endTime.toISOString().slice(0, 16)}
                  className="col-span-3"
                />
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
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right pt-2">
                  Notes
                </Label>
                <Textarea id="notes" defaultValue={selectedBooking.notes} className="col-span-3 min-h-[80px]" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                alert("Booking deleted!")
                setIsEditDialogOpen(false)
              }}
            >
              Delete
            </Button>
            <Button onClick={handleSaveBooking}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Booking Dialog */}
      <Dialog open={isNewBookingDialogOpen} onOpenChange={setIsNewBookingDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Booking</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-title" className="text-right">
                Title
              </Label>
              <Input id="new-title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-customer" className="text-right">
                Customer
              </Label>
              <Input id="new-customer" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-location" className="text-right">
                Location
              </Label>
              <Input id="new-location" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-start-time" className="text-right">
                Start Time
              </Label>
              <Input
                id="new-start-time"
                type="datetime-local"
                defaultValue={newBookingTime?.toISOString().slice(0, 16)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-end-time" className="text-right">
                End Time
              </Label>
              <Input
                id="new-end-time"
                type="datetime-local"
                defaultValue={newBookingTime ? addHours(newBookingTime, 1).toISOString().slice(0, 16) : undefined}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-status" className="text-right">
                Status
              </Label>
              <Select defaultValue="confirmed">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="new-notes" className="text-right pt-2">
                Notes
              </Label>
              <Textarea id="new-notes" className="col-span-3 min-h-[80px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateBooking}>Create Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

