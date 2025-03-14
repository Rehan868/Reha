"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const rooms = [
  {
    number: "101",
    type: "Deluxe King",
    floor: "1st Floor",
    status: "Available",
    rate: 199,
    occupancy: "2 Adults",
    lastCleaned: "2024-01-20 09:30",
  },
  {
    number: "102",
    type: "Twin Deluxe",
    floor: "1st Floor",
    status: "Occupied",
    rate: 179,
    occupancy: "2 Adults, 1 Child",
    lastCleaned: "2024-01-19 14:45",
  },
  {
    number: "201",
    type: "Executive Suite",
    floor: "2nd Floor",
    status: "Cleaning",
    rate: 299,
    occupancy: "2 Adults",
    lastCleaned: "2024-01-20 08:15",
  },
  {
    number: "202",
    type: "Family Suite",
    floor: "2nd Floor",
    status: "Maintenance",
    rate: 259,
    occupancy: "4 Adults",
    lastCleaned: "2024-01-18 16:20",
  },
  {
    number: "301",
    type: "Presidential Suite",
    floor: "3rd Floor",
    status: "Available",
    rate: 499,
    occupancy: "2 Adults",
    lastCleaned: "2024-01-20 10:45",
  },
]

export default function RoomsPage() {
  const [viewMode, setViewMode] = useState("list") // "list" or "grid"
  const [roomToDelete, setRoomToDelete] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="rooms" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Rooms Management</h1>
            <div className="flex items-center gap-3">
              <Link href="/rooms/add">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Room
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-grow max-w-xl relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search rooms..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden mr-2">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
            </div>

            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="deluxe">Deluxe</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                  <SelectItem value="presidential">Presidential</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Floors</SelectItem>
                  <SelectItem value="1">1st Floor</SelectItem>
                  <SelectItem value="2">2nd Floor</SelectItem>
                  <SelectItem value="3">3rd Floor</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Occupancy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="2">2 Adults</SelectItem>
                  <SelectItem value="3">3 Adults</SelectItem>
                  <SelectItem value="4">4 Adults</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {viewMode === "list" ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Room Number</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Room Type</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Floor</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Current Rate</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Occupancy</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last Cleaned</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {rooms.map((room) => (
                      <tr key={room.number} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{room.number}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{room.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{room.floor}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={room.status} />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">${room.rate}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{room.occupancy}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{formatDateTime(room.lastCleaned)}</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <Link href={`/rooms/${room.number}`}>
                              <button className="text-blue-500 hover:text-blue-700">
                                <Eye className="h-4 w-4" />
                              </button>
                            </Link>
                            <Link href={`/rooms/${room.number}/edit`}>
                              <button className="text-amber-500 hover:text-amber-700">
                                <Pencil className="h-4 w-4" />
                              </button>
                            </Link>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => {
                                setRoomToDelete(room)
                                setShowDeleteDialog(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-500">Showing 1 to 5 of 24 rooms</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-1" disabled>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map((room) => (
                <div
                  key={room.number}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">Room {room.number}</h3>
                    <StatusBadge status={room.status} />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-medium">{room.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Floor:</span>
                      <span>{room.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rate:</span>
                      <span className="font-medium">${room.rate}/night</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Occupancy:</span>
                      <span>{room.occupancy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Cleaned:</span>
                      <span>{formatDateTime(room.lastCleaned)}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end gap-2">
                    <Link href={`/rooms/${room.number}`}>
                      <button className="text-blue-500 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </button>
                    </Link>
                    <Link href={`/rooms/${room.number}/edit`}>
                      <button className="text-amber-500 hover:text-amber-700">
                        <Pencil className="h-4 w-4" />
                      </button>
                    </Link>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        setRoomToDelete(room)
                        setShowDeleteDialog(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete Room {roomToDelete?.number}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  console.log(`Deleting room ${roomToDelete?.number}`)
                  // Here you would call your API to delete the room
                  // Then update your local state
                  setShowDeleteDialog(false)
                  setRoomToDelete(null)
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-50 text-green-700 border-green-100"
      case "occupied":
        return "bg-blue-50 text-blue-700 border-blue-100"
      case "cleaning":
        return "bg-purple-50 text-purple-700 border-purple-100"
      case "maintenance":
        return "bg-orange-50 text-orange-700 border-orange-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-100"
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {status}
    </span>
  )
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString)
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  return `${formattedDate}\n${formattedTime}`
}

