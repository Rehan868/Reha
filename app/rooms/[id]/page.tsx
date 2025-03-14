"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Bed,
  Users,
  Calendar,
  Tag,
  Home,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Mock data - replace with actual API call
const getRoomData = (id) => {
  return {
    number: id,
    type: "Deluxe King",
    floor: "1st Floor",
    status: "Available",
    rate: 199,
    occupancy: "2 Adults",
    lastCleaned: "2024-01-20 09:30",
    description: "Spacious room with king-sized bed, en-suite bathroom, and city view.",
    amenities: ["Air Conditioning", "Free Wi-Fi", "Flat-screen TV", "Mini Bar", "Safe", "Coffee Maker"],
    size: "32 sq m",
    view: "City View",
    bedType: "King",
    maxOccupancy: 2,
    extraBeds: 1,
    smoking: false,
    accessibility: true,
    maintenanceHistory: [
      { date: "2023-12-15", type: "Regular Inspection", notes: "All systems functioning properly" },
      { date: "2023-10-22", type: "Plumbing Repair", notes: "Fixed leaking faucet in bathroom" },
    ],
    upcomingBookings: [
      { id: "B1001", guestName: "John Smith", checkIn: "2024-02-15", checkOut: "2024-02-18" },
      { id: "B1042", guestName: "Sarah Johnson", checkIn: "2024-03-01", checkOut: "2024-03-05" },
    ],
  }
}

export default function ViewRoomPage() {
  const params = useParams()
  const router = useRouter()
  const roomId = params.id ? String(params.id) : ""
  const room = getRoomData(roomId)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = () => {
    console.log(`Deleting room ${roomId}`)
    // Here you would call your API to delete the room
    setShowDeleteDialog(false)
    router.push("/rooms")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="rooms" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-gray-800">Room {String(roomId)} Details</h1>
              <Badge
                className={
                  room.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : room.status === "Occupied"
                      ? "bg-blue-100 text-blue-800"
                      : room.status === "Cleaning"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-orange-100 text-orange-800"
                }
              >
                {String(room.status)}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push(`/rooms/${roomId}/edit`)}
              >
                <Pencil className="h-4 w-4" />
                Edit Room
              </Button>
              <Button
                variant="destructive"
                className="flex items-center gap-2"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
                Delete Room
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-3 gap-6 p-6">
            <div className="col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Room Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Bed className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Room Type</p>
                          <p className="text-base">{room.type}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Home className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Floor</p>
                          <p className="text-base">{room.floor}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Tag className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Rate</p>
                          <p className="text-base">${room.rate}/night</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">View</p>
                          <p className="text-base">{room.view}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Max Occupancy</p>
                          <p className="text-base">
                            {room.maxOccupancy} Adults, {room.extraBeds} Extra Bed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Size</p>
                          <p className="text-base">{room.size}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Last Cleaned</p>
                          <p className="text-base">{room.lastCleaned}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Accessibility</p>
                          <p className="text-base">{room.accessibility ? "Yes" : "No"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-base font-medium mb-3">Description</h3>
                    <p className="text-gray-700">{room.description}</p>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-base font-medium mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {room.maintenanceHistory.map((record, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{record.type}</span>
                          <span className="text-sm text-gray-500">{record.date}</span>
                        </div>
                        <p className="text-gray-700">{record.notes}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Room Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Current Status</span>
                      <Badge
                        className={
                          room.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : room.status === "Occupied"
                              ? "bg-blue-100 text-blue-800"
                              : room.status === "Cleaning"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-orange-100 text-orange-800"
                        }
                      >
                        {String(room.status)}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Smoking</span>
                      <span>{room.smoking ? "Allowed" : "Not Allowed"}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Accessibility</span>
                      <span>{room.accessibility ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {room.upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                      {room.upcomingBookings.map((booking, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{booking.guestName}</span>
                            <span className="text-sm text-gray-500">#{booking.id}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {booking.checkIn} to {booking.checkOut}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <Calendar className="h-12 w-12 text-gray-300 mb-2" />
                      <h3 className="text-lg font-medium text-gray-900">No Upcoming Bookings</h3>
                      <p className="text-gray-500 mt-1">This room has no scheduled bookings.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Create New Booking
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Report Maintenance Issue
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule Cleaning
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete Room {String(roomId)}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

