"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, ChevronLeft, Loader2 } from "lucide-react"
import { format, differenceInDays } from "date-fns"

import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"

// Sample data for dropdowns
const properties = [
  { id: "1", name: "Marina Towers" },
  { id: "2", name: "Downtown Residences" },
  { id: "3", name: "Palm Villas" },
  { id: "4", name: "JBR Apartments" },
  { id: "5", name: "Business Bay Suites" },
]

const units = [
  { id: "101", name: "101", propertyId: "1", type: "Studio" },
  { id: "102", name: "102", propertyId: "1", type: "1 Bedroom" },
  { id: "103", name: "103", propertyId: "1", type: "2 Bedroom" },
  { id: "201", name: "201", propertyId: "2", type: "Studio" },
  { id: "202", name: "202", propertyId: "2", type: "1 Bedroom" },
  { id: "203", name: "203", propertyId: "2", type: "2 Bedroom" },
  { id: "301", name: "301", propertyId: "3", type: "3 Bedroom" },
  { id: "302", name: "302", propertyId: "3", type: "4 Bedroom" },
  { id: "401", name: "401", propertyId: "4", type: "Studio" },
  { id: "402", name: "402", propertyId: "4", type: "1 Bedroom" },
  { id: "501", name: "501", propertyId: "5", type: "2 Bedroom" },
  { id: "502", name: "502", propertyId: "5", type: "3 Bedroom" },
]

const agents = [
  { id: "1", name: "Direct Booking" },
  { id: "2", name: "Booking.com" },
  { id: "3", name: "Airbnb" },
  { id: "4", name: "Expedia" },
  { id: "5", name: "TripAdvisor" },
  { id: "6", name: "Hotels.com" },
  { id: "7", name: "Agoda" },
]

const statuses = [
  { id: "confirmed", name: "Confirmed" },
  { id: "pending", name: "Pending" },
  { id: "cancelled", name: "Cancelled" },
  { id: "checked-in", name: "Checked In" },
  { id: "checked-out", name: "Checked Out" },
  { id: "no-show", name: "No Show" },
]

// Form schema with validation
const formSchema = z.object({
  guestName: z.string().min(2, { message: "Guest name is required" }),
  guestEmail: z.string().email({ message: "Valid email is required" }).optional().or(z.literal("")),
  guestPhone: z.string().optional().or(z.literal("")),
  propertyId: z.string({ required_error: "Property is required" }),
  unitId: z.string({ required_error: "Unit number is required" }),
  checkInDate: z.date({ required_error: "Check-in date is required" }),
  checkOutDate: z.date({ required_error: "Check-out date is required" }),
  numberOfNights: z.number().min(1, { message: "Number of nights must be at least 1" }),
  totalPaidByGuest: z.string().min(1, { message: "Total paid by guest is required" }),
  totalRental: z.string().min(1, { message: "Total rental is required" }),
  securityDeposit: z.string().min(1, { message: "Security deposit is required" }),
  commission: z.string().min(1, { message: "Commission is required" }),
  tourismDirhamFee: z.string().min(1, { message: "Tourism Dirham fee is required" }),
  netToOwner: z.string().min(1, { message: "Net to owner is required" }),
  paidOnDate: z.date({ required_error: "Paid on date is required" }),
  status: z.string({ required_error: "Status is required" }),
  agentId: z.string({ required_error: "Agent is required" }),
  notes: z.string().optional().or(z.literal("")),
})

type FormValues = z.infer<typeof formSchema>

