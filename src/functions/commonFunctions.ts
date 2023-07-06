/**
 * ゼロでオフセットする
 */
export function zeroOffset(num: number, len: number): string {
  const str = String(num)
  if (str.length >= len) return `${num}`

  const zeros = [...Array(len)].map(() => 0)
  return (zeros.join("") + str).slice(-len)
}

/**
 * カラーコードのフォーマットである
 */
export function isColorText(text: string): text is string {
  if (text[0] !== "#") return false
  if (!(text.length === 7 || text.length === 9)) return false

  const codes: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "a",
    "B",
    "b",
    "C",
    "c",
    "D",
    "d",
    "E",
    "e",
    "F",
    "f",
  ]

  const colorCell = text.slice(1, text.length).split("")
  for (const c of colorCell) if (!codes.includes(c)) return false

  return true
}

/**
 * 9999-12-31 24:59:59 を 9999年12月31日 24時59分 形式に変換する
 */
export function convStrDate2Formatted(dateStr: string) {
  if (dateStr.length !== 19) return "unknown"
  const date = dateStr.split(" ")
  const [yyyy, mm, dd] = date[0].split("-")
  const [hh, mi, _ss] = date[1].split(":")
  return `${yyyy}年${mm}月${dd}日 ${hh}時${mi}分`
}

/**
 * テキストから 9999/12/31 24:59 部分を取得する
 * @param text
 */
export function parseDateFormatText(text: string): string {
  const reg = /\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}/
  const parsed = text.match(reg)
  return parsed && parsed[0] ? parsed[0].trim() : ""
}

/**
 * 99991231125959999 から 9999/12/31 12:59 に変換する
 */
export function parseNum2Formatted(num: number): string {
  const str = String(num)
  if (str.length !== 17) return "unknown"

  const y = parseInt(str.slice(0, 4))
  const m = parseInt(str.slice(4, 6))
  const d = parseInt(str.slice(6, 8))
  const h = parseInt(str.slice(8, 10))
  const mi = parseInt(str.slice(10, 12))

  return `${y}/${m}/${d} ${h}:${mi}`
}
