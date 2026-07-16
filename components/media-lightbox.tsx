"use client"

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type MouseEvent } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  OverlayActionSpacer,
  OverlayChrome,
  OverlayCloseButton,
  OverlayVisitLink,
} from "@/components/overlay-chrome"
import { cn } from "@/lib/utils"
import type { LightboxImage } from "@/lib/lightbox-media"
import { useIsClient } from "@/lib/use-is-client"

export interface LightboxOrigin {
  left: number
  top: number
  width: number
  height: number
}

interface Box extends LightboxOrigin {
  radius: number
}

interface MediaLightboxProps {
  open: boolean
  onClose: () => void
  /** Reveal the source thumb one frame before the morph layer unmounts. */
  onHandoff?: () => void
  images: LightboxImage[]
  initialIndex?: number
  /** Bounding box of the clicked thumbnail — used for the scale-in / scale-out morph. */
  origin: LightboxOrigin | null
  /** Re-measure the thumb on close so reverse morph tracks scroll. */
  getOrigin?: () => LightboxOrigin | null
  /** Fallback link when the active slide has no `href`. */
  detailHref?: string
  detailLabel?: string
}

const EASE = "cubic-bezier(0.2, 0, 0, 1)"
const MORPH_MS = 300
const CHROME_MS = 120
const THUMB_RADIUS = 12
const EXPANDED_RADIUS = 20
const TOP_CHROME = 40
const TOP_CHROME_GAP = 10

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

function isDesktopViewport(): boolean {
  return window.matchMedia("(min-width: 640px)").matches
}

function getExpandedBox(): Box {
  const desktop = isDesktopViewport()
  const pad = desktop ? 24 : 12
  /** Match work preview `max-w-3xl` (48rem / 768px). */
  const width = Math.min(768, window.innerWidth - pad * 2)
  const height = width * (10 / 16)
  return {
    left: (window.innerWidth - width) / 2,
    top: pad + TOP_CHROME + TOP_CHROME_GAP,
    width,
    height,
    radius: EXPANDED_RADIUS,
  }
}

function toBox(origin: LightboxOrigin, radius: number): Box {
  return { ...origin, radius }
}

function boxStyle(box: Box, expanded: boolean): CSSProperties {
  return {
    left: box.left,
    top: box.top,
    width: box.width,
    height: box.height,
    borderRadius: box.radius,
    boxShadow: expanded
      ? "0 24px 64px -12px rgb(0 0 0 / 0.35)"
      : "none",
  }
}

function chromeFade(visible: boolean) {
  return cn(
    "transition-[opacity,filter,transform] ease-[cubic-bezier(0.2,0,0,1)]",
    visible
      ? "translate-y-0 scale-100 opacity-100 blur-0"
      : "translate-y-1 scale-[0.98] opacity-0 blur-[4px]",
  )
}