export default function NewBookingPage() {
  const router = useRouter()
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [filteredUnits, setFilteredUnits] = useState(units)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      propertyId: "",
      unitId: "",
      checkInDate: undefined,
      checkOutDate: undefined,
      numberOfNights: 0,
      totalPaidByGuest: "",
      totalRental: "",
      securityDeposit: "",
      commission: "",
      tourismDirhamFee: "",
      netToOwner: "",
      paidOnDate: undefined,
      status: "",
      agentId: "",
      notes: "",
    },
  })

  // Watch for changes to calculate derived values
  const checkInDate = form.watch("checkInDate")
  const checkOutDate = form.watch("checkOutDate")
  const totalRental = form.watch("totalRental")
  const commission = form.watch("commission")
  const tourismDirhamFee = form.watch("tourismDirhamFee")
  const securityDeposit = form.watch("securityDeposit")

  // Update number of nights when dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nights = differenceInDays(checkOutDate, checkInDate)
      if (nights >= 0) {
        form.setValue("numberOfNights", nights)
      }
    }
  }, [checkInDate, checkOutDate, form])

  // Calculate net to owner
  useEffect(() => {
    if (totalRental && commission && tourismDirhamFee) {
      try {
        const total = Number.parseFloat(totalRental)
        const comm = Number.parseFloat(commission)
        const fee = Number.parseFloat(tourismDirhamFee)

        if (!isNaN(total) && !isNaN(comm) && !isNaN(fee)) {
          const netAmount = total - comm - fee
          form.setValue("netToOwner", netAmount.toFixed(2))
        }
      } catch (error) {
        // Handle parsing errors silently
      }
    }
  }, [totalRental, commission, tourismDirhamFee, form])

  // Filter units when property changes
  useEffect(() => {
    if (selectedProperty) {
      const filtered = units.filter((unit) => unit.propertyId === selectedProperty)
      setFilteredUnits(filtered)
      // Clear unit selection if current selection doesn't belong to new property
      const currentUnitId = form.getValues("unitId")
      const unitBelongsToProperty = filtered.some((unit) => unit.id === currentUnitId)
      if (!unitBelongsToProperty) {
        form.setValue("unitId", "")
      }
    } else {
      setFilteredUnits(units)
    }
  }, [selectedProperty, form])

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form submitted successfully:", data)
      setSubmitSuccess(true)

      // Redirect after successful submission
      setTimeout(() => {
        router.push("/bookings")
      }, 2000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("There was an error submitting the booking. Please try again.")
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
            <Button variant="ghost" size="icon" onClick={() => router.push("/bookings")} className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">New Booking</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/bookings")}>
              Cancel
            </Button>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Booking"
              )}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent>
              {submitSuccess && (
                <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>Booking created successfully! Redirecting to bookings list...</AlertDescription>
                </Alert>
              )}

              {submitError && (
                <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Guest Information Section */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Guest Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="guestName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Guest Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter guest name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guestEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Guest Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="guest@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guestPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Guest Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Property Details Section */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Property Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="propertyId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property*</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value)
                                setSelectedProperty(value)
                              }}
                              value={field.value}
                            >
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
                        name="unitId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit Number*</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedProperty}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {filteredUnits.map((unit) => (
                                  <SelectItem key={unit.id} value={unit.id}>
                                    {unit.name} - {unit.type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                            {!selectedProperty && <FormDescription>Please select a property first</FormDescription>}
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="agentId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Agent/Channel*</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select agent" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
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
                    </div>
                  </div>

                  {/* Booking Dates Section */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Booking Dates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="checkInDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Check-in Date*</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full pl-3 text-left font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 z-50" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => {
                                    if (date) {
                                      field.onChange(date)
                                      // Close the popover after selection
                                      const popoverTrigger = document.querySelector('[data-state="open"]')
                                      if (popoverTrigger) {
                                        ;(popoverTrigger as HTMLElement).click()
                                      }
                                    }
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
                        name="checkOutDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Check-out Date*</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full pl-3 text-left font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 z-50" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => {
                                    if (date) {
                                      field.onChange(date)
                                      // Close the popover after selection
                                      const popoverTrigger = document.querySelector('[data-state="open"]')
                                      if (popoverTrigger) {
                                        ;(popoverTrigger as HTMLElement).click()
                                      }
                                    }
                                  }}
                                  disabled={(date) => (checkInDate ? date < checkInDate : false)}
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
                        name="numberOfNights"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Nights*</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                value={field.value}
                                readOnly
                                className="bg-gray-50"
                              />
                            </FormControl>
                            <FormDescription>Automatically calculated from dates</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Financial Details Section */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Financial Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="totalPaidByGuest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Paid by Guest*</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="0.00" {...field} />
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
                            <FormLabel>Total Rental*</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="0.00" {...field} />
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
                            <FormLabel>Security Deposit*</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="0.00" {...field} />
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
                            <FormLabel>Commission*</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="0.00" {...field} />
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
                            <FormLabel>Tourism Dirham Fee*</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="0.00" {...field} />
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
                            <FormLabel>Net to Owner*</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="0.00" {...field} readOnly className="bg-gray-50" />
                            </FormControl>
                            <FormDescription>Automatically calculated</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="paidOnDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Paid On Date*</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full pl-3 text-left font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 z-50" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => {
                                    if (date) {
                                      field.onChange(date)
                                      // Close the popover after selection
                                      const popoverTrigger = document.querySelector('[data-state="open"]')
                                      if (popoverTrigger) {
                                        ;(popoverTrigger as HTMLElement).click()
                                      }
                                    }
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
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status*</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {statuses.map((status) => (
                                  <SelectItem key={status.id} value={status.id}>
                                    {status.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter any additional notes about this booking"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => router.push("/bookings")}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Booking"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

