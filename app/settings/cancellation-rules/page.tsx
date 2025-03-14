"use client"
\
" 

```tsx file="app/settings/cancellation-rules/page.tsx"
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function CancellationRulesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Cancellation policies
  const [policies, setPolicies] = useState([
    {
      id: 1,
      name: "Flexible",
      description: "Free cancellation up to 24 hours before check-in",
      timeFrame: 24,
      refundPercentage: 100,
      isDefault: true,
      isActive: true,
    },
    {
      id: 2,
      name: "Moderate",
      description: "Free cancellation up to 5 days before check-in, 50% refund afterwards",
      timeFrame: 120,
      refundPercentage: 50,
      isDefault: false,
      isActive: true,
    },
    {
      id: 3,
      name: "Strict",
      description: "Free cancellation up to 7 days before check-in, no refund afterwards",
      timeFrame: 168,
      refundPercentage: 0,
      isDefault: false,
      isActive: true,
    },
    {
      id: 4,
      name: "Non-Refundable",
      description: "No refunds under any circumstances",
      timeFrame: 0,
      refundPercentage: 0,
      isDefault: false,
      isActive: true,
    },
  ])

  // New policy form
  const [newPolicy, setNewPolicy] = useState({
    name: "",
    description: "",
    timeFrame: "",
    refundPercentage: "",
    isDefault: false,
    isActive: true,
  })

  // General settings
  const [settings, setSettings] = useState({
    allowCancellations: true,
    noShowFeePercentage: 100,
    earlyDepartureFeePercentage: 50,
    automaticRefunds: true,
    refundProcessingTime: 3,
    sendCancellationEmails: true,
  })

  const handlePolicyChange = (id, field, value) => {
    setPolicies(
      policies.map((policy) => {
        if (policy.id === id) {
          return { ...policy, [field]: value }
        }

        // If setting a new default, unset the old default
        if (field === "isDefault" && value === true) {
          return { ...policy, isDefault: policy.id === id }
        }

        return policy
      }),
    )
  }

  const handleNewPolicyChange = (field, value) => {
    setNewPolicy({
      ...newPolicy,
      [field]: value,
    })
  }

  const handleSettingsChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value,
    })
  }

  const handleAddPolicy = () => {
    if (!newPolicy.name || !newPolicy.description || !newPolicy.timeFrame) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...policies.map((p) => p.id)) + 1

    // If setting as default, update other policies
    if (newPolicy.isDefault) {
      setPolicies(policies.map((policy) => ({ ...policy, isDefault: false })))
    }

    setPolicies([
      ...policies,
      {
        ...newPolicy,
        id: newId,
        timeFrame: Number.parseInt(newPolicy.timeFrame),
        refundPercentage: Number.parseInt(newPolicy.refundPercentage),
      },
    ])

    setNewPolicy({
      name: "",
      description: "",
      timeFrame: "",
      refundPercentage: "",
      isDefault: false,
      isActive: true,
    })

    toast({
      title: "Policy added",
      description: "The new cancellation policy has been added successfully.",
    })
  }

  const handleDeletePolicy = (id) => {
    // Don't allow deleting the default policy
    const policyToDelete = policies.find((p) => p.id === id)
    if (policyToDelete.isDefault) {
      toast({
        title: "Cannot delete default policy",
        description: "Please set another policy as default before deleting this one.",
        variant: "destructive",
      })
      return
    }

    setPolicies(policies.filter((policy) => policy.id !== id))

    toast({
      title: "Policy deleted",
      description: "The cancellation policy has been deleted successfully.",
    })
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Success
    toast({
      title: "Settings updated",
      description: "Your cancellation rules have been saved successfully.",
    })

    setIsLoading(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => router.push("/settings")} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-gray-800">Cancellation Rules</h1>
            </div>
            <Button onClick={handleSaveSettings} disabled={isLoading} className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Cancellation Policies</CardTitle>
                <CardDescription>Define different cancellation policies for your property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {policies.map((policy) => (
                    <div
                      key={policy.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-md"
                    >
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <h3 className="font-medium">{policy.name}</h3>
                          {policy.isDefault && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Default
                            </span>
                          )}
                          {!policy.isActive && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{policy.description}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                          <span>Time frame: {policy.timeFrame} hours</span>
                          <span>Refund: {policy.refundPercentage}%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`active-${policy.id}`}
                            checked={policy.isActive}
                            onCheckedChange={(checked) => handlePolicyChange(policy.id, "isActive", checked)}
                          />
                          <Label htmlFor={`active-${policy.id}`} className="text-sm">
                            Active
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`default-${policy.id}`}
                            checked={policy.isDefault}
                            onCheckedChange={(checked) => handlePolicyChange(policy.id, "isDefault", checked)}
                            disabled={policy.isDefault}
                          />
                          <Label htmlFor={`default-${policy.id}`} className="text-sm">
                            Default
                          </Label>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePolicy(policy.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          disabled={policy.isDefault}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium mb-4">Add New Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="name">Policy Name</Label>
                        <Input
                          id="name"
                          value={newPolicy.name}
                          onChange={(e) => handleNewPolicyChange("name", e.target.value)}
                          className="mt-1"
                          placeholder="e.g., Super Flexible"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newPolicy.description}
                          onChange={(e) => handleNewPolicyChange("description", e.target.value)}
                          className="mt-1"
                          placeholder="Describe the cancellation policy"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="timeFrame">Time Frame (hours)</Label>
                        <Input
                          id="timeFrame"
                          type="number"
                          value={newPolicy.timeFrame}
                          onChange={(e) => handleNewPolicyChange("timeFrame", e.target.value)}
                          className="mt-1"
                          placeholder="e.g., 48"
                        />
                        <p className="text-xs text-gray-500 mt-1">Hours before check-in for free cancellation</p>
                      </div>
                      <div>
                        <Label htmlFor="refundPercentage">Refund Percentage</Label>
                        <Input
                          id="refundPercentage"
                          type="number"
                          value={newPolicy.refundPercentage}
                          onChange={(e) => handleNewPolicyChange("refundPercentage", e.target.value)}
                          className="mt-1"
                          placeholder="e.g., 50"
                          min="0"
                          max="100"
                        />
                        <p className="text-xs text-gray-500 mt-1">Percentage refunded after the time frame</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isDefault"
                          checked={newPolicy.isDefault}
                          onCheckedChange={(checked) => handleNewPolicyChange("isDefault", checked)}
                        />
                        <Label htmlFor="isDefault">Set as default policy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isActive"
                          checked={newPolicy.isActive}
                          onCheckedChange={(checked) => handleNewPolicyChange("isActive", checked)}
                        />
                        <Label htmlFor="isActive">Active</Label>
                      </div>
                      <div className="col-span-2">
                        <Button onClick={handleAddPolicy} className="flex items-center">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Policy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>General Cancellation Settings</CardTitle>
                <CardDescription>Configure global cancellation and refund settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allowCancellations"
                      checked={settings.allowCancellations}
                      onCheckedChange={(checked) => handleSettingsChange("allowCancellations", checked)}
                    />
                    <Label htmlFor="allowCancellations">Allow Cancellations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="automaticRefunds"
                      checked={settings.automaticRefunds}
                      onCheckedChange={(checked) => handleSettingsChange("automaticRefunds", checked)}
                    />
                    <Label htmlFor="automaticRefunds">Process Refunds Automatically</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendCancellationEmails"
                      checked={settings.sendCancellationEmails}
                      onCheckedChange={(checked) => handleSettingsChange("sendCancellationEmails", checked)}
                    />
                    <Label htmlFor="sendCancellationEmails">Send Cancellation Emails</Label>
                  </div>
                  <div>
                    <Label htmlFor="refundProcessingTime">Refund Processing Time (days)</Label>
                    <Input
                      id="refundProcessingTime"
                      type="number"
                      value={settings.refundProcessingTime}
                      onChange={(e) => handleSettingsChange("refundProcessingTime", Number.parseInt(e.target.value))}
                      className="mt-1"
                      min="1"
                      max="30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="noShowFeePercentage">No-Show Fee (% of total)</Label>
                    <Input
                      id="noShowFeePercentage"
                      type="number"
                      value={settings.noShowFeePercentage}
                      onChange={(e) => handleSettingsChange("noShowFeePercentage", Number.parseInt(e.target.value))}
                      className="mt-1"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="earlyDepartureFeePercentage">Early Departure Fee (% of remaining stay)</Label>
                    <Input
                      id="earlyDepartureFeePercentage"
                      type="number"
                      value={settings.earlyDepartureFeePercentage}
                      onChange={(e) =>
                        handleSettingsChange("earlyDepartureFeePercentage", Number.parseInt(e.target.value))
                      }
                      className="mt-1"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

