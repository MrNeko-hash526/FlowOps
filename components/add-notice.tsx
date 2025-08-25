"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function AddNotice() {
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    description: "",
    url: "",
    selectedFile: null as File | null,
    assignees: {
      conv: false,
      firm: false,
    },
    roles: {
      manager: false,
      admin: false,
    },
    sendEmail: {
      manager: false,
      admin: false,
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData({ ...formData, selectedFile: file })
    }
  }

  const handleReset = () => {
    setFormData({
      category: "",
      subject: "",
      description: "",
      url: "",
      selectedFile: null,
      assignees: { conv: false, firm: false },
      roles: { manager: false, admin: false },
      sendEmail: { manager: false, admin: false },
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>🏠 Home</span>
            <span>/</span>
            <span>👤 Administration</span>
            <span>/</span>
            <span>📋 Manage Notice</span>
            <span>/</span>
            <span className="text-blue-600">➕ Add Notice</span>
          </nav>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2">View Notice</Button>
      </div>

      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <form className="space-y-6">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Add category: <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="h-10 max-w-md">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="policy">Policy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                Subject: <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                placeholder="Add Subject"
                className="h-10 max-w-md"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            {/* Notice Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Notice Description: <span className="text-red-500">*</span>
              </Label>
              {/* Rich Text Editor Toolbar */}
              <div className="border border-gray-300 rounded-t-md">
                <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    📄
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    ❌
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    📋
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    📄
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    📄
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    ↶
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    ↷
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    🔍
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    🔍
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    🔍
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button type="button" variant="ghost" size="sm" className="h-8 px-2 font-bold">
                    B
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 px-2 italic">
                    I
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 px-2 underline">
                    U
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 px-2 line-through">
                    S
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    ❌
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    ❌
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    🔤
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    🎨
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    ≡
                  </Button>
                </div>
                <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-50">
                  <Select defaultValue="styles">
                    <SelectTrigger className="h-8 w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="styles">Styles</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="format">
                    <SelectTrigger className="h-8 w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="format">Format</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="font">
                    <SelectTrigger className="h-8 w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="font">Font</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="size">
                    <SelectTrigger className="h-8 w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="size">Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Textarea
                id="description"
                placeholder="Enter notice description..."
                rows={12}
                className="resize-none rounded-t-none border-t-0"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* URL Link */}
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium text-gray-700">
                Add URL (Link):
              </Label>
              <Input
                id="url"
                placeholder="Add URL (Link)"
                className="h-10 max-w-md"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>

            {/* Upload File */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Upload File:</Label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <Button type="button" variant="outline" className="bg-gray-100 hover:bg-gray-200" asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
                <span className="text-sm text-gray-500">
                  {formData.selectedFile ? formData.selectedFile.name : "No file chosen"}
                </span>
              </div>
            </div>

            {/* Assignee Section */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Assignee: <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="conv"
                      checked={formData.assignees.conv}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          assignees: { ...formData.assignees, conv: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="conv" className="text-sm font-medium text-gray-700">
                      CONV
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="firm"
                      checked={formData.assignees.firm}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          assignees: { ...formData.assignees, firm: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="firm" className="text-sm font-medium text-gray-700">
                      Firm
                    </Label>
                  </div>
                </div>
              </div>

              {/* Role Section */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Role: <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="manager"
                      checked={formData.roles.manager}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          roles: { ...formData.roles, manager: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="manager" className="text-sm font-medium text-gray-700">
                      Manager
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="admin"
                      checked={formData.roles.admin}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          roles: { ...formData.roles, admin: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="admin" className="text-sm font-medium text-gray-700">
                      Admin
                    </Label>
                  </div>
                </div>
              </div>

              {/* Send Email Section */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Send Email:</Label>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="emailManager"
                      checked={formData.sendEmail.manager}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          sendEmail: { ...formData.sendEmail, manager: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="emailManager" className="text-sm font-medium text-gray-700">
                      Manager
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="emailAdmin"
                      checked={formData.sendEmail.admin}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          sendEmail: { ...formData.sendEmail, admin: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="emailAdmin" className="text-sm font-medium text-gray-700">
                      Admin
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-6">
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-2">
                Submit
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-2 bg-transparent"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
