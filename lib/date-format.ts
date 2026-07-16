/** Compact display like `Jan '22` from an ISO date starting with year-month (or full date). */
export function formatMonthYearShort(iso: string): string {
  const [year, month] = iso.split("-").map(Number)
  const d = new Date(year, month - 1, 1)
  const monthStr = d.toLocaleDateString("en-US", { month: "short" })
  const yy = String(year).slice(-2)
  return `${monthStr} '${yy}`
}

/** Same shape as {@link formatMonthYearShort} but for “today” (month/year only). */
export function formatCurrentMonthYear(): string {
  const now = new Date()
  const monthStr = now.toLocaleDateString("en-US", { month: "short" })
  const yy = String(now.getFullYear()).slice(-2)
  return `${monthStr} '${yy}`
}
