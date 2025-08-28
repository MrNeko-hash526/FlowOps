"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Eye, Edit, Search, ArrowRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ContactRegistration } from "./contact-registration"

interface Contact {
  id: number
  name: string
  type: string
  code: string
  emailId: string
  contactStatus: "Active" | "Inactive"
  pipewayStatus: "Active" | "Inactive"
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Puja Kumari",
    type: "CONV",
    code: "",
    emailId: "puja.kumari@goclean.tech",
    contactStatus: "Inactive",
    pipewayStatus: "Inactive",
  },
  {
    id: 2,
    name: "Nilesh Karanjkar karanjkar",
    type: "Firm",
    code: "ABHI",
    emailId: "karanjkar.nsk@gmail.com",
    contactStatus: "Inactive",
    pipewayStatus: "Inactive",
  },
  {
    id: 3,
    name: "Nilesh Karanjkar",
    type: "Firm",
    code: "0",
    emailId: "karanjkar.nk@gmail.com",
    contactStatus: "Active",
    pipewayStatus: "Inactive",
  },
  {
    id: 4,
    name: "Stephen howkins",
    type: "Firm",
    code: "0",
    emailId: "Ananddev.singh@goclean.tech",
    contactStatus: "Active",
    pipewayStatus: "Inactive",
  },
  {
    id: 5,
    name: "Jorden stephen",
    type: "Firm",
    code: "ABHI",
    emailId: "Ananddev.singh@goclean.tech",
    contactStatus: "Active",
    pipewayStatus: "Inactive",
  },
  {
    id: 6,
    name: "David methew",
    type: "CONV",
    code: "CONV",
    emailId: "Ananddev.singh@goclean.tech",
    contactStatus: "Active",
    pipewayStatus: "Inactive",
  },
  {
    id: 7,
    name: "Nitin kumar",
    type: "Firm",
    code: "NITIN",
    emailId: "nitin.kumar@goclean.tech",
    contactStatus: "Active",
    pipewayStatus: "Inactive",
  },
]

export function ContactManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const router = useRouter()
  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.emailId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage


  const currentContacts = filteredContacts.slice(startIndex, endIndex)


  const [sortColumn, setSortColumn] = useState<keyof Contact | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")


  const filteredUsers = mockContacts.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.emailId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }
    return 0
  })

  const currentUsers = sortedUsers.slice(startIndex, endIndex)
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)


  // Sorting handler
  const handleSort = (column: keyof Contact) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }



  const [showAddUser, setShowAddUser] = useState(false)
  // ...existing state and logic...

  if (showAddUser) {
    return <ContactRegistration />
  }
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <span>🏠 Home</span>
            <span>/</span>
            <span>👤 Administration</span>
            <span>/</span>
            <span>📋 Manage contact</span>
            <span>/</span>
            <span className="text-blue-600">👁 View Contact</span>
          </nav>
        </div>
        {/* <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2">Contact Register</Button> */}
        <Button
          className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2"
          // onClick={() => router.push("/contact-registration")}
          onClick={() => setShowAddUser(true)}
        >
          Contact Register <ArrowRight/>
        </Button>

      </div>

      {/* Search and Controls */}
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
              {/* <TableHeader>
                <TableRow className="bg-blue-900 hover:bg-blue-900">
                  <TableHead className="text-white font-semibold text-center w-16">#</TableHead>
                  <TableHead className="text-white font-semibold">Name</TableHead>
                  <TableHead className="text-white font-semibold text-center">Type</TableHead>
                  <TableHead className="text-white font-semibold text-center">Code</TableHead>
                  <TableHead className="text-white font-semibold">Email Id</TableHead>
                  <TableHead className="text-white font-semibold text-center">contact Status</TableHead>
                  <TableHead className="text-white font-semibold text-center">Pipeway Status</TableHead>
                  <TableHead className="text-white font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader> */}

              <TableHeader>
                <TableRow className="bg-blue-900 hover:bg-blue-900">
                  <TableHead className="text-white font-semibold text-center w-16">#</TableHead>
                  <TableHead
                    className="text-white font-semibold cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Type {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Code {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold cursor-pointer"
                    onClick={() => handleSort("emailId")}
                  >
                    Email Id {sortColumn === "emailId" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>

                  <TableHead
                    className="text-white font-semibold text-center cursor-pointer"
                    onClick={() => handleSort("type")}
                  >
                    User Type {sortColumn === "type" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>

                  <TableHead
                    className="text-white font-semibold text-center cursor-pointer"
                    onClick={() => handleSort("code")}
                  >
                    Code {sortColumn === "code" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold text-center cursor-pointer"
                    onClick={() => handleSort("contactStatus")}
                  >
                    contact Status {sortColumn === "contactStatus" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold text-center cursor-pointer"
                    onClick={() => handleSort("pipewayStatus")}
                  >
                    Pipeway Status{sortColumn === "pipewayStatus" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold text-center cursor-pointer"
                  // onClick={() => handleSort("userStatus")}
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>


              {/* <TableBody>
                {currentContacts.map((contact, index) => (
                  <TableRow key={contact.id} className="hover:bg-gray-50">
                    <TableCell className="text-center font-medium">{startIndex + index + 1}</TableCell>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell className="text-center">{contact.type}</TableCell>
                    <TableCell className="text-center">{contact.code}</TableCell>
                    <TableCell>{contact.emailId}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={contact.contactStatus === "Active" ? "default" : "secondary"}
                        className={
                          contact.contactStatus === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {contact.contactStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={contact.pipewayStatus === "Active" ? "default" : "secondary"}
                        className={
                          contact.pipewayStatus === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {contact.pipewayStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
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
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> */}

              {/* Table Body */}
              <TableBody>
                {currentUsers.map((contact, index) => (
                  <TableRow key={contact.id} className="hover:bg-gray-50">
                    <TableCell className="text-center font-medium">{startIndex + index + 1}</TableCell>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell className="text-center">{contact.type}</TableCell>
                    <TableCell className="text-center">{contact.code}</TableCell>
                    <TableCell>{contact.emailId}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={contact.contactStatus === "Active" ? "default" : "secondary"}
                        className={
                          contact.contactStatus === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {contact.contactStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={contact.pipewayStatus === "Active" ? "default" : "secondary"}
                        className={
                          contact.pipewayStatus === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {contact.pipewayStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
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
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
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
              Showing {startIndex + 1} to {Math.min(endIndex, filteredContacts.length)} of {filteredContacts.length}{" "}
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
