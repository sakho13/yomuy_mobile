import { Pressable, StyleSheet, Text, View } from "react-native"
import { NovelInBookshelf } from "../types/Yomuy"
import { useSettingsValue } from "../contexts/settingContext"
import { novelCellStyle } from "../styles/novelCellStyles"
import PlainText from "./atoms/PlainText"
import LabeledText from "./atoms/LabeledText"
import { convStrDate2Formatted } from "../functions/commonFunctions"
import FaIcon from "./atoms/FaIcon"

type Props = {
  novel: NovelInBookshelf
  onTap: () => void
  onTapRBtn: () => void
}

const DownloadedNovelCell: React.FC<Props> = ({ novel, onTap, onTapRBtn }) => {
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
          <LabeledText
            label='最終投稿日'
            text={convStrDate2Formatted(novel.general_lastup)}
          />
        </View>
      </View>

      <View style={styles.rightBar}>
        <Pressable
          style={({ pressed }) => {
            if (pressed)
              return {
                ...styles.infoBtn,
                backgroundColor: "#00000046",
                opacity: 0.6,
              }
            return { ...styles.infoBtn }
          }}
          onPress={onTapRBtn}
        >
          <FaIcon name='ellipsis-v' size={18} />
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  rightBar: {
    paddingLeft: 8,
    paddingRight: 12,
    paddingVertical: 4,
  },

  infoBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
})

export default DownloadedNovelCell
