"use client"

import React, { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useToast } from "@/hooks/use-toast"
import * as yup from "yup"
import { UserManagement } from "./user-management"

const api_url = process.env.NEXT_PUBLIC_API_URL;

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
  const [showAddUser, setShowAddUser] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const schema = yup.object().shape({
    type: yup.string().required("Type is required"),
    firstName: yup
      .string()
      .required("First name is required")
      .test("no-spaces", "No leading or trailing spaces allowed", (v) => v === (v ?? "").trim())
      .matches(/^[A-Za-z\s'\-]+$/, "First name must contain only letters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .test("no-spaces", "No leading or trailing spaces allowed", (v) => v === (v ?? "").trim())
      .matches(/^[A-Za-z\s'\-]+$/, "Last name must contain only letters"),
    email: yup
      .string()
      .required("Email is required")
      .test("no-spaces", "No leading or trailing spaces allowed", (v) => v === (v ?? "").trim())
      .test("no-internal-spaces", "Spaces are not allowed in email", (v) => !/\s/.test(v ?? ""))
      .email("Please enter a valid email address"),
    confirmEmail: yup
      .string()
      .required("Confirm Email is required")
      .test("no-spaces", "No leading or trailing spaces allowed", (v) => v === (v ?? "").trim())
      .oneOf([yup.ref("email")], "Email and Confirm Email do not match"),
    phoneNo: yup
      .string()
      .optional()
      .test("digits-or-empty", "Phone number must be 10 digits", (v) => {
        if (!v) return true
        const onlyDigits = String(v).replace(/\D/g, "")
        return onlyDigits.length === 10
      }),
    role: yup.string().required("Role is required"),
    existingContacts: yup.string().nullable(),
    userGroup: yup.string().nullable(),
    countryCode: yup.string().nullable(),
  })

  // Helper: validate email format and no spaces (used for live inline errors)
  const isValidEmailFormat = (val?: string) => {
    if (!val) return false
    if (val !== val.trim()) return false // no leading/trailing spaces
    if (/\s/.test(val)) return false // no internal spaces
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }

  const countryCodes = [
    { code: "+1", label: "US", value: "US:+1" },
    { code: "+1", label: "CA", value: "CA:+1" },
    { code: "+44", label: "UK", value: "UK:+44" },
    { code: "+91", label: "IN", value: "IN:+91" },
  ]

  // display the country-code label (e.g. "+1" or "UK +44")
  const countryCodeLabel = formData.countryCode ? String(formData.countryCode).split(":")[1] ?? formData.countryCode : ""

  const setFieldError = (field: string, msg?: string) => {
    setErrors((prev) => {
      const next = { ...prev }
      if (msg) next[field] = msg
      else delete next[field]
      return next
    })
  }

  const validateForm = async () => {
    setErrors({})
    try {
      await schema.validate(formData, { abortEarly: false })
      return true
    } catch (validationError: any) {
      if (validationError.inner && validationError.inner.length) {
        const map: Record<string, string> = {}
        validationError.inner.forEach((err: any) => {
          if (err.path) map[err.path] = err.message
        })
        setErrors(map)
      } else if (validationError.path) {
        setErrors({ [validationError.path]: validationError.message })
      } else {
        toast({ title: "Validation error", description: validationError.message || "Validation failed", status: "error", duration: 4000 })
      }
      return false
    }
  }

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 10)
    setFormData((s) => ({ ...s, phoneNo: digits }))
    if (digits && digits.length !== 10) setFieldError("phoneNo", "Phone number must be 10 digits")
    else setFieldError("phoneNo")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!(await validateForm())) return
    setLoading(true)
    try {
      const payload: any = { ...formData }
      if (payload.phoneNo && payload.countryCode) {
        const parts = String(payload.countryCode).split(":")
        const numeric = parts.length > 1 ? parts[1] : parts[0]
        payload.phoneNo = `${numeric}${payload.phoneNo}`
      }

      const res = await fetch(`${api_url}/api/form/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) {
        toast({ description: "User registered successfully." })
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
        setErrors({})
      } else {
        setFieldError("form", data.message || "Registration failed")
      }
    } catch {
      setFieldError("form", "Network error")
    } finally {
      setLoading(false)
    }
  }

  if (showAddUser) return <UserManagement />

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <Card className="shadow-lg border-0 mx-auto w-full max-w-4xl">
        <CardHeader className="px-4 sm:px-6 lg:px-8">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">Register New User</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <form className="space-y-6 divide-y divide-gray-200" onSubmit={handleSubmit}>
            {/* Arrange fields into 3 rows, 3 columns each on md+ screens */}
            {/* Row 1: Type, Existing Contacts, Role */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Type: <span className="text-red-500">*</span></Label>
                <Select value={formData.type} onValueChange={(value) => { setFieldError("type"); setFormData({ ...formData, type: value }) }}>
                  <SelectTrigger className={`h-9 md:h-9 w-full border rounded-md bg-white ${errors.type ? "border-red-500" : "border-gray-200"}`}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type ? <p className="text-xs mt-1 text-red-500">{errors.type}</p> : null}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Existing Contacts:</Label>
                <Select value={formData.existingContacts} onValueChange={(value) => setFormData({ ...formData, existingContacts: value })}>
                  <SelectTrigger className="h-9 md:h-9 w-full border border-gray-200 rounded-md bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contact1">Contact 1</SelectItem>
                    <SelectItem value="contact2">Contact 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Role: <span className="text-red-500">*</span></Label>
                <Select value={formData.role} onValueChange={(value) => { setFieldError("role"); setFormData({ ...formData, role: value }) }}>
                  <SelectTrigger className={`h-9 md:h-9 w-full border rounded-md bg-white ${errors.role ? "border-red-500" : "border-gray-200"}`}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role ? <p className="text-xs mt-1 text-red-500">{errors.role}</p> : null}
              </div>
            </div>

            {/* Row 2: First Name, Last Name, User Group */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="First Name *"
                  className={`h-9 md:h-9 w-full border border-gray-200 rounded-md px-3 ${errors.firstName ? "border-red-500" : ""}`}
                  value={formData.firstName}
                  onChange={(e) => { setFieldError("firstName"); setFormData({ ...formData, firstName: e.target.value }) }}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                />
                {errors.firstName ? <p id="firstName-error" role="alert" className="text-red-500 text-xs mt-1">{errors.firstName}</p> : null}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="Last Name *"
                  className={`h-9 md:h-9 w-full border border-gray-200 rounded-md px-3 ${errors.lastName ? "border-red-500" : ""}`}
                  value={formData.lastName}
                  onChange={(e) => { setFieldError("lastName"); setFormData({ ...formData, lastName: e.target.value }) }}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                />
                {errors.lastName ? <p id="lastName-error" role="alert" className="text-red-500 text-xs mt-1">{errors.lastName}</p> : null}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">User Group:</Label>
                <Button type="button" variant="outline" className="w-full h-9 justify-start text-gray-500 font-normal bg-transparent" disabled>
                  {formData.userGroup}
                </Button>
              </div>
            </div>

            {/* Row 3: Email, Confirm Email, Phone (country code + number) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></Label>
                <Input
                  type="email"
                  placeholder="Email *"
                  className={`h-9 md:h-9 w-full border border-gray-200 rounded-md px-3 ${errors.email ? "border-red-500" : ""}`}
                  value={formData.email}
                  onChange={(e) => {
                    const val = e.target.value
                    if (val.length && (val !== val.trim())) {
                      setFieldError("email", "No leading or trailing spaces allowed")
                    } else if (val.length && /\s/.test(val)) {
                      setFieldError("email", "Spaces are not allowed in email")
                    } else if (val.length && !isValidEmailFormat(val)) {
                      setFieldError("email", "Please enter a valid email address")
                    } else {
                      setFieldError("email")
                    }
                    if (formData.confirmEmail && formData.confirmEmail !== val) {
                      setFieldError("confirmEmail", "Email and Confirm Email do not match")
                    } else if (formData.confirmEmail) {
                      setFieldError("confirmEmail")
                    }
                    setFormData({ ...formData, email: val })
                  }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email ? <p id="email-error" role="alert" className="text-red-500 text-xs mt-1">{errors.email}</p> : null}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Confirm Email <span className="text-red-500">*</span></Label>
                <Input
                  type="email"
                  placeholder="Confirm Email *"
                  className={`h-9 md:h-9 w-full border border-gray-200 rounded-md px-3 ${errors.confirmEmail ? "border-red-500" : ""}`}
                  value={formData.confirmEmail}
                  onChange={(e) => {
                    const val = e.target.value
                    if (val.length && (val !== val.trim())) {
                      setFieldError("confirmEmail", "No leading or trailing spaces allowed")
                    } else if (val.length && !isValidEmailFormat(val)) {
                      setFieldError("confirmEmail", "Please enter a valid email address")
                    } else if (formData.email && val !== formData.email) {
                      setFieldError("confirmEmail", "Email and Confirm Email do not match")
                    } else {
                      setFieldError("confirmEmail")
                    }
                    setFormData({ ...formData, confirmEmail: val })
                  }}
                  aria-invalid={!!errors.confirmEmail}
                  aria-describedby={errors.confirmEmail ? "confirmEmail-error" : undefined}
                />
                {errors.confirmEmail ? <p id="confirmEmail-error" role="alert" className="text-red-500 text-xs mt-1">{errors.confirmEmail}</p> : null}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                <div className="flex gap-2 items-center">
                  {/* fixed width that comfortably fits single and double digit codes */}
                  <div className="w-19 flex-shrink-0 transition-all duration-150">
                    <Select value={formData.countryCode} onValueChange={(value) => setFormData({ ...formData, countryCode: value })}>
                      <SelectTrigger className="h-9 md:h-9 w-full border border-gray-200 rounded-md bg-white px-3 text-sm flex items-center justify-center">
                        <span className="truncate text-center">{countryCodeLabel}</span>
                      </SelectTrigger>
                      <SelectContent className="min-w-[6rem]">
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
                      placeholder="Enter 10-digit number"
                      className={`h-9 md:h-9 w-full border border-gray-200 rounded-md px-3 ${errors.phoneNo ? "border-red-500" : ""}`}
                      value={formData.phoneNo}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      maxLength={10}
                      aria-invalid={!!errors.phoneNo}
                      aria-describedby={errors.phoneNo ? "phone-error" : undefined}
                    />
                    {errors.phoneNo ? <p id="phone-error" role="alert" className="text-red-500 text-xs mt-1">{errors.phoneNo}</p> : null}
                  </div>
                </div>
              </div>
            </div>
            {/* end arranged rows */}

            {errors.form ? <div className="text-red-500 text-center">{errors.form}</div> : null}

            <div className="flex justify-center gap-4 pt-6">
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-1.5 md:px-6 md:py-2 h-9">
                Register
              </Button>
              <Button type="button" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 px-4 py-1.5 md:px-6 md:py-2 bg-transparent h-9" onClick={() => {
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
                setErrors({})
              }}>
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
