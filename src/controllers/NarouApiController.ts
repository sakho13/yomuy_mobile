import { isNarouAPICountPart } from "../functions/typeGuards"
import axios from "axios"
import {
  NarouAPIInput,
  NarouAPINovelPart,
  NarouAPIResponse,
} from "../types/Narou"

const baseQueries = "out=json&lim=50&order=new"

/** なろう小説API URL */
const baseUrl = `https://api.syosetu.com/novelapi/api/?`

/** なろうR18小説API URL */
const _baseR18Url = `https://api.syosetu.com/novel18api/api/?`

export class NarouApiController {
  public async fetch(values: NarouAPIInput, offset: number = 1) {
    try {
      const result = await axios.get<NarouAPIResponse>(
        this.generateURL(values, offset),
      )
      const first = result.data[0]

      return {
        hitCount: isNarouAPICountPart(first) ? first.allcount : 0,
        novels: result.data.slice(1, result.data.length) as NarouAPINovelPart[],
      }
    } catch (err) {
      throw new Error("検索時にエラーが発生しました。")
    }
  }

  private generateURL(values: NarouAPIInput, offset: number): string {
    const url = encodeURI(
      baseUrl + baseQueries + `&st=${offset}&` + this.parseInputs(values),
    )
    console.log(url)
    return url
  }

  private parseInputs(values: NarouAPIInput): string {
    return Object.entries(values)
      .map(([k, v]) => `${k}=${v}`)
      .join("&")
  }
}
