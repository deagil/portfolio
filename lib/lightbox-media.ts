/** Shared media item for job thumbs and highlight lightbox. */
export interface LightboxImage {
  src: string
  alt: string
  /** Shown under the image in the lightbox only. */
  title?: string
  /** Optional date line under the title (e.g. `May '25`). */
  date?: string
  /** Shown under the title in the lightbox only. */
  description?: string
  /** Optional per-slide link (e.g. highlight external URL). */
  href?: string
  linkLabel?: string
}
