"use client"

import { useState } from "react"
import Link from "next/link"
import { ConvergenceLogo } from "@/components/convergence-logo"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log("Password reset requested for:", email)
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="auth-gradient-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-[slideDown_0.6s_ease-out]">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mx-4">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Check your email</h2>
              <p className="text-gray-600 text-sm">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-gray-500 text-center">
                Didn't receive the email? Check your spam folder or try again.
              </p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200"
              >
                Try again
              </button>

              <div className="text-center border-t pt-3 mt-3">
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 text-sm"
                >
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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

          <div className="text-center mb-5">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Forgot password?</h2>
            <p className="text-gray-600 text-sm">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full pl-10 pr-10 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
              {email && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-red-400 cursor-pointer hover:text-red-600"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    onClick={() => setEmail("")}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>SENDING...</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>SEND RESET LINK</span>
                </div>
              )}
            </button>

            {/* Back to Sign In Link */}
            <div className="text-center border-t pt-3 mt-3">
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 text-sm"
              >
                Back to sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
