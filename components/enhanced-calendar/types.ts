export type EventType = "booking" | "maintenance" | "cleaning"

export type BookingStatus = "confirmed" | "unconfirmed"

export interface CalendarEvent {
  id: string
  title: string
  startTime: Date
  endTime: Date
  type: EventType
  status?: BookingStatus // Only for booking type
  customer?: string // Only for booking type
  notes?: string
  room: string
}

export interface Room {
  id: string
  number: string
  type: string
  floor: string
}

export interface DateRange {
  startDate: Date
  endDate: Date
}

