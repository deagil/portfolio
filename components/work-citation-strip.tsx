import Image from "next/image"
import { citationHost, type WorkCitationDisplay } from "@/lib/work-citations"
import { cn } from "@/lib/utils"

function displayImageSrc(citation: WorkCitationDisplay): string | undefined {
  if (citation.image?.startsWith("/")) return citation.image
  if (citation.image?.startsWith("http")) return citation.image
  if (citation.fetchedImage?.startsWith("http")) return citation.fetchedImage
  return undefined
}

function CitationImage({
  citation,
  className,
}: {
  citation: WorkCitationDisplay
  className?: string
}) {
  const host = citationHost(citation.url)
  const src = displayImageSrc(citation)

  if (src?.startsWith("/")) {
    return (
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className={cn("object-cover", className)}
      />
    )
  }

  if (src?.startsWith("http")) {
    return (
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        unoptimized
        referrerPolicy="no-referrer"
        className={cn("object-cover", className)}
      />
    )
  }

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-muted px-3 text-center",
        className,
      )}
    >
      <span className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
        {host}
      </span>
    </div>
  )
}

function CitationCard({ citation }: { citation: WorkCitationDisplay }) {
  const host = citationHost(citation.url)

  return (
    <a
      href={citation.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-background transition-colors hover:bg-muted/50"
    >
      <div className="relative aspect-[1200/630] w-full overflow-hidden bg-muted">
        <CitationImage citation={citation} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-3">
        <p className="line-clamp-2 text-[0.8125rem] font-medium leading-snug text-foreground group-hover:underline group-hover:underline-offset-2">
          {citation.title}
        </p>
        <p className="line-clamp-2 text-[0.75rem] leading-snug text-muted-foreground">
          {citation.description}
        </p>
        <p className="mt-auto pt-1 text-[0.6875rem] text-muted-foreground">{host}</p>
      </div>
    </a>
  )
}

export function WorkCitationStrip({
  citations,
}: {
  citations: WorkCitationDisplay[]
}) {
  if (citations.length === 0) return null

  return (
    <section className="mt-14" aria-label="Press and coverage">
      <p className="mb-4 text-[0.6875rem] font-medium uppercase tracking-wide text-muted-foreground">
        Coverage
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {citations.map((c) => (
          <CitationCard key={c.url} citation={c} />
        ))}
      </div>
    </section>
  )
}
