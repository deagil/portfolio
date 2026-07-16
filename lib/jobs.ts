import { formatCurrentMonthYear, formatMonthYearShort } from "./date-format"
import type { LightboxImage } from "./lightbox-media"

export type { LightboxImage }
export type JobScreenshot = LightboxImage

export interface JobLogo {
  src: string
  label: string
}

export interface Job {
  id: string
  slug: string
  title: string
  company: string
  /** ISO start (year-month); used for sorting and dateTime. */
  date: string
  /** ISO end month for past roles; omit when current. */
  endDate?: string
  companyUrl: string
  /** Short summary for the index timeline and meta description. */
  description: string
  technologies: string[]
  /** Logos rendered as icons on the detail page. */
  logos: JobLogo[]
  /** Path under `public` for the index timeline. */
  icon: string
  /** Optional home-timeline media; expands into a lightbox on click. */
  screenshots?: JobScreenshot[]
}

export function formatJobRange(job: Job): string {
  const start = formatMonthYearShort(job.date)
  const end = job.endDate
    ? formatMonthYearShort(job.endDate)
    : formatCurrentMonthYear()
  return `${start} — ${end}`
}

export const jobs: Job[] = [
  {
    id: "codebase",
    slug: "codebase",
    title: "Data Manager & Product Engineer",
    company: "CodeBase",
    date: "2022-10-01",
    companyUrl: "https://thisiscodebase.com/",
    description:
      "Sole engineer launching Techscaler (Scotland’s £42M national accelerator): data capture, reporting, and internal systems from zero to production in under six weeks (Zapier, Retool, HubSpot, AWS RDS, REST APIs). Co-led CodeBase’s first Product team. Shipping a Next.js platform for education and mentorship across six programmes.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Retool",
      "Zapier",
      "HubSpot",
      "AWS RDS",
      "REST APIs",
    ],
    logos: [
      { src: "/logos/zapier.svg", label: "Zapier" },
      { src: "/logos/retool.svg", label: "Retool" },
      { src: "/logos/hubspot.svg", label: "HubSpot" },
      { src: "/logos/aws.svg", label: "AWS" },
      { src: "/logos/supabase.svg", label: "Supabase" },
      { src: "/logos/postgresql.svg", label: "PostgreSQL" },
      { src: "/logos/nextjs.svg", label: "Next.js" },
      { src: "/logos/typescript.svg", label: "TypeScript" },
      { src: "/logos/cursor.svg", label: "Cursor" },
      { src: "/logos/claude.svg", label: "Claude" },
    ],
    icon: "/logos/codebase.png",
    screenshots: [
      {
        src: "/photos/techscaler-stand.jpg",
        alt: "Techscaler stand at an event",
        title: "Techscaler stand",
        description:
          "On the ground supporting founders through Techscaler’s national accelerator programmes.",
      },
      {
        src: "/photos/2025/away_day.jpg",
        alt: "CodeBase away day",
        title: "CodeBase Away Day",
        description:
          "Annual team away day with the CodeBase cohort — offsite with the crew.",
      },
      {
        src: "/photos/2025/sf.jpeg",
        alt: "Techscaler Silicon Valley trip",
        title: "Techscaler Silicon Valley",
        description:
          "Supported founders in San Francisco for two weeks as part of the Techscaler programme.",
      },
    ],
  },
  {
    id: "oxbury",
    slug: "oxbury-bank",
    title: "Software Engineer",
    company: "Oxbury Bank",
    date: "2022-01-01",
    endDate: "2022-10-01",
    companyUrl: "https://www.oxbury.com",
    description:
      "After Oxbury acquired Naqoda: documentation and video training for developers, pull-request review, feature delivery, and first/second-line support for production banking systems.",
    technologies: [
      "Core banking",
      "Technical writing",
      "Production support",
      "Code review",
    ],
    logos: [
      { src: "/logos/php.svg", label: "PHP" },
      { src: "/logos/mysql.svg", label: "MySQL" },
      { src: "/logos/clearbank.jpeg", label: "ClearBank" },
      { src: "/logos/jenkins.svg", label: "Jenkins" },
    ],
    icon: "/logos/oxbury.png",
  },
  {
    id: "naqoda",
    slug: "naqoda",
    title: "Software Developer",
    company: "Naqoda",
    date: "2020-02-01",
    endDate: "2022-01-01",
    companyUrl: "https://www.naqoda.systems/",
    description:
      "Core banking: transactions, payments, and direct debit collection. Integrations with ClearBank, Experian CAIS, and ComplyAdvantage; close collaboration with Oxbury through their 2021 launch.",
    technologies: [
      "PHP",
      "MySQL",
      "Payments",
      "Banking integrations",
      "REST APIs",
    ],
    logos: [
      { src: "/logos/php.svg", label: "PHP" },
      { src: "/logos/mysql.svg", label: "MySQL" },
      { src: "/logos/clearbank.jpeg", label: "ClearBank" },
      { src: "/logos/experian.png", label: "Experian" },
      { src: "/logos/jenkins.svg", label: "Jenkins" },
    ],
    icon: "/logos/naqoda.png",
  },
]

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug)
}
