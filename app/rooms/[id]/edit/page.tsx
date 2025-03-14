"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
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
    size: "32",
    view: "City View",
    bedType: "King",
    maxOccupancy: 2,
    extraBeds: 1,
    smoking: false,
    accessibility: true,
  }
}

export default function EditRoomPage() {
  const params = useParams()
  const router = useRouter()
  const roomId = params.id ? String(params.id) : ""
  const roomData = getRoomData(roomId)

  const [formData, setFormData] = useState({
    number: roomData.number,
    type: roomData.type,
    floor: roomData.floor,
    status: roomData.status,
    rate: roomData.rate,
    size: roomData.size,
    view: roomData.view,
    bedType: roomData.bedType,
    maxOccupancy: roomData.maxOccupancy,
    extraBeds: roomData.extraBeds,
    description: roomData.description,
    smoking: roomData.smoking,
    accessibility: roomData.accessibility,
    amenities: {
      airConditioning: roomData.amenities.includes("Air Conditioning"),
      wifi: roomData.amenities.includes("Free Wi-Fi"),
      tv: roomData.amenities.includes("Flat-screen TV"),
      miniBar: roomData.amenities.includes("Mini Bar"),
      safe: roomData.amenities.includes("Safe"),
      coffeeMaker: roomData.amenities.includes("Coffee Maker"),
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [name]: checked,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitting form data:", formData)
    // Here you would call your API to update the room
    router.push(`/rooms/${roomId}`)
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
              <h1 className="text-2xl font-semibold text-gray-800">Edit Room {String(roomId)}</h1>
              <Badge
                className={
                  formData.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : formData.status === "Occupied"
                      ? "bg-blue-100 text-blue-800"
                      : formData.status === "Cleaning"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-orange-100 text-orange-800"
                }
              >
                {String(formData.status)}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" form="edit-room-form" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <form id="edit-room-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-6 p-6">
              <div className="col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="number">Room Number</Label>
                          <Input id="number" name="number" value={formData.number} onChange={handleChange} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Room Type</Label>
                          <Select
                            name="type"
                            value={formData.type}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger id="type">
                              <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Deluxe King">Deluxe King</SelectItem>
                              <SelectItem value="Twin Deluxe">Twin Deluxe</SelectItem>
                              <SelectItem value="Executive Suite">Executive Suite</SelectItem>
                              <SelectItem value="Family Suite">Family Suite</SelectItem>
                              <SelectItem value="Presidential Suite">Presidential Suite</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="floor">Floor</Label>
                          <Select
                            name="floor"
                            value={formData.floor}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, floor: value }))}
                          >
                            <SelectTrigger id="floor">
                              <SelectValue placeholder="Select floor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1st Floor">1st Floor</SelectItem>
                              <SelectItem value="2nd Floor">2nd Floor</SelectItem>
                              <SelectItem value="3rd Floor">3rd Floor</SelectItem>
                              <SelectItem value="4th Floor">4th Floor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rate">Rate ($ per night)</Label>
                          <Input id="rate" name="rate" type="number" value={formData.rate} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            name="status"
                            value={formData.status}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Available">Available</SelectItem>
                              <SelectItem value="Occupied">Occupied</SelectItem>
                              <SelectItem value="Cleaning">Cleaning</SelectItem>
                              <SelectItem value="Maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="size">Size (sq m)</Label>
                          <Input id="size" name="size" value={formData.size} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="view">View</Label>
                          <Select
                            name="view"
                            value={formData.view}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, view: value }))}
                          >
                            <SelectTrigger id="view">
                              <SelectValue placeholder="Select view" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="City View">City View</SelectItem>
                              <SelectItem value="Garden View">Garden View</SelectItem>
                              <SelectItem value="Pool View">Pool View</SelectItem>
                              <SelectItem value="Ocean View">Ocean View</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bedType">Bed Type</Label>
                          <Select
                            name="bedType"
                            value={formData.bedType}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, bedType: value }))}
                          >
                            <SelectTrigger id="bedType">
                              <SelectValue placeholder="Select bed type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="King">King</SelectItem>
                              <SelectItem value="Queen">Queen</SelectItem>
                              <SelectItem value="Twin">Twin</SelectItem>
                              <SelectItem value="Double">Double</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Amenities</CardTitle>
                    <CardDescription>Select all amenities available in this room</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="airConditioning"
                          checked={formData.amenities.airConditioning}
                          onCheckedChange={(checked) => handleCheckboxChange("airConditioning", checked)}
                        />
                        <Label htmlFor="airConditioning">Air Conditioning</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="wifi"
                          checked={formData.amenities.wifi}
                          onCheckedChange={(checked) => handleCheckboxChange("wifi", checked)}
                        />
                        <Label htmlFor="wifi">Free Wi-Fi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tv"
                          checked={formData.amenities.tv}
                          onCheckedChange={(checked) => handleCheckboxChange("tv", checked)}
                        />
                        <Label htmlFor="tv">Flat-screen TV</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="miniBar"
                          checked={formData.amenities.miniBar}
                          onCheckedChange={(checked) => handleCheckboxChange("miniBar", checked)}
                        />
                        <Label htmlFor="miniBar">Mini Bar</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="safe"
                          checked={formData.amenities.safe}
                          onCheckedChange={(checked) => handleCheckboxChange("safe", checked)}
                        />
                        <Label htmlFor="safe">Safe</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="coffeeMaker"
                          checked={formData.amenities.coffeeMaker}
                          onCheckedChange={(checked) => handleCheckboxChange("coffeeMaker", checked)}
                        />
                        <Label htmlFor="coffeeMaker">Coffee Maker</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Occupancy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxOccupancy">Maximum Occupancy</Label>
                      <Select
                        name="maxOccupancy"
                        value={formData.maxOccupancy.toString()}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, maxOccupancy: Number.parseInt(value) }))
                        }
                      >
                        <SelectTrigger id="maxOccupancy">
                          <SelectValue placeholder="Select maximum occupancy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">3 Adults</SelectItem>
                          <SelectItem value="4">4 Adults</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="extraBeds">Extra Beds Allowed</Label>
                      <Select
                        name="extraBeds"
                        value={formData.extraBeds.toString()}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, extraBeds: Number.parseInt(value) }))
                        }
                      >
                        <SelectTrigger id="extraBeds">
                          <SelectValue placeholder="Select extra beds" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Room Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label>Smoking</Label>
                      <RadioGroup
                        value={formData.smoking ? "yes" : "no"}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, smoking: value === "yes" }))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="smoking-yes" />
                          <Label htmlFor="smoking-yes">Smoking Allowed</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="smoking-no" />
                          <Label htmlFor="smoking-no">No Smoking</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <Label>Accessibility</Label>
                      <RadioGroup
                        value={formData.accessibility ? "yes" : "no"}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, accessibility: value === "yes" }))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="accessibility-yes" />
                          <Label htmlFor="accessibility-yes">Accessible</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="accessibility-no" />
                          <Label htmlFor="accessibility-no">Not Accessible</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Save Changes</CardTitle>
                    <CardDescription>Review your changes before saving</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button type="submit" className="w-full">
                      Save Room Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

