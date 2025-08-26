"use client"

import { ConvergenceLayout } from "@/components/convergence-layout"
import chartRegistry from "@/components/charts"
import React from "react"

export default function DashboardPage() {
  return (
    <ConvergenceLayout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chartRegistry.map((entry) => {
            const Chart = entry.component
            return (
              <div key={entry.id}>
                <Chart title={entry.title} height={260} />
              </div>
            )
          })}
        </div>
      </div>
    </ConvergenceLayout>
  )
}
