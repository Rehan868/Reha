"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function BookingSettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    checkInTime: "14:00",
    checkOutTime: "11:00",
    earlyCheckInAllowed: true,
    lateCheckOutAllowed: true,
    earlyCheckInFee: "50",
    lateCheckOutFee: "50",
    minAdvanceBooking: "1",
    maxAdvanceBooking: "365",
    defaultCancellationPolicy: "flexible",
    cancellationFee: "25",
    noShowFee: "100",
    acceptedPaymentMethods: {
      creditCard: true,
      debitCard: true,
      bankTransfer: true,
      cash: true,
      paypal: false,
    },
    depositRequired: true,
    depositAmount: "30",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    setFormData({
      ...formData,
      acceptedPaymentMethods: {
        ...formData.acceptedPaymentMethods,
        [method]: checked,
      },
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Success
    toast({
      title: "Settings updated",
      description: "Your booking settings have been saved successfully.",
    })

    setIsLoading(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => router.push("/settings")} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-gray-800">Booking Settings</h1>
            </div>
            <Button onClick={handleSaveSettings} disabled={isLoading} className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Check-in/out Times</CardTitle>
                <CardDescription>Set default times and policies for guest arrivals and departures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkInTime">Check-in Time</Label>
                    <Input
                      id="checkInTime"
                      name="checkInTime"
                      type="time"
                      value={formData.checkInTime}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkOutTime">Check-out Time</Label>
                    <Input
                      id="checkOutTime"
                      name="checkOutTime"
                      type="time"
                      value={formData.checkOutTime}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="earlyCheckInAllowed"
                      checked={formData.earlyCheckInAllowed}
                      onCheckedChange={(checked) => handleSwitchChange("earlyCheckInAllowed", checked)}
                    />
                    <Label htmlFor="earlyCheckInAllowed">Allow Early Check-in</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="lateCheckOutAllowed"
                      checked={formData.lateCheckOutAllowed}
                      onCheckedChange={(checked) => handleSwitchChange("lateCheckOutAllowed", checked)}
                    />
                    <Label htmlFor="lateCheckOutAllowed">Allow Late Check-out</Label>
                  </div>
                  <div>
                    <Label htmlFor="earlyCheckInFee">Early Check-in Fee ($)</Label>
                    <Input
                      id="earlyCheckInFee"
                      name="earlyCheckInFee"
                      type="number"
                      value={formData.earlyCheckInFee}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lateCheckOutFee">Late Check-out Fee ($)</Label>
                    <Input
                      id="lateCheckOutFee"
                      name="lateCheckOutFee"
                      type="number"
                      value={formData.lateCheckOutFee}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Booking Restrictions</CardTitle>
                <CardDescription>Set minimum and maximum advance booking periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minAdvanceBooking">Minimum Advance Booking (days)</Label>
                    <Input
                      id="minAdvanceBooking"
                      name="minAdvanceBooking"
                      type="number"
                      value={formData.minAdvanceBooking}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxAdvanceBooking">Maximum Advance Booking (days)</Label>
                    <Input
                      id="maxAdvanceBooking"
                      name="maxAdvanceBooking"
                      type="number"
                      value={formData.maxAdvanceBooking}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Cancellation Rules</CardTitle>
                <CardDescription>Define cancellation policies and fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="defaultCancellationPolicy">Default Cancellation Policy</Label>
                    <Select
                      value={formData.defaultCancellationPolicy}
                      onValueChange={(value) => handleSelectChange("defaultCancellationPolicy", value)}
                    >
                      <SelectTrigger id="defaultCancellationPolicy" className="mt-1">
                        <SelectValue placeholder="Select a policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flexible">Flexible (24 hours before)</SelectItem>
                        <SelectItem value="moderate">Moderate (3 days before)</SelectItem>
                        <SelectItem value="strict">Strict (7 days before)</SelectItem>
                        <SelectItem value="nonRefundable">Non-refundable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cancellationFee">Cancellation Fee (% of total)</Label>
                    <Input
                      id="cancellationFee"
                      name="cancellationFee"
                      type="number"
                      value={formData.cancellationFee}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="noShowFee">No-show Fee (% of total)</Label>
                    <Input
                      id="noShowFee"
                      name="noShowFee"
                      type="number"
                      value={formData.noShowFee}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Configure accepted payment options and deposit requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Accepted Payment Methods</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="creditCard"
                          checked={formData.acceptedPaymentMethods.creditCard}
                          onCheckedChange={(checked) => handlePaymentMethodChange("creditCard", checked)}
                        />
                        <Label htmlFor="creditCard">Credit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="debitCard"
                          checked={formData.acceptedPaymentMethods.debitCard}
                          onCheckedChange={(checked) => handlePaymentMethodChange("debitCard", checked)}
                        />
                        <Label htmlFor="debitCard">Debit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="bankTransfer"
                          checked={formData.acceptedPaymentMethods.bankTransfer}
                          onCheckedChange={(checked) => handlePaymentMethodChange("bankTransfer", checked)}
                        />
                        <Label htmlFor="bankTransfer">Bank Transfer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="cash"
                          checked={formData.acceptedPaymentMethods.cash}
                          onCheckedChange={(checked) => handlePaymentMethodChange("cash", checked)}
                        />
                        <Label htmlFor="cash">Cash</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="paypal"
                          checked={formData.acceptedPaymentMethods.paypal}
                          onCheckedChange={(checked) => handlePaymentMethodChange("paypal", checked)}
                        />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <Switch
                        id="depositRequired"
                        checked={formData.depositRequired}
                        onCheckedChange={(checked) => handleSwitchChange("depositRequired", checked)}
                      />
                      <Label htmlFor="depositRequired">Require Deposit</Label>
                    </div>

                    {formData.depositRequired && (
                      <div>
                        <Label htmlFor="depositAmount">Deposit Amount (% of total)</Label>
                        <Input
                          id="depositAmount"
                          name="depositAmount"
                          type="number"
                          value={formData.depositAmount}
                          onChange={handleInputChange}
                          className="mt-1 w-full md:w-1/3"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

