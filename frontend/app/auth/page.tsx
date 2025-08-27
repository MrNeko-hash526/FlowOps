"use client"

import React, { useState, useEffect } from "react"
import { ConvergenceLogo } from "@/components/convergence-logo"
import Link from "next/link"
import { organizations, roles, Option } from "@/lib/auth-config"

export default function AuthSelectionPage() {
  const [orgCode, setOrgCode] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [remember, setRemember] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload = { orgCode, role }
    try {
      if (remember) localStorage.setItem("authSelection", JSON.stringify(payload))
      // navigate to dashboard after selection
      window.location.href = "/dashboard"
    } catch (err) {
      console.error("Failed to store auth selection", err)
      window.location.href = "/dashboard"
    }
  }

  // prefill if saved
  useEffect(() => {
    try {
      const raw = localStorage.getItem("authSelection")
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.orgCode) setOrgCode(parsed.orgCode)
        if (parsed.role) setRole(parsed.role)
      }
    } catch (err) {
      // ignore
    }
  }, [])

  return (
    <div className="auth-gradient-bg flex items-center justify-center p-4 min-h-screen">
      <div className="w-full max-w-md animate-[slideDown_0.6s_ease-out]">
        <div className="bg-white rounded-3xl shadow-2xl p-6 mx-4">
          <div className="text-center mb-6">
            <ConvergenceLogo />
            <h3 className="mt-3 text-lg font-semibold text-gray-800">Access selection</h3>
            <p className="text-sm text-gray-500">Choose company and role before signing in</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600">Organization</label>
              <div className="mt-2">
                <select
                  value={orgCode}
                  onChange={(e) => setOrgCode(e.target.value)}
                  className="w-full py-2.5 pl-3 pr-8 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-400 transition-all duration-150"
                >
                  <option value="">Select organization</option>
                  {organizations.map((o: Option) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Login as</label>
              <div className="mt-2">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full py-2.5 pl-3 pr-8 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-400 transition-all duration-150"
                >
                  <option value="">Select login as</option>
                  {roles.map((r: Option) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4" />
                <span className="text-sm text-gray-600">Remember selection</span>
              </label>
              <Link href="/" className="text-sm text-gray-500 underline">Cancel</Link>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-200">
              Proceed to login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
