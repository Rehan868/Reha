"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Mail, Phone } from "lucide-react"
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

// Mock data for customers
const mockCustomers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    status: "active",
    totalStays: 5,
    totalSpent: 1250,
    lastStay: "2023-10-15",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Park Ave, Boston, MA 02108",
    status: "active",
    totalStays: 3,
    totalSpent: 780,
    lastStay: "2023-11-22",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Oak St, Chicago, IL 60601",
    status: "inactive",
    totalStays: 1,
    totalSpent: 350,
    lastStay: "2023-05-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 234-5678",
    address: "321 Pine St, San Francisco, CA 94101",
    status: "active",
    totalStays: 8,
    totalSpent: 2100,
    lastStay: "2023-12-05",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.w@example.com",
    phone: "+1 (555) 876-5432",
    address: "654 Maple Ave, Miami, FL 33101",
    status: "active",
    totalStays: 2,
    totalSpent: 620,
    lastStay: "2023-09-18",
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  })

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleNewCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    })
  }

  const handleStatusChange = (value: string) => {
    setNewCustomer({
      ...newCustomer,
      status: value,
    })
  }

  const handleAddCustomer = () => {
    const newId = Math.max(...customers.map((c) => c.id)) + 1
    const customerToAdd = {
      ...newCustomer,
      id: newId,
      totalStays: 0,
      totalSpent: 0,
      lastStay: "N/A",
    }

    setCustomers([...customers, customerToAdd])
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      status: "active",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsEditDialogOpen(true)
  }

  const handleDeleteCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setCustomers(customers.filter((c) => c.id !== selectedCustomer.id))
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="customers" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>Enter the details of the new customer.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newCustomer.name}
                      onChange={handleNewCustomerChange}
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
                      value={newCustomer.email}
                      onChange={handleNewCustomerChange}
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
                      value={newCustomer.phone}
                      onChange={handleNewCustomerChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={newCustomer.address}
                      onChange={handleNewCustomerChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select value={newCustomer.status} onValueChange={handleStatusChange}>
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
                  <Button type="submit" onClick={handleAddCustomer}>
                    Add Customer
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
                placeholder="Search customers by name, email, or phone..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} variant="elevated" className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{customer.name}</CardTitle>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditCustomer(customer)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCustomer(customer)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        customer.status === "active" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                    <span className="text-sm capitalize text-gray-500">{customer.status}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{customer.address}</div>

                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-lg font-semibold">{customer.totalStays}</div>
                          <div className="text-xs text-gray-500">Stays</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold">${customer.totalSpent}</div>
                          <div className="text-xs text-gray-500">Spent</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold">
                            {customer.lastStay !== "N/A"
                              ? new Date(customer.lastStay).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">Last Stay</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No customers found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>Update the customer's information.</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input id="edit-name" defaultValue={selectedCustomer.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input id="edit-email" type="email" defaultValue={selectedCustomer.email} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input id="edit-phone" defaultValue={selectedCustomer.phone} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">
                  Address
                </Label>
                <Input id="edit-address" defaultValue={selectedCustomer.address} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={selectedCustomer.status}>
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
              Are you sure you want to delete this customer? This action cannot be undone.
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

