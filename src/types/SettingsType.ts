export const settingsColorTypeKeys = [
  "backgroundColor",
  "secondaryColor",
  "borderColor",
  "textColor",
  "primaryColor",
] as const

export const settingsThemeTypeKeys = ["theme"] as const

export const settingsDateTypeKeys = ["downloadedAt"] as const

export const settingsTypeKeys = [
  ...settingsThemeTypeKeys,
  ...settingsDateTypeKeys,
]

export type SettingsColorTypeKeys = (typeof settingsColorTypeKeys)[number]
export type SettingsThemeTypeKeys = (typeof settingsThemeTypeKeys)[number]
export type SettingsDateTypeKeys = (typeof settingsDateTypeKeys)[number]
export type SettingsTypeKeys = (typeof settingsTypeKeys)[number]

export type SettingsColorType = {
  [key in SettingsColorTypeKeys]: string
}

export type SettingsThemeType = {
  theme: "dark" | "light"
}

export type SettingsDateType = {
  [key in SettingsDateTypeKeys]: string
}

export type SettingsType = SettingsThemeType & SettingsDateType

export type ThemeColorType = Omit<SettingsColorType, "primaryColor">

// ******************** default value ********************

export const settingsLightColorValues: ThemeColorType = {
  backgroundColor: "#ECECEC",
  secondaryColor: "#ffffff",
  borderColor: "#BCBCBC",
  textColor: "#313131",
}

export const settingsDarkColorValues: ThemeColorType = {
  backgroundColor: "#313131",
  secondaryColor: "#5A5A5A",
  borderColor: "#525252",
  textColor: "#ECECEC",
}

export const settingsDefaultDateValues: SettingsDateType = {
  /** 最新ダウンロード日時 */
  downloadedAt: "99990000000000000",
}

export const settingsDefaultValues: SettingsType = {
  ...settingsDefaultDateValues,
  theme: "dark",
}
