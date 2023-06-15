import { zeroOffset } from "../functions/commonFunctions"

export class CommonDate {
  private date: Date

  constructor(date?: string | number) {
    if (typeof date === "number") this.date = this.convNum2Date(date)
    if (typeof date === "string") this.date = new Date(date)
    else this.date = new Date()
  }

  public get getByNumber(): number {
    const d = this.convObj()
    return Number(
      [
        zeroOffset(d.year, 4),
        zeroOffset(d.month, 2),
        zeroOffset(d.date, 2),
        zeroOffset(d.hour, 2),
        zeroOffset(d.min, 2),
        zeroOffset(d.sec, 2),
        zeroOffset(d.msec, 3),
      ].join(""),
    )
  }

  public get getByFormat(): string {
    const d = this.convObj()
    return (
      [
        zeroOffset(d.year, 4),
        zeroOffset(d.month, 2),
        zeroOffset(d.date, 2),
      ].join("-") +
      " " +
      [zeroOffset(d.hour, 2), zeroOffset(d.min, 2), zeroOffset(d.sec, 2)].join(
        ":",
      ) +
      "." +
      zeroOffset(d.msec, 3)
    )
  }

  public get getByKanji() {
    const d = this.convObj()
    return `${d.year}年${d.month}月${d.date}日 ${d.hour}時${d.min}分`
  }

  // *************** PRIVATE ***************

  private convObj() {
    return {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      date: this.date.getDate(),
      hour: this.date.getHours(),
      min: this.date.getMinutes(),
      sec: this.date.getSeconds(),
      msec: this.date.getMilliseconds(),
    }
  }

  private convNum2Date(num: number): Date {
    const n = `${num}`
    if (n.length !== 17) return new Date()

    const y = parseInt(n.slice(0, 4))
    const m = parseInt(n.slice(4, 6))
    const d = parseInt(n.slice(6, 8))
    const h = parseInt(n.slice(8, 10))
    const mi = parseInt(n.slice(10, 12))
    const s = parseInt(n.slice(12, 14))
    const ms = parseInt(n.slice(14, 17))

    return new Date(y, m, d, h, mi, s, ms)
  }
}
