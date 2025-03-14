"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Clock, CheckCircle, AlertTriangle, PenToolIcon as Tool } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data for maintenance requests
const mockRequests = [
  {
    id: 1,
    roomNumber: "101",
    title: "Leaking Faucet",
    description: "The bathroom sink faucet is leaking continuously.",
    priority: "medium",
    status: "pending",
    reportedBy: "Front Desk",
    reportedDate: "2023-12-01T10:30:00",
    assignedTo: "Thomas Brown",
  },
  {
    id: 2,
    roomNumber: "205",
    title: "AC Not Working",
    description: "Air conditioning unit is not cooling the room properly.",
    priority: "high",
    status: "in-progress",
    reportedBy: "Guest",
    reportedDate: "2023-12-02T14:15:00",
    assignedTo: "Thomas Brown",
  },
  {
    id: 3,
    roomNumber: "310",
    title: "Broken Lamp",
    description: "The desk lamp in the room is not working, possibly needs bulb replacement.",
    priority: "low",
    status: "completed",
    reportedBy: "Housekeeping",
    reportedDate: "2023-11-28T09:45:00",
    assignedTo: "James Wilson",
    completedDate: "2023-11-28T13:20:00",
  },
  {
    id: 4,
    roomNumber: "Lobby",
    title: "Flickering Lights",
    description: "The lights in the main lobby area are flickering intermittently.",
    priority: "medium",
    status: "pending",
    reportedBy: "Manager",
    reportedDate: "2023-12-03T16:00:00",
    assignedTo: null,
  },
  {
    id: 5,
    roomNumber: "402",
    title: "TV Remote Missing",
    description: "Guest reported that the TV remote is missing from the room.",
    priority: "low",
    status: "completed",
    reportedBy: "Guest",
    reportedDate: "2023-11-30T11:10:00",
    assignedTo: "Lisa Chen",
    completedDate: "2023-11-30T14:45:00",
  },
]

// Staff members for assignment
const staffMembers = ["Thomas Brown", "James Wilson", "Lisa Chen", "Maria Rodriguez"]

