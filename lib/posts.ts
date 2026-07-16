export interface Post {
  slug: string
  title: string
  date: string
  description: string
}

export const posts: Post[] = [
  {
    slug: "building-a-design-system",
    title: "Building a Design System",
    date: "2024-11-15",
    description:
      "Reflections on the process of systematizing design—tokens, decisions, and the tradeoffs nobody talks about.",
  },
  {
    slug: "notes-on-constraint",
    title: "Notes on Constraint",
    date: "2024-08-03",
    description:
      "Constraints sharpen thinking. On creative limits as a generative force.",
  },
  {
    slug: "the-case-for-slow-software",
    title: "The Case for Slow Software",
    date: "2024-04-22",
    description:
      "Against the velocity obsession. Why building things carefully is a competitive advantage.",
  },
  {
    slug: "on-learning-to-write",
    title: "On Learning to Write",
    date: "2023-12-01",
    description:
      "What I learned about writing by writing, mostly by writing badly.",
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

