import { render } from "@testing-library/react-native"
import PlainText from "../../../src/components/atoms/PlainText"

jest.mock("../../../src/contexts/settingContext", () => ({
  useSettingsValue: jest.fn(() => ({
    textColor: "black",
  })),
}))

describe("PlainText", () => {
  test("shown text", () => {
    const { getByText } = render(<PlainText text='ここにテキストが入るよ' />)

    const shownText = getByText("ここにテキストが入るよ")

    expect(shownText)
  })

  test("check textColor", () => {
    const { getByText } = render(<PlainText text='表示されるテキスト' />)

    const element = getByText("表示されるテキスト")

    expect(element.props.style.color).toBe("black")
  })
})
