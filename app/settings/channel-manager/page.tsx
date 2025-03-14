"use client"

import { useState } from "react"
import { ArrowLeft, RefreshCw, Link2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for channel managers
const initialChannels = [
  {
    id: 1,
    name: "Booking.com",
    logo: "/placeholder.svg?height=40&width=120",
    status: "connected",
    lastSync: "2023-11-15T14:30:00",
    roomsMapped: 12,
    totalRooms: 15,
    autoSync: true,
  },
  {
    id: 2,
    name: "Expedia",
    logo: "/placeholder.svg?height=40&width=120",
    status: "connected",
    lastSync: "2023-11-14T09:15:00",
    roomsMapped: 10,
    totalRooms: 15,
    autoSync: true,
  },
  {
    id: 3,
    name: "Airbnb",
    logo: "/placeholder.svg?height=40&width=120",
    status: "disconnected",
    lastSync: null,
    roomsMapped: 0,
    totalRooms: 15,
    autoSync: false,
  },
  {
    id: 4,
    name: "TripAdvisor",
    logo: "/placeholder.svg?height=40&width=120",
    status: "error",
    lastSync: "2023-11-10T11:45:00",
    roomsMapped: 8,
    totalRooms: 15,
    autoSync: true,
    errorMessage: "API authentication failed. Please reconnect your account.",
  },
  {
    id: 5,
    name: "Hotels.com",
    logo: "/placeholder.svg?height=40&width=120",
    status: "connected",
    lastSync: "2023-11-13T16:20:00",
    roomsMapped: 15,
    totalRooms: 15,
    autoSync: true,
  },
  {
    id: 6,
    name: "Agoda",
    logo: "/placeholder.svg?height=40&width=120",
    status: "pending",
    lastSync: null,
    roomsMapped: 0,
    totalRooms: 15,
    autoSync: false,
  },
]

export default function ChannelManagerPage() {
  const router = useRouter()
  const [channels, setChannels] = useState(initialChannels)
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false)
  const [isDisconnectDialogOpen, setIsDisconnectDialogOpen] = useState(false)
  const [isMappingDialogOpen, setIsMappingDialogOpen] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredChannels = channels.filter((channel) => {
    if (activeTab === "all") return true
    if (activeTab === "connected") return channel.status === "connected"
    if (activeTab === "disconnected") return channel.status === "disconnected" || channel.status === "error"
    if (activeTab === "pending") return channel.status === "pending"
    return true
  })

  const handleBack = () => {
    router.push("/settings")
  }

  const handleConnect = (channel: any) => {
    setSelectedChannel(channel)
    setIsConnectDialogOpen(true)
  }

  const handleDisconnect = (channel: any) => {
    setSelectedChannel(channel)
    setIsDisconnectDialogOpen(true)
  }

  const handleMapping = (channel: any) => {
    setSelectedChannel(channel)
    setIsMappingDialogOpen(true)
  }

  const handleSyncNow = (channelId: number) => {
    setChannels(
      channels.map((channel) =>
        channel.id === channelId ? { ...channel, lastSync: new Date().toISOString() } : channel,
      ),
    )
  }

  const handleToggleAutoSync = (channelId: number, autoSync: boolean) => {
    setChannels(channels.map((channel) => (channel.id === channelId ? { ...channel, autoSync } : channel)))
  }

  const handleConnectConfirm = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setChannels(
        channels.map((channel) =>
          channel.id === selectedChannel.id
            ? {
                ...channel,
                status: "connected",
                lastSync: new Date().toISOString(),
                roomsMapped: channel.totalRooms,
                autoSync: true,
              }
            : channel,
        ),
      )

      setIsLoading(false)
      setIsConnectDialogOpen(false)
    }, 1500)
  }

  const handleDisconnectConfirm = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setChannels(
        channels.map((channel) =>
          channel.id === selectedChannel.id
            ? {
                ...channel,
                status: "disconnected",
                lastSync: null,
                roomsMapped: 0,
                autoSync: false,
              }
            : channel,
        ),
      )

      setIsLoading(false)
      setIsDisconnectDialogOpen(false)
    }, 1000)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"

    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Update the getStatusBadge function to ensure it always returns valid JSX
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
      case "disconnected":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Disconnected</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      default:
        return <Badge>{status.toString()}</Badge> // Ensure we convert to string
    }
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </Button>
          <h1 className="text-2xl font-bold">Channel Manager</h1>
        </div>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">All Channels</TabsTrigger>
            <TabsTrigger value="connected">Connected</TabsTrigger>
            <TabsTrigger value="disconnected">Issues</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChannels.map((channel) => (
          <Card key={channel.id} variant="elevated" className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={channel.logo || "/placeholder.svg"} alt={`${channel.name} logo`} className="h-8 mr-2" />
                  <CardTitle className="text-xl">{channel.name}</CardTitle>
                </div>
                {getStatusBadge(channel.status)}
              </div>
            </CardHeader>
            <CardContent>
              {channel.status === "error" && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>
                    {typeof channel.errorMessage === "string" ? channel.errorMessage : "An error occurred"}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Synchronized:</span>
                  <span className="font-medium">{formatDate(channel.lastSync)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rooms Mapped:</span>
                  <span className="font-medium">
                    {channel.roomsMapped} / {channel.totalRooms}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Auto Sync:</span>
                  <Switch
                    checked={channel.autoSync}
                    onCheckedChange={(checked) => handleToggleAutoSync(channel.id, checked)}
                    disabled={channel.status !== "connected"}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              {channel.status === "connected" ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleSyncNow(channel.id)}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Now
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleMapping(channel)}>
                      <Link2 className="h-4 w-4 mr-2" />
                      Mapping
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDisconnect(channel)}>
                      Disconnect
                    </Button>
                  </div>
                </>
              ) : (
                <Button className="w-full" onClick={() => handleConnect(channel)}>
                  Connect
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Connect Dialog */}
      <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect to {selectedChannel?.name}</DialogTitle>
            <DialogDescription>
              Connect your property to {selectedChannel?.name} to synchronize availability, rates, and bookings.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" placeholder="Enter your API key" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-secret">API Secret</Label>
              <Input id="api-secret" type="password" placeholder="Enter your API secret" />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded border-gray-300" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions of {selectedChannel?.name} integration
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConnectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnectConfirm} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disconnect Dialog */}
      <Dialog open={isDisconnectDialogOpen} onOpenChange={setIsDisconnectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disconnect from {selectedChannel?.name}</DialogTitle>
            <DialogDescription>
              Are you sure you want to disconnect from {selectedChannel?.name}? This will stop all synchronization of
              availability, rates, and bookings.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Alert variant="destructive">
              <AlertDescription>
                Disconnecting will remove all room mappings and stop all synchronization. This action cannot be undone.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDisconnectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDisconnectConfirm} disabled={isLoading}>
              {isLoading ? "Disconnecting..." : "Disconnect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Room Mapping Dialog */}
      <Dialog open={isMappingDialogOpen} onOpenChange={setIsMappingDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Room Mapping - {selectedChannel?.name}</DialogTitle>
            <DialogDescription>
              Map your property rooms to {selectedChannel?.name} room types for accurate synchronization.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Your Room Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {selectedChannel?.name} Room Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 1, localName: "Standard Double", channelName: "Double Room", mapped: true },
                    { id: 2, localName: "Deluxe Double", channelName: "Deluxe Double Room", mapped: true },
                    { id: 3, localName: "Twin Room", channelName: "Twin Room", mapped: true },
                    { id: 4, localName: "Family Suite", channelName: "Family Room", mapped: true },
                    { id: 5, localName: "Executive Suite", channelName: "Not mapped", mapped: false },
                  ].map((room) => (
                    <tr key={room.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {room.localName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {room.mapped ? (
                          room.channelName
                        ) : (
                          <select className="border rounded px-2 py-1 w-full">
                            <option value="">Select room type</option>
                            <option value="suite">Suite</option>
                            <option value="executive">Executive Room</option>
                            <option value="premium">Premium Room</option>
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {room.mapped ? (
                          <Badge className="bg-green-100 text-green-800">Mapped</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Not Mapped</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMappingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsMappingDialogOpen(false)}>Save Mapping</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

