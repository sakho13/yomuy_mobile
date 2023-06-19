import {
  ScrollView,
  View,
  StyleSheet,
  Pressable,
  Modal,
  Button,
  TextInput,
} from "react-native"
import { searchScreenController } from "../controllers/screens/SearchScreenController"
import SearchNovelCell from "../components/SearchNovelCell"
import FaIcon from "../components/atoms/FaIcon"
import { useSettingsValue } from "../contexts/settingContext"
import React, { useState } from "react"
import { SettingScreenProps } from "../types/ScreenPropsTypes"

const SearchScreen: React.FC<SettingScreenProps> = () => {
  const {
    novels,
    openingSearchModal,
    selectedIndex,
    toggleSearchModal,
    search,
    onTappedNovel,
  } = searchScreenController()

  const { backgroundColor, primaryColor, secondaryColor } = useSettingsValue()

  const [tappedSearch, setTappedSearch] = useState(false)

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <ScrollView>
        {novels.map((novel, i) => (
          <SearchNovelCell
            key={i}
            novel={novel}
            onTap={() => onTappedNovel(i)}
          />
        ))}
      </ScrollView>

      <Pressable
        style={({ pressed }) => {
          return {
            ...styles.fab,
            backgroundColor: pressed ? backgroundColor : secondaryColor,
          }
        }}
        onPress={() => {
          setTappedSearch(true)
        }}
        onPressOut={() => {
          setTappedSearch(false)
        }}
      >
        <FaIcon name='search' size={40} />
      </Pressable>

      <Modal animationType='slide' visible={selectedIndex !== null}></Modal>

      <Modal animationType='slide' visible={openingSearchModal}>
        <TextInput />

        <Button title='検索' onPress={search} />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#B46060",
    ...StyleSheet.absoluteFillObject,
  },

  fab: {
    zIndex: 10,
    position: "absolute",
    borderRadius: 10,
    borderWidth: 2,
    padding: 6,
    bottom: "4%",
    right: "4%",
  },

  fabTapped: {
    opacity: 0.9,
  },
})

export default SearchScreen
