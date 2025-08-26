"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConvergenceLogo } from "@/components/convergence-logo"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Login attempt:", formData)
    setIsLoading(false)
    
    // Here you would handle the actual login logic
    // For now, redirect to dashboard page
    window.location.href = "/dashboard"
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="auth-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-[slideDown_0.6s_ease-out]">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mx-4">
          {/* Logo Section */}
          <div className="text-center mb-6">
            <ConvergenceLogo />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg 
                  className="w-4 h-4 text-gray-400" 
                  fill="none" 
                  strokeWidth="2" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                name="username"
                placeholder="User name"
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full pl-10 pr-10 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
              {formData.username && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg 
                    className="w-4 h-4 text-red-400 cursor-pointer hover:text-red-600" 
                    fill="none" 
                    strokeWidth="2" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    onClick={() => setFormData(prev => ({ ...prev, username: "" }))}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg 
                  className="w-4 h-4 text-gray-400" 
                  fill="none" 
                  strokeWidth="2" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full pl-10 pr-10 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
              {formData.password && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg 
                    className="w-4 h-4 text-red-400 cursor-pointer hover:text-red-600" 
                    fill="none" 
                    strokeWidth="2" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    onClick={() => setFormData(prev => ({ ...prev, password: "" }))}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>LOGGING IN...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    strokeWidth="2" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>LOG IN</span>
                </div>
              )}
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <Link 
                href="/forgot-password" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm border-t pt-4 mt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <Link 
                href="/signup" 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
