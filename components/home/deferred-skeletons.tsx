const CONTENT_PADDING =
  "max(1.5rem, calc((100vw - 42rem) / 2 + 1.5rem))"

export function HighlightsCarouselSkeleton() {
  return (
    <section aria-hidden>
      <div
        className="mb-4 flex items-center justify-between"
        style={{
          paddingLeft: CONTENT_PADDING,
          paddingRight: CONTENT_PADDING,
        }}
      >
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        <div className="flex gap-1.5">
          <div className="h-7 w-7 animate-pulse rounded-full bg-muted" />
          <div className="h-7 w-7 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
      <div
        className="flex gap-4 overflow-hidden pb-8"
        style={{
          paddingLeft: CONTENT_PADDING,
          paddingRight: CONTENT_PADDING,
        }}
      >
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="aspect-[3/4] w-[240px] flex-none animate-pulse rounded-lg bg-muted md:w-[280px]"
          />
        ))}
      </div>
    </section>
  )
}

export function TimelineMediaRowSkeleton() {
  return (
    <div className="mt-2 flex gap-2 px-2" aria-hidden>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="h-16 w-24 flex-none animate-pulse rounded-md bg-muted sm:h-20 sm:w-28"
        />
      ))}
    </div>
  )
}
