import Link from "next/link"

import { WorkArticle } from "@/components/work-article"
import { getJob, jobs } from "@/lib/jobs"

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) return {}
  return {
    title: `${job.title}, ${job.company} — Dylan Gilchrist`,
    description: job.description,
  }
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <WorkArticle slug={slug} />

      <footer className="mt-16">
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
