import { StyleSheet, Text, View } from "react-native"
import { DownloadedNovelInfo } from "../types/Yomuy"
import { CommonDate } from "../classes/CommonDate"
import { useContext } from "react"
import { SettingContext } from "../../App"

type Props = {
  novel: DownloadedNovelInfo
  onTap: () => void
}

const DownloadedNovelCell: React.FC<Props> = ({ novel }) => {
  const dlDate = new CommonDate(novel.lastUpAt)
  // const { primaryColor } = useContext(SettingContext)

  return (
    <View
      style={{
        ...styles.container,
        // backgroundColor: primaryColor
      }}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{novel.title}</Text>
        <Text>最終掲載: {dlDate.getByKanji}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderWidth: 0.4,
    borderRadius: 8,
  },
  info: {},

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default DownloadedNovelCell
