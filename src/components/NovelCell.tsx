import { Pressable, StyleSheet, Text, View } from "react-native"
import { NovelInBookshelf } from "../types/Yomuy"
import { CommonDate } from "../classes/CommonDate"
import { useSettingsValue } from "../contexts/settingContext"
import { novelCellStyle } from "../styles/novelCellStyles"

type Props = {
  novel: NovelInBookshelf
  onTap: () => void
}

const DownloadedNovelCell: React.FC<Props> = ({ novel }) => {
  const addedAt = new CommonDate(novel.addedAt)

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
    >
      <View style={styles.info}>
        <Text style={styles.title}>{novel.title}</Text>
        <Text>最終掲載: {addedAt.getByKanji}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  info: {},

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default DownloadedNovelCell
