"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Upload, File, Trash2 } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function LegalInformationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "Grand Hotel Holdings LLC",
    businessType: "Limited Liability Company",
    registrationNumber: "LLC-12345-67890",
    taxId: "12-3456789",
    vatNumber: "VAT123456789",
    incorporationDate: "2010-05-15",
    jurisdictionOfIncorporation: "Delaware, USA",
    businessLicenseNumber: "BL-987654321",
    businessLicenseExpiry: "2024-12-31",
    insuranceProvider: "Global Insurance Co.",
    insurancePolicyNumber: "POL-123456",
    insuranceCoverageAmount: "5000000",
    insuranceExpiryDate: "2024-06-30",
    termsAndConditions: "These are the standard terms and conditions for all guests staying at our property...",
    privacyPolicy: "We collect and process personal data in accordance with applicable data protection laws...",
  })

  const [documents, setDocuments] = useState([
    { id: 1, name: "Business License.pdf", size: "2.4 MB", uploadDate: "2023-01-15" },
    { id: 2, name: "Insurance Certificate.pdf", size: "1.8 MB", uploadDate: "2023-02-20" },
    { id: 3, name: "Tax Registration.pdf", size: "1.2 MB", uploadDate: "2023-01-10" },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
    toast({
      title: "Document deleted",
      description: "The document has been removed successfully.",
    })
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Success
    toast({
      title: "Settings updated",
      description: "Your legal information has been saved successfully.",
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
              <h1 className="text-2xl font-semibold text-gray-800">Legal Information</h1>
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
                <CardTitle>Business Registration</CardTitle>
                <CardDescription>Legal entity and registration details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Legal Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Input
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxId">Tax ID / EIN</Label>
                    <Input
                      id="taxId"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vatNumber">VAT Number (if applicable)</Label>
                    <Input
                      id="vatNumber"
                      name="vatNumber"
                      value={formData.vatNumber}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="incorporationDate">Date of Incorporation</Label>
                    <Input
                      id="incorporationDate"
                      name="incorporationDate"
                      type="date"
                      value={formData.incorporationDate}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="jurisdictionOfIncorporation">Jurisdiction of Incorporation</Label>
                    <Input
                      id="jurisdictionOfIncorporation"
                      name="jurisdictionOfIncorporation"
                      value={formData.jurisdictionOfIncorporation}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Licenses & Insurance</CardTitle>
                <CardDescription>Business licenses and insurance information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessLicenseNumber">Business License Number</Label>
                    <Input
                      id="businessLicenseNumber"
                      name="businessLicenseNumber"
                      value={formData.businessLicenseNumber}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessLicenseExpiry">Business License Expiry</Label>
                    <Input
                      id="businessLicenseExpiry"
                      name="businessLicenseExpiry"
                      type="date"
                      value={formData.businessLicenseExpiry}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <Input
                      id="insuranceProvider"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insurancePolicyNumber">Insurance Policy Number</Label>
                    <Input
                      id="insurancePolicyNumber"
                      name="insurancePolicyNumber"
                      value={formData.insurancePolicyNumber}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insuranceCoverageAmount">Insurance Coverage Amount ($)</Label>
                    <Input
                      id="insuranceCoverageAmount"
                      name="insuranceCoverageAmount"
                      value={formData.insuranceCoverageAmount}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insuranceExpiryDate">Insurance Expiry Date</Label>
                    <Input
                      id="insuranceExpiryDate"
                      name="insuranceExpiryDate"
                      type="date"
                      value={formData.insuranceExpiryDate}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Legal Documents</CardTitle>
                <CardDescription>Upload and manage important legal documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <h3 className="text-sm font-medium text-gray-900">Upload a document</h3>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX up to 10MB</p>
                      <Button variant="outline" className="mt-4">
                        Select File
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                      >
                        <div className="flex items-center">
                          <File className="h-5 w-5 text-blue-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-gray-500">
                              {doc.size} • Uploaded on {doc.uploadDate}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Legal Policies</CardTitle>
                <CardDescription>Terms, conditions, and privacy policies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="termsAndConditions">Terms and Conditions</Label>
                    <Textarea
                      id="termsAndConditions"
                      name="termsAndConditions"
                      value={formData.termsAndConditions}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="privacyPolicy">Privacy Policy</Label>
                    <Textarea
                      id="privacyPolicy"
                      name="privacyPolicy"
                      value={formData.privacyPolicy}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={6}
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

