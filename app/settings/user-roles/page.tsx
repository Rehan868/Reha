"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, Check, X, Shield, Users, User, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// Mock data for user roles
const initialRoles = [
  {
    id: 1,
    name: "Administrator",
    description: "Full access to all system features and settings",
    usersCount: 3,
    permissions: {
      dashboard: { view: true, edit: true },
      bookings: { view: true, create: true, edit: true, delete: true },
      rooms: { view: true, create: true, edit: true, delete: true },
      customers: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, export: true },
      settings: { view: true, edit: true },
      staff: { view: true, create: true, edit: true, delete: true },
      finances: { view: true, create: true, edit: true },
    },
    isSystem: true,
  },
  {
    id: 2,
    name: "Manager",
    description: "Access to most features except critical settings",
    usersCount: 5,
    permissions: {
      dashboard: { view: true, edit: false },
      bookings: { view: true, create: true, edit: true, delete: false },
      rooms: { view: true, create: true, edit: true, delete: false },
      customers: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, export: true },
      settings: { view: true, edit: false },
      staff: { view: true, create: false, edit: false, delete: false },
      finances: { view: true, create: true, edit: false },
    },
    isSystem: true,
  },
  {
    id: 3,
    name: "Front Desk",
    description: "Manage bookings and customer information",
    usersCount: 8,
    permissions: {
      dashboard: { view: true, edit: false },
      bookings: { view: true, create: true, edit: true, delete: false },
      rooms: { view: true, create: false, edit: false, delete: false },
      customers: { view: true, create: true, edit: true, delete: false },
      reports: { view: false, export: false },
      settings: { view: false, edit: false },
      staff: { view: false, create: false, edit: false, delete: false },
      finances: { view: false, create: false, edit: false },
    },
    isSystem: true,
  },
  {
    id: 4,
    name: "Housekeeping",
    description: "View room status and manage cleaning tasks",
    usersCount: 12,
    permissions: {
      dashboard: { view: true, edit: false },
      bookings: { view: true, create: false, edit: false, delete: false },
      rooms: { view: true, create: false, edit: false, delete: false },
      customers: { view: false, create: false, edit: false, delete: false },
      reports: { view: false, export: false },
      settings: { view: false, edit: false },
      staff: { view: false, create: false, edit: false, delete: false },
      finances: { view: false, create: false, edit: false },
    },
    isSystem: false,
  },
  {
    id: 5,
    name: "Accounting",
    description: "Access to financial reports and transactions",
    usersCount: 2,
    permissions: {
      dashboard: { view: true, edit: false },
      bookings: { view: true, create: false, edit: false, delete: false },
      rooms: { view: false, create: false, edit: false, delete: false },
      customers: { view: true, create: false, edit: false, delete: false },
      reports: { view: true, export: true },
      settings: { view: false, edit: false },
      staff: { view: false, create: false, edit: false, delete: false },
      finances: { view: true, create: true, edit: true },
    },
    isSystem: false,
  },
]

// Permission categories and actions
const permissionCategories = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: <Shield className="h-4 w-4 mr-2" />,
    actions: ["view", "edit"],
  },
  {
    id: "bookings",
    name: "Bookings",
    icon: <Shield className="h-4 w-4 mr-2" />,
    actions: ["view", "create", "edit", "delete"],
  },
  {
    id: "rooms",
    name: "Rooms",
    icon: <Shield className="h-4 w-4 mr-2" />,
    actions: ["view", "create", "edit", "delete"],
  },
  {
    id: "customers",
    name: "Customers",
    icon: <Shield className="h-4 w-4 mr-2" />,
    actions: ["view", "create", "edit", "delete"],
  },
  {
    id: "reports",
    name: "Reports",
    icon: <Shield className="h-4 w-4 mr-2" />,
    actions: ["view", "export"],
  },
  {
    id: "settings",
    name: "Settings",
    icon: <Shield className="h-4 w-4 mr-2" />,
    actions: ["view", "edit"],
  },
  {
    id: "staff",
    name: "Staff",
    icon: <Shield className="h-4 w-4 mr-2" />,
    actions: ["view", "create", "edit", "delete"],
  },
  {
    id: "finances",
    name: "Finances",
    icon: <Shield className="h-4 w-4 mr-2" />,
    actions: ["view", "create", "edit"],
  },
]

