"use client"

import { useState } from "react"
import Link from "next/link"
import { ConvergenceLogo } from "@/components/convergence-logo"
import * as yup from "yup"

const api_url = process.env.NEXT_PUBLIC_API_URL;

// Yup validation schema
const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .matches(/^[A-Za-z\s]+$/, "First name can only contain letters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .matches(/^[A-Za-z\s]+$/, "Last name can only contain letters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .matches(/(?=.*\d)/, "Password must contain at least one number"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref('password')], "Passwords must match")
})

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const validateField = async (field: string, value: string) => {
    try {
      await signupSchema.validateAt(field, { ...formData, [field]: value })
      setErrors(prev => ({ ...prev, [field]: "" }))
    } catch (err: any) {
      setErrors(prev => ({ ...prev, [field]: err.message }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      // Validate entire form
      await signupSchema.validate(formData, { abortEarly: false })
      
      console.log("API URL:", api_url);

      const response = await fetch(`${api_url}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json()
      if (!response.ok) {
        alert(data.error || 'Signup failed')
        setIsLoading(false)
        return
      }

      // Signup successful, redirect to login
      window.location.href = "/login"
    } catch (error: any) {
      if (error.inner) {
        // Yup validation errors
        const validationErrors: Record<string, string> = {}
        error.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message
        })
        setErrors(validationErrors)
      } else {
        alert('Signup error: ' + error.message)
      }
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Validate field on change (debounced)
    validateField(name, value)
  }

  const clearField = (fieldName: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: "" }))
    setErrors(prev => ({ ...prev, [fieldName]: "" }))
  }

  return (
    <div className="auth-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-[slideDown_0.6s_ease-out]">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mx-4">
          {/* Logo Section */}
          <div className="text-center mb-5">
            <ConvergenceLogo />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-3">
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
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className={`w-full pl-10 pr-8 py-2.5 bg-blue-50 border-2 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-200 text-sm ${
                    errors.firstName ? "border-red-500 focus:border-red-500" : "border-blue-200 focus:border-blue-500"
                  }`}
                />
                {formData.firstName && (
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <svg
                      className="w-3 h-3 text-red-400 cursor-pointer hover:text-red-600"
                      fill="none"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      onClick={() => clearField("firstName")}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1 px-1">{errors.firstName}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className={`w-full pl-3 pr-8 py-2.5 bg-blue-50 border-2 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-200 text-sm ${
                    errors.lastName ? "border-red-500 focus:border-red-500" : "border-blue-200 focus:border-blue-500"
                  }`}
                />
                {formData.lastName && (
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <svg
                      className="w-3 h-3 text-red-400 cursor-pointer hover:text-red-600"
                      fill="none"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      onClick={() => clearField("lastName")}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1 px-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className={`w-full pl-10 pr-10 py-2.5 bg-blue-50 border-2 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-200 text-sm ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-blue-200 focus:border-blue-500"
                }`}
              />
              {formData.email && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-red-400 cursor-pointer hover:text-red-600"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    onClick={() => clearField("email")}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 px-1">{errors.email}</p>
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
                className={`w-full pl-10 pr-10 py-2.5 bg-blue-50 border-2 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-200 text-sm ${
                  errors.password ? "border-red-500 focus:border-red-500" : "border-blue-200 focus:border-blue-500"
                }`}
              />
              {formData.password && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-red-400 cursor-pointer hover:text-red-600"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    onClick={() => clearField("password")}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 px-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className={`w-full pl-10 pr-10 py-2.5 bg-blue-50 border-2 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-200 text-sm ${
                  errors.confirmPassword ? "border-red-500 focus:border-red-500" : "border-blue-200 focus:border-blue-500"
                }`}
              />
              {formData.confirmPassword && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-red-400 cursor-pointer hover:text-red-600"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    onClick={() => clearField("confirmPassword")}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 px-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>CREATING...</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>CREATE ACCOUNT</span>
                </div>
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center text-sm border-t pt-3 mt-3">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
