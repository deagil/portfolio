import type { ComponentType } from "react"

import { CodebaseDescription, CodebaseBullets } from "@/content/work/codebase"
import { OxburyDescription, OxburyBullets } from "@/content/work/oxbury-bank"
import { NaqodaDescription, NaqodaBullets } from "@/content/work/naqoda"

export interface JobArticleParts {
  Description: ComponentType
  Bullets: ComponentType
}

export const jobArticleMap: Record<string, JobArticleParts> = {
  codebase: {
    Description: CodebaseDescription,
    Bullets: CodebaseBullets,
  },
  "oxbury-bank": {
    Description: OxburyDescription,
    Bullets: OxburyBullets,
  },
  naqoda: {
    Description: NaqodaDescription,
    Bullets: NaqodaBullets,
  },
}
