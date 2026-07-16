import { fetchOgImageUrl } from "./og-image"

/**
 * Third-party articles and announcements cited on work detail pages.
 * Optional `image` can be an absolute URL (og:image) or a path under `public/`.
 */
export interface WorkCitation {
  url: string
  title: string
  description: string
  image?: string
}

/** Citation row with optional og:image fetched from `url` when `image` is unset. */
export type WorkCitationDisplay = WorkCitation & {
  fetchedImage?: string | null
}

export const workCitationsBySlug: Record<string, WorkCitation[]> = {
  codebase: [
    {
      url: "https://www.gov.scot/news/growing-scotlands-entrepreneurial-economy-2/",
      title: "Growing Scotland’s entrepreneurial economy",
      description:
        "Scottish Government reporting on Techscaler outcomes within the national entrepreneurship agenda.",
    },
    {
      url: "https://futurescot.com/scottish-governments-flagship-tech-programme-helps-founders-raise-52-million-in-first-year/",
      title: "Flagship tech programme helps founders raise £52 million in first year",
      description:
        "FutureScot on Techscaler’s first annual report — investment raised, hubs, and programme scale.",
    },
  ],
  "oxbury-bank": [
    {
      url: "https://www.finextra.com/newsarticle/39967/oxbury-closes-series-c-acquires-software-provider-naqoda",
      title: "Oxbury closes Series C, acquires software provider Naqoda",
      description:
        "Finextra on the bank bringing Naqoda’s core banking platform fully in-house.",
    },
    {
      url: "https://www.chesterstandard.co.uk/news/25765767.chester-tech-firm-oxbury-bank-named-fastest-growing-times/",
      title: "Chester tech firm Oxbury Bank named fastest growing by Times",
      description:
        "Chester and District Standard — Sunday Times 100 Tech (North West) and Oxbury Earth.",
    },
    {
      url: "https://financialit.net/news/banking/british-business-bank-increases-existing-sustainability-incentivising-enable-guarantee",
      title: "British Business Bank increases ENABLE guarantee with Oxbury Bank to £300M",
      description:
        "Financial IT on institutional lending capacity and sustainability-linked guarantees.",
    },
  ],
  naqoda: [
    {
      url: "https://www.finextra.com/newsarticle/39967/oxbury-closes-series-c-acquires-software-provider-naqoda",
      title: "Oxbury closes Series C, acquires software provider Naqoda",
      description:
        "Finextra — context for Naqoda as Oxbury’s cloud core banking provider pre-acquisition.",
    },
  ],
}

export function citationHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

export function workCitationsForSlug(slug: string): WorkCitation[] {
  return workCitationsBySlug[slug] ?? []
}

/** Loads og:image for each citation that does not define a manual `image`. */
export async function resolveWorkCitationsDisplay(
  slug: string,
): Promise<WorkCitationDisplay[]> {
  const raw = workCitationsForSlug(slug)
  return Promise.all(
    raw.map(async (c) => ({
      ...c,
      fetchedImage: c.image ? undefined : await fetchOgImageUrl(c.url),
    })),
  )
}
