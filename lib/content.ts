import type { ComponentType } from "react"

import BuildingADesignSystem from "@/content/building-a-design-system"
import NotesOnConstraint from "@/content/notes-on-constraint"
import TheCaseForSlowSoftware from "@/content/the-case-for-slow-software"
import OnLearningToWrite from "@/content/on-learning-to-write"

export const contentMap: Record<string, ComponentType> = {
  "building-a-design-system": BuildingADesignSystem,
  "notes-on-constraint": NotesOnConstraint,
  "the-case-for-slow-software": TheCaseForSlowSoftware,
  "on-learning-to-write": OnLearningToWrite,
}
