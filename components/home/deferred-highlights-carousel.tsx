"use client"

import dynamic from "next/dynamic"
import type { Highlight } from "@/lib/highlights"
import { HighlightsCarouselSkeleton } from "@/components/home/deferred-skeletons"

const HighlightsCarousel = dynamic(
  () =>
    import("@/components/highlights/highlights-carousel").then(
      (mod) => mod.HighlightsCarousel,
    ),
  {
    ssr: false,
    loading: () => <HighlightsCarouselSkeleton />,
  },
)

export function DeferredHighlightsCarousel({
  highlights,
}: {
  highlights: Highlight[]
}) {
  return <HighlightsCarousel highlights={highlights} />
}
