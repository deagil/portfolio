import { formatMonthYearShort } from "./date-format"
import { jobs, formatJobRange, type JobScreenshot } from "./jobs"
import { education, formatEducationRange } from "./education"

export type EntryType =
  | "writing"
  | "project"
  | "job"
  | "trip"
  | "event"
  | "education"

export interface TimelineEntry {
  id: string
  title: string
  date: string
  /** Internal path or external URL. Undefined = non-linked informational entry. */
  href?: string
  external?: boolean
  type: EntryType
  description: string
  /** Optional label for secondary UI (e.g. lightbox). */
  badge?: string
  /** Overrides the date column (e.g. job ranges). */
  displayDate?: string
  /** True when this is an ongoing job (no end date). */
  currentRole?: boolean
  /** Logo path under `public` for the index timeline. */
  icon?: string
  /** Company name for job lightbox visit label (`About CodeBase`). */
  company?: string
  /** Optional media row under the title; expands into a lightbox. */
  screenshots?: JobScreenshot[]
}

function formatDisplayDate(dateString: string): string {
  return formatMonthYearShort(dateString)
}

/** Resume roles and education only (see `posts` / `projects` for other content). */
export function getTimeline(): TimelineEntry[] {
  const entries: TimelineEntry[] = [
    ...jobs.map((j) => ({
      id: `job-${j.id}`,
      title: `${j.title}, ${j.company}`,
      date: j.date,
      href: `/work/${j.slug}`,
      external: false,
      type: "job" as const,
      description: j.description,
      badge: "Work",
      displayDate: formatJobRange(j),
      currentRole: j.endDate === undefined,
      icon: j.icon,
      company: j.company,
      screenshots: j.screenshots,
    })),

    ...education.map((e) => ({
      id: `education-${e.id}`,
      title: e.title,
      date: e.date,
      type: "education" as const,
      description: e.description,
      badge: "Education",
      icon: e.icon,
      displayDate: formatEducationRange(e),
    })),
  ]

  return entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export { formatDisplayDate }
