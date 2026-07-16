import { WorkCitationStrip } from "@/components/work-citation-strip"
import { resolveWorkCitationsDisplay } from "@/lib/work-citations"

export function WorkCitationsSkeleton() {
  return (
    <section className="mt-14" aria-label="Press and coverage">
      <p className="mb-4 text-[0.6875rem] font-medium uppercase tracking-wide text-muted-foreground">
        Coverage
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1].map((index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-border bg-background"
          >
            <div className="aspect-[1200/630] animate-pulse bg-muted" />
            <div className="space-y-2 p-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export async function WorkCitationsSection({ slug }: { slug: string }) {
  const citations = await resolveWorkCitationsDisplay(slug)
  return <WorkCitationStrip citations={citations} />
}
