import { render } from "@testing-library/react-native"
import LabeledText from "../../../src/components/atoms/LabeledText"

jest.mock("../../../src/contexts/settingContext", () => ({
  useSettingsValue: jest.fn(() => ({
    textColor: "black",
  })),
}))

describe("LabeledText", () => {
  test("shown label & content", () => {
    const { queryByText } = render(
      <LabeledText label='ここにラベル' text='ここにその内容' />,
    )
    const label = queryByText("ここにラベル:")
    const content = queryByText("ここにその内容")
    expect(label).not.toBe(null)
    expect(content).not.toBe(null)
  })
})
