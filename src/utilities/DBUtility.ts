import { LogicError } from "../error/logicError"
import { NovelInBookshelf } from "../types/Yomuy"
import { supabase } from "./supabase"

export class DBUtility {
  /**
   * Supabase bookshelfから取得
   * @throws FetchBookshelf
   */
  public static async fetchBookshelf() {
    const { data } = await supabase.from("bookshelf").select("*")
    if (data === null) throw new LogicError("FetchBookshelf")

    return data.map(({ ncode, added_at }) => {
      return {
        ncode: ncode,
        addedAt: added_at,
      } as NovelInBookshelf
    })
  }
}
