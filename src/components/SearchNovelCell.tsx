import { Pressable, StyleSheet, Text, View } from "react-native"
import { CommonDate } from "../classes/CommonDate"
import { useSettingsValue } from "../contexts/settingContext"
import { useContext } from "react"
import { NarouAPINovelPart } from "../types/Narou"
import FaIcon from "./atoms/FaIcon"

type Props = {
  novel: NarouAPINovelPart
  onTap: () => void
}

const SearchNovelCell: React.FC<Props> = ({ novel, onTap }) => {
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
          <Text>ジャンル</Text>
          <Text>ジャンル</Text>
        </View>
      </View>

      {/* <View style={styles.rightInfo}>
        <Pressable>
          <Text style={{ fontSize: 24 }}>︙</Text>
        </Pressable>
      </View> */}
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
  // checkboxContainer: {
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  info: {
    // paddingVertical: 4,
  },

  title: {
    fontSize: 16,
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
