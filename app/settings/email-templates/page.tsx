"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Pencil, Trash2, Copy, Eye, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample email templates data
const emailTemplatesData = [
  {
    id: "booking-confirmation",
    name: "Booking Confirmation",
    subject: "Your Booking Confirmation - [Booking ID]",
    category: "booking",
    lastEdited: "2023-10-15T14:30:00Z",
    active: true,
    content: `<p>Dear {{guest_name}},</p>
<p>Thank you for choosing to stay with us at {{hotel_name}}. Your booking has been confirmed.</p>
<p><strong>Booking Details:</strong></p>
<ul>
  <li>Booking ID: {{booking_id}}</li>
  <li>Check-in: {{check_in_date}}</li>
  <li>Check-out: {{check_out_date}}</li>
  <li>Room Type: {{room_type}}</li>
  <li>Number of Guests: {{guest_count}}</li>
  <li>Total Amount: {{total_amount}}</li>
</ul>
<p>We look forward to welcoming you!</p>
<p>Best regards,<br>The {{hotel_name}} Team</p>`,
  },
  {
    id: "booking-reminder",
    name: "Booking Reminder",
    subject: "Your Stay Reminder - Arriving Tomorrow",
    category: "booking",
    lastEdited: "2023-09-22T10:15:00Z",
    active: true,
    content: `<p>Dear {{guest_name}},</p>
<p>We're looking forward to welcoming you to {{hotel_name}} tomorrow!</p>
<p><strong>Booking Details:</strong></p>
<ul>
  <li>Check-in: {{check_in_date}} (from {{check_in_time}})</li>
  <li>Check-out: {{check_out_date}} (by {{check_out_time}})</li>
  <li>Room Type: {{room_type}}</li>
</ul>
<p>For your convenience, here's our address and contact information:</p>
<p>{{hotel_address}}<br>Phone: {{hotel_phone}}</p>
<p>Safe travels!</p>
<p>Best regards,<br>The {{hotel_name}} Team</p>`,
  },
  {
    id: "thank-you",
    name: "Thank You for Staying",
    subject: "Thank You for Staying With Us",
    category: "post-stay",
    lastEdited: "2023-08-05T16:45:00Z",
    active: true,
    content: `<p>Dear {{guest_name}},</p>
<p>Thank you for choosing to stay with us at {{hotel_name}}. We hope you enjoyed your time with us.</p>
<p>We would love to hear about your experience. Please take a moment to leave a review or provide feedback.</p>
<p>We look forward to welcoming you back in the future!</p>
<p>Best regards,<br>The {{hotel_name}} Team</p>`,
  },
  {
    id: "booking-canceled",
    name: "Booking Cancellation",
    subject: "Your Booking Has Been Canceled",
    category: "booking",
    lastEdited: "2023-07-12T09:30:00Z",
    active: true,
    content: `<p>Dear {{guest_name}},</p>
<p>Your booking (ID: {{booking_id}}) has been canceled as requested.</p>
<p>Cancellation details:</p>
<ul>
  <li>Cancellation Date: {{cancellation_date}}</li>
  <li>Refund Amount: {{refund_amount}}</li>
  <li>Refund Method: {{refund_method}}</li>
</ul>
<p>If you have any questions, please don't hesitate to contact us.</p>
<p>Best regards,<br>The {{hotel_name}} Team</p>`,
  },
  {
    id: "invoice",
    name: "Invoice",
    subject: "Your Invoice for Your Recent Stay",
    category: "billing",
    lastEdited: "2023-11-01T11:20:00Z",
    active: true,
    content: `<p>Dear {{guest_name}},</p>
<p>Please find attached your invoice for your recent stay at {{hotel_name}}.</p>
<p><strong>Invoice Details:</strong></p>
<ul>
  <li>Invoice Number: {{invoice_number}}</li>
  <li>Booking ID: {{booking_id}}</li>
  <li>Stay Period: {{check_in_date}} to {{check_out_date}}</li>
  <li>Total Amount: {{total_amount}}</li>
</ul>
<p>If you have any questions regarding this invoice, please contact our billing department.</p>
<p>Thank you for choosing {{hotel_name}}.</p>
<p>Best regards,<br>The {{hotel_name}} Team</p>`,
  },
]

// Available template variables
const templateVariables = [
  { name: "guest_name", description: "Guest's full name" },
  { name: "hotel_name", description: "Hotel name" },
  { name: "booking_id", description: "Unique booking identifier" },
  { name: "check_in_date", description: "Check-in date" },
  { name: "check_out_date", description: "Check-out date" },
  { name: "check_in_time", description: "Check-in time" },
  { name: "check_out_time", description: "Check-out time" },
  { name: "room_type", description: "Room type/category" },
  { name: "guest_count", description: "Number of guests" },
  { name: "total_amount", description: "Total booking amount" },
  { name: "hotel_address", description: "Hotel address" },
  { name: "hotel_phone", description: "Hotel phone number" },
  { name: "cancellation_date", description: "Date of cancellation" },
  { name: "refund_amount", description: "Amount refunded" },
  { name: "refund_method", description: "Method of refund" },
  { name: "invoice_number", description: "Invoice number" },
]

