"use client"

import dynamic from "next/dynamic"
import type { JobScreenshot } from "@/lib/jobs"
import { TimelineMediaRowSkeleton } from "@/components/home/deferred-skeletons"

const TimelineMediaRow = dynamic(
  () =>
    import("@/components/timeline/timeline-media-row").then(
      (mod) => mod.TimelineMediaRow,
    ),
  {
    ssr: false,
    loading: () => <TimelineMediaRowSkeleton />,
  },
)

export function DeferredTimelineMediaRow({
  images,
  detailHref,
  detailLabel,
}: {
  images: JobScreenshot[]
  detailHref?: string
  detailLabel?: string
}) {
  return (
    <TimelineMediaRow
      images={images}
      detailHref={detailHref}
      detailLabel={detailLabel}
    />
  )
}
