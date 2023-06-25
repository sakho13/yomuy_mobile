import { Pressable, StyleSheet, Text, View } from "react-native"
import { useSettingsValue } from "../contexts/settingContext"
import { PureComponent, ReactNode, useContext } from "react"
import { NarouAPINovelPart, bigGenre, genre } from "../types/Narou"
import { convStrDate2Formatted } from "../functions/commonFunctions"
import LabeledText from "./atoms/LabeledText"

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

  return (
    <Pressable
      style={(pressed) => {
        return {
          ...styles.container,
          borderColor: borderColor,
          backgroundColor,
          opacity: pressed ? 0.9 : 1,
        }
      }}
      onPress={onTap}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{novel.title}</Text>

        <View style={styles.details}>
          <LabeledText
            label='最新投稿日'
            text={convStrDate2Formatted(novel.general_lastup)}
          />
          <LabeledText label='作者' text={novel.writer} />
          <LabeledText label='大ジャンル' text={bigGenre[novel.biggenre]} />
          <LabeledText label='ジャンル' text={genre[novel.genre]} />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderLeftWidth: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  info: {
    paddingHorizontal: 4,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
  },

  details: {
    paddingHorizontal: 8,
  },

  rightInfo: {
    width: 30,
  },
})

export default SearchNovelCell
