"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for SMS templates
const initialTemplates = [
  {
    id: 1,
    name: "Booking Confirmation",
    content:
      "Thank you for booking with {hotel_name}! Your reservation for {room_type} from {check_in_date} to {check_out_date} is confirmed. Confirmation #: {booking_id}",
    category: "booking",
    active: true,
    lastEdited: "2023-11-15T14:30:00",
  },
  {
    id: 2,
    name: "Check-in Reminder",
    content:
      "Hello {guest_name}, this is a reminder that your check-in at {hotel_name} is tomorrow at {check_in_time}. We look forward to welcoming you!",
    category: "booking",
    active: true,
    lastEdited: "2023-11-10T09:15:00",
  },
  {
    id: 3,
    name: "Check-out Reminder",
    content:
      "Hello {guest_name}, this is a reminder that your check-out time is tomorrow at {check_out_time}. We hope you enjoyed your stay at {hotel_name}!",
    category: "booking",
    active: true,
    lastEdited: "2023-11-12T11:45:00",
  },
  {
    id: 4,
    name: "Payment Confirmation",
    content:
      "Your payment of {amount} for reservation #{booking_id} at {hotel_name} has been processed successfully. Thank you!",
    category: "billing",
    active: true,
    lastEdited: "2023-11-05T16:20:00",
  },
  {
    id: 5,
    name: "Special Offer",
    content:
      "Exclusive offer for our valued guests! Book your next stay at {hotel_name} before {offer_end_date} and receive {discount_percentage}% off. Use code: {promo_code}",
    category: "marketing",
    active: false,
    lastEdited: "2023-10-28T13:10:00",
  },
  {
    id: 6,
    name: "Feedback Request",
    content:
      "Thank you for staying at {hotel_name}! We'd love to hear about your experience. Please take a moment to share your feedback: {feedback_link}",
    category: "post-stay",
    active: true,
    lastEdited: "2023-11-08T10:30:00",
  },
]

// Available variables for templates
const templateVariables = [
  { name: "{hotel_name}", description: "Name of the hotel" },
  { name: "{guest_name}", description: "Full name of the guest" },
  { name: "{booking_id}", description: "Unique booking reference number" },
  { name: "{room_type}", description: "Type of room booked" },
  { name: "{check_in_date}", description: "Check-in date" },
  { name: "{check_out_date}", description: "Check-out date" },
  { name: "{check_in_time}", description: "Check-in time" },
  { name: "{check_out_time}", description: "Check-out time" },
  { name: "{amount}", description: "Payment amount" },
  { name: "{discount_percentage}", description: "Discount percentage for offers" },
  { name: "{promo_code}", description: "Promotional code" },
  { name: "{offer_end_date}", description: "End date of a special offer" },
  { name: "{feedback_link}", description: "Link to feedback form" },
]

