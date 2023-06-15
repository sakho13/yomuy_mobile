import { NarouAPICountPart } from "../types/Yomuy"

export function isNarouAPICountPart(x: any): x is NarouAPICountPart {
  return x.allcount !== undefined && typeof x.allcount === "number"
}
