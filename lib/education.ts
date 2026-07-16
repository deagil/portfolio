import { formatMonthYearShort } from "./date-format"

export interface Education {
  id: string
  title: string
  /** Course start (used for display range and `dateTime` on the index). */
  startDate: string
  /** Graduation / end (used for timeline sort order). */
  date: string
  description: string
  /** Path under `public` for the index timeline. */
  icon: string
}

export function formatEducationRange(e: Education): string {
  return `${formatMonthYearShort(e.startDate)} — ${formatMonthYearShort(e.date)}`
}

export const education: Education[] = [
  {
    id: "stirling",
    title: "BSc (Hons) Business Computing — University of Stirling",
    startDate: "2015-09-01",
    date: "2019-06-01",
    description: "Graduated with 2:1. Computing, software development, and business systems.",
    icon: "/logos/stir-uni.png",
  },
]
