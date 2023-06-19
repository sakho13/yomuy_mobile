import { NarouAPICountPart } from "../types/Narou"

export function isNarouAPICountPart(x: any): x is NarouAPICountPart {
  return x.allcount !== undefined && typeof x.allcount === "number"
}
