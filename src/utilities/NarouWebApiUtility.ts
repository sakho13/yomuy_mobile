import Axios from "axios"

export class NarouWebApiUtility {
  /**
   * https://ncode.syosetu.com/${ncode} を実行
   */
  public static async getSyosetuTop(ncode: string): Promise<string | null> {
    if (typeof ncode !== "string" || ncode.trim() === "") return null
    const res = await Axios.get<string>(
      `https://ncode.syosetu.com/${ncode.toLowerCase()}`,
    )
    return res.data
  }

  /**
   * https://ncode.syosetu.com/${ncode}/${episode} を実行
   */
  public static async getSyosetuPart(
    ncode: string,
    episode: number,
  ): Promise<string | null> {
    if (typeof ncode !== "string" || ncode.trim() === "") return null
    if (typeof episode !== "number") return null
    const res = await Axios.get<string>(
      `https://ncode.syosetu.com/${ncode.toLowerCase()}/${episode}`,
    )
    return res.data
  }
}
