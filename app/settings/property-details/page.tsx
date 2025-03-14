"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Wifi, Utensils, Car, Accessibility } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function PropertyDetailsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    propertyType: "Hotel",
    totalRooms: "120",
    totalFloors: "8",
    yearBuilt: "2010",
    lastRenovated: "2020",
    propertySize: "15000",
    propertyDescription:
      "A luxury hotel located in the heart of the city, offering premium amenities and exceptional service.",
    amenities: {
      wifi: true,
      pool: true,
      spa: true,
      gym: true,
      restaurant: true,
      bar: true,
      roomService: true,
      parking: true,
      businessCenter: true,
      conferenceRooms: true,
      airportShuttle: false,
      petFriendly: false,
      accessibility: true,
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSwitchChange = (name, checked) => {
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [name]: checked,
      },
    })
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Success
    toast({
      title: "Settings updated",
      description: "Your property details have been saved successfully.",
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
              <h1 className="text-2xl font-semibold text-gray-800">Property Details</h1>
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
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>General details about your property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Input
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalRooms">Total Rooms</Label>
                    <Input
                      id="totalRooms"
                      name="totalRooms"
                      type="number"
                      value={formData.totalRooms}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalFloors">Total Floors</Label>
                    <Input
                      id="totalFloors"
                      name="totalFloors"
                      type="number"
                      value={formData.totalFloors}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastRenovated">Last Renovated</Label>
                    <Input
                      id="lastRenovated"
                      name="lastRenovated"
                      value={formData.lastRenovated}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertySize">Property Size (sq ft)</Label>
                    <Input
                      id="propertySize"
                      name="propertySize"
                      value={formData.propertySize}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="propertyDescription">Property Description</Label>
                    <Textarea
                      id="propertyDescription"
                      name="propertyDescription"
                      value={formData.propertyDescription}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
                <CardDescription>Facilities and services available at your property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="wifi"
                      checked={formData.amenities.wifi}
                      onCheckedChange={(checked) => handleSwitchChange("wifi", checked)}
                    />
                    <Label htmlFor="wifi" className="flex items-center">
                      <Wifi className="h-4 w-4 mr-2" />
                      Wi-Fi
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="pool"
                      checked={formData.amenities.pool}
                      onCheckedChange={(checked) => handleSwitchChange("pool", checked)}
                    />
                    <Label htmlFor="pool">Swimming Pool</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="spa"
                      checked={formData.amenities.spa}
                      onCheckedChange={(checked) => handleSwitchChange("spa", checked)}
                    />
                    <Label htmlFor="spa">Spa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="gym"
                      checked={formData.amenities.gym}
                      onCheckedChange={(checked) => handleSwitchChange("gym", checked)}
                    />
                    <Label htmlFor="gym">Fitness Center</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="restaurant"
                      checked={formData.amenities.restaurant}
                      onCheckedChange={(checked) => handleSwitchChange("restaurant", checked)}
                    />
                    <Label htmlFor="restaurant" className="flex items-center">
                      <Utensils className="h-4 w-4 mr-2" />
                      Restaurant
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="bar"
                      checked={formData.amenities.bar}
                      onCheckedChange={(checked) => handleSwitchChange("bar", checked)}
                    />
                    <Label htmlFor="bar">Bar/Lounge</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="roomService"
                      checked={formData.amenities.roomService}
                      onCheckedChange={(checked) => handleSwitchChange("roomService", checked)}
                    />
                    <Label htmlFor="roomService">Room Service</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="parking"
                      checked={formData.amenities.parking}
                      onCheckedChange={(checked) => handleSwitchChange("parking", checked)}
                    />
                    <Label htmlFor="parking" className="flex items-center">
                      <Car className="h-4 w-4 mr-2" />
                      Parking
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="businessCenter"
                      checked={formData.amenities.businessCenter}
                      onCheckedChange={(checked) => handleSwitchChange("businessCenter", checked)}
                    />
                    <Label htmlFor="businessCenter">Business Center</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="conferenceRooms"
                      checked={formData.amenities.conferenceRooms}
                      onCheckedChange={(checked) => handleSwitchChange("conferenceRooms", checked)}
                    />
                    <Label htmlFor="conferenceRooms">Conference Rooms</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="airportShuttle"
                      checked={formData.amenities.airportShuttle}
                      onCheckedChange={(checked) => handleSwitchChange("airportShuttle", checked)}
                    />
                    <Label htmlFor="airportShuttle">Airport Shuttle</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="petFriendly"
                      checked={formData.amenities.petFriendly}
                      onCheckedChange={(checked) => handleSwitchChange("petFriendly", checked)}
                    />
                    <Label htmlFor="petFriendly">Pet Friendly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="accessibility"
                      checked={formData.amenities.accessibility}
                      onCheckedChange={(checked) => handleSwitchChange("accessibility", checked)}
                    />
                    <Label htmlFor="accessibility" className="flex items-center">
                      <Accessibility className="h-4 w-4 mr-2" />
                      Accessibility Features
                    </Label>
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

