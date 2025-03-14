"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format, differenceInDays } from "date-fns"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

// Form validation schema
const bookingFormSchema = z.object({
  guestName: z.string().min(2, { message: "Guest name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  property: z.string({ required_error: "Please select a property." }),
  unitNumber: z.string({ required_error: "Please select a unit number." }),
  adults: z.string().min(1, { message: "At least 1 adult is required." }),
  children: z.string(),
  checkIn: z.date({ required_error: "Check-in date is required." }),
  checkOut: z.date({ required_error: "Check-out date is required." }),
  totalPaidByGuest: z.string().min(1, { message: "Total paid amount is required." }),
  totalRental: z.string().min(1, { message: "Total rental amount is required." }),
  securityDeposit: z.string(),
  commission: z.string(),
  tourismDirhamFee: z.string(),
  netToOwner: z.string(),
  paidOn: z.date().optional(),
  paymentMethod: z.string({ required_error: "Please select a payment method." }),
  bookingStatus: z.string({ required_error: "Please select a booking status." }),
  agent: z.string().optional(),
  bookingSource: z.string({ required_error: "Please select a booking source." }),
  specialRequests: z.string().optional(),
  address: z.string().min(5, { message: "Please enter a valid address." }),
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

// Mock data for dropdowns
const properties = [
  { id: "marina-towers", name: "Marina Towers" },
  { id: "downtown-heights", name: "Downtown Heights" },
  { id: "palm-residences", name: "Palm Residences" },
  { id: "jbr-apartments", name: "JBR Apartments" },
]

const units = [
  { id: "101", propertyId: "marina-towers", name: "101 - Studio" },
  { id: "102", propertyId: "marina-towers", name: "102 - 1BR" },
  { id: "201", propertyId: "marina-towers", name: "201 - 2BR" },
  { id: "301", propertyId: "downtown-heights", name: "301 - Studio" },
  { id: "302", propertyId: "downtown-heights", name: "302 - 1BR" },
  { id: "401", propertyId: "palm-residences", name: "401 - 3BR" },
  { id: "402", propertyId: "palm-residences", name: "402 - 2BR" },
  { id: "501", propertyId: "jbr-apartments", name: "501 - Studio" },
  { id: "502", propertyId: "jbr-apartments", name: "502 - 1BR" },
]

const agents = [
  { id: "john-doe", name: "John Doe" },
  { id: "jane-smith", name: "Jane Smith" },
  { id: "mike-johnson", name: "Mike Johnson" },
  { id: "sarah-williams", name: "Sarah Williams" },
]

export default function EditBookingPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filteredUnits, setFilteredUnits] = useState(units)

  // Mock booking data - in a real app, you would fetch this from your API
  const bookingData = {
    id: bookingId,
    guestName: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    property: "marina-towers",
    unitNumber: "102",
    adults: "2",
    children: "1",
    checkIn: new Date("2023-11-15"),
    checkOut: new Date("2023-11-20"),
    totalPaidByGuest: "1500",
    totalRental: "1250",
    securityDeposit: "500",
    commission: "125",
    tourismDirhamFee: "100",
    netToOwner: "1025",
    paidOn: new Date("2023-10-25"),
    paymentMethod: "credit-card",
    bookingStatus: "confirmed",
    agent: "john-doe",
    specialRequests: "Late check-in, around 10 PM. Would prefer a high floor with city view if possible.",
    address: "123 Main St, Anytown, CA 94321",
    bookingSource: "direct-website",
  }

  // Initialize form with booking data
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guestName: bookingData.guestName,
      email: bookingData.email,
      phone: bookingData.phone,
      property: bookingData.property,
      unitNumber: bookingData.unitNumber,
      adults: bookingData.adults,
      children: bookingData.children,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      totalPaidByGuest: bookingData.totalPaidByGuest,
      totalRental: bookingData.totalRental,
      securityDeposit: bookingData.securityDeposit,
      commission: bookingData.commission,
      tourismDirhamFee: bookingData.tourismDirhamFee,
      netToOwner: bookingData.netToOwner,
      paidOn: bookingData.paidOn,
      paymentMethod: bookingData.paymentMethod,
      bookingStatus: bookingData.bookingStatus,
      agent: bookingData.agent,
      specialRequests: bookingData.specialRequests,
      address: bookingData.address,
      bookingSource: bookingData.bookingSource,
    },
  })

  // Watch form values for calculations and filtering
  const property = form.watch("property")
  const checkIn = form.watch("checkIn")
  const checkOut = form.watch("checkOut")
  const totalRental = form.watch("totalRental")
  const commission = form.watch("commission")
  const tourismDirhamFee = form.watch("tourismDirhamFee")

  // Filter units based on selected property
  useEffect(() => {
    if (property) {
      setFilteredUnits(units.filter((unit) => unit.propertyId === property))
    } else {
      setFilteredUnits([])
    }
  }, [property])

  // Calculate number of nights
  useEffect(() => {
    if (checkIn && checkOut) {
      const nights = differenceInDays(checkOut, checkIn)
      if (nights > 0) {
        // This is just for display, not stored in form
        console.log(`Number of nights: ${nights}`)
      }
    }
  }, [checkIn, checkOut])

  // Calculate net to owner
  useEffect(() => {
    if (totalRental && (commission || tourismDirhamFee)) {
      const rental = Number.parseFloat(totalRental) || 0
      const comm = Number.parseFloat(commission) || 0
      const fee = Number.parseFloat(tourismDirhamFee) || 0
      const net = rental - comm - fee

      if (net >= 0) {
        form.setValue("netToOwner", net.toString())
      }
    }
  }, [totalRental, commission, tourismDirhamFee, form])

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, you would call your API to update the booking
      console.log("Updating booking:", bookingId, data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Booking updated",
        description: `Booking #${bookingId} has been updated successfully.`,
      })

      router.push(`/bookings/${bookingId}`)
    } catch (error) {
      console.error("Error updating booking:", error)
      toast({
        title: "Error",
        description: "There was an error updating the booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="bookings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/bookings/${bookingId}`} className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-800">Edit Booking</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" onClick={() => router.push(`/bookings/${bookingId}`)}>
              Cancel
            </Button>
            <Button type="submit" form="booking-form" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Form {...form}>
            <form id="booking-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Guest Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="guestName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guest Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter guest name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adults</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of adults" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Children</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of children" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">0</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="property"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {properties.map((property) => (
                              <SelectItem key={property.id} value={property.id}>
                                {property.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unitNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit Number</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!property}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit number" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filteredUnits.map((unit) => (
                              <SelectItem key={unit.id} value={unit.id}>
                                {unit.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                        {!property && <FormDescription>Please select a property first</FormDescription>}
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Dates</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="checkIn"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Check-in Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date)
                                // Close the popover after selection
                                document.body.click()
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="checkOut"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Check-out Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date)
                                // Close the popover after selection
                                document.body.click()
                              }}
                              disabled={(date) => form.getValues().checkIn && date < form.getValues().checkIn}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {checkIn && checkOut && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">
                        Number of nights: <span className="font-medium">{differenceInDays(checkOut, checkIn)}</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="totalPaidByGuest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Paid by Guest</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="totalRental"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Rental</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="securityDeposit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Security Deposit</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="commission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commission</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tourismDirhamFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tourism Dirham Fee</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="netToOwner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Net to Owner</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} readOnly />
                        </FormControl>
                        <FormDescription>Automatically calculated</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paidOn"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Paid On</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date)
                                // Close the popover after selection
                                document.body.click()
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="credit-card">Credit Card</SelectItem>
                            <SelectItem value="debit-card">Debit Card</SelectItem>
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="bookingStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select booking status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="checked-in">Checked In</SelectItem>
                            <SelectItem value="checked-out">Checked Out</SelectItem>
                            <SelectItem value="no-show">No Show</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bookingSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Source</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select booking source" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="direct-website">Direct Website</SelectItem>
                            <SelectItem value="booking-com">Booking.com</SelectItem>
                            <SelectItem value="expedia">Expedia</SelectItem>
                            <SelectItem value="airbnb">Airbnb</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="walk-in">Walk-in</SelectItem>
                            <SelectItem value="travel-agent">Travel Agent</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value ? field.value : "none"}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select agent" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {agents.map((agent) => (
                              <SelectItem key={agent.id} value={agent.id}>
                                {agent.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter any special requests or notes"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </form>
          </Form>
        </main>
      </div>
    </div>
  )
}

