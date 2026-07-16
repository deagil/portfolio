import { notFound } from "next/navigation"

import { WorkArticle } from "@/components/work-article"
import { WorkPreview } from "@/components/work-preview"
import { getJob } from "@/lib/jobs"

export default async function WorkPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) notFound()

  return (
    <WorkPreview
      title={`${job.title}, ${job.company}`}
      description={job.description}
      href={`/work/${job.slug}`}
    >
      <WorkArticle slug={job.slug} />
    </WorkPreview>
  )
}
