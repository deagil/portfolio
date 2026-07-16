import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProject, formatProjectDate, projects } from "@/lib/projects"
import { projectContentMap } from "@/lib/project-content"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Dylan Gilchrist`,
    description: project.description,
  }
}

const statusColors: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  "In Progress": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Concept: "bg-muted text-muted-foreground",
  Archived: "bg-muted text-muted-foreground",
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const Content = projectContentMap[slug]

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      {/* Cover image */}
      {project.coverImage && (
        <div className="mb-10 overflow-hidden rounded-xl border border-border">
          <Image
            src={project.coverImage}
            alt={project.title}
            width={1200}
            height={675}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.6875rem] text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Visit ↗
            </a>
          )}
        </div>

        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-foreground">
          {project.title}
        </h1>

        <p className="mb-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[0.6875rem] font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      {Content && (
        <>
          <hr className="mb-10 border-border" />
          <article className="prose max-w-none">
            <Content />
          </article>
        </>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-border pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span aria-hidden>←</span>
          <span>Back to index</span>
        </Link>
      </footer>
    </main>
  )
}
