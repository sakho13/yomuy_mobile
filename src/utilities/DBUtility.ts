import { CommonDate } from "../classes/CommonDate"
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

  /**
   * Supabase bookshelfに小説を追加
   * @throws RegisterToBookshelf
   */
  public static async registerBookshelf(userid: string, ncode: string) {
    const now = new CommonDate()
    const { data, error } = await supabase.from("bookshelf").insert([
      {
        own: userid,
        ncode: ncode,
        added_at: now.getByNumber,
      },
    ])
    if (error !== null) throw new LogicError("RegisterToBookshelf")
  }
}