export function MediaLightbox({
  open,
  onClose,
  onHandoff,
  images,
  initialIndex = 0,
  origin,
  getOrigin,
  detailHref,
  detailLabel = "View role",
}: MediaLightboxProps) {
  const router = useRouter()
  const titleId = useId()
  const mounted = useIsClient()
  const [active, setActive] = useState(initialIndex)
  const [present, setPresent] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [chromeVisible, setChromeVisible] = useState(false)
  const [box, setBox] = useState<Box | null>(null)
  const [animating, setAnimating] = useState(false)

  const closingRef = useRef(false)
  const morphTimerRef = useRef<number | null>(null)
  const openOriginRef = useRef<LightboxOrigin | null>(null)
  const originIndexRef = useRef(initialIndex)
  const pendingHrefRef = useRef<string | null>(null)

  const clearMorphTimer = useCallback(() => {
    if (morphTimerRef.current !== null) {
      window.clearTimeout(morphTimerRef.current)
      morphTimerRef.current = null
    }
  }, [])

  const finishClose = useCallback(() => {
    clearMorphTimer()
    // Reveal the thumb while the morph layer is still covering it, then
    // drop the layer on the next paint so there’s no empty frame.
    onHandoff?.()
    const pendingHref = pendingHrefRef.current
    pendingHrefRef.current = null
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        closingRef.current = false
        setPresent(false)
        setExpanded(false)
        setChromeVisible(false)
        setBox(null)
        setAnimating(false)
        onClose()
        if (pendingHref) router.push(pendingHref)
      })
    })
  }, [clearMorphTimer, onClose, onHandoff, router])

  const requestClose = useCallback(() => {
    if (closingRef.current || !present) return
    closingRef.current = true
    setChromeVisible(false)
    setAnimating(true)
    // Match the source thumb’s image for a seamless reverse morph.
    setActive(originIndexRef.current)

    const reduced = prefersReducedMotion()
    const latest =
      getOrigin?.() ?? openOriginRef.current ?? origin

    if (reduced || !latest) {
      finishClose()
      return
    }

    // Morph back immediately while chrome fades in parallel.
    setExpanded(false)
    setBox(toBox(latest, THUMB_RADIUS))
    clearMorphTimer()
    morphTimerRef.current = window.setTimeout(finishClose, MORPH_MS)
  }, [present, getOrigin, origin, finishClose, clearMorphTimer])

  useEffect(() => {
    if (!open || !origin) return

    closingRef.current = false
    openOriginRef.current = origin
    originIndexRef.current = initialIndex
    setActive(initialIndex)
    setPresent(true)
    setExpanded(false)
    setChromeVisible(false)
    setBox(toBox(origin, THUMB_RADIUS))
    setAnimating(true)

    const reduced = prefersReducedMotion()

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (reduced) {
          setBox(getExpandedBox())
          setExpanded(true)
          setChromeVisible(true)
          setAnimating(false)
          return
        }
        setBox(getExpandedBox())
        setExpanded(true)
        clearMorphTimer()
        morphTimerRef.current = window.setTimeout(() => {
          setChromeVisible(true)
          setAnimating(false)
        }, MORPH_MS)
      })
    })

    return () => {
      cancelAnimationFrame(frame)
      clearMorphTimer()
    }
  }, [open, origin, initialIndex, clearMorphTimer])

  useEffect(() => {
    if (!present) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onResize = () => {
      if (closingRef.current || !expanded) return
      setBox(getExpandedBox())
    }
    window.addEventListener("resize", onResize)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("resize", onResize)
    }
  }, [present, expanded])

  const goPrev = useCallback(() => {
    if (images.length <= 1 || animating) return
    setActive((i) => (i - 1 + images.length) % images.length)
  }, [images.length, animating])

  const goNext = useCallback(() => {
    if (images.length <= 1 || animating) return
    setActive((i) => (i + 1) % images.length)
  }, [images.length, animating])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!present || closingRef.current) return
      if (event.key === "Escape") {
        requestClose()
        return
      }
      if (event.key === "ArrowLeft") {
        goPrev()
      } else if (event.key === "ArrowRight") {
        goNext()
      }
    },
    [present, requestClose, goPrev, goNext],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const handleVisitClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      const current = images[active] ?? images[0]
      const href = current?.href ?? detailHref
      if (!href || href.startsWith("http")) return
      event.preventDefault()
      if (closingRef.current || !present) return
      pendingHrefRef.current = href
      requestClose()
    },
    [images, active, detailHref, present, requestClose],
  )

  if (!mounted || !present || images.length === 0 || !box) return null

  const current = images[active] ?? images[0]
  const reducedMotion = prefersReducedMotion()
  const topBarPad = isDesktopViewport() ? 24 : 12
  const topBarTop = topBarPad
  const actionHref = current.href ?? detailHref
  const actionLabel = current.linkLabel ?? detailLabel
  const actionExternal = Boolean(actionHref?.startsWith("http"))

  const renderTopActions = () => (
    <>
      <OverlayCloseButton onClick={requestClose} />
      {actionHref ? (
        <OverlayVisitLink
          href={actionHref}
          external={actionExternal}
          onClick={handleVisitClick}
        >
          {actionLabel}
        </OverlayVisitLink>
      ) : (
        <OverlayActionSpacer />
      )}
    </>
  )

  const renderNavControls = () =>
    images.length > 1 ? (
      <div className="flex items-center gap-1 rounded-full bg-background/90 p-1 shadow-sm outline-1 outline-foreground/10">
        <button
          type="button"
          onClick={goPrev}
          disabled={animating}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-foreground/8 active:scale-[0.96] disabled:cursor-default"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        </button>

        <div
          className="flex items-center gap-1.5 px-1.5"
          role="tablist"
          aria-label="Screenshots"
        >
          {images.map((image, index) => {
            const isActive = index === active
            return (
              <button
                key={image.src}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Screenshot ${index + 1}`}
                tabIndex={isActive ? 0 : -1}
                disabled={animating}
                onClick={() => setActive(index)}
                className={cn(
                  "h-2 w-2 origin-center cursor-pointer rounded-full transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)]",
                  isActive
                    ? "scale-x-[3] bg-foreground"
                    : "scale-x-100 bg-foreground/25 hover:bg-foreground/45",
                )}
              />
            )
          })}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={animating}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-foreground/8 active:scale-[0.96] disabled:cursor-default"
          aria-label="Next screenshot"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    ) : null

  const hasNav = images.length > 1

  return createPortal(
    <div
      className="fixed inset-0 z-[10000]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close"
        className={cn(
          "absolute inset-0 cursor-pointer bg-black/75 backdrop-blur-[2px] transition-opacity ease-[cubic-bezier(0.2,0,0,1)]",
          expanded ? "opacity-100" : "opacity-0",
        )}
        style={{ transitionDuration: `${MORPH_MS}ms` }}
        onClick={requestClose}
      />

      {/* Close / detail link above the image */}
      <OverlayChrome
        className={cn("fixed z-10", chromeFade(chromeVisible))}
        style={{
          left: box.left,
          top: topBarTop,
          width: box.width,
          transitionDuration: `${CHROME_MS}ms`,
        }}
      >
        {renderTopActions()}
      </OverlayChrome>

      <div
        className="fixed z-10 overflow-hidden bg-muted outline-1 outline-foreground/8 will-change-[left,top,width,height,border-radius,box-shadow]"
        style={{
          ...boxStyle(box, expanded),
          transitionProperty: "left, top, width, height, border-radius, box-shadow",
          transitionDuration: reducedMotion ? "0ms" : `${MORPH_MS}ms`,
          transitionTimingFunction: EASE,
        }}
      >
        {hasNav ? (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-10 hidden justify-center p-3 sm:flex",
              chromeFade(chromeVisible),
            )}
            style={{ transitionDuration: `${CHROME_MS}ms` }}
          >
            {renderNavControls()}
          </div>
        ) : null}

        <div className="relative h-full w-full">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
          <p id={titleId} className="sr-only">
            {current.title ?? current.alt}
          </p>
        </div>
      </div>

      {current.title || current.date || current.description ? (
        <div
          className={cn(
            "fixed z-10 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-8",
            chromeFade(chromeVisible),
          )}
          style={{
            left: box.left,
            top: box.top + box.height + 14,
            width: box.width,
            transitionDuration: `${CHROME_MS}ms`,
          }}
        >
          {current.title || current.date ? (
            <div className="sm:text-right">
              {current.title ? (
                <p className="text-[1rem] font-semibold leading-snug tracking-tight text-white">
                  {current.title}
                </p>
              ) : null}
              {current.date ? (
                <p
                  className={cn(
                    "text-[0.75rem] font-medium uppercase tracking-wider text-white/65",
                    current.title && "mt-1",
                  )}
                >
                  {current.date}
                </p>
              ) : null}
            </div>
          ) : (
            <span />
          )}
          {current.description ? (
            <p className="text-[0.875rem] font-medium leading-relaxed text-white/85">
              {current.description}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Mobile: pips + arrows pinned to the bottom of the screen */}
      {hasNav ? (
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:hidden",
            chromeFade(chromeVisible),
          )}
          style={{ transitionDuration: `${CHROME_MS}ms` }}
        >
          {renderNavControls()}
        </div>
      ) : null}
    </div>,
    document.body,
  )
}
