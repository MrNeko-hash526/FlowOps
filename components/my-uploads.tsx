"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

export function MyUploads() {
  const [formData, setFormData] = useState({
    subject: "",
    type: "",
    description: "",
    selectedFile: null as File | null,
  })

  const [totalSize, setTotalSize] = useState(0)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData({ ...formData, selectedFile: file })
      setTotalSize(Math.round(file.size / 1024)) // Convert to KB
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>🏠 Home</span>
            <span>/</span>
            <span>📁 Document Transfer</span>
            <span>/</span>
            <span className="text-blue-600">📤 My Uploads</span>
          </nav>
          <h1 className="text-2xl font-bold text-blue-600">My Uploads</h1>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2">View my uploads</Button>
      </div>

      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <form className="space-y-6">
            {/* Subject and Type */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject: <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="confidential">Confidential</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                  Type: <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="spreadsheet">Spreadsheet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="upload" className="text-sm font-medium text-gray-700">
                  Upload <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="upload"
                  placeholder="Description (Required if other selected)"
                  className="h-10"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Add</Label>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-10 p-0 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Size Display */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Size in (KB):</Label>
                <div className="text-sm text-gray-600">{totalSize > 0 ? `${totalSize} KB` : ""}</div>
              </div>
              <div className="md:col-span-3"></div>
            </div>

            {/* File Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <strong>File Upload (Not to exceed 30 MB):</strong>
                </div>
                <div className="flex items-center justify-center">
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
                  <span className="ml-3 text-sm text-gray-500">
                    {formData.selectedFile ? formData.selectedFile.name : "No file chosen"}
                  </span>
                </div>
                <Button type="button" className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-2">
                  Upload
                </Button>
              </div>
            </div>

            {/* Total Size Display */}
            <div className="flex justify-end">
              <div className="text-right">
                <Label className="text-sm font-medium text-gray-700">Total Size in KB:</Label>
                <div className="text-lg font-semibold text-gray-900">{totalSize}</div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
