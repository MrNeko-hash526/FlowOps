"use client"

import React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent } from "./ui/card"
import { UserManagement } from "./user-management"

export function UserRegistration() {
  const [formData, setFormData] = useState({
    type: "",
    existingContacts: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phoneNo: "",
    role: "",
    userGroup: "None Selected",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleReset = () => {
    setFormData({
      type: "",
      existingContacts: "",
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      phoneNo: "",
      role: "",
      userGroup: "None Selected",
    })
    setError("")
    setSuccess("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const res = await fetch("http://localhost:5000/api/form/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess("User registered successfully!")
        handleReset()
        console.log("success")
        alert("success")
      } else {
        setError(data.message || "Registration failed")
      }
    } catch (err: any) {
      setError("Network error")
    }
    setLoading(false)
  }

  const [showAddUser, setShowAddUser] = useState(false)
  // ...existing state and logic...

  if (showAddUser) {
    return <UserManagement />
  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>🏠 Home</span>
            <span>/</span>
            <span>👤 Administration</span>
            <span>/</span>
            <span>📋 Manage contact</span>
            <span>/</span>
            <span className="text-blue-600">👤 Register</span>
          </nav>
        </div>
        <Button
          className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2"
          onClick={() => setShowAddUser(true)}
        >View User</Button>
      </div>

      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Type and Existing Contacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                  Type: <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="existing-contacts" className="text-sm font-medium text-gray-700">
                  Existing Contacts:
                </Label>
                <Select
                  value={formData.existingContacts}
                  onValueChange={(value) => setFormData({ ...formData, existingContacts: value })}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contact1">Contact 1</SelectItem>
                    <SelectItem value="contact2">Contact 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="First Name *"
                  className="h-10"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Last Name *"
                  className="h-10"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            {/* Email Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email *"
                  className="h-10 w-full"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmEmail" className="text-sm font-medium text-gray-700">
                  Confirm Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirmEmail"
                  type="email"
                  placeholder="Confirm Email *"
                  className="h-10"
                  value={formData.confirmEmail}
                  onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNo" className="text-sm font-medium text-gray-700">
                  Phone No
                </Label>
                <Input
                  id="phoneNo"
                  placeholder="Phone No"
                  className="h-10"
                  value={formData.phoneNo}
                  onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                />
              </div>
              <div></div>
            </div>

            {/* Role and User Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  Role: <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="userGroup" className="text-sm font-medium text-gray-700">
                  User Group:
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 justify-start text-gray-500 font-normal bg-transparent"
                  disabled
                >
                  {formData.userGroup}
                </Button>
              </div>
            </div>

            {/* Show error/success messages */}
            {error && <div className="text-red-500 text-center">{error}</div>}
            {success && <div className="text-green-500 text-center">{success}</div>}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-6">
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-2">
                Register
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
