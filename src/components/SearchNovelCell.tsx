import { Pressable, View } from "react-native"
import { useSettingsValue } from "../contexts/settingContext"
import { PureComponent, ReactNode } from "react"
import { NarouAPINovelPart, bigGenre, genre } from "../types/Narou"
import { convStrDate2Formatted } from "../functions/commonFunctions"
import LabeledText from "./atoms/LabeledText"
import PlainText from "./atoms/PlainText"
import { novelCellStyle } from "../styles/novelCellStyles"

type Props = {
  novel: NarouAPINovelPart
  onTap: () => void
}

/**
 * 検索結果表示（1要素）
 */
class SearchNovelCell extends PureComponent<Props> {
  render(): ReactNode {
    return (
      <SearchNovelCellMain novel={this.props.novel} onTap={this.props.onTap} />
    )
  }
}

const SearchNovelCellMain: React.FC<Props> = ({ novel, onTap }) => {
  const { backgroundColor, borderColor } = useSettingsValue()

  const isTanpenOrKanketsu = novel.end === 0
  const isTanpen = isTanpenOrKanketsu && novel.general_all_no === 1

  const episodeTxt = isTanpen
    ? "短編"
    : isTanpenOrKanketsu
    ? `${novel.general_all_no}話 完`
    : `${novel.general_all_no}話`

  return (
    <Pressable
      style={(pressed) => {
        return {
          ...novelCellStyle.container,
          borderColor: borderColor,
          backgroundColor,
          opacity: pressed ? 0.9 : 1,
        }
      }}
      onPress={onTap}
    >
      <View style={novelCellStyle.info}>
        <PlainText text={novel.title} styles={novelCellStyle.title} />

        <View style={novelCellStyle.details}>
          <LabeledText
            label='最新投稿日'
            text={`${convStrDate2Formatted(
              novel.general_lastup,
            )} (${episodeTxt})`}
          />
          <LabeledText label='作者' text={novel.writer} />
          <LabeledText label='大ジャンル' text={bigGenre[novel.biggenre]} />
          <LabeledText label='ジャンル' text={genre[novel.genre]} />
        </View>
      </View>
    </Pressable>
  )
}

export default SearchNovelCell
