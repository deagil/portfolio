"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { JobScreenshot } from "@/lib/jobs"
import {
  MediaLightbox,
  type LightboxOrigin,
} from "@/components/media-lightbox"

interface TimelineMediaRowProps {
  images: JobScreenshot[]
  detailHref?: string
  detailLabel?: string
}

function originFromElement(el: HTMLElement): LightboxOrigin {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  }
}

export function TimelineMediaRow({
  images,
  detailHref,
  detailLabel,
}: TimelineMediaRowProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [session, setSession] = useState<{
    index: number
    origin: LightboxOrigin
  } | null>(null)
  // Kept separate from session so we can reveal the thumb one paint before
  // the morph layer unmounts (avoids a blank flash on close).
  const [coveredIndex, setCoveredIndex] = useState<number | null>(null)

  const getOrigin = useCallback((): LightboxOrigin | null => {
    if (!session) return null
    const el = buttonRefs.current[session.index]
    return el ? originFromElement(el) : session.origin
  }, [session])

  if (images.length === 0) return null

  return (
    <>
      <div className="mt-2.5 -mr-6 flex flex-nowrap gap-2 overflow-x-auto pr-6 pl-[calc(1.75rem+0.625rem)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mr-0 md:overflow-visible md:pr-0">
        {images.map((image, index) => {
          const isCovered = coveredIndex === index
          return (
            <button
              key={image.src}
              type="button"
              ref={(el) => {
                buttonRefs.current[index] = el
              }}
              onClick={() => {
                const el = buttonRefs.current[index]
                if (!el) return
                setCoveredIndex(index)
                setSession({ index, origin: originFromElement(el) })
              }}
              className={cn(
                "relative h-18 w-27 shrink-0 cursor-pointer overflow-hidden rounded-xl outline-1 outline-foreground/10 transition-[transform,outline-color] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:outline-foreground/25 active:scale-[0.96] sm:h-20 sm:w-30",
                isCovered && "pointer-events-none invisible",
              )}
              aria-label={`Expand ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          )
        })}
      </div>

      <MediaLightbox
        open={session !== null}
        onHandoff={() => setCoveredIndex(null)}
        onClose={() => setSession(null)}
        images={images}
        initialIndex={session?.index ?? 0}
        origin={session?.origin ?? null}
        getOrigin={getOrigin}
        detailHref={detailHref}
        detailLabel={detailLabel}
      />
    </>
  )
}
