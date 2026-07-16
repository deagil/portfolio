"use client"

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const overlayActionClassName =
  "flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-background/90 px-3 text-[0.8125rem] font-medium text-foreground shadow-sm outline-1 outline-foreground/10 transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-background active:scale-[0.96]"

export function OverlayChrome({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={cn("flex items-center justify-between gap-3", className)}
      style={style}
    >
      {children}
    </div>
  )
}

export const OverlayCloseButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function OverlayCloseButton({ className, type = "button", children, ...props }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(overlayActionClassName, className)}
      {...props}
    >
      {children ?? (
        <>
          <X className="size-3.5" strokeWidth={2} />
          Close
        </>
      )}
    </button>
  )
})

export function OverlayVisitLink({
  href,
  children,
  className,
  external = false,
  onClick,
}: {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={onClick}
      className={cn(overlayActionClassName, className)}
    >
      {children}
    </Link>
  )
}

export function OverlayActionSpacer() {
  return <span className="size-8" aria-hidden />
}
