import {
  View,
  StyleSheet,
  Switch,
  ActivityIndicator,
  Pressable,
} from "react-native"
import { SettingScreenProps } from "../types/ScreenPropsTypes"
import { useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { SettingScreenController } from "../controllers/screens/SettingScreenController"
import PlainText from "../components/atoms/PlainText"
import ScreenWrapper from "../components/atoms/ScreenWrapper"
import { useSettingsValue } from "../contexts/settingContext"
import BaseModal from "../components/BaseModal"
import PlainTextButton from "../components/PlainTextButton"

const SettingScreen: React.FC<SettingScreenProps> = ({}) => {
  const {
    theme,
    loading,
    openingAboutModal,
    initLocalSetting,
    toggleTheme,
    openContactForm,
    openAboutModal,
    closeAboutModal,
  } = SettingScreenController()

  const { primaryColor, borderColor } = useSettingsValue()

  useFocusEffect(
    useCallback(() => {
      initLocalSetting()
    }, []),
  )

  return (
    <ScreenWrapper styles={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.row}>
            <PlainText text='ダークテーマ' styles={styles.label} />
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{
                true: primaryColor,
              }}
            />
          </View>

          <View style={{ ...styles.divider, borderColor }} />

          <Pressable
            style={{
              ...styles.row,
              justifyContent: "flex-start",
              alignItems: "baseline",
            }}
            onPress={openContactForm}
          >
            <PlainText text='要望・問い合わせ' styles={styles.label} />
            <PlainText
              text='(Google Form)'
              styles={{ fontSize: 14, marginLeft: 18 }}
            />
          </Pressable>

          <Pressable style={styles.row} onPress={openAboutModal}>
            <PlainText text='本アプリについて' styles={styles.label} />
          </Pressable>

          {/* AboutThisAppModal */}
          <BaseModal
            head='本アプリについて'
            isVisible={openingAboutModal}
            onClose={closeAboutModal}
            bgTouchable={true}
          >
            <PlainText text='制作者: Sakho' />

            <View style={styles.divider} />

            <PlainText text='「小説家になろう」は株式会社ヒナプロジェクトの登録商標です' />

            <View style={{ marginTop: 16 }} />

            <PlainTextButton
              text='閉じる'
              onTap={closeAboutModal}
              icon='times'
            />
          </BaseModal>
        </>
      )}

      {/* <View style={styles.row}>
        <Text style={styles.label}>setting</Text>
        <TextInput
          style={styles.value}
          onChangeText={(text) => changeBackgroundColor(text)}
          value={localSettings.backgroundColor}
        ></TextInput>
      </View> */}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  label: {
    fontSize: 20,
  },
  value: {
    fontSize: 20,
    borderBottomWidth: 0.8,
    minWidth: "30%",
  },

  divider: {
    borderTopWidth: 1,
    marginBottom: 8,
    marginTop: 8,
  },
})

export default SettingScreen
