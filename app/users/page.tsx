"use client"

import { useState } from "react"
import { Search, Filter, Plus, Download, LayoutGrid, List, Pencil, Trash2, RefreshCcw, Eye } from "lucide-react"
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const users = [
  {
    name: "Sarah Johnson",
    email: "sarah.j@hotelname.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Admin",
    department: "Management",
    status: "Active",
    lastLogin: "2024-01-20 09:45 AM",
  },
  {
    name: "Michael Chen",
    email: "m.chen@hotelname.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Manager",
    department: "Front Desk",
    status: "Active",
    lastLogin: "2024-01-20 08:30 AM",
  },
  {
    name: "Emily Rodriguez",
    email: "e.rodriguez@hotelname.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Staff",
    department: "Housekeeping",
    status: "Inactive",
    lastLogin: "2024-01-19 05:15 PM",
  },
  {
    name: "David Kim",
    email: "d.kim@hotelname.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Manager",
    department: "Restaurant",
    status: "Active",
    lastLogin: "2024-01-20 10:20 AM",
  },
  {
    name: "Lisa Wang",
    email: "l.wang@hotelname.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Staff",
    department: "Front Desk",
    status: "Active",
    lastLogin: "2024-01-20 09:15 AM",
  },
]

export default function UsersPage() {
  const [isGridView, setIsGridView] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>(null)

  const handleDelete = (user) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Here you would call your API to delete the user
    console.log("Deleting user:", userToDelete)

    // Close the dialog
    setDeleteDialogOpen(false)
    setUserToDelete(null)

    // For demo purposes, we'll just show an alert
    alert(`User ${userToDelete.name} has been deleted`)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="users" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Users Management</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <Button asChild className="flex items-center gap-2">
                <Link href="/users/new">
                  <Plus className="h-4 w-4" />
                  Add New User
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Select>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activate">Activate</SelectItem>
                    <SelectItem value="deactivate">Deactivate</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                  </SelectContent>
                </Select>

                <div className="border rounded-md flex">
                  <Button
                    variant={isGridView ? "ghost" : "secondary"}
                    size="icon"
                    onClick={() => setIsGridView(false)}
                    className="rounded-r-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={isGridView ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setIsGridView(true)}
                    className="rounded-l-none"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="frontdesk">Front Desk</SelectItem>
                  <SelectItem value="housekeeping">Housekeeping</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                </SelectContent>
              </Select>

              <input type="date" className="px-3 py-2 border border-gray-200 rounded-md" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left">
                      <Checkbox />
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">User</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Department</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last Login</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <Checkbox />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <Image
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.department}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.lastLogin}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link href={`/users/${index}`} className="text-gray-400 hover:text-blue-600">
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link href={`/users/${index}/edit`} className="text-gray-400 hover:text-blue-600">
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button className="text-gray-400 hover:text-red-600" onClick={() => handleDelete(user)}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-500">Showing 1 to 5 of 25 entries</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="blue" className="px-3 min-w-[40px]">
                  1
                </Button>
                <Button variant="outline" className="px-3 min-w-[40px]">
                  2
                </Button>
                <Button variant="outline" className="px-3 min-w-[40px]">
                  3
                </Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete user {userToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
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

function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-50 text-green-700 border-green-100"
      case "inactive":
        return "bg-gray-50 text-gray-700 border-gray-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-100"
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {status}
    </span>
  )
}

