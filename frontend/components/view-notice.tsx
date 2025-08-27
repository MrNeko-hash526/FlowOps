"use client"

import { useState } from "react"
import { Button } from "@/frontend/components/ui/button"
import { Input } from "@/frontend/components/ui/input"
import { Badge } from "@/frontend/components/ui/badge"
import { Card, CardContent } from "@/frontend/components/ui/card"
import { Search, Eye, Edit } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/frontend/components/ui/table"

interface Notice {
  id: number
  category: string
  subject: string
  assignee: string
  attachment: string
  statusDate: string
  status: "Approved" | "Pending" | "Rejected"
}

const mockNotices: Notice[] = [
  {
    id: 1,
    category: "media",
    subject: "check 22nd",
    assignee: "CONV, Firm",
    attachment: "",
    statusDate: "07-22-2025",
    status: "Approved",
  },
  {
    id: 2,
    category: "News",
    subject: "check 22nd",
    assignee: "CONV, Firm",
    attachment: "",
    statusDate: "07-22-2025",
    status: "Approved",
  },
  {
    id: 3,
    category: "News",
    subject: "sd s sd ds dsadads as",
    assignee: "CONV, Firm",
    attachment: "",
    statusDate: "07-22-2025",
    status: "Approved",
  },
  {
    id: 4,
    category: "media",
    subject: "subject !!!",
    assignee: "CONV, Firm",
    attachment: "",
    statusDate: "07-22-2025",
    status: "Approved",
  },
  {
    id: 5,
    category: "media",
    subject: "no subject",
    assignee: "Firm",
    attachment: "",
    statusDate: "07-21-2025",
    status: "Approved",
  },
]

export function ViewNotice() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredNotices = mockNotices.filter(
    (notice) =>
      notice.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentNotices = filteredNotices.slice(startIndex, endIndex)

  return (
    <div className="max-w-7xl mx-auto">
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
            <span className="text-blue-600">👁 View Notice</span>
          </nav>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2">Add Notice</Button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
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
      </div>

      {/* Data Table */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-900 hover:bg-blue-900">
                  <TableHead className="text-white font-semibold text-center w-16">#</TableHead>
                  <TableHead className="text-white font-semibold">Category</TableHead>
                  <TableHead className="text-white font-semibold">Subject</TableHead>
                  <TableHead className="text-white font-semibold">Assignee</TableHead>
                  <TableHead className="text-white font-semibold text-center">Attachment</TableHead>
                  <TableHead className="text-white font-semibold text-center">Status Date</TableHead>
                  <TableHead className="text-white font-semibold text-center">Status</TableHead>
                  <TableHead className="text-white font-semibold text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentNotices.map((notice, index) => (
                  <TableRow key={notice.id} className="hover:bg-gray-50">
                    <TableCell className="text-center font-medium">{startIndex + index + 1}</TableCell>
                    <TableCell className="font-medium">{notice.category}</TableCell>
                    <TableCell>{notice.subject}</TableCell>
                    <TableCell>{notice.assignee}</TableCell>
                    <TableCell className="text-center">{notice.attachment || "-"}</TableCell>
                    <TableCell className="text-center">{notice.statusDate}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={notice.status === "Approved" ? "default" : "secondary"}
                        className={
                          notice.status === "Approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : notice.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {notice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          👁
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          📁
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredNotices.length)} of {filteredNotices.length}{" "}
              entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant={currentPage === 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(1)}
                className={currentPage === 1 ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                1
              </Button>
              {totalPages > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
