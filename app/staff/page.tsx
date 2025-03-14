"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Mail, Phone, UserCircle } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

// Mock data for staff members
const mockStaff = [
  {
    id: 1,
    name: "David Miller",
    email: "david.m@grandhotel.com",
    phone: "+1 (555) 111-2233",
    position: "Hotel Manager",
    department: "Management",
    status: "active",
    joinDate: "2020-03-15",
  },
  {
    id: 2,
    name: "Lisa Chen",
    email: "lisa.c@grandhotel.com",
    phone: "+1 (555) 222-3344",
    position: "Front Desk Supervisor",
    department: "Front Office",
    status: "active",
    joinDate: "2021-06-10",
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james.w@grandhotel.com",
    phone: "+1 (555) 333-4455",
    position: "Housekeeping Manager",
    department: "Housekeeping",
    status: "active",
    joinDate: "2019-11-05",
  },
  {
    id: 4,
    name: "Maria Rodriguez",
    email: "maria.r@grandhotel.com",
    phone: "+1 (555) 444-5566",
    position: "Chef",
    department: "Food & Beverage",
    status: "active",
    joinDate: "2022-01-20",
  },
  {
    id: 5,
    name: "Thomas Brown",
    email: "thomas.b@grandhotel.com",
    phone: "+1 (555) 555-6677",
    position: "Maintenance Technician",
    department: "Maintenance",
    status: "inactive",
    joinDate: "2020-08-12",
  },
]

// Department options
const departments = [
  "Management",
  "Front Office",
  "Housekeeping",
  "Food & Beverage",
  "Maintenance",
  "Security",
  "Accounting",
  "Human Resources",
]

export default function StaffPage() {
  const [staff, setStaff] = useState(mockStaff)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    status: "active",
  })

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleNewStaffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStaff({
      ...newStaff,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (field: string, value: string) => {
    setNewStaff({
      ...newStaff,
      [field]: value,
    })
  }

  const handleAddStaff = () => {
    const newId = Math.max(...staff.map((s) => s.id)) + 1
    const staffToAdd = {
      ...newStaff,
      id: newId,
      joinDate: new Date().toISOString().split("T")[0],
    }

    setStaff([...staff, staffToAdd])
    setNewStaff({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      status: "active",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditStaff = (member: any) => {
    setSelectedStaff(member)
    setIsEditDialogOpen(true)
  }

  const handleDeleteStaff = (member: any) => {
    setSelectedStaff(member)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setStaff(staff.filter((s) => s.id !== selectedStaff.id))
    setIsDeleteDialogOpen(false)
  }

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      Management: "bg-blue-100 text-blue-800",
      "Front Office": "bg-green-100 text-green-800",
      Housekeeping: "bg-purple-100 text-purple-800",
      "Food & Beverage": "bg-orange-100 text-orange-800",
      Maintenance: "bg-yellow-100 text-yellow-800",
      Security: "bg-red-100 text-red-800",
      Accounting: "bg-indigo-100 text-indigo-800",
      "Human Resources": "bg-pink-100 text-pink-800",
    }
    return colors[department] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="staff" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Staff Management</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Staff Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                  <DialogDescription>Enter the details of the new staff member.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newStaff.name}
                      onChange={handleNewStaffChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newStaff.email}
                      onChange={handleNewStaffChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={newStaff.phone}
                      onChange={handleNewStaffChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="position" className="text-right">
                      Position
                    </Label>
                    <Input
                      id="position"
                      name="position"
                      value={newStaff.position}
                      onChange={handleNewStaffChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      Department
                    </Label>
                    <Select
                      value={newStaff.department}
                      onValueChange={(value) => handleSelectChange("department", value)}
                    >
                      <SelectTrigger id="department" className="col-span-3">
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select value={newStaff.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger id="status" className="col-span-3">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddStaff}>
                    Add Staff Member
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="p-6 flex-1 overflow-auto">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search staff by name, position, or department..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member) => (
              <Card key={member.id} variant="filled" className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEditStaff(member)} className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteStaff(member)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        member.status === "active" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                    <span className="text-sm capitalize text-gray-500">{member.status}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center text-sm mt-2">
                      <UserCircle className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{member.position}</span>
                    </div>

                    <div className="mt-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${getDepartmentColor(member.department)}`}
                      >
                        {member.department}
                      </span>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Joined:</span>{" "}
                        {new Date(member.joinDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No staff members found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Staff Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
            <DialogDescription>Update the staff member's information.</DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input id="edit-name" defaultValue={selectedStaff.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input id="edit-email" type="email" defaultValue={selectedStaff.email} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input id="edit-phone" defaultValue={selectedStaff.phone} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-position" className="text-right">
                  Position
                </Label>
                <Input id="edit-position" defaultValue={selectedStaff.position} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">
                  Department
                </Label>
                <Select defaultValue={selectedStaff.department}>
                  <SelectTrigger id="edit-department" className="col-span-3">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={selectedStaff.status}>
                  <SelectTrigger id="edit-status" className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
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
              Are you sure you want to delete this staff member? This action cannot be undone.
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

