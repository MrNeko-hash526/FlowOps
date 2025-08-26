"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

export function ContactRegistration() {
  const [formData, setFormData] = useState({
    type: "",
    existingContacts: "",
    firstName: "",
    lastName: "",
    suffix: "",
    title: "",
    status: "Active",
    goesBy: "",
    pronouns: "",
    emailAddress: "",
    officeNumber: "",
    cellNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    dateOfBirth: "",
    workAnniversary: "",
    maritalStatus: "",
    spouseName: "",
    childrensName: "",
    college: "",
    degree: "",
    priorEmployer: "",
    endDate: "",
    notes: "",
    sportsTeam: "",
    favorites: "",
    group: "",
    report: "",
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted ✅", formData)
    alert("🚀 Contact Registered Successfully!")
  }
  return (

    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CONTACT REGISTRATION</h1>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2">Contact Register</Button>
      </div>

      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <form className="space-y-6">
            {/* Type and Existing Contacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                  Type: <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="existing-contacts" className="text-sm font-medium text-gray-700">
                  Existing Contacts:
                </Label>
                <Select>
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

            {/* Personal Information Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pronouns" className="text-sm font-medium text-gray-700">
                  Pronouns:
                </Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="he/him">He/Him</SelectItem>
                    <SelectItem value="she/her">She/Her</SelectItem>
                    <SelectItem value="they/them">They/Them</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name: <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  className="h-10"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name: <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  className="h-10"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suffix" className="text-sm font-medium text-gray-700">
                  Suffix:
                </Label>
                <Input
                  id="suffix"
                  placeholder="Suffix"
                  className="h-10"
                  value={formData.suffix}
                  onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Title:
                </Label>
                <Input
                  id="title"
                  placeholder="Title"
                  className="h-10"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Status: <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue="Active">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goesBy" className="text-sm font-medium text-gray-700">
                  Goes By:
                </Label>
                <Input
                  id="goesBy"
                  placeholder="Goes By"
                  className="h-10"
                  value={formData.goesBy}
                  onChange={(e) => setFormData({ ...formData, goesBy: e.target.value })}
                />
              </div>
            </div>

            {/* Second Row with Pronouns
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

              <div className="md:col-span-5"></div>
            </div> */}

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Email Address: <span className="text-blue-600 text-lg">★</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="h-10"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="office" className="text-sm font-medium text-gray-700">
                  Office Number:
                </Label>
                <Input
                  id="office"
                  placeholder="Office Number"
                  className="h-10"
                  value={formData.officeNumber}
                  onChange={(e) => setFormData({ ...formData, officeNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cell" className="text-sm font-medium text-gray-700">
                  Cell Number:
                </Label>
                <Input
                  id="cell"
                  placeholder="Cell Number"
                  className="h-10"
                  value={formData.cellNumber}
                  onChange={(e) => setFormData({ ...formData, cellNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group" className="text-sm font-medium text-gray-700">
                  Group: <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="group"
                  placeholder="Group"
                  className="h-10"
                  value={formData.group}
                  onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address1" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Address Line 1: <span className="text-blue-600 text-lg">★</span>
                </Label>
                <Input
                  id="address1"
                  placeholder="Address 1"
                  className="h-10"
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2" className="text-sm font-medium text-gray-700">
                  Address Line 2:
                </Label>
                <Input
                  id="address2"
                  placeholder="Address 2"
                  className="h-10"
                  value={formData.addressLine2}
                  onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                  City:
                </Label>
                <Input
                  id="city"
                  placeholder="City"
                  className="h-10"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                  State:
                </Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Zip Code Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zip" className="text-sm font-medium text-gray-700">
                  Zip:
                </Label>
                <Input
                  id="zip"
                  placeholder="Zip"
                  className="h-10"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report" className="text-sm font-medium text-gray-700">
                  Report:
                </Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="report1">Report 1</SelectItem>
                    <SelectItem value="report2">Report 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2"></div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-medium text-gray-700">
                  Date Of Birth:
                </Label>
                <div className="relative">
                  <Input
                    id="dob"
                    placeholder="mm/dd/yyyy"
                    className="h-10"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                  <CalendarDays className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="anniversary" className="text-sm font-medium text-gray-700">
                  Work Anniversary:
                </Label>
                <div className="relative">
                  <Input
                    id="anniversary"
                    placeholder="mm/dd/yyyy"
                    className="h-10"
                    value={formData.workAnniversary}
                    onChange={(e) => setFormData({ ...formData, workAnniversary: e.target.value })}
                  />
                  <CalendarDays className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="marital" className="text-sm font-medium text-gray-700">
                  Marital Status:
                </Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouse" className="text-sm font-medium text-gray-700">
                  Spouse Name:
                </Label>
                <Input
                  id="spouse"
                  placeholder="Spouse Name"
                  className="h-10"
                  value={formData.spouseName}
                  onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="children" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Children's Name: <span className="text-blue-600 text-lg">★</span>
                </Label>
                <Input
                  id="children"
                  placeholder="Children's Name"
                  className="h-10"
                  value={formData.childrensName}
                  onChange={(e) => setFormData({ ...formData, childrensName: e.target.value })}
                />
              </div>
            </div>

            {/* Education and Employment */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="college" className="text-sm font-medium text-gray-700">
                  College:
                </Label>
                <Input
                  id="college"
                  placeholder="College"
                  className="h-10"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree" className="text-sm font-medium text-gray-700">
                  Degree:
                </Label>
                <Input
                  id="degree"
                  placeholder="Degree"
                  className="h-10"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employer" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Prior Employer: <span className="text-blue-600 text-lg">★</span>
                </Label>
                <Input
                  id="employer"
                  placeholder="Prior Employer"
                  className="h-10"
                  value={formData.priorEmployer}
                  onChange={(e) => setFormData({ ...formData, priorEmployer: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                  End Date:
                </Label>
                <div className="relative">
                  <Input
                    id="endDate"
                    placeholder="mm/dd/yyyy"
                    className="h-10"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                  <CalendarDays className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Notes and Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                  Notes:
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Notes"
                  rows={4}
                  className="resize-none"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sports" className="text-sm font-medium text-gray-700">
                    Sports Team:
                  </Label>
                  <Input
                    id="sports"
                    placeholder="Sports Team"
                    className="h-10"
                    value={formData.sportsTeam}
                    onChange={(e) => setFormData({ ...formData, sportsTeam: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favorites" className="text-sm font-medium text-gray-700">
                    Favorites:
                  </Label>
                  <Input
                    id="favorites"
                    placeholder="Favorites"
                    className="h-10"
                    value={formData.favorites}
                    onChange={(e) => setFormData({ ...formData, favorites: e.target.value })}
                  />
                </div>
              </div>

            </div>
            {/* Submit Button */}
            {/* <div className="flex justify-center pt-6">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                           hover:scale-105 active:scale-95 transition-transform 
                           shadow-lg text-white px-8 py-3 rounded-xl font-semibold 
                           animate-pulse"
              >
                Register Contact
              </Button>
            </div> */}
          </form>
          {/* <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2">Contact Register</Button> */}
        </CardContent>
      </Card>
    </div>











  )
}
