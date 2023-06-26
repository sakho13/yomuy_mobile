import { Text, View, StyleSheet, FlatList } from "react-native"
import { HomeScreenProps } from "../types/ScreenPropsTypes"
import { homeScreenController } from "../controllers/screens/HomeScreenController"
import NovelCell from "../components/NovelCell"
import FaIcon from "../components/atoms/FaIcon"

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const { novels } = homeScreenController()

  return (
    <View style={styles.container}>
      <FlatList
        data={novels}
        renderItem={({ item: novel }) => (
          <NovelCell key={novel.ncode} novel={novel} onTap={() => {}} />
        )}
      />

      <View style={{ ...styles.bottom }}>
        <Text>aaa</Text>

        <View style={styles.dlBtn}>
          <FaIcon name='file-download' size={24} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  bottom: {
    flexDirection: "row",
  },

  dlBtn: {
    paddingVertical: 4,
  },
})

export default HomeScreen