export default function UserRolesPage() {
  const router = useRouter()
  const [roles, setRoles] = useState(initialRoles)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: permissionCategories.reduce(
      (acc, category) => {
        acc[category.id] = category.actions.reduce(
          (actionAcc, action) => {
            actionAcc[action] = false
            return actionAcc
          },
          {} as Record<string, boolean>,
        )
        return acc
      },
      {} as Record<string, Record<string, boolean>>,
    ),
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleBack = () => {
    router.push("/settings")
  }

  const handleAddRole = () => {
    setIsAddDialogOpen(true)
  }

  const handleEditRole = (role: any) => {
    setSelectedRole(role)
    setIsEditDialogOpen(true)
  }

  const handleDeleteRole = (role: any) => {
    setSelectedRole(role)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveNewRole = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      const newId = Math.max(...roles.map((r) => r.id)) + 1
      const roleToAdd = {
        ...newRole,
        id: newId,
        usersCount: 0,
        isSystem: false,
      }

      setRoles([...roles, roleToAdd])
      setNewRole({
        name: "",
        description: "",
        permissions: permissionCategories.reduce(
          (acc, category) => {
            acc[category.id] = category.actions.reduce(
              (actionAcc, action) => {
                actionAcc[action] = false
                return actionAcc
              },
              {} as Record<string, boolean>,
            )
            return acc
          },
          {} as Record<string, Record<string, boolean>>,
        ),
      })

      setIsSaving(false)
      setIsAddDialogOpen(false)
    }, 1000)
  }

  const handleUpdateRole = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setRoles(roles.map((role) => (role.id === selectedRole.id ? selectedRole : role)))

      setIsSaving(false)
      setIsEditDialogOpen(false)
    }, 1000)
  }

  const handleDeleteConfirm = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setRoles(roles.filter((role) => role.id !== selectedRole.id))

      setIsSaving(false)
      setIsDeleteDialogOpen(false)
    }, 1000)
  }

  const handlePermissionChange = (roleData: any, categoryId: string, actionId: string, checked: boolean) => {
    if (roleData === "new") {
      setNewRole({
        ...newRole,
        permissions: {
          ...newRole.permissions,
          [categoryId]: {
            ...newRole.permissions[categoryId],
            [actionId]: checked,
          },
        },
      })
    } else {
      setSelectedRole({
        ...selectedRole,
        permissions: {
          ...selectedRole.permissions,
          [categoryId]: {
            ...selectedRole.permissions[categoryId],
            [actionId]: checked,
          },
        },
      })
    }
  }

  const getRoleIcon = (role: any) => {
    switch (role.name.toLowerCase()) {
      case "administrator":
        return <Shield className="h-5 w-5 text-red-500" />
      case "manager":
        return <Users className="h-5 w-5 text-blue-500" />
      case "front desk":
        return <User className="h-5 w-5 text-green-500" />
      default:
        return <UserPlus className="h-5 w-5 text-gray-500" />
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
          <h1 className="text-2xl font-bold">User Roles</h1>
        </div>
        <Button onClick={handleAddRole}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <Card key={role.id} variant="elevated" className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {getRoleIcon(role)}
                  <CardTitle className="ml-2">{role.name}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditRole(role)}
                    className="h-8 w-8"
                    disabled={role.isSystem}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteRole(role)}
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    disabled={role.isSystem}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  {role.usersCount} {role.usersCount === 1 ? "user" : "users"} assigned
                </span>
                {role.isSystem && (
                  <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                    System Role
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium mb-2">Permissions:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {permissionCategories.slice(0, 6).map((category) => (
                    <div key={category.id} className="flex items-center text-sm">
                      {category.icon}
                      <span className="mr-1">{category.name}:</span>
                      {role.permissions[category.id]?.view ? (
                        <Check className="h-3.5 w-3.5 text-green-500 ml-1" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-500 ml-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Role Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
            <DialogDescription>Create a new user role with specific permissions.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Role Name
              </Label>
              <Input
                id="name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Input
                id="description"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="border-t pt-4 mt-2">
              <h3 className="font-medium mb-4">Permissions</h3>

              <div className="space-y-6">
                {permissionCategories.map((category) => (
                  <div key={category.id} className="border rounded-md p-4">
                    <h4 className="font-medium mb-3 flex items-center">
                      {category.icon}
                      {category.name}
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {category.actions.map((action) => (
                        <div key={action} className="flex items-center space-x-2">
                          <Checkbox
                            id={`new-${category.id}-${action}`}
                            checked={newRole.permissions[category.id]?.[action] || false}
                            onCheckedChange={(checked) =>
                              handlePermissionChange("new", category.id, action, checked as boolean)
                            }
                          />
                          <Label htmlFor={`new-${category.id}-${action}`} className="capitalize">
                            {action}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewRole} disabled={!newRole.name || isSaving}>
              {isSaving ? "Saving..." : "Save Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>Modify the role and its permissions.</DialogDescription>
          </DialogHeader>

          {selectedRole && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Role Name
                </Label>
                <Input
                  id="edit-name"
                  value={selectedRole.name}
                  onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
                  className="col-span-3"
                  disabled={selectedRole.isSystem}
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-description" className="text-right pt-2">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={selectedRole.description}
                  onChange={(e) => setSelectedRole({ ...selectedRole, description: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="border-t pt-4 mt-2">
                <h3 className="font-medium mb-4">Permissions</h3>

                <div className="space-y-6">
                  {permissionCategories.map((category) => (
                    <div key={category.id} className="border rounded-md p-4">
                      <h4 className="font-medium mb-3 flex items-center">
                        {category.icon}
                        {category.name}
                      </h4>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {category.actions.map((action) => (
                          <div key={action} className="flex items-center space-x-2">
                            <Checkbox
                              id={`edit-${category.id}-${action}`}
                              checked={selectedRole.permissions[category.id]?.[action] || false}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(selectedRole, category.id, action, checked as boolean)
                              }
                            />
                            <Label htmlFor={`edit-${category.id}-${action}`} className="capitalize">
                              {action}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRole} disabled={isSaving}>
              {isSaving ? "Saving..." : "Update Role"}
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
              Are you sure you want to delete the "{selectedRole?.name}" role? This action cannot be undone.
              {selectedRole?.usersCount > 0 && (
                <div className="mt-2 text-red-500">
                  Warning: This role has {selectedRole.usersCount} {selectedRole.usersCount === 1 ? "user" : "users"}{" "}
                  assigned to it. These users will need to be reassigned to another role.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isSaving}>
              {isSaving ? "Deleting..." : "Delete Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

