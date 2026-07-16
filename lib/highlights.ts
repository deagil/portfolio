export type HighlightType = "trip" | "event"

export interface Highlight {
  id: string
  title: string
  date: string
  type: HighlightType
  description: string
  location?: string
  href?: string
  coverImage?: string
  color?: string
  /** CSS aspect ratio for the carousel tile (default `3/4` portrait). */
  cardAspectRatio?: string
  /** Horizontal emphasis for `object-cover` on the photo (`center` default). */
  coverAlign?: "center" | "left" | "right"
}

export const highlights: Highlight[] = [
  {
    id: "techscaler-silicon-valley",
    title: "Techscaler Silicon Valley",
    date: "2025-05-13",
    type: "trip",
    description:
      "Supported founders in San Francisco for two weeks as part of the Techscaler programme.",
    location: "San Francisco, California",
    href: "https://techscaler.co.uk",
    coverImage: "/photos/2025/sf.jpeg",
    color: "#A4D3F3",
  },
  {
    id: "no-code-summit",
    title: "No Code Summit 2024",
    date: "2024-10-15",
    type: "event",
    description:
      "Attended No Code Summit in Paris — the annual gathering for no-code and automation builders.",
    location: "Paris, France",
    coverImage: "/photos/2024/no_code_summit.jpg",
    color: "#F3E29A",
  },
  {
    id: "codebase-away-day-2024",
    title: "CodeBase Away Day '24",
    date: "2024-09-10",
    type: "event",
    description: "Annual team away day with the CodeBase cohort.",
    location: "Edinburgh, Scotland",
    href: "https://codebase.co.uk",
    coverImage: "/photos/2025/away_day.jpg",
    color: "#F3C49A",
  },
  {
    id: "codebase-away-day-2023",
    title: "CodeBase Away Day '23",
    date: "2023-09-14",
    type: "event",
    description: "Team away day with CodeBase — offsite with the crew.",
    location: "Edinburgh, Scotland",
    href: "https://thisiscodebase.com/",
    coverImage: "/photos/2023/cb_away_day.jpeg",
    color: "#E8C4A8",
  },
  {
    id: "oxbury-100m-deposits",
    title: "Oxbury £100m deposits",
    date: "2022-07-20",
    type: "event",
    description:
      "Celebrating the savings milestone with the Oxbury team — deposits powering lending back into the rural economy.",
    location: "Chester, England",
    href: "https://www.oxbury.com/",
    coverImage: "/photos/2022/oxbury_100m.jpeg",
    color: "#B8D4A8",
    coverAlign: "right",
  },
  {
    id: "naqoda-wfh-pandemic",
    title: "Team Naqoda WFH",
    date: "2021-02-18",
    type: "event",
    description:
      "Building core banking from home during the pandemic — Naqoda kept shipping while offices were closed.",
    location: "Clackmannanshire, Scotland",
    href: "https://www.naqoda.systems/",
    coverImage: "/photos/2022/wfh_covid.jpeg",
    color: "#C9D4E8",
    cardAspectRatio: "5/4",
  },
]
