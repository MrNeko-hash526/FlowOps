"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserRegistration } from "./user-registration"


interface User {
  id: number
  name: string
  email: string
  phoneNo: string
  userType: string
  userGroup: string
  code: string
  companyStatus: "Active" | "Inactive"
  userStatus: "Active" | "Inactive"
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Siddharth Chacha",
    email: "niles.karanjkar@goclean.tech",
    phoneNo: "9839991938",
    userType: "CONV",
    userGroup: "Accounting,Client Guide,Compliance,FAQ,Legal,MIS,IT,Notice",
    code: "ALL",
    companyStatus: "Active",
    userStatus: "Active",
  },
  {
    id: 2,
    name: "Sachin Kumar",
    email: "sachin.kumari@goclean.tech",
    phoneNo: "1234567890",
    userType: "Firm",
    userGroup: "Accounting,Client Guide,Compliance,FAQ,Legal,MIS,IT,Notice",
    code: "BLIT",
    companyStatus: "Active",
    userStatus: "Active",
  },
  {
    id: 3,
    name: "Anand singh",
    email: "ananddev.singh@goclean.tech",
    phoneNo: "9839991938",
    userType: "Firm",
    userGroup: "Accounting,Client Guide,Compliance,FAQ,Legal,MIS,IT,Notice",
    code: "ANAD",
    companyStatus: "Active",
    userStatus: "Active",
  },
  {
    id: 4,
    name: "nitin kumar",
    email: "nitin.kumar@goclean.tech",
    phoneNo: "9839991938",
    userType: "Firm",
    userGroup: "Accounting,Client Guide,Compliance,FAQ,Legal,MIS,IT,Notice",
    code: "NITI",
    companyStatus: "Active",
    userStatus: "Active",
  },
  {
    id: 5,
    name: "Kirit Upadhyay",
    email: "kirit.upadhyay@goclean.tech",
    phoneNo: "9839991938",
    userType: "Client",
    userGroup: "Accounting,Client Guide,Compliance,FAQ,Legal,MIS,IT,Notice",
    code: "ALL",
    companyStatus: "Active",
    userStatus: "Active",
  },
  {
    id: 6,
    name: "Anwar Hussain",
    email: "Anwar.hussain@goclean.tech",
    phoneNo: "9999999999",
    userType: "ALL",
    userGroup: "Compliance,Accounting,MIS,IT,Legal,Client Guide,FAQ,Notice",
    code: "ALL",
    companyStatus: "Active",
    userStatus: "Active",
  },
  {
    id: 7,
    name: "ananddev singh",
    email: "ananddev.singh@goclean.tech",
    phoneNo: "9999999999",
    userType: "CONV",
    userGroup: "Compliance,Accounting,MIS,IT,Legal,Client Guide,FAQ,Notice",
    code: "ALL",
    companyStatus: "Active",
    userStatus: "Active",
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [showAddUser, setShowAddUser] = useState(false)

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
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

  // Sorting handler
  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = sortedUsers.slice(startIndex, endIndex)

  if (showAddUser) {
    return <UserRegistration />
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
            <span className="text-blue-600">👁 View</span>
          </nav>
        </div>
        <Button
          className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2"
          onClick={() => setShowAddUser(true)}
        >Add User</Button>
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
              {/* <TableHeader>
                <TableRow className="bg-blue-900 hover:bg-blue-900">
                  <TableHead className="text-white font-semibold text-center w-16">#</TableHead>
                  <TableHead className="text-white font-semibold">Name</TableHead>
                  <TableHead className="text-white font-semibold">Email</TableHead>
                  <TableHead className="text-white font-semibold text-center">Phone No.</TableHead>
                  <TableHead className="text-white font-semibold text-center">User Type</TableHead>
                  <TableHead className="text-white font-semibold">User Group</TableHead>
                  <TableHead className="text-white font-semibold text-center">Code</TableHead>
                  <TableHead className="text-white font-semibold text-center">Company Status</TableHead>
                  <TableHead className="text-white font-semibold text-center">User Status</TableHead>
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
                    onClick={() => handleSort("email")}
                  >
                    Email {sortColumn === "email" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold text-center cursor-pointer"
                    onClick={() => handleSort("phoneNo")}
                  >
                    Phone No. {sortColumn === "phoneNo" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold text-center cursor-pointer"
                    onClick={() => handleSort("userType")}
                  >
                    User Type {sortColumn === "userType" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold cursor-pointer"
                    onClick={() => handleSort("userGroup")}
                  >
                    User Group {sortColumn === "userGroup" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold text-center cursor-pointer"
                    onClick={() => handleSort("code")}
                  >
                    Code {sortColumn === "code" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold text-center cursor-pointer"
                    onClick={() => handleSort("companyStatus")}
                  >
                    Company Status {sortColumn === "companyStatus" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead
                    className="text-white font-semibold text-center cursor-pointer"
                    onClick={() => handleSort("userStatus")}
                  >
                    User Status {sortColumn === "userStatus" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user, index) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="text-center font-medium">{startIndex + index + 1}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-center">{user.phoneNo}</TableCell>
                    <TableCell className="text-center">{user.userType}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={user.userGroup}>
                        {user.userGroup}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{user.code}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={user.companyStatus === "Active" ? "default" : "secondary"}
                        className={
                          user.companyStatus === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {user.companyStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={user.userStatus === "Active" ? "default" : "secondary"}
                        className={
                          user.userStatus === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {user.userStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} entries
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
                <>
                  <Button
                    variant={currentPage === 2 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(2)}
                    className={currentPage === 2 ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
