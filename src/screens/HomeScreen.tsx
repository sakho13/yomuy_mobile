import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native"
import { HomeScreenProps } from "../types/ScreenPropsTypes"
import { homeScreenController } from "../controllers/screens/HomeScreenController"
import NovelCell from "../components/NovelCell"
import FaIcon from "../components/atoms/FaIcon"
import ScreenWrapper from "../components/atoms/ScreenWrapper"
import PlainText from "../components/atoms/PlainText"
import { useSettingsValue } from "../contexts/settingContext"
import { parseNum2Formatted } from "../functions/commonFunctions"
import { useNcodeSet } from "../contexts/novelContext"
import BaseModal from "../components/BaseModal"

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const { secondaryColor, textColor, downloadedAt } = useSettingsValue()
  const {
    novels,
    loading,
    actionNcode,
    novelUpdate,
    openNovelInBrowser,
    removeNovel,
    openNovelActionModal,
    closeNovelActionModal,
  } = homeScreenController()

  const setNcode = useNcodeSet()

  if (loading)
    return (
      <ScreenWrapper>
        <ActivityIndicator />
      </ScreenWrapper>
    )

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
            onTapRBtn={() => openNovelActionModal(novel.ncode)}
          />
        )}
      />

      <View style={{ ...styles.footer, backgroundColor: secondaryColor }}>
        <Pressable
          onPress={loading ? undefined : novelUpdate}
          style={({ pressed }) => {
            if (loading)
              return { ...styles.updateBtn, backgroundColor: textColor }
            return {
              ...styles.updateBtn,
              backgroundColor: "#0808082A",
              opacity: pressed ? 0.6 : 1,
            }
          }}
        >
          <FaIcon name='redo' size={24} />
        </Pressable>

        <View>
          <PlainText
            text={`最終更新日: ${parseNum2Formatted(Number(downloadedAt))}`}
          />
          <PlainText text={`本棚: ${novels.length} 冊`} />
        </View>
      </View>

      {/* NovelActionModal */}
      <BaseModal
        isVisible={actionNcode !== null}
        head={`小説を操作 ${actionNcode}`}
        onClose={closeNovelActionModal}
      >
        <Pressable style={styles.naModalRow} onPress={openNovelInBrowser}>
          <PlainText text='ブラウザで開く' styles={styles.naModalLabel} />
        </Pressable>
        <Pressable style={styles.naModalRow} onPress={removeNovel}>
          <PlainText text='本棚から削除' styles={styles.naModalLabel} />
        </Pressable>
      </BaseModal>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 8,
    paddingTop: 4,
  },

  updateBtn: {
    padding: 12,
    borderRadius: 40,
  },

  naModalRow: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  naModalLabel: {
    fontSize: 20,
  },
})

export default HomeScreen
