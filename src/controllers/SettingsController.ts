import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  SettingsType,
  settingsDefaultValues,
  SettingsTypeKeys,
  settingsTypeKeys,
} from "../types/SettingsType"

export class SettingsController {
  private settings: SettingsType = JSON.parse(
    JSON.stringify(settingsDefaultValues),
  )

  public async initializer() {
    const pairs = await AsyncStorage.multiGet(settingsTypeKeys)
    pairs.forEach(([key, value]) => {
      if (value !== null && value !== "" && this.isSettingsTypeKey(key)) {
        if (key === "theme")
          this.settings.theme = value === "dark" ? "dark" : "light"
        else this.settings.downloadedAt = value
      }
    })
  }

  public getValue(key: SettingsTypeKeys) {
    return this.settings[key]
  }

  public get getValues() {
    return this.settings
  }

  public async updateValue(key: SettingsTypeKeys, value: string) {
    console.log("> update:", key, value)
    await AsyncStorage.setItem(key, value)
    this.settings[key] = value as any
  }

  public async reset() {
    await AsyncStorage.multiRemove(settingsTypeKeys)
  }

  private isSettingsTypeKey(x: string): x is SettingsTypeKeys {
    return settingsTypeKeys.includes(x as any)
  }
}