export default function SmsTemplatesPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState(initialTemplates)
  const  {\
  const router = useRouter();
  const [templates, setTemplates] = useState(initialTemplates)
  const [activeCategory, setActiveCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    content: "",
    category: "booking",
    active: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || template.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const handleBack = () => {
    router.push("/settings")
  }

  const handleAddTemplate = () => {
    setIsAddDialogOpen(true)
  }

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template)
    setIsEditDialogOpen(true)
  }

  const handleDeleteTemplate = (template: any) => {
    setSelectedTemplate(template)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveNewTemplate = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      const newId = Math.max(...templates.map((t) => t.id)) + 1
      const templateToAdd = {
        ...newTemplate,
        id: newId,
        lastEdited: new Date().toISOString(),
      }

      setTemplates([...templates, templateToAdd])
      setNewTemplate({
        name: "",
        content: "",
        category: "booking",
        active: true,
      })

      setIsSaving(false)
      setIsAddDialogOpen(false)
    }, 1000)
  }

  const handleUpdateTemplate = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setTemplates(
        templates.map((template) =>
          template.id === selectedTemplate.id
            ? { ...selectedTemplate, lastEdited: new Date().toISOString() }
            : template,
        ),
      )

      setIsSaving(false)
      setIsEditDialogOpen(false)
    }, 1000)
  }

  const handleDeleteConfirm = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setTemplates(templates.filter((template) => template.id !== selectedTemplate.id))

      setIsSaving(false)
      setIsDeleteDialogOpen(false)
    }, 1000)
  }

  const handleToggleActive = (id: number, active: boolean) => {
    setTemplates(
      templates.map((template) =>
        template.id === id ? { ...template, active, lastEdited: new Date().toISOString() } : template,
      ),
    )
  }

  const insertVariable = (variable: string) => {
    if (isEditDialogOpen && selectedTemplate) {
      setSelectedTemplate({
        ...selectedTemplate,
        content: selectedTemplate.content + " " + variable,
      })
    } else if (isAddDialogOpen) {
      setNewTemplate({
        ...newTemplate,
        content: newTemplate.content + " " + variable,
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "booking":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Booking</Badge>
      case "billing":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Billing</Badge>
      case "marketing":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Marketing</Badge>
      case "post-stay":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Post-Stay</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{category}</Badge>
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
          <h1 className="text-2xl font-bold">SMS Templates</h1>
        </div>
        <Button onClick={handleAddTemplate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Template
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full md:w-auto"
          >
            <TabsList className="grid grid-cols-5 w-full md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="booking">Booking</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="post-stay">Post-Stay</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} variant="elevated" className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                    {template.name}
                  </CardTitle>
                  <div className="flex items-center mt-1 space-x-2">
                    {getCategoryBadge(template.category)}
                    {template.active ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        Inactive
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEditTemplate(template)} className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTemplate(template)}
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-4 border p-3 rounded-md bg-gray-50 min-h-[80px]">
                {template.content}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Last edited: {formatDate(template.lastEdited)}</span>
                <div className="flex items-center">
                  <span className="mr-2">Active</span>
                  <Switch
                    checked={template.active}
                    onCheckedChange={(checked) => handleToggleActive(template.id, checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No templates found</h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Try adjusting your search or filter criteria."
              : "Create your first SMS template to get started."}
          </p>
        </div>
      )}

      {/* Add Template Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add SMS Template</DialogTitle>
            <DialogDescription>Create a new SMS template for automated messages.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Template Name
              </Label>
              <Input
                id="name"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="category" className="text-right pt-2">
                Category
              </Label>
              <div className="col-span-3">
                <Tabs
                  defaultValue="booking"
                  value={newTemplate.category}
                  onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="booking">Booking</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                    <TabsTrigger value="marketing">Marketing</TabsTrigger>
                    <TabsTrigger value="post-stay">Post-Stay</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Message Content
              </Label>
              <div className="col-span-3 space-y-2">
                <Textarea
                  id="content"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  className="min-h-[150px]"
                  placeholder="Enter your SMS template content here..."
                />
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>{newTemplate.content.length} characters</span>
                  <span>Recommended max: 160 characters</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Variables</Label>
              <div className="col-span-3">
                <div className="border rounded-md p-3 bg-gray-50">
                  <div className="text-sm text-gray-500 mb-2">Click to insert a variable into your template:</div>
                  <div className="flex flex-wrap gap-2">
                    {templateVariables.map((variable) => (
                      <Button
                        key={variable.name}
                        variant="outline"
                        size="sm"
                        onClick={() => insertVariable(variable.name)}
                        title={variable.description}
                        className="text-xs"
                      >
                        {variable.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active" className="text-right">
                Status
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="active"
                  checked={newTemplate.active}
                  onCheckedChange={(checked) => setNewTemplate({ ...newTemplate, active: checked })}
                />
                <Label htmlFor="active">{newTemplate.active ? "Active" : "Inactive"}</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewTemplate} disabled={!newTemplate.name || !newTemplate.content || isSaving}>
              {isSaving ? "Saving..." : "Save Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit SMS Template</DialogTitle>
            <DialogDescription>Modify the SMS template content and settings.</DialogDescription>
          </DialogHeader>

          {selectedTemplate && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Template Name
                </Label>
                <Input
                  id="edit-name"
                  value={selectedTemplate.name}
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, name: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-category" className="text-right pt-2">
                  Category
                </Label>
                <div className="col-span-3">
                  <Tabs
                    value={selectedTemplate.category}
                    onValueChange={(value) => setSelectedTemplate({ ...selectedTemplate, category: value })}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="booking">Booking</TabsTrigger>
                      <TabsTrigger value="billing">Billing</TabsTrigger>
                      <TabsTrigger value="marketing">Marketing</TabsTrigger>
                      <TabsTrigger value="post-stay">Post-Stay</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right pt-2">
                  Message Content
                </Label>
                <div className="col-span-3 space-y-2">
                  <Textarea
                    id="edit-content"
                    value={selectedTemplate.content}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, content: e.target.value })}
                    className="min-h-[150px]"
                  />
                  <div className="text-sm text-gray-500 flex justify-between">
                    <span>{selectedTemplate.content.length} characters</span>
                    <span>Recommended max: 160 characters</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Variables</Label>
                <div className="col-span-3">
                  <div className="border rounded-md p-3 bg-gray-50">
                    <div className="text-sm text-gray-500 mb-2">Click to insert a variable into your template:</div>
                    <div className="flex flex-wrap gap-2">
                      {templateVariables.map((variable) => (
                        <Button
                          key={variable.name}
                          variant="outline"
                          size="sm"
                          onClick={() => insertVariable(variable.name)}
                          title={variable.description}
                          className="text-xs"
                        >
                          {variable.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-active" className="text-right">
                  Status
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="edit-active"
                    checked={selectedTemplate.active}
                    onCheckedChange={(checked) => setSelectedTemplate({ ...selectedTemplate, active: checked })}
                  />
                  <Label htmlFor="edit-active">{selectedTemplate.active ? "Active" : "Inactive"}</Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTemplate} disabled={isSaving}>
              {isSaving ? "Saving..." : "Update Template"}
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
              Are you sure you want to delete the "{selectedTemplate?.name}" template? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isSaving}>
              {isSaving ? "Deleting..." : "Delete Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

