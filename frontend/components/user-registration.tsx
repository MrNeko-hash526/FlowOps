"use client"

import React, { useState } from "react"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { UserManagement } from "./user-management"
import { useToast } from "@/hooks/use-toast"

type UserFormData = {
  type: string
  existingContacts: string
  firstName: string
  lastName: string
  email: string
  confirmEmail: string
  countryCode?: string
  phoneNo: string
  role: string
  userGroup: string
}

export function UserRegistration() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<UserFormData>({
    type: "",
    existingContacts: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    countryCode: "US:+1",
    phoneNo: "",
    role: "",
    userGroup: "None Selected",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [confirmEmailError, setConfirmEmailError] = useState("")
  const [typeError, setTypeError] = useState("")
  const [roleError, setRoleError] = useState("")

  const handleReset = () => {
    setFormData({
      type: "",
      existingContacts: "",
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      countryCode: "US:+1",
      phoneNo: "",
      role: "",
      userGroup: "None Selected",
    })
    setError("")
    setSuccess("")
    setPhoneError("")
    setTypeError("")
    setRoleError("")
  }

  // List required fields
  const requiredFields: (keyof UserFormData)[] = [
    "type",
    "firstName",
    "lastName",
    "email",
    "confirmEmail",
    "role",
  ]

  // Validation function
  const validateForm = () => {
    // Validate required fields exist
    const missingFields: string[] = []
    const fieldLabels: Record<string, string> = {
      type: "Type",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      confirmEmail: "Confirm Email",
      role: "Role",
    }

    for (const field of requiredFields) {
      const raw = (formData as any)[field]
      if (!raw || String(raw) === "") {
        // set field-specific errors
        if (field === 'firstName') setFirstNameError('First name is required')
        if (field === 'lastName') setLastNameError('Last name is required')
        if (field === 'email') setEmailError('Email is required')
        if (field === 'confirmEmail') setConfirmEmailError('Confirm Email is required')
        if (field === 'type') setTypeError('Type is required')
        if (field === 'role') setRoleError('Role is required')
        missingFields.push(fieldLabels[field])
        continue
      }
    }

    if (missingFields.length > 0) {
      // mark missing fields with per-field errors (no toast)
      return false
    }

    // After ensuring required fields are present, reject leading/trailing spaces on required fields
    for (const field of requiredFields) {
      const raw = (formData as any)[field]
      if (String(raw) !== String(raw).trim()) {
        if (field === 'firstName') setFirstNameError('No leading or trailing spaces allowed')
        if (field === 'lastName') setLastNameError('No leading or trailing spaces allowed')
        if (field === 'email') setEmailError('No leading or trailing spaces allowed')
        if (field === 'confirmEmail') setConfirmEmailError('No leading or trailing spaces allowed')
        return false
      }
    }

    // Basic email format check (no spaces allowed)
    const email = formData.email
    const confirmEmail = formData.confirmEmail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(String(email))) {
      setEmailError('Please enter a valid email address')
      return false
    }
    if (String(email) !== String(confirmEmail)) {
      setConfirmEmailError('Email and Confirm Email do not match')
      return false
    }

    // Names must not contain digits and must not have leading/trailing spaces
    const nameHasDigits = /\d/
    if (nameHasDigits.test(String(formData.firstName))) {
      setFirstNameError('Names must not contain numbers')
      return false
    }
    if (nameHasDigits.test(String(formData.lastName))) {
      setLastNameError('Names must not contain numbers')
      return false
    }

    // If phone provided, it must be exactly 10 digits (US style) and numeric
    if (formData.phoneNo) {
      const onlyDigits = formData.phoneNo.replace(/\D/g, "")
      if (onlyDigits.length !== 10) {
        setError("Phone number must be 10 digits.")
        return false
      }
    }

    setError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      // Prepare payload: include numeric country code with phone if present
      const payload = { ...formData }
      if (payload.phoneNo && payload.countryCode) {
        // payload.countryCode is like 'US:+1' — extract the numeric part
        const parts = String(payload.countryCode).split(":")
        const numeric = parts.length > 1 ? parts[1] : parts[0]
        payload.phoneNo = `${numeric}${payload.phoneNo}`
      }

      const res = await fetch("http://localhost:5000/api/form/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess("User registered successfully!")
        // show compact success toast (small green text)
        toast({ description: "User registered successfully." })
        handleReset()
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
  // small set of country codes; extend as needed
  // each option has a unique `value` used by the Select to avoid duplicate keys/values
  const countryCodes = [
    { code: "+1", label: "US", value: "US:+1" },
    { code: "+1", label: "CA", value: "CA:+1" },
    { code: "+44", label: "UK", value: "UK:+44" },
    { code: "+91", label: "IN", value: "IN:+91" },
  ]

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // allow only digits and truncate to 10
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10)
    setFormData({ ...formData, phoneNo: digits })
    if (digits && digits.length !== 10) {
      setPhoneError('Phone number must be 10 digits')
    } else {
      setPhoneError('')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="flex items-center gap-2 text-sm md:text-base text-gray-600 mb-2">
            <span>Home</span>
            <span>/</span>
            <span>Administration</span>
            <span>/</span>
            <span className="text-blue-600">Register</span>
          </nav>
        </div>
        <Button
          className="bg-blue-900 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md flex items-center h-9"
          onClick={() => setShowAddUser(true)}
        >
          <ArrowLeft size={16} className="mr-1" />Back
        </Button>
      </div>
      <Card className="shadow-lg border-0 mx-auto w-full max-w-2xl">
        <CardHeader className="px-4 sm:px-6 lg:px-8 4k:px-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">Register New User</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 lg:p-8 4k:p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Type and Existing Contacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                  Type: <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.type} onValueChange={(value) => { setTypeError(''); setFormData({ ...formData, type: value }) }}>
                  <SelectTrigger className={`h-9 md:h-10 w-full border rounded-md bg-white ${typeError ? 'border-red-500' : 'border-gray-200'}`}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
                {typeError ? <p className="text-xs mt-1 text-red-500">{typeError}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="existing-contacts" className="text-sm font-medium text-gray-700">
                  Existing Contacts:
                </Label>
                <Select
                  value={formData.existingContacts}
                  onValueChange={(value) => setFormData({ ...formData, existingContacts: value })}
                >
                  <SelectTrigger className="h-9 md:h-10 w-full border border-gray-200 rounded-md bg-white">
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
                  className={`h-9 md:h-10 w-full border border-gray-200 rounded-md px-3 ${firstNameError ? 'border-red-500' : ''}`}
                  value={formData.firstName}
                  onChange={(e) => {
                    const val = e.target.value
                    setError("")
                    // live-validate: disallow digits and leading/trailing spaces
                    if (/\d/.test(val)) {
                      setFirstNameError('First name must contain only letters')
                    } else if (val !== val.trim()) {
                      setFirstNameError('No leading or trailing spaces allowed')
                    } else {
                      setFirstNameError("")
                    }
                    setFormData({ ...formData, firstName: val })
                  }}
                  aria-invalid={firstNameError ? true : false}
                  aria-describedby={firstNameError ? 'firstName-error' : undefined}
                />
                {firstNameError ? (
                  <p id="firstName-error" role="alert" className="text-red-500 text-xs mt-1">{firstNameError}</p>
                ) : (
                  formData.firstName && !firstNameError && <p role="status" className="text-green-600 text-xs mt-1"></p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Last Name *"
                  className={`h-9 md:h-10 w-full border border-gray-200 rounded-md px-3 ${lastNameError ? 'border-red-500' : ''}`}
                  value={formData.lastName}
                  onChange={(e) => {
                    const val = e.target.value
                    setError("")
                    // live-validate: disallow digits and leading/trailing spaces
                    if (/\d/.test(val)) {
                      setLastNameError('Last name must contain only letters')
                    } else if (val !== val.trim()) {
                      setLastNameError('No leading or trailing spaces allowed')
                    } else {
                      setLastNameError("")
                    }
                    setFormData({ ...formData, lastName: val })
                  }}
                  aria-invalid={lastNameError ? true : false}
                  aria-describedby={lastNameError ? 'lastName-error' : undefined}
                />
                {lastNameError ? (
                  <p id="lastName-error" role="alert" className="text-red-500 text-xs mt-1">{lastNameError}</p>
                ) : null}
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
                  className={`h-9 md:h-10 w-full border border-gray-200 rounded-md px-3 ${emailError ? 'border-red-500' : ''}`}
                  value={formData.email}
                  onChange={(e) => {
                    const val = e.target.value
                    setError("")
                    // No leading/trailing spaces and no spaces inside email
                    if (val.startsWith(' ')) {
                      setEmailError('No leading spaces allowed')
                    } else if (val !== val.trim()) {
                      setEmailError('No leading or trailing spaces allowed')
                    } else if (/\s/.test(val)) {
                      setEmailError('Spaces are not allowed in email')
                    } else {
                      // basic format check
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                      if (val && !emailRegex.test(val)) {
                        setEmailError('Please enter a valid email address')
                      } else {
                        setEmailError("")
                      }
                    }
                    // if confirmEmail exists, re-check match
                    if (formData.confirmEmail && val !== formData.confirmEmail) {
                      setConfirmEmailError('Email and Confirm Email do not match')
                    } else if (formData.confirmEmail) {
                      setConfirmEmailError("")
                    }
                    setFormData({ ...formData, email: val })
                  }}
                  aria-invalid={emailError ? true : false}
                  aria-describedby={emailError ? 'email-error' : undefined}
                />
                {emailError ? (
                  <p id="email-error" role="alert" className="text-red-500 text-xs mt-1">{emailError}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmEmail" className="text-sm font-medium text-gray-700">
                  Confirm Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirmEmail"
                  type="email"
                  placeholder="Confirm Email *"
                  className={`h-9 md:h-10 w-full border border-gray-200 rounded-md px-3 ${confirmEmailError ? 'border-red-500' : ''}`}
                  value={formData.confirmEmail}
                  onChange={(e) => {
                    const val = e.target.value
                    setError("")
                    // No leading/trailing spaces and no spaces inside email
                    if (val.startsWith(' ')) {
                      setConfirmEmailError('No leading spaces allowed')
                    } else if (val !== val.trim()) {
                      setConfirmEmailError('No leading or trailing spaces allowed')
                    } else if (/\s/.test(val)) {
                      setConfirmEmailError('Spaces are not allowed in email')
                    } else {
                      // basic format check
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                      if (val && !emailRegex.test(val)) {
                        setConfirmEmailError('Please enter a valid email address')
                      } else if (val !== formData.email) {
                        setConfirmEmailError('Email and Confirm Email do not match')
                      } else {
                        setConfirmEmailError("")
                      }
                    }
                    setFormData({ ...formData, confirmEmail: val })
                  }}
                  aria-invalid={confirmEmailError ? true : false}
                  aria-describedby={confirmEmailError ? 'confirmEmail-error' : undefined}
                />
                {confirmEmailError ? (
                  <p id="confirmEmail-error" role="alert" className="text-red-500 text-xs mt-1">{confirmEmailError}</p>
                ) : null}
              </div>
            </div>

            {/* Phone Number with country code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNo" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="flex gap-2">
                  <div className="w-20">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                    >
                      <SelectTrigger className="h-9 md:h-10 w-full border border-gray-200 rounded-md bg-white px-3 text-sm flex items-center">
                        {/* Show only numeric part (e.g. +1) in the trigger while keeping full value like 'US:+1' in state */}
                        <span className="truncate">{formData.countryCode ? String(formData.countryCode).split(":")[1] ?? formData.countryCode : ''}</span>
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((c, i) => (
                          <SelectItem key={`${c.value}-${i}`} value={c.value}>
                            {c.label} {c.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Input
                      id="phoneNo"
                      placeholder="Enter 10-digit number"
                      className={`h-9 md:h-10 w-full border border-gray-200 rounded-md px-3 ${phoneError ? 'border-red-500' : ''}`}
                      value={formData.phoneNo}
                      onChange={handlePhoneChange}
                      maxLength={10}
                      aria-invalid={phoneError ? true : false}
                      aria-describedby={phoneError ? 'phone-error' : undefined}
                    />
                    {phoneError ? (
                      <p id="phone-error" role="alert" className="text-red-500 text-xs mt-1">{phoneError}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Role and User Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  Role: <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.role} onValueChange={(value) => { setRoleError(''); setFormData({ ...formData, role: value }) }}>
                  <SelectTrigger className={`h-9 md:h-10 w-full border rounded-md bg-white ${roleError ? 'border-red-500' : 'border-gray-200'}`}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                {roleError ? <p className="text-xs mt-1 text-red-500">{roleError}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="userGroup" className="text-sm font-medium text-gray-700">
                  User Group:
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-9 justify-start text-gray-500 font-normal bg-transparent"
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
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-1.5 md:px-6 md:py-2 h-9">
                Register
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 px-4 py-1.5 md:px-6 md:py-2 bg-transparent h-9"
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
