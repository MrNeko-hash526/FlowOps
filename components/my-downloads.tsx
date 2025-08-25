"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface FileItem {
  id: number
  fileName: string
  size: string
  date: string
  selected: boolean
}

const mockFiles: FileItem[] = [
  {
    id: 1,
    fileName: "Care_Status_Update(06-27-2025 15:52:50.791)",
    size: "152.2K",
    date: "06-27-2025",
    selected: true,
  },
  {
    id: 2,
    fileName: "Care_Status_Update(06-27-2025 15:54:30.464)",
    size: "152.2K",
    date: "06-27-2025",
    selected: false,
  },
  {
    id: 3,
    fileName: "Care_Status_Update(06-27-2025 15:46:58.136)",
    size: "152.2K",
    date: "06-27-2025",
    selected: false,
  },
  {
    id: 4,
    fileName: "Care_Status_Update(06-27-2025 15:41:28.619)",
    size: "152.2K",
    date: "06-27-2025",
    selected: false,
  },
]

export function MyDownloads() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [viewType, setViewType] = useState("current")
  const [selectedCompany, setSelectedCompany] = useState("COMPANY")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const selectedFiles = files.filter((file) => file.selected)
  const totalSelectedSize = selectedFiles.length > 0 ? "152.20" : "0"

  const handleFileSelection = (fileId: number, checked: boolean) => {
    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, selected: checked } : file)))
  }

  const handleSelectAll = (checked: boolean) => {
    setFiles((prev) => prev.map((file) => ({ ...file, selected: checked })))
  }

  const filteredFiles = files.filter((file) => file.fileName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>🏠 Home</span>
            <span>/</span>
            <span>📁 Document Transfer</span>
            <span>/</span>
            <span className="text-blue-600">📥 My Downloads</span>
          </nav>
        </div>
      </div>

      {/* Controls */}
      <Card className="shadow-lg border-0 mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Please Select Files:</Label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COMPANY">COMPANY</SelectItem>
                  <SelectItem value="PERSONAL">PERSONAL</SelectItem>
                  <SelectItem value="SHARED">SHARED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <RadioGroup value={viewType} onValueChange={setViewType} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="current" />
                  <Label htmlFor="current" className="text-sm font-medium text-gray-700">
                    Current Files
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload" className="text-sm font-medium text-gray-700">
                    View Upload
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="text-right">
              <Label className="text-sm font-medium text-gray-700">Total selected size(KB):</Label>
              <div className="text-2xl font-bold text-gray-900">{totalSelectedSize}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">Show 10 entries</div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search:"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>

      {/* Data Table */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-900 hover:bg-blue-900">
                  <TableHead className="text-white font-semibold text-center w-20">
                    <Checkbox
                      checked={files.every((file) => file.selected)}
                      onCheckedChange={handleSelectAll}
                      className="border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-900"
                    />
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center">Download</TableHead>
                  <TableHead className="text-white font-semibold">File</TableHead>
                  <TableHead className="text-white font-semibold text-center">Size</TableHead>
                  <TableHead className="text-white font-semibold text-center">Date</TableHead>
                  <TableHead className="text-white font-semibold text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file) => (
                  <TableRow key={file.id} className="hover:bg-gray-50">
                    <TableCell className="text-center">
                      <Checkbox
                        checked={file.selected}
                        onCheckedChange={(checked) => handleFileSelection(file.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{file.fileName}</TableCell>
                    <TableCell className="text-center">{file.size}</TableCell>
                    <TableCell className="text-center">{file.date}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        📁
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination and Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="flex items-center gap-4">
              <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2">Share</Button>
            </div>
            <div className="text-sm text-gray-600">
              Showing 1 to 4 of 4 entries
              <div className="flex items-center gap-2 mt-2">
                <Button variant="outline" size="sm" disabled>
                  First
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Last
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
