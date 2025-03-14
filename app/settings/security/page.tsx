"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Shield, Key, UserCheck, History, AlertTriangle } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function SecuritySettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [passwordSettings, setPasswordSettings] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expiryDays: 90,
    preventReuse: true,
    previousPasswordsCount: 5,
  })

  const [twoFactorSettings, setTwoFactorSettings] = useState({
    enabled: false,
    requiredForAdmins: true,
    requiredForAllStaff: false,
    preferredMethod: "app",
  })

  const [sessionSettings, setSessionSettings] = useState({
    sessionTimeout: 30,
    maxConcurrentSessions: 2,
    enforceIpRestriction: false,
    allowedIpRanges: "",
  })

  const [auditSettings, setAuditSettings] = useState({
    enableAuditLogging: true,
    logFailedLogins: true,
    logSuccessfulLogins: true,
    logSystemChanges: true,
    retentionPeriodDays: 90,
  })

  const handlePasswordChange = (e) => {
    const { name, value, type, checked } = e.target
    setPasswordSettings({
      ...passwordSettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleTwoFactorChange = (name, value) => {
    setTwoFactorSettings({
      ...twoFactorSettings,
      [name]: value,
    })
  }

  const handleSessionChange = (e) => {
    const { name, value, type, checked } = e.target
    setSessionSettings({
      ...sessionSettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleAuditChange = (e) => {
    const { name, value, type, checked } = e.target
    setAuditSettings({
      ...auditSettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Settings saved",
      description: "Your security settings have been updated successfully.",
    })

    setIsLoading(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.push("/settings")} className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">Security Settings</h1>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Password Policy */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Key className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Password Policy</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="minLength">Minimum Password Length</Label>
                  <Input
                    id="minLength"
                    name="minLength"
                    type="number"
                    value={passwordSettings.minLength}
                    onChange={handlePasswordChange}
                    min={6}
                    max={24}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="expiryDays">Password Expiry (Days)</Label>
                  <Input
                    id="expiryDays"
                    name="expiryDays"
                    type="number"
                    value={passwordSettings.expiryDays}
                    onChange={handlePasswordChange}
                    min={0}
                    max={365}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Set to 0 for no expiry</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="requireUppercase"
                    name="requireUppercase"
                    checked={passwordSettings.requireUppercase}
                    onCheckedChange={(checked) =>
                      setPasswordSettings({ ...passwordSettings, requireUppercase: checked })
                    }
                  />
                  <Label htmlFor="requireUppercase">Require Uppercase Letters</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="requireLowercase"
                    name="requireLowercase"
                    checked={passwordSettings.requireLowercase}
                    onCheckedChange={(checked) =>
                      setPasswordSettings({ ...passwordSettings, requireLowercase: checked })
                    }
                  />
                  <Label htmlFor="requireLowercase">Require Lowercase Letters</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="requireNumbers"
                    name="requireNumbers"
                    checked={passwordSettings.requireNumbers}
                    onCheckedChange={(checked) => setPasswordSettings({ ...passwordSettings, requireNumbers: checked })}
                  />
                  <Label htmlFor="requireNumbers">Require Numbers</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="requireSpecialChars"
                    name="requireSpecialChars"
                    checked={passwordSettings.requireSpecialChars}
                    onCheckedChange={(checked) =>
                      setPasswordSettings({ ...passwordSettings, requireSpecialChars: checked })
                    }
                  />
                  <Label htmlFor="requireSpecialChars">Require Special Characters</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="preventReuse"
                    name="preventReuse"
                    checked={passwordSettings.preventReuse}
                    onCheckedChange={(checked) => setPasswordSettings({ ...passwordSettings, preventReuse: checked })}
                  />
                  <Label htmlFor="preventReuse">Prevent Password Reuse</Label>
                </div>

                {passwordSettings.preventReuse && (
                  <div>
                    <Label htmlFor="previousPasswordsCount">Number of Previous Passwords to Remember</Label>
                    <Input
                      id="previousPasswordsCount"
                      name="previousPasswordsCount"
                      type="number"
                      value={passwordSettings.previousPasswordsCount}
                      onChange={handlePasswordChange}
                      min={1}
                      max={20}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </Card>

            {/* Two-Factor Authentication */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Two-Factor Authentication</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enabled"
                    checked={twoFactorSettings.enabled}
                    onCheckedChange={(checked) => handleTwoFactorChange("enabled", checked)}
                  />
                  <Label htmlFor="enabled">Enable Two-Factor Authentication</Label>
                </div>

                {twoFactorSettings.enabled && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="requiredForAdmins"
                        checked={twoFactorSettings.requiredForAdmins}
                        onCheckedChange={(checked) => handleTwoFactorChange("requiredForAdmins", checked)}
                      />
                      <Label htmlFor="requiredForAdmins">Required for Administrators</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="requiredForAllStaff"
                        checked={twoFactorSettings.requiredForAllStaff}
                        onCheckedChange={(checked) => handleTwoFactorChange("requiredForAllStaff", checked)}
                      />
                      <Label htmlFor="requiredForAllStaff">Required for All Staff</Label>
                    </div>

                    <div>
                      <Label htmlFor="preferredMethod">Preferred Authentication Method</Label>
                      <Select
                        value={twoFactorSettings.preferredMethod}
                        onValueChange={(value) => handleTwoFactorChange("preferredMethod", value)}
                      >
                        <SelectTrigger id="preferredMethod" className="mt-1">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="app">Authenticator App</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Session Security */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Session Security</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (Minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    value={sessionSettings.sessionTimeout}
                    onChange={handleSessionChange}
                    min={5}
                    max={240}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="maxConcurrentSessions">Maximum Concurrent Sessions</Label>
                  <Input
                    id="maxConcurrentSessions"
                    name="maxConcurrentSessions"
                    type="number"
                    value={sessionSettings.maxConcurrentSessions}
                    onChange={handleSessionChange}
                    min={1}
                    max={10}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enforceIpRestriction"
                    name="enforceIpRestriction"
                    checked={sessionSettings.enforceIpRestriction}
                    onCheckedChange={(checked) =>
                      setSessionSettings({ ...sessionSettings, enforceIpRestriction: checked })
                    }
                  />
                  <Label htmlFor="enforceIpRestriction">Enforce IP Restrictions</Label>
                </div>

                {sessionSettings.enforceIpRestriction && (
                  <div className="md:col-span-2">
                    <Label htmlFor="allowedIpRanges">Allowed IP Ranges</Label>
                    <Input
                      id="allowedIpRanges"
                      name="allowedIpRanges"
                      value={sessionSettings.allowedIpRanges}
                      onChange={handleSessionChange}
                      className="mt-1"
                      placeholder="e.g., 192.168.1.0/24, 10.0.0.0/8"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter IP ranges in CIDR notation, separated by commas</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Audit Logging */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <History className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Audit Logging</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableAuditLogging"
                    name="enableAuditLogging"
                    checked={auditSettings.enableAuditLogging}
                    onCheckedChange={(checked) => setAuditSettings({ ...auditSettings, enableAuditLogging: checked })}
                  />
                  <Label htmlFor="enableAuditLogging">Enable Audit Logging</Label>
                </div>

                {auditSettings.enableAuditLogging && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="logFailedLogins"
                        name="logFailedLogins"
                        checked={auditSettings.logFailedLogins}
                        onCheckedChange={(checked) => setAuditSettings({ ...auditSettings, logFailedLogins: checked })}
                      />
                      <Label htmlFor="logFailedLogins">Log Failed Login Attempts</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="logSuccessfulLogins"
                        name="logSuccessfulLogins"
                        checked={auditSettings.logSuccessfulLogins}
                        onCheckedChange={(checked) =>
                          setAuditSettings({ ...auditSettings, logSuccessfulLogins: checked })
                        }
                      />
                      <Label htmlFor="logSuccessfulLogins">Log Successful Logins</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="logSystemChanges"
                        name="logSystemChanges"
                        checked={auditSettings.logSystemChanges}
                        onCheckedChange={(checked) => setAuditSettings({ ...auditSettings, logSystemChanges: checked })}
                      />
                      <Label htmlFor="logSystemChanges">Log System Changes</Label>
                    </div>

                    <div>
                      <Label htmlFor="retentionPeriodDays">Log Retention Period (Days)</Label>
                      <Input
                        id="retentionPeriodDays"
                        name="retentionPeriodDays"
                        type="number"
                        value={auditSettings.retentionPeriodDays}
                        onChange={handleAuditChange}
                        min={30}
                        max={365}
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Security Alerts */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Security Alerts</h2>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Security Recommendations</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Enable two-factor authentication for all administrator accounts</li>
                        <li>Increase minimum password length to at least 12 characters</li>
                        <li>Review and update allowed IP ranges regularly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch id="alertFailedLogins" defaultChecked />
                  <Label htmlFor="alertFailedLogins">Alert on Multiple Failed Logins</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="alertUnusualActivity" defaultChecked />
                  <Label htmlFor="alertUnusualActivity">Alert on Unusual Activity</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="alertPasswordChanges" defaultChecked />
                  <Label htmlFor="alertPasswordChanges">Alert on Admin Password Changes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="alertNewDevices" defaultChecked />
                  <Label htmlFor="alertNewDevices">Alert on New Device Logins</Label>
                </div>
              </div>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => router.push("/settings")}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

