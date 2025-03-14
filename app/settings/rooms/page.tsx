"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function RoomSettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Room Types
  const [roomTypes, setRoomTypes] = useState([
    { id: 1, name: "Standard", description: "Basic room with essential amenities", basePrice: 100 },
    { id: 2, name: "Deluxe", description: "Spacious room with premium amenities", basePrice: 150 },
    { id: 3, name: "Suite", description: "Luxury suite with separate living area", basePrice: 250 },
  ])

  // Amenities
  const [amenities, setAmenities] = useState([
    { id: 1, name: "Wi-Fi", icon: "wifi", isDefault: true },
    { id: 2, name: "TV", icon: "tv", isDefault: true },
    { id: 3, name: "Air Conditioning", icon: "thermometer", isDefault: true },
    { id: 4, name: "Mini Bar", icon: "wine", isDefault: false },
    { id: 5, name: "Safe", icon: "lock", isDefault: false },
  ])

  // Housekeeping Settings
  const [housekeepingSettings, setHousekeepingSettings] = useState({
    defaultCleaningTime: "10:00",
    cleaningDuration: "30",
    dailyCleaningEnabled: true,
    turndownServiceEnabled: false,
    turndownServiceTime: "18:00",
    notifyGuestBeforeCleaning: true,
  })

  // New Room Type Form
  const [newRoomType, setNewRoomType] = useState({
    name: "",
    description: "",
    basePrice: "",
  })

  // New Amenity Form
  const [newAmenity, setNewAmenity] = useState({
    name: "",
    icon: "star",
    isDefault: false,
  })

  const handleHousekeepingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHousekeepingSettings({
      ...housekeepingSettings,
      [e.target.name]: e.target.value,
    })
  }

  const handleHousekeepingSwitchChange = (name: string, checked: boolean) => {
    setHousekeepingSettings({
      ...housekeepingSettings,
      [name]: checked,
    })
  }

  const handleNewRoomTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoomType({
      ...newRoomType,
      [e.target.name]: e.target.value,
    })
  }

  const handleNewAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAmenity({
      ...newAmenity,
      [e.target.name]: e.target.value,
    })
  }

  const handleNewAmenitySwitchChange = (checked: boolean) => {
    setNewAmenity({
      ...newAmenity,
      isDefault: checked,
    })
  }

  const handleNewAmenityIconChange = (value: string) => {
    setNewAmenity({
      ...newAmenity,
      icon: value,
    })
  }

  const addRoomType = () => {
    if (!newRoomType.name || !newRoomType.basePrice) return

    setRoomTypes([
      ...roomTypes,
      {
        id: Date.now(),
        name: newRoomType.name,
        description: newRoomType.description,
        basePrice: Number.parseFloat(newRoomType.basePrice),
      },
    ])

    setNewRoomType({
      name: "",
      description: "",
      basePrice: "",
    })
  }

  const removeRoomType = (id: number) => {
    setRoomTypes(roomTypes.filter((type) => type.id !== id))
  }

  const addAmenity = () => {
    if (!newAmenity.name) return

    setAmenities([
      ...amenities,
      {
        id: Date.now(),
        name: newAmenity.name,
        icon: newAmenity.icon,
        isDefault: newAmenity.isDefault,
      },
    ])

    setNewAmenity({
      name: "",
      icon: "star",
      isDefault: false,
    })
  }

  const removeAmenity = (id: number) => {
    setAmenities(amenities.filter((amenity) => amenity.id !== id))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Success
    toast({
      title: "Settings updated",
      description: "Your room management settings have been saved successfully.",
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
              <h1 className="text-2xl font-semibold text-gray-800">Room Management</h1>
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
                <CardTitle>Room Types</CardTitle>
                <CardDescription>Manage room categories and base pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roomTypes.map((type) => (
                    <div
                      key={type.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                    >
                      <div>
                        <h3 className="font-medium">{type.name}</h3>
                        <p className="text-sm text-gray-500">{type.description}</p>
                        <p className="text-sm mt-1">Base Price: ${type.basePrice}/night</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRoomType(type.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium mb-2">Add New Room Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="name">Room Type Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={newRoomType.name}
                          onChange={handleNewRoomTypeChange}
                          className="mt-1"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          name="description"
                          value={newRoomType.description}
                          onChange={handleNewRoomTypeChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="basePrice">Base Price ($)</Label>
                        <Input
                          id="basePrice"
                          name="basePrice"
                          type="number"
                          value={newRoomType.basePrice}
                          onChange={handleNewRoomTypeChange}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button onClick={addRoomType} className="flex items-center">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Room Type
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Room Amenities</CardTitle>
                <CardDescription>Manage available amenities for rooms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {amenities.map((amenity) => (
                      <div
                        key={amenity.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                      >
                        <div className="flex items-center">
                          <div className="mr-3">
                            <div className="h-8 w-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                              {amenity.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium">{amenity.name}</h3>
                            <p className="text-xs text-gray-500">
                              {amenity.isDefault ? "Default in all rooms" : "Optional amenity"}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAmenity(amenity.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium mb-2">Add New Amenity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="amenityName">Amenity Name</Label>
                        <Input
                          id="amenityName"
                          name="name"
                          value={newAmenity.name}
                          onChange={handleNewAmenityChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="icon">Icon</Label>
                        <Select value={newAmenity.icon} onValueChange={handleNewAmenityIconChange}>
                          <SelectTrigger id="icon" className="mt-1">
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wifi">WiFi</SelectItem>
                            <SelectItem value="tv">TV</SelectItem>
                            <SelectItem value="thermometer">Air Conditioning</SelectItem>
                            <SelectItem value="coffee">Coffee</SelectItem>
                            <SelectItem value="utensils">Kitchen</SelectItem>
                            <SelectItem value="bath">Bath</SelectItem>
                            <SelectItem value="parking">Parking</SelectItem>
                            <SelectItem value="star">Star</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isDefault"
                          checked={newAmenity.isDefault}
                          onCheckedChange={handleNewAmenitySwitchChange}
                        />
                        <Label htmlFor="isDefault">Default in all rooms</Label>
                      </div>
                      <div className="flex items-end">
                        <Button onClick={addAmenity} className="flex items-center">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Amenity
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Housekeeping</CardTitle>
                <CardDescription>Configure room cleaning and maintenance schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="defaultCleaningTime">Default Cleaning Time</Label>
                    <Input
                      id="defaultCleaningTime"
                      name="defaultCleaningTime"
                      type="time"
                      value={housekeepingSettings.defaultCleaningTime}
                      onChange={handleHousekeepingChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cleaningDuration">Average Cleaning Duration (minutes)</Label>
                    <Input
                      id="cleaningDuration"
                      name="cleaningDuration"
                      type="number"
                      value={housekeepingSettings.cleaningDuration}
                      onChange={handleHousekeepingChange}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="dailyCleaningEnabled"
                      checked={housekeepingSettings.dailyCleaningEnabled}
                      onCheckedChange={(checked) => handleHousekeepingSwitchChange("dailyCleaningEnabled", checked)}
                    />
                    <Label htmlFor="dailyCleaningEnabled">Enable Daily Cleaning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="turndownServiceEnabled"
                      checked={housekeepingSettings.turndownServiceEnabled}
                      onCheckedChange={(checked) => handleHousekeepingSwitchChange("turndownServiceEnabled", checked)}
                    />
                    <Label htmlFor="turndownServiceEnabled">Enable Turndown Service</Label>
                  </div>
                  {housekeepingSettings.turndownServiceEnabled && (
                    <div>
                      <Label htmlFor="turndownServiceTime">Turndown Service Time</Label>
                      <Input
                        id="turndownServiceTime"
                        name="turndownServiceTime"
                        type="time"
                        value={housekeepingSettings.turndownServiceTime}
                        onChange={handleHousekeepingChange}
                        className="mt-1"
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notifyGuestBeforeCleaning"
                      checked={housekeepingSettings.notifyGuestBeforeCleaning}
                      onCheckedChange={(checked) =>
                        handleHousekeepingSwitchChange("notifyGuestBeforeCleaning", checked)
                      }
                    />
                    <Label htmlFor="notifyGuestBeforeCleaning">Notify Guest Before Cleaning</Label>
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

