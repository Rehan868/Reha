"use client"

import { useState } from "react"
import { ArrowLeft, Mail, Phone, Calendar, Building, UserCheck, Clock, Shield, Edit } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

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
    recentActivity: [
      { action: "Updated room rates", date: "2024-01-19 14:30" },
      { action: "Created new booking", date: "2024-01-18 10:15" },
      { action: "Modified user permissions", date: "2024-01-17 16:45" },
    ],
  }
}

export default function ViewUserPage({ params }) {
  const userId = params.id ? String(params.id) : ""
  const user = getUserData(userId)
  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="users" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/users" className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-semibold text-gray-800">User Profile</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href={`/users/${userId}/edit`} className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit User
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - User info */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{user.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                    >
                      {user.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="permissions">Permissions</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoItem icon={<Phone className="h-4 w-4" />} label="Phone" value={user.phone} />
                        <InfoItem icon={<Calendar className="h-4 w-4" />} label="Hire Date" value={user.hireDate} />
                        <InfoItem icon={<Building className="h-4 w-4" />} label="Department" value={user.department} />
                        <InfoItem icon={<Shield className="h-4 w-4" />} label="Role" value={user.role} />
                        <InfoItem icon={<Clock className="h-4 w-4" />} label="Last Login" value={user.lastLogin} />
                      </div>

                      <div className="mt-6">
                        <h3 className="font-medium text-gray-700 mb-2">Address</h3>
                        <p className="text-gray-600">{user.address}</p>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-medium text-gray-700 mb-2">Emergency Contact</h3>
                        <p className="text-gray-600">{user.emergencyContact}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="permissions">
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-700 mb-2">Access Permissions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {user.permissions.map((permission, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                              <UserCheck className="h-4 w-4 text-green-500" />
                              <span className="text-sm">{permission}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="activity">
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-700 mb-2">Recent Activity</h3>
                        <div className="space-y-3">
                          {user.recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-md">
                              <div>
                                <p className="text-sm font-medium">{activity.action}</p>
                              </div>
                              <div className="text-xs text-gray-500">{activity.date}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Additional info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">User ID</span>
                    <span className="text-sm font-medium">{String(user.id)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Status</span>
                    <Badge
                      className={user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                    >
                      {user.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Role</span>
                    <span className="text-sm font-medium">{user.role}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Department</span>
                    <span className="text-sm font-medium">{user.department}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500">Last Login</span>
                    <span className="text-sm font-medium">{user.lastLogin}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Reset Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Send Notification
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                  >
                    Suspend Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-gray-400 mt-0.5">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value ? String(value) : ""}</p>
      </div>
    </div>
  )
}

