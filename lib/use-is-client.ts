import { useSyncExternalStore } from "react"

/** True after hydration; false during SSR. Avoids mount-only useEffect setState. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

/** Returns `document.body` on the client; null during SSR. */
export function useDocumentBody(): HTMLElement | null {
  return useSyncExternalStore(
    () => () => {},
    () => document.body,
    () => null,
  )
}
