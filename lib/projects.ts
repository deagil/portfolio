import { formatMonthYearShort } from "./date-format"

export interface Project {
  slug: string
  title: string
  date: string
  description: string
  status: "Live" | "In Progress" | "Concept" | "Archived"
  technologies: string[]
  coverImage?: string
  link?: string
}

export const projects: Project[] = [
  {
    slug: "backroom-fpl",
    title: "Backroom for FPL",
    date: "2024-08-15",
    description:
      "Analytics and transfer planning tool for Fantasy Premier League managers. Native iOS app backed by a real-time data pipeline.",
    status: "Live",
    technologies: ["SwiftUI", "Next.js", "Supabase", "PostgreSQL"],
    coverImage: "/photos/backroom/hero.png",
    link: "https://backroom.fpl",
  },
  {
    slug: "giving-app",
    title: "Giving App",
    date: "2024-03-01",
    description:
      "Modern gifting platform that makes group contributions and wishlists frictionless. Built with React Native.",
    status: "Live",
    technologies: ["React Native", "Supabase"],
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio V1",
    date: "2023-09-01",
    description:
      "First personal site. Terminal-aesthetic SvelteKit app with a Notion-backed blog and VHS-inspired design.",
    status: "Archived",
    technologies: ["SvelteKit", "Notion API"],
  },
  {
    slug: "task-master",
    title: "Task Master",
    date: "2023-06-01",
    description: "Simple keyboard-driven task management. A scratch-your-own-itch project.",
    status: "Concept",
    technologies: ["React"],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function formatProjectDate(dateString: string): string {
  return formatMonthYearShort(dateString)
}
