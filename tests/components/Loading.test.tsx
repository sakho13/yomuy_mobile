import { render } from "@testing-library/react-native"
import Loading from "../../src/components/Loading"
import { Text } from "react-native"

describe("Loading", () => {
  test("loaded & shown", () => {
    const { getByText } = render(
      <Loading isLoading={false}>
        <Text>読み込み終了</Text>
      </Loading>,
    )
    const element = getByText("読み込み終了")
    expect(element)
  })

  test("loading", () => {
    const { queryByText } = render(
      <Loading isLoading={true}>
        <Text>読み込み終了</Text>
      </Loading>,
    )
    const element = queryByText("読み込み終了")
    expect(element).toBe(null)
  })
})
