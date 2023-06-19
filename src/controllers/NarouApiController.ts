import { isNarouAPICountPart } from "../functions/typeGuards"
import axios from "axios"
import {
  NarouAPIInput,
  NarouAPINovelPart,
  NarouAPIResponse,
} from "../types/Narou"

const baseUrl = `https://api.syosetu.com/novelapi/api/?out=json`

const baseR18Url = `https://api.syosetu.com/novel18api/api/?out=json`

export class NarouApiController {
  constructor() {
    //
  }

  public async fetch(values: NarouAPIInput) {
    try {
      const result = await axios.get<NarouAPIResponse>(baseUrl)
      const first = result.data[0]

      return {
        hitCount: isNarouAPICountPart(first) ? first.allcount ?? 0 : 0,
        novels: result.data.slice(1, result.data.length) as NarouAPINovelPart[],
      }
    } catch (err) {
      throw new Error("検索時にエラーが発生しました。")
    }
  }
}
