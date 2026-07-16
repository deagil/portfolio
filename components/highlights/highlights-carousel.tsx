"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Highlight } from "@/lib/highlights"
import type { LightboxImage } from "@/lib/lightbox-media"
import { formatMonthYearShort } from "@/lib/date-format"
import {
  MediaLightbox,
  type LightboxOrigin,
} from "@/components/media-lightbox"
import { HighlightCard } from "./highlight-card"

interface HighlightsCarouselProps {
  highlights: Highlight[]
}

// Keeps the first card's left edge aligned with the main content column.
// max-w-2xl = 42rem; px-6 = 1.5rem.
const CONTENT_PADDING =
  "max(1.5rem, calc((100vw - 42rem) / 2 + 1.5rem))"

function originFromElement(el: HTMLElement): LightboxOrigin {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  }
}

function toLightboxImages(highlights: Highlight[]): {
  images: LightboxImage[]
  /** Maps lightbox index → highlight id for covered-card lookup. */
  highlightIds: string[]
} {
  const images: LightboxImage[] = []
  const highlightIds: string[] = []

  for (const highlight of highlights) {
    if (!highlight.coverImage) continue
    images.push({
      src: highlight.coverImage,
      alt: highlight.title,
      title: highlight.title,
      date: formatMonthYearShort(highlight.date),
      description: highlight.description,
      href: highlight.href,
      linkLabel: highlight.href?.startsWith("http") ? "Open link" : "View",
    })
    highlightIds.push(highlight.id)
  }

  return { images, highlightIds }
}

export function HighlightsCarousel({ highlights }: HighlightsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())
  const { images, highlightIds } = useMemo(
    () => toLightboxImages(highlights),
    [highlights],
  )

  const [session, setSession] = useState<{
    index: number
    origin: LightboxOrigin
  } | null>(null)
  const [coveredId, setCoveredId] = useState<string | null>(null)

  const getOrigin = useCallback((): LightboxOrigin | null => {
    if (!session) return null
    const id = highlightIds[session.index]
    const el = id ? cardRefs.current.get(id) : null
    return el ? originFromElement(el) : session.origin
  }, [session, highlightIds])

  const openHighlight = useCallback(
    (highlight: Highlight, originEl: HTMLElement) => {
      const index = highlightIds.indexOf(highlight.id)
      if (index < 0) return
      setCoveredId(highlight.id)
      setSession({ index, origin: originFromElement(originEl) })
    },
    [highlightIds],
  )

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    })
  }

  if (!highlights.length) return null

  return (
    <section>
      <div
        className="mb-4 flex items-center justify-between"
        style={{
          paddingLeft: CONTENT_PADDING,
          paddingRight: CONTENT_PADDING,
        }}
      >
        <h2 className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Scrapbook
        </h2>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingLeft: CONTENT_PADDING,
          paddingRight: CONTENT_PADDING,
          scrollPaddingLeft: CONTENT_PADDING,
          scrollSnapType: "x mandatory",
        }}
      >
        {highlights.map((h) => (
          <div
            key={h.id}
            ref={(el) => {
              if (el) cardRefs.current.set(h.id, el)
              else cardRefs.current.delete(h.id)
            }}
            className="w-[240px] flex-none md:w-[280px]"
            style={{
              scrollSnapAlign: "start",
              aspectRatio: h.cardAspectRatio ?? "3 / 4",
            }}
          >
            <HighlightCard
              highlight={h}
              covered={coveredId === h.id}
              onOpen={
                h.coverImage
                  ? (originEl) => openHighlight(h, originEl)
                  : undefined
              }
            />
          </div>
        ))}
      </div>

      <MediaLightbox
        open={session !== null}
        onHandoff={() => setCoveredId(null)}
        onClose={() => setSession(null)}
        images={images}
        initialIndex={session?.index ?? 0}
        origin={session?.origin ?? null}
        getOrigin={getOrigin}
        detailLabel="Open link"
      />
    </section>
  )
}
