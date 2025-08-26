"use client"

import React, { useState } from "react"
import { ConvergenceLogo } from "@/components/convergence-logo"
import Link from "next/link"

export default function AuthSelectionPage() {
  const [orgCode, setOrgCode] = useState("")
  const [role, setRole] = useState<"firm" | "acca">("firm")
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
              <div className="mt-2 grid grid-cols-2 gap-3">
                {[
                  { id: "acme-01", label: "ACME-01" },
                  { id: "flowops", label: "FlowOps" },
                  { id: "acaa", label: "ACAA" },
                  { id: "north-01", label: "North-01" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer border w-full justify-center text-sm font-medium ${
                      orgCode === opt.id ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="orgCode"
                      value={opt.id}
                      checked={orgCode === opt.id}
                      onChange={() => setOrgCode(opt.id)}
                      className="hidden"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Login as</label>
              <div className="mt-2 flex items-center gap-4">
                <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer border ${role === "firm" ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"}`}>
                  <input type="radio" name="role" value="firm" checked={role === "firm"} onChange={() => setRole("firm")} className="hidden" />
                  <span className="text-sm font-medium">Firm</span>
                </label>
                <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer border ${role === "acca" ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"}`}>
                  <input type="radio" name="role" value="acca" checked={role === "acca"} onChange={() => setRole("acca")} className="hidden" />
                  <span className="text-sm font-medium">ACCA</span>
                </label>
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