export default function MaintenancePage() {
  const [requests, setRequests] = useState(mockRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [newRequest, setNewRequest] = useState({
    roomNumber: "",
    title: "",
    description: "",
    priority: "medium",
    reportedBy: "Front Desk",
    assignedTo: "",
  })

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.assignedTo && request.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))

    if (statusFilter === "all") return matchesSearch
    return matchesSearch && request.status === statusFilter
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
  }

  const handleNewRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewRequest({
      ...newRequest,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (field: string, value: string) => {
    setNewRequest({
      ...newRequest,
      [field]: value,
    })
  }

  const handleAddRequest = () => {
    const newId = Math.max(...requests.map((r) => r.id)) + 1
    const requestToAdd = {
      ...newRequest,
      id: newId,
      status: "pending",
      reportedDate: new Date().toISOString(),
    }

    setRequests([...requests, requestToAdd])
    setNewRequest({
      roomNumber: "",
      title: "",
      description: "",
      priority: "medium",
      reportedBy: "Front Desk",
      assignedTo: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditRequest = (request: any) => {
    setSelectedRequest(request)
    setIsEditDialogOpen(true)
  }

  const handleDeleteRequest = (request: any) => {
    setSelectedRequest(request)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setRequests(requests.filter((r) => r.id !== selectedRequest.id))
    setIsDeleteDialogOpen(false)
  }

  const updateRequestStatus = (id: number, newStatus: string) => {
    setRequests(
      requests.map((request) => {
        if (request.id === id) {
          const updatedRequest = { ...request, status: newStatus }
          if (newStatus === "completed") {
            updatedRequest.completedDate = new Date().toISOString()
          }
          return updatedRequest
        }
        return request
      }),
    )
  }

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "in-progress":
        return <Tool className="h-5 w-5 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="maintenance" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Maintenance Requests</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  New Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Maintenance Request</DialogTitle>
                  <DialogDescription>Enter the details of the maintenance issue.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roomNumber" className="text-right">
                      Room/Location
                    </Label>
                    <Input
                      id="roomNumber"
                      name="roomNumber"
                      value={newRequest.roomNumber}
                      onChange={handleNewRequestChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Issue Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={newRequest.title}
                      onChange={handleNewRequestChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newRequest.description}
                      onChange={handleNewRequestChange}
                      className="col-span-3"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <RadioGroup
                      id="priority"
                      value={newRequest.priority}
                      onValueChange={(value) => handleSelectChange("priority", value)}
                      className="col-span-3 flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low" className="text-green-600">
                          Low
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="text-yellow-600">
                          Medium
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high" className="text-red-600">
                          High
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reportedBy" className="text-right">
                      Reported By
                    </Label>
                    <Select
                      value={newRequest.reportedBy}
                      onValueChange={(value) => handleSelectChange("reportedBy", value)}
                    >
                      <SelectTrigger id="reportedBy" className="col-span-3">
                        <SelectValue placeholder="Select reporter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Front Desk">Front Desk</SelectItem>
                        <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                        <SelectItem value="Guest">Guest</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assignedTo" className="text-right">
                      Assign To
                    </Label>
                    <Select
                      value={newRequest.assignedTo}
                      onValueChange={(value) => handleSelectChange("assignedTo", value)}
                    >
                      <SelectTrigger id="assignedTo" className="col-span-3">
                        <SelectValue placeholder="Select staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Unassigned</SelectItem>
                        {staffMembers.map((staff) => (
                          <SelectItem key={staff} value={staff}>
                            {staff}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddRequest}>
                    Create Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="p-6 flex-1 overflow-auto">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by room, title, or description..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request) => (
              <Card key={request.id} variant="outline" className="overflow-hidden">
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                        {request.roomNumber}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${getPriorityBadgeClass(request.priority)}`}
                      >
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{request.title}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEditRequest(request)} className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRequest(request)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{request.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Reported by:</span>
                      <span>{request.reportedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span>{formatDate(request.reportedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Assigned to:</span>
                      <span>{request.assignedTo || "Unassigned"}</span>
                    </div>
                    {request.completedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Completed:</span>
                        <span>{formatDate(request.completedDate)}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getStatusIcon(request.status)}
                        <span className="ml-2 capitalize">{request.status.replace("-", " ")}</span>
                      </div>

                      {request.status !== "completed" && (
                        <div className="flex space-x-2">
                          {request.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRequestStatus(request.id, "in-progress")}
                            >
                              Start Work
                            </Button>
                          )}
                          {request.status === "in-progress" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRequestStatus(request.id, "completed")}
                            >
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No maintenance requests found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Request Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Maintenance Request</DialogTitle>
            <DialogDescription>Update the maintenance request details.</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-roomNumber" className="text-right">
                  Room/Location
                </Label>
                <Input id="edit-roomNumber" defaultValue={selectedRequest.roomNumber} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Issue Title
                </Label>
                <Input id="edit-title" defaultValue={selectedRequest.title} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  defaultValue={selectedRequest.description}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-priority" className="text-right">
                  Priority
                </Label>
                <RadioGroup
                  id="edit-priority"
                  defaultValue={selectedRequest.priority}
                  className="col-span-3 flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="edit-low" />
                    <Label htmlFor="edit-low" className="text-green-600">
                      Low
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="edit-medium" />
                    <Label htmlFor="edit-medium" className="text-yellow-600">
                      Medium
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="edit-high" />
                    <Label htmlFor="edit-high" className="text-red-600">
                      High
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={selectedRequest.status || "pending"}>
                  <SelectTrigger id="edit-status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-assignedTo" className="text-right">
                  Assign To
                </Label>
                <Select defaultValue={selectedRequest.assignedTo || "Unassigned"}>
                  <SelectTrigger id="edit-assignedTo" className="col-span-3">
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                    {staffMembers.map((staff) => (
                      <SelectItem key={staff} value={staff}>
                        {staff}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={() => setIsEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this maintenance request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

