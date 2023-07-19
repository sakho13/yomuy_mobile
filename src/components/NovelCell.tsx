import { Pressable, StyleSheet, View } from "react-native"
import { NovelDetail } from "../types/Yomuy"
import { useSettingsValue } from "../contexts/settingContext"
import { novelCellStyle } from "../styles/novelCellStyles"
import PlainText from "./atoms/PlainText"
import LabeledText from "./atoms/LabeledText"

type Props = {
  novel: NovelDetail
  onTap: () => void
}

const DownloadedNovelCell: React.FC<Props> = ({ novel, onTap }) => {
  const { borderColor, backgroundColor } = useSettingsValue()

  return (
    <Pressable
      style={({ pressed }) => {
        return {
          ...novelCellStyle.container,
          borderColor,
          backgroundColor,
          opacity: pressed ? 0.9 : 1,
        }
      }}
      onPress={onTap}
    >
      <View style={novelCellStyle.info}>
        <PlainText text={novel.title} styles={novelCellStyle.title} />

        <View style={novelCellStyle.details}>
          <LabeledText label='最終投稿日' text={`${novel.lastUpAt}`} />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({})

export default DownloadedNovelCell
