"use client"

import React from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

type DataPoint = { name: string; sales?: number }

type Props = {
  title?: string
  height?: number
  data?: DataPoint[]
  color?: string
}

const defaultData: DataPoint[] = [
  { name: "Mon", sales: 120 },
  { name: "Tue", sales: 200 },
  { name: "Wed", sales: 150 },
  { name: "Thu", sales: 80 },
  { name: "Fri", sales: 170 },
  { name: "Sat", sales: 90 },
]

export default function SmallBarChart({ title, height = 220, data = defaultData, color = "#1e3a8a" }: Props) {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      {title && <div className="text-sm font-medium text-gray-700 mb-3">{title}</div>}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="sales" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
