"use client"

import React from "react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts"

type DataPoint = { subject: string; A?: number; B?: number }

type Props = {
  title?: string
  height?: number
  data?: DataPoint[]
  color?: string
}

const defaultData: DataPoint[] = [
  { subject: "Math", A: 120, B: 110 },
  { subject: "Chinese", A: 98, B: 130 },
  { subject: "English", A: 86, B: 130 },
  { subject: "Geography", A: 99, B: 100 },
  { subject: "Physics", A: 85, B: 90 },
  { subject: "History", A: 65, B: 85 },
]

export default function SmallRadarChart({ title, height = 360, data = defaultData, color = "#2563eb" }: Props) {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      {title && <div className="text-sm font-medium text-gray-700 mb-3">{title}</div>}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="A" dataKey="A" stroke={color} fill={color} fillOpacity={0.12} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
