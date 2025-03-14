"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Copy, Eye, RefreshCw, Key, ExternalLink, AlertTriangle, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for API keys
const initialApiKeys = [
  {
    id: 1,
    name: "Booking Engine Integration",
    key: "pk_live_51HG7d9KJ3RjS9HpZVVVVVVVVV",
    secret: "sk_live_51HG7d9KJ3RjS9HpZVVVVVVVVV",
    created: "2023-10-15T14:30:00",
    lastUsed: "2023-11-15T09:45:00",
    status: "active",
    permissions: ["read:bookings", "write:bookings", "read:rooms", "read:rates"],
    ipRestrictions: ["192.168.1.1", "192.168.1.2"],
  },
  {
    id: 2,
    name: "Mobile App Integration",
    key: "pk_live_51HG7d9KJ3RjS9HpZAAAAAAAAA",
    secret: "sk_live_51HG7d9KJ3RjS9HpZAAAAAAAAA",
    created: "2023-09-20T11:15:00",
    lastUsed: "2023-11-14T16:30:00",
    status: "active",
    permissions: ["read:bookings", "read:rooms", "read:customers", "read:rates"],
    ipRestrictions: [],
  },
  {
    id: 3,
    name: "Analytics Integration",
    key: "pk_live_51HG7d9KJ3RjS9HpZBBBBBBBBBB",
    secret: "sk_live_51HG7d9KJ3RjS9HpZBBBBBBBBBB",
    created: "2023-11-01T09:00:00",
    lastUsed: "2023-11-13T14:20:00",
    status: "active",
    permissions: ["read:bookings", "read:rooms", "read:rates", "read:revenue"],
    ipRestrictions: ["10.0.0.1"],
  },
  {
    id: 4,
    name: "Legacy System Integration",
    key: "pk_live_51HG7d9KJ3RjS9HpZCCCCCCCCCC",
    secret: "sk_live_51HG7d9KJ3RjS9HpZCCCCCCCCCC",
    created: "2023-08-15T10:45:00",
    lastUsed: "2023-10-30T11:10:00",
    status: "revoked",
    permissions: ["read:bookings", "write:bookings", "read:rooms", "write:rooms"],
    ipRestrictions: [],
    revokedReason: "Security concerns - replaced with new key",
  },
]

// Available permissions for API keys
const availablePermissions = [
  { id: "read:bookings", name: "Read Bookings", description: "View booking information" },
  { id: "write:bookings", name: "Write Bookings", description: "Create and modify bookings" },
  { id: "read:rooms", name: "Read Rooms", description: "View room information" },
  { id: "write:rooms", name: "Write Rooms", description: "Create and modify rooms" },
  { id: "read:customers", name: "Read Customers", description: "View customer information" },
  { id: "write:customers", name: "Write Customers", description: "Create and modify customer information" },
  { id: "read:rates", name: "Read Rates", description: "View rate information" },
  { id: "write:rates", name: "Write Rates", description: "Create and modify rates" },
  { id: "read:revenue", name: "Read Revenue", description: "View revenue information" },
  { id: "read:reports", name: "Read Reports", description: "View reports" },
]

