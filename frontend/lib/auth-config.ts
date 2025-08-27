export type Option = { id: string; label: string }

export type OrgOption = { id: string; label: string; domains?: string[] }

export const organizations: OrgOption[] = [
  { id: "acme-01", label: "ACME-01", domains: ["acme.com"] },
  { id: "flowops", label: "FlowOps", domains: ["flowops.io", "flowops.com"] },
  { id: "acaa", label: "ACAA", domains: ["acaa.org"] },
  { id: "north-01", label: "North-01", domains: ["north.example"] },
]

export const roles: Option[] = [
  { id: "firm", label: "Firm" },
  { id: "acca", label: "ACCA" },
]
