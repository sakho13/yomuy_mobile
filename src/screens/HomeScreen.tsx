import { ScrollView, Text, View, StyleSheet, Button } from "react-native"
import { HomeScreenProps } from "../types/ScreenPropsTypes"
import { homeScreenController } from "../controllers/screens/HomeScreenController"
import NovelCell from "../components/NovelCell"
import FaIcon from "../components/FaIcon"
import { useContext, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// const Stack = createNativeStackNavigator()

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const { novels } = homeScreenController()

  const navigation = useNavigation()

  useEffect(() => {
    // console.log(backgroundColor, secondaryColor)
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        {novels.map((novel) => {
          return <NovelCell key={novel.ncode} novel={novel} onTap={() => {}} />
        })}
      </ScrollView>

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
    // backgroundColor: "#B46060",
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