export default function ApiAccessPage() {
  const router = useRouter()
  const [apiKeys, setApiKeys] = useState(initialApiKeys)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false)
  const [isViewSecretDialogOpen, setIsViewSecretDialogOpen] = useState(false)
  const [selectedApiKey, setSelectedApiKey] = useState<any>(null)
  const [newApiKey, setNewApiKey] = useState({
    name: "",
    permissions: [] as string[],
    ipRestrictions: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [newIpAddress, setNewIpAddress] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [copiedKey, setCopiedKey] = useState("")

  const filteredApiKeys = apiKeys.filter((key) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return key.status === "active"
    if (activeTab === "revoked") return key.status === "revoked"
    return true
  })

  const handleBack = () => {
    router.push("/settings")
  }

  const handleCreateApiKey = () => {
    setIsCreateDialogOpen(true)
  }

  const handleRevokeApiKey = (apiKey: any) => {
    setSelectedApiKey(apiKey)
    setIsRevokeDialogOpen(true)
  }

  const handleViewSecret = (apiKey: any) => {
    setSelectedApiKey(apiKey)
    setShowSecret(false)
    setIsViewSecretDialogOpen(true)
  }

  const handleSaveNewApiKey = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newId = Math.max(...apiKeys.map((k) => k.id)) + 1
      const newKey = `pk_live_51HG7d9KJ3RjS9HpZ${Math.random().toString(36).substring(2, 14).toUpperCase()}`
      const newSecret = `sk_live_51HG7d9KJ3RjS9HpZ${Math.random().toString(36).substring(2, 14).toUpperCase()}`

      const apiKeyToAdd = {
        ...newApiKey,
        id: newId,
        key: newKey,
        secret: newSecret,
        created: new Date().toISOString(),
        lastUsed: null,
        status: "active",
      }

      setApiKeys([apiKeyToAdd, ...apiKeys])
      setSelectedApiKey(apiKeyToAdd)

      setNewApiKey({
        name: "",
        permissions: [],
        ipRestrictions: [],
      })

      setIsLoading(false)
      setIsCreateDialogOpen(false)
      setIsViewSecretDialogOpen(true)
    }, 1500)
  }

  const handleRevokeConfirm = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setApiKeys(
        apiKeys.map((key) =>
          key.id === selectedApiKey.id
            ? {
                ...key,
                status: "revoked",
                revokedReason: "Manually revoked by administrator",
              }
            : key,
        ),
      )

      setIsLoading(false)
      setIsRevokeDialogOpen(false)
    }, 1000)
  }

  const handleTogglePermission = (permission: string) => {
    if (newApiKey.permissions.includes(permission)) {
      setNewApiKey({
        ...newApiKey,
        permissions: newApiKey.permissions.filter((p) => p !== permission),
      })
    } else {
      setNewApiKey({
        ...newApiKey,
        permissions: [...newApiKey.permissions, permission],
      })
    }
  }

  const handleAddIpRestriction = () => {
    if (newIpAddress && !newApiKey.ipRestrictions.includes(newIpAddress)) {
      setNewApiKey({
        ...newApiKey,
        ipRestrictions: [...newApiKey.ipRestrictions, newIpAddress],
      })
      setNewIpAddress("")
    }
  }

  const handleRemoveIpRestriction = (ip: string) => {
    setNewApiKey({
      ...newApiKey,
      ipRestrictions: newApiKey.ipRestrictions.filter((i) => i !== ip),
    })
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(type)
    setTimeout(() => setCopiedKey(""), 2000)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"

    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </Button>
          <h1 className="text-2xl font-bold">API Access</h1>
        </div>
        <Button onClick={handleCreateApiKey}>
          <Plus className="h-4 w-4 mr-2" />
          Create API Key
        </Button>
      </div>

      <div className="mb-6">
        <Alert>
          <AlertDescription className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            API keys provide full access to your account. Keep them secure and never share them in publicly accessible
            areas.
          </AlertDescription>
        </Alert>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="all">All Keys</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="revoked">Revoked</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {filteredApiKeys.map((apiKey) => (
          <Card key={apiKey.id} variant="elevated" className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <Key className="h-4 w-4 mr-2 text-gray-500" />
                    {apiKey.name}
                  </CardTitle>
                  <CardDescription className="mt-1">Created on {formatDate(apiKey.created)}</CardDescription>
                </div>
                <Badge
                  className={
                    apiKey.status === "active"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {apiKey.status === "active" ? "Active" : "Revoked"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-500 mb-1 block">API Key</Label>
                  <div className="flex items-center">
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm flex-grow font-mono">
                      {apiKey.key.substring(0, 8)}...{apiKey.key.substring(apiKey.key.length - 4)}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(apiKey.key, `key-${apiKey.id}`)}
                      className="ml-2 h-8 w-8"
                    >
                      {copiedKey === `key-${apiKey.id}` ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {apiKey.status === "active" && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Secret</span>
                    <Button variant="outline" size="sm" onClick={() => handleViewSecret(apiKey)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Secret
                    </Button>
                  </div>
                )}

                <div>
                  <Label className="text-sm text-gray-500 mb-1 block">Permissions</Label>
                  <div className="flex flex-wrap gap-1">
                    {apiKey.permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>

                {apiKey.ipRestrictions.length > 0 && (
                  <div>
                    <Label className="text-sm text-gray-500 mb-1 block">IP Restrictions</Label>
                    <div className="flex flex-wrap gap-1">
                      {apiKey.ipRestrictions.map((ip) => (
                        <Badge key={ip} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {ip}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Used:</span>
                  <span className="font-medium">{formatDate(apiKey.lastUsed)}</span>
                </div>

                {apiKey.status === "revoked" && apiKey.revokedReason && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Revoked: {typeof apiKey.revokedReason === "string" ? apiKey.revokedReason : "Unknown reason"}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            {apiKey.status === "active" && (
              <CardFooter className="flex justify-end border-t pt-4">
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRevokeApiKey(apiKey)}
                >
                  Revoke Key
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {filteredApiKeys.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <Key className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No API keys found</h3>
          <p className="text-gray-500">
            {activeTab === "all" ? "Create your first API key to get started." : `No ${activeTab} API keys found.`}
          </p>
        </div>
      )}

      {/* Create API Key Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New API Key</DialogTitle>
            <DialogDescription>Create a new API key to integrate with external services.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">API Key Name</Label>
              <Input
                id="name"
                placeholder="e.g., Booking Engine Integration"
                value={newApiKey.name}
                onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
              />
              <p className="text-sm text-gray-500">Give your API key a descriptive name to identify its purpose.</p>
            </div>

            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="border rounded-md p-4 space-y-4">
                <p className="text-sm text-gray-500">Select the permissions this API key will have:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id={`permission-${permission.id}`}
                        checked={newApiKey.permissions.includes(permission.id)}
                        onChange={() => handleTogglePermission(permission.id)}
                        className="mt-1 rounded border-gray-300"
                      />
                      <div>
                        <Label htmlFor={`permission-${permission.id}`} className="font-medium">
                          {permission.name}
                        </Label>
                        <p className="text-xs text-gray-500">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>IP Restrictions (Optional)</Label>
              <div className="border rounded-md p-4 space-y-4">
                <p className="text-sm text-gray-500">
                  Restrict API access to specific IP addresses for enhanced security.
                </p>

                <div className="flex space-x-2">
                  <Input
                    placeholder="e.g., 192.168.1.1"
                    value={newIpAddress}
                    onChange={(e) => setNewIpAddress(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleAddIpRestriction} disabled={!newIpAddress}>
                    Add
                  </Button>
                </div>

                {newApiKey.ipRestrictions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newApiKey.ipRestrictions.map((ip) => (
                      <Badge key={ip} variant="outline" className="flex items-center gap-1">
                        {ip}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveIpRestriction(ip)}
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-500">Leave empty to allow access from any IP address.</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveNewApiKey}
              disabled={!newApiKey.name || newApiKey.permissions.length === 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create API Key"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Secret Dialog */}
      <Dialog open={isViewSecretDialogOpen} onOpenChange={setIsViewSecretDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Key Secret</DialogTitle>
            <DialogDescription>
              This is the only time you'll be able to view the secret. Make sure to copy it now.
            </DialogDescription>
          </DialogHeader>

          {selectedApiKey && (
            <div className="space-y-4 py-4">
              <Alert variant="destructive">
                <AlertDescription>
                  Keep this secret secure. Do not share it or store it in publicly accessible areas.
                </AlertDescription>
              </Alert>

              <div>
                <Label className="text-sm text-gray-500 mb-1 block">API Key</Label>
                <div className="flex items-center">
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm flex-grow font-mono overflow-x-auto">
                    {selectedApiKey?.key ? selectedApiKey.key.toString() : ""}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(selectedApiKey.key, "dialog-key")}
                    className="ml-2 h-8 w-8"
                  >
                    {copiedKey === "dialog-key" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-500 mb-1 block">API Secret</Label>
                <div className="flex items-center">
                  <div className="bg-gray-100 px-3 py-1 rounded text-sm flex-grow font-mono relative">
                    {showSecret ? (
                      <code className="overflow-x-auto block">
                        {selectedApiKey?.secret ? selectedApiKey.secret.toString() : ""}
                      </code>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span>••••••••••••••••••••••••••••••</span>
                        <Button variant="ghost" size="sm" onClick={() => setShowSecret(true)} className="h-6">
                          <Eye className="h-3 w-3 mr-1" />
                          Show
                        </Button>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(selectedApiKey.secret, "dialog-secret")}
                    className="ml-2 h-8 w-8"
                  >
                    {copiedKey === "dialog-secret" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-2">Next Steps</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 shrink-0" />
                    <span>Store your API key and secret securely.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 shrink-0" />
                    <span>Use these credentials to authenticate your API requests.</span>
                  </li>
                  <li className="flex items-start">
                    <ExternalLink className="h-4 w-4 text-blue-500 mt-0.5 mr-2 shrink-0" />
                    <a href="#" className="text-blue-500 hover:underline">
                      View API documentation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsViewSecretDialogOpen(false)}>I've Saved My Secret</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke API Key Dialog */}
      <Dialog open={isRevokeDialogOpen} onOpenChange={setIsRevokeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke API Key</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke the "{selectedApiKey?.name ? selectedApiKey.name.toString() : ""}" API
              key? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Alert variant="destructive">
              <AlertDescription>
                Revoking this API key will immediately invalidate it. Any services using this key will no longer be able
                to access your API.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRevokeDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRevokeConfirm} disabled={isLoading}>
              {isLoading ? "Revoking..." : "Revoke Key"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

