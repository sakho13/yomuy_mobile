import { Text, View, ScrollView } from "react-native"
import { NarouAPINovelPart } from "../types/Narou"
import PlainTextButton from "./PlainTextButton"
import PlainText from "./atoms/PlainText"
import { useSettingsValue } from "../contexts/settingContext"

type Props = {
  novel: NarouAPINovelPart
  onTapClose: () => void
  onTapTry: () => void
  onTapAdd: () => void
}

const NovelDetailMain: React.FC<Props> = ({
  novel,
  onTapClose,
  onTapTry,
  onTapAdd,
}) => {
  const { borderColor } = useSettingsValue()

  if (!novel)
    return (
      <View>
        <Text>存在しない小説情報です</Text>
        <PlainTextButton text='閉じる' onTap={onTapClose} icon='times' />
      </View>
    )

  return (
    <View
      style={{
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View style={{ minHeight: 200, maxHeight: 300, marginBottom: 8 }}>
        <PlainText
          text={novel.title}
          styles={{ fontSize: 18, marginHorizontal: 8, marginBottom: 4 }}
        />

        <ScrollView style={{ paddingTop: 4, borderTopWidth: 1, borderColor }}>
          <PlainText text={novel.story} />
        </ScrollView>
      </View>

      <View style={{ borderTopWidth: 1, borderColor }}>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignSelf: "flex-start",
            justifyContent: "space-around",
          }}
        >
          <PlainTextButton text='閉じる' onTap={onTapClose} icon='times' />
          <PlainTextButton text='試し読み' onTap={onTapTry} icon='book-open' />
          <PlainTextButton text='追加' onTap={onTapAdd} icon='book' />
        </View>
      </View>
    </View>
  )
}

export default NovelDetailMain
