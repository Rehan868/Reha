"use client"

import { useState } from "react"
import { addDays, addHours, setHours } from "date-fns"
import { AvailabilityCalendar } from "./calendar"
import type { CalendarEvent, Room } from "./types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Sample rooms data
const sampleRooms: Room[] = [
  { id: "r1", number: "101", type: "Standard", floor: "1st Floor" },
  { id: "r2", number: "102", type: "Standard", floor: "1st Floor" },
  { id: "r3", number: "103", type: "Deluxe", floor: "1st Floor" },
  { id: "r4", number: "201", type: "Deluxe", floor: "2nd Floor" },
  { id: "r5", number: "202", type: "Suite", floor: "2nd Floor" },
  { id: "r6", number: "301", type: "Presidential", floor: "3rd Floor" },
]

// Generate sample events
const generateSampleEvents = (): CalendarEvent[] => {
  const today = new Date()
  const events: CalendarEvent[] = [
    // Confirmed bookings
    {
      id: "e1",
      title: "Smith Family",
      startTime: setHours(today, 12),
      endTime: setHours(addDays(today, 3), 10),
      type: "booking",
      status: "confirmed",
      customer: "John Smith",
      notes: "Family of 4, requested extra towels",
      room: "r1",
    },
    {
      id: "e2",
      title: "Business Trip",
      startTime: setHours(addDays(today, 1), 14),
      endTime: setHours(addDays(today, 4), 12),
      type: "booking",
      status: "confirmed",
      customer: "Sarah Johnson",
      notes: "Business traveler, needs early check-in",
      room: "r4",
    },

    // Unconfirmed bookings
    {
      id: "e3",
      title: "Pending Reservation",
      startTime: setHours(addDays(today, 2), 15),
      endTime: setHours(addDays(today, 5), 11),
      type: "booking",
      status: "unconfirmed",
      customer: "Michael Brown",
      notes: "Waiting for payment confirmation",
      room: "r2",
    },
    {
      id: "e4",
      title: "Tentative Group",
      startTime: setHours(addDays(today, 4), 12),
      endTime: setHours(addDays(today, 7), 10),
      type: "booking",
      status: "unconfirmed",
      customer: "Corporate Event",
      notes: "Pending final headcount",
      room: "r5",
    },

    // Maintenance events
    {
      id: "e5",
      title: "Plumbing Repair",
      startTime: setHours(today, 9),
      endTime: setHours(today, 17),
      type: "maintenance",
      notes: "Fix bathroom leak",
      room: "r3",
    },
    {
      id: "e6",
      title: "AC Maintenance",
      startTime: setHours(addDays(today, 3), 10),
      endTime: setHours(addDays(today, 3), 15),
      type: "maintenance",
      notes: "Annual AC service",
      room: "r6",
    },

    // Cleaning events
    {
      id: "e7",
      title: "Deep Cleaning",
      startTime: setHours(addDays(today, 1), 10),
      endTime: setHours(addDays(today, 1), 14),
      type: "cleaning",
      notes: "Quarterly deep cleaning",
      room: "r6",
    },
    {
      id: "e8",
      title: "Standard Cleaning",
      startTime: setHours(today, 10),
      endTime: setHours(today, 12),
      type: "cleaning",
      notes: "Regular room cleaning",
      room: "r5",
    },
  ]

  return events
}

export function EnhancedCalendarDemo() {
  const [events, setEvents] = useState<CalendarEvent[]>(generateSampleEvents())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false)
  const [newEventData, setNewEventData] = useState<{ time: Date; room: Room } | null>(null)

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsEditDialogOpen(true)
  }

  const handleSlotClick = (time: Date, room: Room) => {
    setNewEventData({ time, room })
    setIsNewEventDialogOpen(true)
  }

  const handleSaveEvent = () => {
    // In a real app, you would save the changes to the event
    alert("Event updated successfully!")
    setIsEditDialogOpen(false)
  }

  const handleCreateEvent = () => {
    // In a real app, you would create a new event
    alert("New event created successfully!")
    setIsNewEventDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Availability Calendar</h1>
        <Button
          onClick={() => {
            setNewEventData({ time: new Date(), room: sampleRooms[0] })
            setIsNewEventDialogOpen(true)
          }}
        >
          New Event
        </Button>
      </div>

      <AvailabilityCalendar
        events={events}
        rooms={sampleRooms}
        onEventClick={handleEventClick}
        onSlotClick={handleSlotClick}
      />

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" defaultValue={selectedEvent.title} className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-type" className="text-right">
                  Type
                </Label>
                <Select defaultValue={selectedEvent.type}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Booking</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedEvent.type === "booking" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer" className="text-right">
                      Customer
                    </Label>
                    <Input id="customer" defaultValue={selectedEvent.customer} className="col-span-3" />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select defaultValue={selectedEvent.status}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="unconfirmed">Unconfirmed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">
                  Room
                </Label>
                <Select defaultValue={selectedEvent.room}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleRooms.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.number} - {room.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-time" className="text-right">
                  Start Time
                </Label>
                <Input
                  id="start-time"
                  type="datetime-local"
                  defaultValue={selectedEvent.startTime.toISOString().slice(0, 16)}
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
                  defaultValue={selectedEvent.endTime.toISOString().slice(0, 16)}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right pt-2">
                  Notes
                </Label>
                <Textarea id="notes" defaultValue={selectedEvent.notes} className="col-span-3 min-h-[80px]" />
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
                alert("Event deleted!")
                setIsEditDialogOpen(false)
              }}
            >
              Delete
            </Button>
            <Button onClick={handleSaveEvent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Event Dialog */}
      <Dialog open={isNewEventDialogOpen} onOpenChange={setIsNewEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-title" className="text-right">
                Title
              </Label>
              <Input id="new-title" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-event-type" className="text-right">
                Type
              </Label>
              <Select defaultValue="booking">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="booking">Booking</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-customer" className="text-right">
                Customer
              </Label>
              <Input id="new-customer" className="col-span-3" />
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
                  <SelectItem value="unconfirmed">Unconfirmed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-room" className="text-right">
                Room
              </Label>
              <Select defaultValue={newEventData?.room.id || sampleRooms[0].id}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {sampleRooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.number} - {room.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-start-time" className="text-right">
                Start Time
              </Label>
              <Input
                id="new-start-time"
                type="datetime-local"
                defaultValue={newEventData?.time.toISOString().slice(0, 16)}
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
                defaultValue={newEventData ? addHours(newEventData.time, 1).toISOString().slice(0, 16) : undefined}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="new-notes" className="text-right pt-2">
                Notes
              </Label>
              <Textarea id="new-notes" className="col-span-3 min-h-[80px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateEvent}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

