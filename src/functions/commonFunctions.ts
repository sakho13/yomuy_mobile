export function zeroOffset(num: number, len: number): string {
  const str = String(num)
  if (str.length >= len) return `${num}`

  const zeros = [...Array(len)].map(() => 0)
  return (zeros.join("") + str).slice(-len)
}

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
