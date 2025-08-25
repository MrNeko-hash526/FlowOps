"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Search, User, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ContactManagement } from "@/components/contact-management" // Import ContactManagement component
import { UserRegistration } from "@/components/user-registration" // Import UserRegistration component
import { UserManagement } from "@/components/user-management" // Import UserManagement component
import { MyUploads } from "@/components/my-uploads" // Import MyUploads component
import { MyDownloads } from "@/components/my-downloads" // Import MyDownloads component
import { AddNotice } from "@/components/add-notice" // Import AddNotice component
import { ViewNotice } from "@/components/view-notice" // Import ViewNotice component

interface ConvergenceLayoutProps {
  children: React.ReactNode
}

export function ConvergenceLayout({ children }: ConvergenceLayoutProps) {
  const [activeModule, setActiveModule] = useState("contact-registration")
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["administration", "document-transfer"])

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]))
  }

  const menuItems = [
    { id: "schedule-batch", label: "Schedule Batch Report", icon: "📊" },
    { id: "task-report", label: "Task Report", icon: "📋" },
    {
      id: "document-transfer",
      label: "Document Transfer",
      icon: "📁",
      children: [
        { id: "my-uploads", label: "My Uploads" },
        { id: "my-downloads", label: "My Downloads" },
      ],
    },
    {
      id: "administration",
      label: "Administration",
      icon: "⚙️",
      children: [
        { id: "manage-notice", label: "Manage Notice" },
        {
          id: "manage-contact",
          label: "Manage Contact",
          children: [
            { id: "manage-user", label: "Manage User" },
            { id: "view-contact", label: "View Contact" },
          ],
        },
      ],
    },
  ]

  const renderMenuItem = (item: any, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedMenus.includes(item.id)
    const paddingLeft = `${(level + 1) * 12}px`

    return (
      <div key={item.id}>
        <div
          className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
            activeModule === item.id ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" : "text-gray-700"
          }`}
          style={{ paddingLeft }}
          onClick={() => {
            if (hasChildren) {
              toggleMenu(item.id)
            } else {
              setActiveModule(item.id)
            }
          }}
        >
          <div className="flex items-center gap-2">
            {level === 0 && <span className="text-blue-600">{item.icon}</span>}
            <span>{item.label}</span>
          </div>
          {hasChildren && (isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
        </div>
        {hasChildren && isExpanded && <div>{item.children.map((child: any) => renderMenuItem(child, level + 1))}</div>}
      </div>
    )
  }

  const renderContent = () => {
    switch (activeModule) {
      case "view-contact":
        return <ContactManagement />
      case "manage-user":
        return <UserRegistration />
      case "user-management":
        return <UserManagement />
      case "my-uploads":
        return <MyUploads />
      case "my-downloads":
        return <MyDownloads />
      case "manage-notice": // Add case for manage-notice to show AddNotice
        return <AddNotice />
      case "view-notice": // Add case for view-notice to show ViewNotice
        return <ViewNotice />
      default:
        return children
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold">FlowOps</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-red-600">
              <Bell className="h-5 w-5" />
              <Badge className="ml-1 bg-yellow-500 text-black text-xs">0</Badge>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-red-600">
              <User className="h-5 w-5" />
              <Badge className="ml-1 bg-green-500 text-white text-xs">13</Badge>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-red-600">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-red-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-white text-red-600 text-sm font-semibold">B</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Bandana</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <nav className="py-4">{menuItems.map((item) => renderMenuItem(item))}</nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
