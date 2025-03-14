"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import Sidebar from "@/components/sidebar"

const roomTypes = ["Standard Room", "Deluxe Room", "Suite", "Executive Suite", "Presidential Suite"]

const amenities = [
  { id: "ac", label: "Air Conditioning", icon: "❄️" },
  { id: "tv", label: "TV", icon: "📺" },
  { id: "minibar", label: "Mini Bar", icon: "🍷" },
  { id: "safe", label: "Safe", icon: "🔒" },
  { id: "balcony", label: "Balcony", icon: "🏗️" },
  { id: "seaview", label: "Sea View", icon: "🌊" },
  { id: "bathtub", label: "Bath Tub", icon: "🛁" },
  { id: "shower", label: "Shower", icon: "🚿" },
  { id: "wifi", label: "WiFi", icon: "📶" },
]

export default function AddRoomPage() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you would handle file upload to a server here
      // For demo purposes, we'll just create object URLs
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedPhotos([...uploadedPhotos, ...newPhotos])
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="rooms" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">Add New Room</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <Link href="/rooms" className="hover:text-blue-600">
              Rooms
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Add Room</span>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Room Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="room-number">Room Number</Label>
                        <Input id="room-number" placeholder="Enter room number" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="room-type">Room Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            {roomTypes.map((type) => (
                              <SelectItem key={type} value={type.toLowerCase()}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="floor-level">Floor Level</Label>
                        <Input id="floor-level" type="number" placeholder="Enter floor level" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="max-occupancy">Maximum Occupancy</Label>
                        <Input id="max-occupancy" type="number" placeholder="Enter max occupancy" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="room-size">Room Size (sq ft)</Label>
                        <Input id="room-size" type="number" placeholder="Enter room size" />
                      </div>

                      <div className="space-y-2">
                        <Label>Room Status</Label>
                        <RadioGroup defaultValue="active" className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="active" id="active" />
                            <Label htmlFor="active">Active</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="inactive" id="inactive" />
                            <Label htmlFor="inactive">Inactive</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="base-rate">Base Rate</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input id="base-rate" type="number" className="pl-7" placeholder="0.00" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weekend-rate">Weekend Rate</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input id="weekend-rate" type="number" className="pl-7" placeholder="0.00" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="holiday-rate">Holiday Rate</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input id="holiday-rate" type="number" className="pl-7" placeholder="0.00" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="extra-person">Extra Person Rate</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input id="extra-person" type="number" className="pl-7" placeholder="0.00" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Amenities */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {amenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.id}
                            checked={selectedAmenities.includes(amenity.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedAmenities([...selectedAmenities, amenity.id])
                              } else {
                                setSelectedAmenities(selectedAmenities.filter((id) => id !== amenity.id))
                              }
                            }}
                          />
                          <Label htmlFor={amenity.id} className="flex items-center gap-2">
                            <span>{amenity.icon}</span>
                            <span>{amenity.label}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Photos */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Room Photos</h2>

                    {/* Photo Preview */}
                    {uploadedPhotos.length > 0 && (
                      <div className="space-y-4 mb-4">
                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={uploadedPhotos[0] || "/placeholder.svg"}
                            alt="Room preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {uploadedPhotos.slice(0, 3).map((photo, index) => (
                            <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={photo || "/placeholder.svg"}
                                alt={`Room photo ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
                      <div className="flex flex-col items-center text-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Drop files to upload or browse</p>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          id="photo-upload"
                          onChange={handlePhotoUpload}
                        />
                        <label htmlFor="photo-upload">
                          <Button variant="outline" size="sm" className="cursor-pointer">
                            Browse Files
                          </Button>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1">Save Room</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

