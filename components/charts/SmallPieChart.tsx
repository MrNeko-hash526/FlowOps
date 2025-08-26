"use client"

import React from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

type DataPoint = { name: string; value?: number }

type Props = {
  title?: string
  height?: number
  data?: DataPoint[]
  colors?: string[]
}

const defaultData: DataPoint[] = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]

const defaultColors = ["#2563eb", "#1e40af", "#60a5fa", "#93c5fd"]

export default function SmallPieChart({ title, height = 220, data = defaultData, colors = defaultColors }: Props) {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      {title && <div className="text-sm font-medium text-gray-700 mb-3">{title}</div>}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={60} innerRadius={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
