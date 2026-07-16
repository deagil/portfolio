import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { getTimeline, formatDisplayDate, type TimelineEntry } from "@/lib/timeline"
import { highlights } from "@/lib/highlights"
import { DeferredHighlightsCarousel } from "@/components/home/deferred-highlights-carousel"
import { DeferredTimelineMediaRow } from "@/components/home/deferred-timeline-media-row"

function InlineAvatar() {
  return (
    <span className="relative mx-2 inline-block h-[1em] w-[1em] translate-y-[0.12em] overflow-hidden rounded-full align-baseline">
      <Image
        src="/photos/headshot.png"
        alt="Dylan Gilchrist"
        fill
        sizes="64px"
        className="object-cover"
        priority
      />
    </span>
  )
}

function timelineDateLabel(entry: TimelineEntry): string {
  return entry.displayDate ?? formatDisplayDate(entry.date)
}

function TimelineMark({ src }: { src: string }) {
  return (
    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center" aria-hidden>
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

function LinkedEntry({ entry }: { entry: TimelineEntry & { href: string } }) {
  const dateLabel = timelineDateLabel(entry)
  return (
    <div className="py-2.5">
      <Link
        href={entry.href}
        className="group -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-1 transition-colors duration-100 hover:bg-muted/60"
      >
        {entry.icon ? <TimelineMark src={entry.icon} /> : <span className="w-7 shrink-0" />}
        <span className="min-w-0 flex-1 text-[0.9375rem] leading-snug text-foreground">
          {entry.title}
        </span>
        <time
          dateTime={entry.date}
          className={cn(
            "shrink-0 self-center whitespace-nowrap text-right text-xs leading-snug tabular-nums",
            entry.currentRole ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {dateLabel}
        </time>
      </Link>
      {entry.screenshots && entry.screenshots.length > 0 ? (
        <DeferredTimelineMediaRow
          images={entry.screenshots}
          detailHref={entry.href}
          detailLabel={entry.company ? `About ${entry.company}` : "View role"}
        />
      ) : null}
    </div>
  )
}

function UnlinkedEntry({ entry }: { entry: TimelineEntry }) {
  const dateLabel = timelineDateLabel(entry)
  return (
    <div className="-mx-2 flex items-center gap-2.5 px-2 py-2.5">
      {entry.icon ? <TimelineMark src={entry.icon} /> : <span className="w-7 shrink-0" />}
      <span className="min-w-0 flex-1 text-[0.9375rem] leading-snug text-muted-foreground">
        {entry.title}
      </span>
      <time
        dateTime={entry.date}
        className="shrink-0 self-center whitespace-nowrap text-right text-xs leading-snug tabular-nums text-muted-foreground"
      >
        {dateLabel}
      </time>
    </div>
  )
}

export default function HomePage() {
  const timeline = getTimeline()

  return (
    <>
      <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        {/* Hero */}
        <header className="mb-16">
          <h1 className="mb-6 text-[2.25rem] font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.75rem]">
            Hi 👋 I&apos;m Dylan
            <InlineAvatar />
            <br />
            a software &amp;
            <br className="md:hidden" />
            {" "}
            product engineer.
          </h1>
          <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
            I&apos;ve spent six-plus years building platform systems for startups,
            accelerators, and financial services—from core banking and integrations
            to Techscaler&apos;s national programmes and the Next.js platforms we ship
            at{" "}
            <Link
              href="/work/codebase"
              className="text-foreground underline underline-offset-2 decoration-border hover:decoration-foreground transition-colors"
            >
              CodeBase
            </Link>
            , where I&apos;m Product Engineer &amp; Data Manager. I care about
            technology that fits real life, and about working with ambitious teams to
            ship products that make a tangible difference.
          </p>
        </header>

        {/* Unified timeline */}
        <ul>
          {timeline.map((entry) =>
            entry.href ? (
              <li key={entry.id}>
                <LinkedEntry entry={entry as TimelineEntry & { href: string }} />
              </li>
            ) : (
              <li key={entry.id}>
                <UnlinkedEntry entry={entry} />
              </li>
            ),
          )}
        </ul>
      </main>

      {/* Carousel sits outside <main> so it can span the full viewport */}
      <DeferredHighlightsCarousel highlights={highlights} />

      <div className="pb-16 md:pb-24" />
    </>
  )
}
