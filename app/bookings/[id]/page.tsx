"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Edit,
  Mail,
  MapPin,
  Phone,
  Printer,
  Trash,
  User,
  Users,
  Bed,
  Clock,
  CheckCircle,
  XCircle,
  Building,
  DollarSign,
  Shield,
  Percent,
  Award,
  UserCheck,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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

export default function ViewBookingPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mock booking data - in a real app, you would fetch this from your API
  const booking = {
    id: bookingId,
    guestName: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    adults: 2,
    children: 1,
    checkIn: "2023-11-15",
    checkOut: "2023-11-20",
    property: "Marina Towers",
    unitNumber: "304",
    roomType: "Deluxe Suite",
    totalPaidByGuest: "$1,500.00",
    totalRental: "$1,250.00",
    securityDeposit: "$500.00",
    commission: "$125.00",
    tourismDirhamFee: "$100.00",
    netToOwner: "$1,025.00",
    paidOn: "2023-10-25",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    agent: "John Doe",
    specialRequests: "Late check-in, around 10 PM. Would prefer a high floor with city view if possible.",
    createdAt: "2023-10-25",
    address: "123 Main St, Anytown, CA 94321",
    paymentMethod: "Credit Card (Visa ****4567)",
    bookingSource: "Direct Website",
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      // In a real app, you would call your API to delete the booking
      console.log("Deleting booking:", bookingId)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/bookings")
    } catch (error) {
      console.error("Error deleting booking:", error)
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleCheckIn = async () => {
    // In a real app, you would call your API to check in the guest
    console.log("Checking in booking:", bookingId)
  }

  const handleCheckOut = async () => {
    // In a real app, you would call your API to check out the guest
    console.log("Checking out booking:", bookingId)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="bookings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/bookings" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-800">Booking Details</h1>
            <Badge variant={booking.bookingStatus === "Confirmed" ? "success" : "default"}>
              {booking.bookingStatus}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Link href={`/bookings/${bookingId}/edit`} passHref>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Guest Name</p>
                        <p className="text-base">{booking.guestName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-base">{booking.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-base">{booking.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        <p className="text-base">{booking.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Guests</p>
                        <p className="text-base">
                          {booking.adults} Adults, {booking.children} Children
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <UserCheck className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Agent</p>
                        <p className="text-base">{booking.agent || "None"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={handleCheckIn}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Check In Guest
                </Button>
                <Button className="w-full" variant="outline" onClick={handleCheckOut}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Check Out Guest
                </Button>
                <Button className="w-full" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Confirmation
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Property & Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Property</p>
                        <p className="text-base">{booking.property}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bed className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Unit Number</p>
                        <p className="text-base">{booking.unitNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bed className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Room Type</p>
                        <p className="text-base">{booking.roomType}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Check-in Date</p>
                        <p className="text-base">{booking.checkIn}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Check-out Date</p>
                        <p className="text-base">{booking.checkOut}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Booking Date</p>
                        <p className="text-base">{booking.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Paid by Guest</p>
                    <p className="text-base font-semibold">{booking.totalPaidByGuest}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Rental</p>
                    <p className="text-base">{booking.totalRental}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Security Deposit</p>
                    <p className="text-base">{booking.securityDeposit}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Percent className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Commission</p>
                    <p className="text-base">{booking.commission}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tourism Dirham Fee</p>
                    <p className="text-base">{booking.tourismDirhamFee}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Net to Owner</p>
                    <p className="text-base font-semibold">{booking.netToOwner}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment Method</p>
                    <p className="text-base">{booking.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment Status</p>
                    <Badge variant={booking.paymentStatus === "Paid" ? "success" : "warning"}>
                      {booking.paymentStatus}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Paid On</p>
                    <p className="text-base">{booking.paidOn}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Booking Source</p>
                  <p className="text-base">{booking.bookingSource}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-500">Special Requests</p>
                  <p className="text-base">{booking.specialRequests}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the booking and remove the data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

