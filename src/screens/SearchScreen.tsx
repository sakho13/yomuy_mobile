import { View, StyleSheet, ActivityIndicator } from "react-native"
import { searchScreenController } from "../controllers/screens/SearchScreenController"
import SearchNovelCell from "../components/SearchNovelCell"
import React, { useEffect, useState } from "react"
import { SettingScreenProps } from "../types/ScreenPropsTypes"
import SlideModal from "../components/SlideModal"
import PlainTextInput from "../components/PlainTextInput"
import { FlatList } from "react-native"
import PlainTextButton from "../components/PlainTextButton"
import NovelDetailMain from "../components/NovelDetailMain"
import { useNcodeSet } from "../contexts/novelContext"
import IconFab from "../components/IconFab"
import PlainText from "../components/atoms/PlainText"
import ScreenWrapper from "../components/atoms/ScreenWrapper"

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
        <PlainText text={listMessage} />
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
        style={{ ...StyleSheet.absoluteFillObject }}
      />
    )

  return (
    <ScreenWrapper>
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
      >
        {selectedIndex !== null ? (
          <NovelDetailMain
            novel={novels[selectedIndex]}
            onTapClose={closeNovelDetailModal}
            onTapTry={() => {
              setNcode(novels[selectedIndex].ncode)
              closeNovelDetailModal()
            }}
            onTapAdd={() => addBookShelf(novels[selectedIndex])}
          />
        ) : (
          <View>
            <PlainText text='存在しない小説情報です' />
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
    </ScreenWrapper>
  )
}

export default SearchScreen