export default function EmailTemplatesPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState(emailTemplatesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState(null)

  // Editor state
  const [editorContent, setEditorContent] = useState("")
  const [editorSubject, setEditorSubject] = useState("")
  const [editorName, setEditorName] = useState("")
  const [editorCategory, setEditorCategory] = useState("")
  const [editorActive, setEditorActive] = useState(true)

  // Filter templates based on search term and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Handle opening the edit dialog
  const handleEdit = (template) => {
    setCurrentTemplate(template)
    setEditorName(template.name)
    setEditorSubject(template.subject)
    setEditorContent(template.content)
    setEditorCategory(template.category)
    setEditorActive(template.active)
    setEditDialogOpen(true)
  }

  // Handle opening the preview dialog
  const handlePreview = (template) => {
    setCurrentTemplate(template)
    setPreviewDialogOpen(true)
  }

  // Handle opening the delete dialog
  const handleDelete = (template) => {
    setCurrentTemplate(template)
    setDeleteDialogOpen(true)
  }

  // Handle creating a new template
  const handleCreate = () => {
    setCurrentTemplate(null)
    setEditorName("")
    setEditorSubject("")
    setEditorContent("")
    setEditorCategory("booking")
    setEditorActive(true)
    setEditDialogOpen(true)
  }

  // Handle duplicating a template
  const handleDuplicate = (template) => {
    const newTemplate = {
      ...template,
      id: `${template.id}-copy-${Date.now()}`,
      name: `${template.name} (Copy)`,
      lastEdited: new Date().toISOString(),
    }

    setTemplates([...templates, newTemplate])
    toast({
      title: "Template duplicated",
      description: `"${template.name}" has been duplicated.`,
    })
  }

  // Handle saving a template
  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (currentTemplate) {
        // Update existing template
        setTemplates(
          templates.map((t) =>
            t.id === currentTemplate.id
              ? {
                  ...t,
                  name: editorName,
                  subject: editorSubject,
                  content: editorContent,
                  category: editorCategory,
                  active: editorActive,
                  lastEdited: new Date().toISOString(),
                }
              : t,
          ),
        )

        toast({
          title: "Template updated",
          description: `"${editorName}" has been updated successfully.`,
        })
      } else {
        // Create new template
        const newTemplate = {
          id: `template-${Date.now()}`,
          name: editorName,
          subject: editorSubject,
          content: editorContent,
          category: editorCategory,
          active: editorActive,
          lastEdited: new Date().toISOString(),
        }

        setTemplates([...templates, newTemplate])

        toast({
          title: "Template created",
          description: `"${editorName}" has been created successfully.`,
        })
      }

      setIsLoading(false)
      setEditDialogOpen(false)
    }, 1000)
  }

  // Handle confirming deletion
  const handleConfirmDelete = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setTemplates(templates.filter((t) => t.id !== currentTemplate.id))

      toast({
        title: "Template deleted",
        description: `"${currentTemplate.name}" has been deleted.`,
      })

      setIsLoading(false)
      setDeleteDialogOpen(false)
    }, 1000)
  }

  // Insert a variable into the editor
  const insertVariable = (variable) => {
    setEditorContent(editorContent + `{{${variable}}}`)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/settings")} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-gray-800">Email Templates</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleCreate} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>New Template</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="category-filter" className="whitespace-nowrap">
                Filter by:
              </Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category-filter" className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="booking">Booking</SelectItem>
                  <SelectItem value="post-stay">Post-Stay</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <Card key={template.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                        {template.active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Subject: {template.subject}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">
                          Category: {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">Last edited: {formatDate(template.lastEdited)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => handlePreview(template)} title="Preview">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEdit(template)} title="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDuplicate(template)} title="Duplicate">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(template)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No templates found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Create Template Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{currentTemplate ? "Edit Email Template" : "Create Email Template"}</DialogTitle>
            <DialogDescription>
              {currentTemplate
                ? "Make changes to your email template here."
                : "Create a new email template for your hotel communications."}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    value={editorName}
                    onChange={(e) => setEditorName(e.target.value)}
                    placeholder="e.g., Booking Confirmation"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="template-subject">Email Subject</Label>
                  <Input
                    id="template-subject"
                    value={editorSubject}
                    onChange={(e) => setEditorSubject(e.target.value)}
                    placeholder="e.g., Your Booking Confirmation - [Booking ID]"
                    className="mt-1"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="template-content">Email Content</Label>
                    <div className="text-sm text-gray-500">Use HTML for formatting</div>
                  </div>
                  <Textarea
                    id="template-content"
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    placeholder="Enter your email content here..."
                    className="min-h-[300px] font-mono text-sm"
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Available Variables</Label>
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
                        {`{{${variable.name}}}`}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="template-category">Category</Label>
                  <Select value={editorCategory} onValueChange={setEditorCategory}>
                    <SelectTrigger id="template-category" className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking">Booking</SelectItem>
                      <SelectItem value="post-stay">Post-Stay</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="template-active" checked={editorActive} onCheckedChange={setEditorActive} />
                  <Label htmlFor="template-active">Active</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading || !editorName || !editorSubject || !editorContent}>
              {isLoading ? "Saving..." : "Save Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Template Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Preview: {currentTemplate?.name}</DialogTitle>
            <DialogDescription>Subject: {currentTemplate?.subject}</DialogDescription>
          </DialogHeader>

          <div className="border rounded-md p-4 bg-white">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentTemplate?.content }} />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setPreviewDialogOpen(false)
                handleEdit(currentTemplate)
              }}
            >
              Edit Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentTemplate?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

