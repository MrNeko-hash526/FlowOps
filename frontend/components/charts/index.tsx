"use client"

import SmallLineChart from "./SmallLineChart"
import SmallBarChart from "./SmallBarChart"
import SmallPieChart from "./SmallPieChart"
import SmallAreaChart from "./SmallAreaChart"
import SmallComposedChart from "./SmallComposedChart"
import SmallRadarChart from "./SmallRadarChart"

export const chartRegistry = [
  {
    id: "line-monthly",
    title: "Monthly Active Users",
    component: SmallLineChart,
  },
  {
    id: "bar-weekly",
    title: "Weekly Sales",
    component: SmallBarChart,
  },
  {
    id: "pie-users",
    title: "User Distribution",
    component: SmallPieChart,
  },
  {
    id: "area-traffic",
    title: "Traffic",
    component: SmallAreaChart,
  },
  {
    id: "line-traffic-2",
    title: "Traffic (Alt)",
    component: SmallLineChart,
  },
  {
    id: "bar-orders",
    title: "Orders",
    component: SmallBarChart,
  },
  {
    id: "pie-revenue",
    title: "Revenue Split",
    component: SmallPieChart,
  },
  {
    id: "composed-overview",
    title: "Composed Overview",
    component: SmallComposedChart,
  },
  {
    id: "radar-skill",
    title: "Radar - Categories",
    component: SmallRadarChart,
  },
]

export type ChartEntry = {
  id: string
  title?: string
  component: any
  // optional rendering hints
  height?: number
}

export default chartRegistry
