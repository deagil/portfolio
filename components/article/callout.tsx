import { cn } from "@/lib/utils"

interface CalloutProps {
  children: React.ReactNode
  type?: "note" | "warning" | "aside"
}

export function Callout({ children, type = "note" }: CalloutProps) {
  return (
    <aside
      className={cn(
        "my-8 border-l-2 pl-5 py-1 text-sm leading-relaxed",
        type === "note" && "border-foreground/20 text-muted-foreground",
        type === "warning" && "border-amber-500/60 text-muted-foreground",
        type === "aside" && "border-border text-muted-foreground italic",
      )}
    >
      {children}
    </aside>
  )
}
