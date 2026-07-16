import { Suspense } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"

import {
  WorkCitationsSection,
  WorkCitationsSkeleton,
} from "@/components/work-citations-section"
import { jobArticleMap } from "@/lib/job-content"
import { formatJobRange, getJob } from "@/lib/jobs"
import { cn } from "@/lib/utils"

function OrgLinkMark({ src }: { src: string }) {
  return (
    <span
      className="relative flex size-7 shrink-0 items-center justify-center"
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        width={28}
        height={28}
        className="max-h-7 max-w-7 object-contain"
        unoptimized
      />
    </span>
  )
}

export async function WorkArticle({ slug }: { slug: string }) {
  const job = getJob(slug)
  if (!job) notFound()

  const parts = jobArticleMap[job.slug]
  if (!parts) notFound()

  const { Description, Bullets } = parts

  return (
    <>
      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          <a
            href={job.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <OrgLinkMark src={job.icon} />
            {job.company}
          </a>
          <p
            className={cn(
              "text-sm tabular-nums",
              !job.endDate ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {formatJobRange(job)}
          </p>
        </div>

        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground">
          {job.title}
        </h1>
      </header>

      <article className="flex flex-col gap-8">
        <Description />

        {job.logos.length > 0 ? (
          <div className="flex flex-wrap items-center gap-4">
            {job.logos.map((logo) => (
              <Image
                key={logo.src}
                src={logo.src}
                alt={logo.label}
                width={24}
                height={24}
                className={cn(
                  "max-h-6 w-auto object-contain",
                  logo.src === "/logos/cursor.svg" && "invert dark:invert-0",
                )}
                unoptimized
                title={logo.label}
              />
            ))}
          </div>
        ) : null}

        <Bullets />
      </article>

      <Suspense fallback={<WorkCitationsSkeleton />}>
        <WorkCitationsSection slug={job.slug} />
      </Suspense>
    </>
  )
}
