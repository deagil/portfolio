"use client"

import { useCallback, useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  OverlayChrome,
  OverlayCloseButton,
  OverlayVisitLink,
} from "@/components/overlay-chrome"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { useDocumentBody } from "@/lib/use-is-client"

interface WorkPreviewProps {
  children: ReactNode
  description: string
  href: string
  title: string
}

function PreviewToolbar({
  onClose,
  href,
  className,
  closeSlot,
  showVisitLink = true,
}: {
  href: string
  className?: string
  onClose?: () => void
  /** Prefer DialogClose / similar when available. */
  closeSlot?: ReactNode
  showVisitLink?: boolean
}) {
  return (
    <OverlayChrome className={cn("shrink-0", className)}>
      {closeSlot ?? (
        <OverlayCloseButton onClick={onClose}>
          <X className="size-3.5" strokeWidth={2} />
          Close
        </OverlayCloseButton>
      )}
      {showVisitLink ? (
        <OverlayVisitLink href={href}>Open full page</OverlayVisitLink>
      ) : null}
    </OverlayChrome>
  )
}

function PreviewSurface({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "min-h-0 flex-1 overflow-hidden bg-background shadow-xl outline-1 outline-foreground/8",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function WorkPreview({
  children,
  description,
  href,
  title,
}: WorkPreviewProps) {
  const router = useRouter()
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  // Start closed so enter animations can run after mount.
  const [open, setOpen] = useState(false)
  const portalContainer = useDocumentBody()

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (isDesktop === null) return
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpen(true))
    })
    return () => cancelAnimationFrame(frame)
  }, [isDesktop])

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen)
  }, [])

  // Wait for exit animation before popping the intercepted route.
  const handleOpenChangeComplete = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) router.back()
    },
    [router],
  )

  if (isDesktop === null) return null

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={handleOpenChange}
        onOpenChangeComplete={handleOpenChangeComplete}
      >
        <DialogContent
          showCloseButton={false}
          className="flex h-[calc(100dvh-3rem)] max-h-[48rem] w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] flex-col gap-2.5 overflow-visible rounded-none bg-transparent p-0 text-foreground shadow-none ring-0 sm:max-w-3xl"
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
          <PreviewToolbar
            href={href}
            closeSlot={
              <DialogClose render={<OverlayCloseButton />}>
                <X className="size-3.5" strokeWidth={2} />
                Close
              </DialogClose>
            }
          />
          <PreviewSurface className="rounded-[1.25rem]">
            <div className="h-full overflow-y-auto px-8 pb-10 pt-6">
              {children}
            </div>
          </PreviewSurface>
        </DialogContent>
      </Dialog>
    )
  }

  const mobileChrome = portalContainer
    ? createPortal(
        <PreviewToolbar
          href={href}
          onClose={() => setOpen(false)}
          showVisitLink={false}
          className="pointer-events-none fixed inset-x-0 top-0 z-[60] px-4 pt-[max(0.75rem,env(safe-area-inset-top))] [&_button]:pointer-events-auto"
        />,
        portalContainer,
      )
    : null

  return (
    <>
      {mobileChrome}
      <Drawer
        open={open}
        onOpenChange={handleOpenChange}
        onOpenChangeComplete={handleOpenChangeComplete}
        showSwipeHandle
        swipeDirection="down"
      >
        <DrawerContent className="max-h-[92dvh] rounded-t-[1.25rem] bg-background">
          <DrawerTitle className="sr-only">{title}</DrawerTitle>
          <DrawerDescription className="sr-only">
            {description}
          </DrawerDescription>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
