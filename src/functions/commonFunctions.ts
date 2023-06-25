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
  const date = dateStr.split(" ")
  const [yyyy, mm, dd] = date[0].split("-")
  const [hh, mi, _ss] = date[1].split(":")
  return `${yyyy}年${mm}月${dd}日 ${hh}時${mi}分`
}
