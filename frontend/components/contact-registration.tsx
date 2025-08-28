"use client"

import React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Card, CardContent } from "./ui/card"
import { CalendarDays } from "lucide-react"
import { ContactManagement } from "./contact-management"

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
    emails: [""],
    officeNumber: "",
    cellNumber: "",
    addressLines: [""],
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    dateOfBirth: "",
    workAnniversary: "",
    maritalStatus: "",
    spouseName: "",
    childrensNames: [""],
    college: "",
    degree: "",
    priorEmployers: [""],
    endDate: "",
    notes: "",
    sportsTeam: "",
    favorites: "",
    group: "",
    report: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    // Required fields
    if (!formData.type || formData.type.trim() === '') errs.type = 'Type is required'
    if (!formData.firstName || formData.firstName.trim() === '') errs.firstName = 'First name is required'
    if (!formData.lastName || formData.lastName.trim() === '') errs.lastName = 'Last name is required'
    if (formData.firstName && formData.lastName && formData.firstName.trim() === formData.lastName.trim()) errs.lastName = 'First and last name cannot be the same'
    if (!formData.status || formData.status.trim() === '') errs.status = 'Status is required'
    if (!formData.group || formData.group.trim() === '') errs.group = 'Group is required'

    // Email - stricter
    // Email is required and validated
    if (!formData.emails || !formData.emails[0] || String(formData.emails[0]).trim() === '') {
      errs.emailAddress = 'Email is required'
    } else {
      const email = String(formData.emails[0]).trim()
      // RFC-like pattern (reasonable for validation) + require TLD of 2+
      const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[A-Za-z]{2,}$/
      if (email.length > 320) errs.emailAddress = 'Email is too long'
      else if (email.indexOf('..') !== -1) errs.emailAddress = 'Invalid email address'
      else if (!re.test(email)) errs.emailAddress = 'Invalid email address'
    }

    // Address Line 1 required
    if (!formData.addressLines || !formData.addressLines[0] || String(formData.addressLines[0]).trim() === '') {
      errs.addressLine1 = 'Address Line 1 is required'
    }

    // Phone validation: numeric only and max 10 digits
    // if (formData.cellNumber) {
    //   const digits = formData.cellNumber.replace(/\D/g, '')
    //   if (!/^\d+$/.test(digits)) errs.cellNumber = 'Phone number must contain only digits'
    //   else if (digits.length > 10) errs.cellNumber = 'Phone number cannot exceed 10 digits'
    // }

    if (formData.cellNumber) {
      const value = formData.cellNumber.trim();

      // must match + followed by digits, or just digits
      if (!/^\+?\d+$/.test(value)) {
        errs.cellNumber = 'Phone number must contain only digits and may start with +';
      }
      else if (value.startsWith('+')) {
        if (value.length < 12 || value.length > 13) {
          errs.cellNumber = 'Phone number must be 12 to 13 characters long including +';
        }
      }
      else {
        if (value.length < 12 || value.length > 13) {
          errs.cellNumber = 'Phone number must be 12 to 13 digits long';
        }
      }
    }


    // Zip numeric check
    if (formData.zip && !/^\d{0,10}$/.test(formData.zip)) errs.zip = 'Zip must be numeric'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    // Map frontend fields to backend schema expected by /api/contact/register
    const payload = {
      type: formData.type,
      existingContacts: formData.existingContacts,
      firstName: formData.firstName,
      lastName: formData.lastName,
      suffix: formData.suffix,
      title: formData.title,
      status: formData.status,
      goesBy: formData.goesBy,
      pronouns: formData.pronouns,
      // primary (first) email for backward compatibility
      emailAddress: (formData.emails && formData.emails[0]) || null,
      // include full emails array
      emails: formData.emails || [],
      officeNumber: formData.officeNumber,
      cellNumber: formData.cellNumber,
      // primary (first) address line
      addressLine1: (formData.addressLines && formData.addressLines[0]) || null,
      // include full addressLines array
      addressLines: formData.addressLines || [],
      addressLine2: formData.addressLine2,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      dateOfBirth: formData.dateOfBirth,
      workAnniversary: formData.workAnniversary,
      maritalStatus: formData.maritalStatus,
      spouseName: formData.spouseName,
      childrensName: (formData.childrensNames && formData.childrensNames[0]) || null,
      childrensNames: formData.childrensNames || [],
      college: formData.college,
      degree: formData.degree,
      priorEmployer: (formData.priorEmployers && formData.priorEmployers[0]) || null,
      priorEmployers: formData.priorEmployers || [],
      endDate: formData.endDate,
      notes: formData.notes,
      sportsTeam: formData.sportsTeam,
      favorites: formData.favorites,
      group: formData.group,
      report: formData.report,
    }

    try {
      const res = await fetch('http://localhost:5000/api/contact/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) {
        // show server-side error
        alert(data.error || 'Submission failed')
      } else {
        // success
        alert('Contact registered successfully')
        setFormData({
          type: "",
          existingContacts: "",
          firstName: "",
          lastName: "",
          suffix: "",
          title: "",
          status: "Active",
          goesBy: "",
          pronouns: "",
          emails: [""],
          officeNumber: "",
          cellNumber: "",
          addressLines: [""],
          addressLine2: "",
          city: "",
          state: "",
          zip: "",
          dateOfBirth: "",
          workAnniversary: "",
          maritalStatus: "",
          spouseName: "",
          childrensNames: [""],
          college: "",
          degree: "",
          priorEmployers: [""],
          endDate: "",
          notes: "",
          sportsTeam: "",
          favorites: "",
          group: "",
          report: "",
        });
      }
    } catch (err) {
      console.error(err)
      alert('Network error while submitting form')
    }
  }
  const [showAddUser, setShowAddUser] = useState(false)

  if (showAddUser) {
    return <ContactManagement />
  }
  return (

    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CONTACT REGISTRATION</h1>
        </div>
        <Button
          className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2"
          onClick={() => setShowAddUser(true)}
        >
          View Registeration</Button>
      </div>

      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Type and Existing Contacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                  Type: <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
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
                {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
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
                {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
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
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
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
                  Email Address: <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    className="h-10 flex-1"
                    value={(formData.emails && formData.emails[0]) || ''}
                    required
                    onChange={(e) => setFormData(prev => ({ ...prev, emails: [e.target.value, ...(prev.emails?.slice(1) || [])] }))}
                    onBlur={() => {
                      const email = ((formData.emails && formData.emails[0]) || '').trim()
                      const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[A-Za-z]{2,}$/
                      if (!email) return
                      if (email.length > 320) setErrors(prev => ({ ...prev, emailAddress: 'Email is too long' }))
                      else if (email.indexOf('..') !== -1) setErrors(prev => ({ ...prev, emailAddress: 'Invalid email address' }))
                      else if (!re.test(email)) setErrors(prev => ({ ...prev, emailAddress: 'Invalid email address' }))
                      else setErrors(prev => { const p = { ...prev }; delete p.emailAddress; return p })
                    }}
                  />
                  <Button type="button" className="h-10 w-10 p-0" onClick={() => setFormData(prev => ({ ...prev, emails: [...(prev.emails || ['']), ''] }))}>+</Button>
                </div>
                {errors.emailAddress && <p className="text-sm text-red-600">{errors.emailAddress}</p>}
                {/* render extra emails if any */}
                {formData.emails && formData.emails.slice(1).map((em, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-2">
                    <Input
                      type="email"
                      placeholder={`Email ${idx + 2}`}
                      className="h-10 flex-1"
                      value={em}
                      onChange={(e) => setFormData(prev => {
                        const next = [...(prev.emails || [])]
                        next[idx + 1] = e.target.value
                        return { ...prev, emails: next }
                      })}
                    />
                    <Button type="button" className="h-10 w-10 p-0" onClick={() => setFormData(prev => ({ ...prev, emails: prev.emails.filter((_, i) => i !== idx + 1) }))}>-</Button>
                  </div>
                ))}
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
                  inputMode="numeric"
                  pattern="\d*"
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '')
                    setFormData({ ...formData, officeNumber: digits })
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cell" className="text-sm font-medium text-gray-700">
                  Cell Number:
                </Label>
                {/* <Input
                  id="cell"
                  placeholder="Cell Number"
                  className="h-10"
                  value={formData.cellNumber}
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={13}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '')
                    setFormData({ ...formData, cellNumber: digits })
                  }}
                /> */}
                <Input
                  id="cell"
                  placeholder="Cell Number"
                  className="h-10"
                  value={formData.cellNumber}
                  inputMode="numeric"
                  maxLength={13}
                  onChange={(e) => {
                    let val = e.target.value;

                    // Allow "+" only at the beginning
                    if (val.startsWith('+')) {
                      val = '+' + val.slice(1).replace(/\D/g, '');
                    } else {
                      val = val.replace(/\D/g, '');
                    }

                    // Enforce max 13 length
                    if (val.length <= 13) {
                      setFormData({ ...formData, cellNumber: val });
                    }
                  }}
                />
                {errors.cellNumber && <p className="text-sm text-red-600">{errors.cellNumber}</p>}
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
                {errors.group && <p className="text-sm text-red-600">{errors.group}</p>}
              </div>
            </div>

            {/* Address Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address1" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Address Line 1: <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="address1"
                    placeholder="Address 1"
                    className="h-10 flex-1"
                    value={(formData.addressLines && formData.addressLines[0]) || ''}
                    required
                    onChange={(e) => setFormData(prev => ({ ...prev, addressLines: [e.target.value, ...(prev.addressLines?.slice(1) || [])] }))}
                  />
                  <Button type="button" className="h-10 w-10 p-0" onClick={() => setFormData(prev => ({ ...prev, addressLines: [...(prev.addressLines || ['']), ''] }))}>+</Button>
                </div>
                {errors.addressLine1 && <p className="text-sm text-red-600">{errors.addressLine1}</p>}
                {formData.addressLines && formData.addressLines.slice(1).map((al, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-2">
                    <Input
                      placeholder={`Address ${idx + 2}`}
                      className="h-10 flex-1"
                      value={al}
                      onChange={(e) => setFormData(prev => {
                        const next = [...(prev.addressLines || [])]
                        next[idx + 1] = e.target.value
                        return { ...prev, addressLines: next }
                      })}
                    />
                    <Button type="button" className="h-10 w-10 p-0" onClick={() => setFormData(prev => ({ ...prev, addressLines: prev.addressLines.filter((_, i) => i !== idx + 1) }))}>-</Button>
                  </div>
                ))}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, addressLine2: e.target.value }))}
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
                  inputMode="numeric"
                  pattern="\d*"
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '')
                    setFormData({ ...formData, zip: digits })
                  }}
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
                    type="date"
                    className="h-10"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                  {/* <CalendarDays className="absolute right-3 top-3 h-4 w-4 text-gray-400" /> */}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="anniversary" className="text-sm font-medium text-gray-700">
                  Work Anniversary:
                </Label>
                <div className="relative">
                  <Input
                    id="anniversary"
                    type="date"
                    className="h-10"
                    value={formData.workAnniversary}
                    onChange={(e) => setFormData({ ...formData, workAnniversary: e.target.value })}
                  />
                  {/* <CalendarDays className="absolute right-3 top-3 h-4 w-4 text-gray-400" /> */}
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
                  Children's Name:
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="children"
                    placeholder="Children's Name"
                    className="h-10 flex-1"
                    value={(formData.childrensNames && formData.childrensNames[0]) || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, childrensNames: [e.target.value, ...(prev.childrensNames?.slice(1) || [])] }))}
                  />
                  <Button type="button" className="h-10 w-10 p-0" onClick={() => setFormData(prev => ({ ...prev, childrensNames: [...(prev.childrensNames || ['']), ''] }))}>+</Button>
                </div>
                {formData.childrensNames && formData.childrensNames.slice(1).map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-2">
                    <Input
                      placeholder={`Child ${idx + 2}`}
                      className="h-10 flex-1"
                      value={c}
                      onChange={(e) => setFormData(prev => {
                        const next = [...(prev.childrensNames || [])]
                        next[idx + 1] = e.target.value
                        return { ...prev, childrensNames: next }
                      })}
                    />
                    <Button type="button" className="h-10 w-10 p-0" onClick={() => setFormData(prev => ({ ...prev, childrensNames: prev.childrensNames.filter((_, i) => i !== idx + 1) }))}>-</Button>
                  </div>
                ))}
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
                  Prior Employer:
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="employer"
                    placeholder="Prior Employer"
                    className="h-10 flex-1"
                    value={(formData.priorEmployers && formData.priorEmployers[0]) || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, priorEmployers: [e.target.value, ...(prev.priorEmployers?.slice(1) || [])] }))}
                  />
                  <Button type="button" className="h-10 w-10 p-0" onClick={() => setFormData(prev => ({ ...prev, priorEmployers: [...(prev.priorEmployers || ['']), ''] }))}>+</Button>
                </div>
                {formData.priorEmployers && formData.priorEmployers.slice(1).map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-2">
                    <Input
                      placeholder={`Prior Employer ${idx + 2}`}
                      className="h-10 flex-1"
                      value={p}
                      onChange={(e) => setFormData(prev => {
                        const next = [...(prev.priorEmployers || [])]
                        next[idx + 1] = e.target.value
                        return { ...prev, priorEmployers: next }
                      })}
                    />
                    <Button type="button" className="h-10 w-10 p-0" onClick={() => setFormData(prev => ({ ...prev, priorEmployers: prev.priorEmployers.filter((_, i) => i !== idx + 1) }))}>-</Button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                  End Date:
                </Label>
                <div className="relative">
                  <Input
                    id="endDate"
                    type="date"
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
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                           hover:scale-105 active:scale-95 transition-transform 
                           shadow-lg text-white px-8 py-3 rounded-xl font-semibold 
                           animate-pulse"
              >
                Register Contact
              </Button>
            </div>
          </form>
          {/* <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2">Contact Register</Button> */}
        </CardContent>
      </Card>
    </div>











  )
}
