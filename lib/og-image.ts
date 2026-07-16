/**
 * Fetches a page and extracts Open Graph / Twitter image URLs from HTML meta tags.
 * Used for citation cards when no manual `image` is set in `work-citations`.
 */

const FETCH_TIMEOUT_MS = 12_000

const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

function decodeMetaContent(raw: string): string {
  return raw
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

function extractMetaContent(
  html: string,
  attr: "property" | "name",
  key: string,
): string | null {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const patterns = [
    new RegExp(
      `<meta[^>]+${attr}=["']${escapedKey}["'][^>]+content=["']([^"']*)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${escapedKey}["']`,
      "i",
    ),
  ]
  for (const re of patterns) {
    const m = html.match(re)
    if (m?.[1]) return decodeMetaContent(m[1])
  }
  return null
}

function pickOgImageUrl(html: string, pageUrl: string): string | null {
  const candidates = [
    extractMetaContent(html, "property", "og:image"),
    extractMetaContent(html, "property", "og:image:secure_url"),
    extractMetaContent(html, "name", "twitter:image"),
    extractMetaContent(html, "name", "twitter:image:src"),
  ].filter(Boolean) as string[]

  const base = new URL(pageUrl)
  for (const raw of candidates) {
    try {
      const absolute = new URL(raw, base.origin).href
      if (absolute.startsWith("http")) return absolute
    } catch {
      /* next candidate */
    }
  }
  return null
}

export async function fetchOgImageUrl(pageUrl: string): Promise<string | null> {
  let url: URL
  try {
    url = new URL(pageUrl)
  } catch {
    return null
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null

  try {
    const res = await fetch(url.href, {
      headers: {
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "User-Agent": BROWSER_UA,
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: 86_400 },
    })

    if (!res.ok) return null

    const contentType = res.headers.get("content-type") ?? ""
    if (
      !contentType.includes("text/html") &&
      !contentType.includes("application/xhtml")
    ) {
      return null
    }

    const html = await res.text()
    return pickOgImageUrl(html, url.href)
  } catch {
    return null
  }
}
