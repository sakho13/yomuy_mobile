import { Text, View } from "react-native"
import { NarouAPINovelPart } from "../types/Narou"
import PlainTextButton from "./atoms/PlainTextButton"

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
  if (!novel)
    return (
      <View>
        <Text>存在しない小説情報です</Text>
      </View>
    )

  return (
    <View>
      <Text>{novel.title}</Text>

      <View style={{ borderTopWidth: 1 }}>
        <View
          style={{
            // backgroundColor: "red",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignSelf: "flex-start",
            justifyContent: "space-around",
          }}
        >
          <PlainTextButton
            text='閉じる'
            onTap={onTapClose}
            gray={true}
            icon='times'
          />
          <PlainTextButton text='試し読み' onTap={onTapTry} icon='book-open' />
          <PlainTextButton text='追加' onTap={onTapAdd} icon='book' />
        </View>
      </View>
    </View>
  )
}

export default NovelDetailMain
