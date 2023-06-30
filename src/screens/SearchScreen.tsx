import { View, StyleSheet, Text, ActivityIndicator } from "react-native"
import { searchScreenController } from "../controllers/screens/SearchScreenController"
import SearchNovelCell from "../components/SearchNovelCell"
import { useSettingsValue } from "../contexts/settingContext"
import React, { useEffect, useState } from "react"
import { SettingScreenProps } from "../types/ScreenPropsTypes"
import SlideModal from "../components/SlideModal"
import PlainTextInput from "../components/PlainTextInput"
import { FlatList } from "react-native"
import PlainTextButton from "../components/atoms/PlainTextButton"
import NovelDetailMain from "../components/NovelDetailMain"
import { useNcodeSet } from "../contexts/novelContext"
import IconFab from "../components/IconFab"

const SearchScreen: React.FC<SettingScreenProps> = () => {
  const {
    novels,
    openingSearchModal,
    selectedIndex,
    searchItems,
    isFetching,
    fetchingMore,
    listMessage,

    initState,
    toggleSearchModal,
    closeSearchModal,
    search,
    searchMore,
    onTappedNovel,
    changeWord,
    closeNovelDetailModal,
    addBookShelf,
  } = searchScreenController()

  const setNcode = useNcodeSet()

  const { backgroundColor } = useSettingsValue()

  const [_tappedSearch, setTappedSearch] = useState(false)

  useEffect(() => {
    initState()
  }, [])

  const novelList =
    novels.length === 0 ? (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Text>{listMessage}</Text>
      </View>
    ) : (
      <FlatList
        data={novels}
        renderItem={({ index, item: novel }) => (
          <SearchNovelCell
            key={novel.ncode}
            novel={novel}
            onTap={() => onTappedNovel(index)}
          />
        )}
        keyExtractor={(novel) => novel.ncode}
        ListFooterComponent={fetchingMore ? <ActivityIndicator /> : null}
        // 続きの取得
        onEndReached={searchMore}
        onEndReachedThreshold={0.1}
      />
    )

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      {isFetching ? <ActivityIndicator size={"large"} /> : novelList}

      {/* SearchButton FAB */}
      <IconFab
        icon='search'
        onPress={() => {
          setTappedSearch(true)
          toggleSearchModal()
        }}
        onPressOut={() => {
          setTappedSearch(false)
        }}
      />

      {/* NovelDetailModal */}
      <SlideModal
        head='小説情報'
        isVisible={selectedIndex !== null}
        onClose={closeNovelDetailModal}
        bgTouchable={true}
      >
        {selectedIndex !== null ? (
          <NovelDetailMain
            novel={novels[selectedIndex]}
            onTapClose={closeNovelDetailModal}
            onTapTry={() => setNcode(novels[selectedIndex].ncode)}
            onTapAdd={() => addBookShelf(novels[selectedIndex])}
          />
        ) : (
          <View>
            <Text>存在しない小説情報です</Text>
          </View>
        )}
      </SlideModal>

      {/* SearchingModal */}
      <SlideModal
        head='検索項目'
        isVisible={openingSearchModal}
        onClose={closeSearchModal}
      >
        <View style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
          <PlainTextInput
            placeholder='検索ワード'
            state={searchItems.word}
            onChange={changeWord}
          />
        </View>

        <PlainTextButton text='検索' onTap={search} icon='search' />
      </SlideModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default SearchScreen
