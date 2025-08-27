"use client"

import React from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

type DataPoint = { name: string; uv?: number }

type Props = {
  title?: string
  height?: number
  data?: DataPoint[]
  color?: string
}

const defaultData: DataPoint[] = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 500 },
  { name: "Apr", uv: 200 },
  { name: "May", uv: 278 },
  { name: "Jun", uv: 189 },
]

export default function SmallLineChart({ title, height = 220, data = defaultData, color = "#2563eb" }: Props) {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      {title && <div className="text-sm font-medium text-gray-700 mb-3">{title}</div>}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
