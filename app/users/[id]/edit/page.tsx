"use client"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Mock user data - in a real app, you would fetch this from an API
const getUserData = (id) => {
  return {
    id,
    name: "Sarah Johnson",
    email: "sarah.j@hotelname.com",
    avatar: "/placeholder.svg?height=128&width=128",
    role: "Admin",
    department: "Management",
    status: "Active",
    lastLogin: "2024-01-20 09:45 AM",
    phone: "+1 (555) 123-4567",
    hireDate: "2022-03-15",
    address: "123 Hotel Street, City, State, 12345",
    emergencyContact: "John Johnson, +1 (555) 987-6543",
    permissions: ["Dashboard", "Bookings", "Rooms", "Users", "Settings", "Reports"],
  }
}

const allPermissions = [
  "Dashboard",
  "Bookings",
  "Rooms",
  "Users",
  "Settings",
  "Reports",
  "Expenses",
  "Calendar",
  "Cleaning",
  "Maintenance",
]

export default function EditUserPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const userId = params.id ? String(params.id) : ""
  const userData = getUserData(userId)

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    role: userData.role,
    department: userData.department,
    status: userData.status,
    address: userData.address,
    emergencyContact: userData.emergencyContact,
    permissions: userData.permissions,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePermissionChange = (permission) => {
    setFormData((prev) => {
      const currentPermissions = [...prev.permissions]

      if (currentPermissions.includes(permission)) {
        return {
          ...prev,
          permissions: currentPermissions.filter((p) => p !== permission),
        }
      } else {
        return {
          ...prev,
          permissions: [...currentPermissions, permission],
        }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      toast({
        title: "User updated",
        description: "User information has been successfully updated.",
      })

      // Redirect to user view page
      router.push(`/users/${String(userId)}`)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was a problem updating the user.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="users" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/users/${String(userId)}`} className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-semibold text-gray-800">Edit User</h1>
            </div>
            <Button type="submit" form="edit-user-form" disabled={isSubmitting} className="flex items-center gap-2">
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <form id="edit-user-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - User info */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update the user's personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input
                          id="emergencyContact"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Permissions</CardTitle>
                    <CardDescription>Manage what areas of the application the user can access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {allPermissions.map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <Checkbox
                            id={`permission-${permission}`}
                            checked={formData.permissions.includes(permission)}
                            onCheckedChange={() => handlePermissionChange(permission)}
                          />
                          <Label htmlFor={`permission-${permission}`} className="text-sm font-normal">
                            {permission}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right column - Additional info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage the user's role and status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        name="role"
                        value={formData.role}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        name="department"
                        value={formData.department}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Management">Management</SelectItem>
                          <SelectItem value="Front Desk">Front Desk</SelectItem>
                          <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                          <SelectItem value="Restaurant">Restaurant</SelectItem>
                          <SelectItem value="Maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        name="status"
                        value={formData.status}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage user's security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" type="button" className="w-full">
                      Reset Password
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      Enable Two-Factor Auth
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                    >
                      Force Logout
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" type="button" className="w-full">
                      Delete User
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

