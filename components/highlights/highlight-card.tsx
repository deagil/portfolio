"use client"

import Image from "next/image"
import { MapPin } from "lucide-react"
import type { Highlight } from "@/lib/highlights"
import { cn } from "@/lib/utils"

function ArrowUpRight() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 1H10M10 1V8.5M10 1L1 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface HighlightCardProps {
  highlight: Highlight
  /** When set, card opens the shared lightbox from this element’s bounds. */
  onOpen?: (originEl: HTMLElement) => void
  /** Hide the card while its morphing lightbox clone is visible. */
  covered?: boolean
}

export function HighlightCard({
  highlight,
  onOpen,
  covered = false,
}: HighlightCardProps) {
  const isExternal = highlight.href?.startsWith("http")
  const canLightbox = Boolean(highlight.coverImage && onOpen)

  const openLightbox = (el: HTMLElement) => {
    onOpen?.(el)
  }

  const inner = (
    <div
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-2xl",
        covered && "invisible",
      )}
      style={{ backgroundColor: highlight.color ?? "var(--muted)" }}
    >
      <div className="absolute inset-0">
        {highlight.coverImage ? (
          <Image
            src={highlight.coverImage}
            alt={highlight.title}
            fill
            sizes="320px"
            className={cn(
              "object-cover transition-transform duration-700 group-hover:scale-[1.04]",
              highlight.coverAlign === "right" && "object-right",
              highlight.coverAlign === "left" && "object-left",
            )}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted to-muted/60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5" />
      </div>

      <div className="relative z-10 flex h-full flex-col p-5">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[0.6875rem] font-medium capitalize text-white backdrop-blur-sm">
            {highlight.type}
          </span>
          {isExternal && highlight.href ? (
            <a
              href={highlight.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="rounded-full bg-white/15 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              aria-label={`Open ${highlight.title}`}
            >
              <ArrowUpRight />
            </a>
          ) : null}
        </div>

        <div className="mt-auto">
          <h3 className="text-[1.125rem] font-semibold leading-snug tracking-tight text-white">
            {highlight.title}
          </h3>
          {highlight.location ? (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-white/65">
              <MapPin className="h-3 w-3 shrink-0" />
              {highlight.location}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )

  if (canLightbox) {
    return (
      <button
        type="button"
        className="block h-full w-full cursor-pointer text-left"
        aria-label={`Expand ${highlight.title}`}
        onClick={(event) => openLightbox(event.currentTarget)}
      >
        {inner}
      </button>
    )
  }

  if (!highlight.href) {
    return <div className="h-full">{inner}</div>
  }

  if (isExternal) {
    return (
      <a
        href={highlight.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {inner}
      </a>
    )
  }

  return (
    <a href={highlight.href} className="block h-full">
      {inner}
    </a>
  )
}
