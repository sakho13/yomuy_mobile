import { View, StyleSheet, FlatList, Pressable } from "react-native"
import { HomeScreenProps } from "../types/ScreenPropsTypes"
import { homeScreenController } from "../controllers/screens/HomeScreenController"
import NovelCell from "../components/NovelCell"
import FaIcon from "../components/atoms/FaIcon"
import ScreenWrapper from "../components/atoms/ScreenWrapper"
import PlainText from "../components/atoms/PlainText"
import LoginForm from "../components/LoginForm"
import { useAuthValue } from "../contexts/authContext"
import { useNcodeSet } from "../contexts/novelContext"

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const { novels, novelUpdate } = homeScreenController()

  const setNcode = useNcodeSet()

  if (useAuthValue().user === null) return <LoginForm />

  return (
    <ScreenWrapper>
      <FlatList
        data={novels}
        renderItem={({ item: novel }) => (
          <NovelCell
            key={novel.ncode}
            novel={novel}
            onTap={() => {
              setNcode(novel.ncode)
            }}
          />
        )}
      />

      <View style={{ ...styles.footer }}>
        <PlainText text={`最終更新日`} />

        <Pressable onPress={novelUpdate} style={styles.dlBtn}>
          <FaIcon name='redo' size={24} />
        </Pressable>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
  },

  dlBtn: {
    paddingVertical: 4,
  },
})

export default HomeScreen
