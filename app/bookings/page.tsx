"use client"

import { Search, ChevronDown, Plus, MoreHorizontal, ChevronLeft, ChevronRight, User } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function BookingsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="bookings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Bookings Management</h1>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">Admin User</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4 flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  <span>Date Range</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  <span>Status</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  <span>Room Type</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <Button
                className="flex items-center gap-2 ml-auto"
                onClick={() => {
                  window.location.href = "/bookings/new"
                }}
              >
                <Plus className="h-4 w-4" />
                <span>Add New Booking</span>
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Booking ID</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Guest Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Check-in</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Check-out</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Room</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Payment</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <BookingRow
                      id="BK-2024-001"
                      guest={{ name: "John Smith", email: "john.smith@email.com" }}
                      checkIn="2024-02-15"
                      checkOut="2024-02-18"
                      room="301"
                      status="checked-in"
                      payment="paid"
                    />
                    <BookingRow
                      id="BK-2024-002"
                      guest={{ name: "Emma Wilson", email: "emma.w@email.com" }}
                      checkIn="2024-02-16"
                      checkOut="2024-02-20"
                      room="205"
                      status="confirmed"
                      payment="pending"
                    />
                    <BookingRow
                      id="BK-2024-003"
                      guest={{ name: "Michael Brown", email: "m.brown@email.com" }}
                      checkIn="2024-02-17"
                      checkOut="2024-02-19"
                      room="402"
                      status="pending"
                      payment="unpaid"
                    />
                    <BookingRow
                      id="BK-2024-004"
                      guest={{ name: "Sarah Davis", email: "sarah.d@email.com" }}
                      checkIn="2024-02-14"
                      checkOut="2024-02-16"
                      room="501"
                      status="checked-out"
                      payment="paid"
                    />
                    <BookingRow
                      id="BK-2024-005"
                      guest={{ name: "James Wilson", email: "j.wilson@email.com" }}
                      checkIn="2024-02-18"
                      checkOut="2024-02-21"
                      room="302"
                      status="cancelled"
                      payment="refunded"
                    />
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-500">Showing 1 to 5 of 24 entries</div>
                <div className="flex items-center gap-2">
                  <button className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function BookingRow({ id, guest, checkIn, checkOut, room, status, payment }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const router = useRouter()

  const getStatusBadge = (status) => {
    switch (status) {
      case "checked-in":
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Checked-in</span>
      case "confirmed":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Confirmed</span>
      case "pending":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
      case "checked-out":
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Checked-out</span>
      case "cancelled":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Cancelled</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>
    }
  }

  const getPaymentStatus = (payment) => {
    switch (payment) {
      case "paid":
        return <span className="text-green-600">Paid</span>
      case "pending":
        return <span className="text-yellow-600">Pending</span>
      case "unpaid":
        return <span className="text-red-600">Unpaid</span>
      case "refunded":
        return <span className="text-gray-600">Refunded</span>
      default:
        return <span>{payment}</span>
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0].replace(/-/g, "-")
  }

  const handleRowClick = () => {
    router.push(`/bookings/${id}`)
  }

  return (
    <tr className="hover:bg-gray-50 cursor-pointer" onClick={handleRowClick}>
      <td className="px-6 py-4 text-sm text-gray-500">{id}</td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{guest.name}</div>
        <div className="text-sm text-gray-500">{guest.email}</div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(checkIn)}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(checkOut)}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{room}</td>
      <td className="px-6 py-4 text-sm">{getStatusBadge(status)}</td>
      <td className="px-6 py-4 text-sm font-medium">{getPaymentStatus(payment)}</td>
      <td className="px-6 py-4 text-sm text-gray-500" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/bookings/${id}`} className="flex items-center cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                <span>View</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/bookings/${id}/edit`}
                className="flex items-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/bookings/${id}/edit`)
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center text-red-600 focus:text-red-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                setDeleteDialogOpen(true)
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete booking {id} for {guest.name}. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  // Here you would call your delete API
                  console.log(`Deleting booking ${id}`)
                  // After successful deletion, you would refresh the bookings list
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  )
}

