"use client"

import React from "react"
import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

type DataPoint = { name: string; uv?: number; pv?: number; amt?: number }

type Props = {
  title?: string
  height?: number
  data?: DataPoint[]
  colors?: { line?: string; bar?: string; area?: string }
}

const defaultData: DataPoint[] = [
  { name: "Jan", uv: 400, pv: 240, amt: 240 },
  { name: "Feb", uv: 300, pv: 139, amt: 221 },
  { name: "Mar", uv: 500, pv: 980, amt: 229 },
  { name: "Apr", uv: 200, pv: 390, amt: 200 },
  { name: "May", uv: 278, pv: 480, amt: 218 },
  { name: "Jun", uv: 189, pv: 380, amt: 250 },
]

export default function SmallComposedChart({ title, height = 360, data = defaultData, colors = {} }: Props) {
  const { line = "#2563eb", bar = "#1e40af", area = "#60a5fa" } = colors

  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      {title && <div className="text-sm font-medium text-gray-700 mb-3">{title}</div>}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Area type="monotone" dataKey="amt" fill={area} stroke={area} fillOpacity={0.12} />
            <Bar dataKey="pv" barSize={20} fill={bar} />
            <Line type="monotone" dataKey="uv" stroke={line} strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
