export const settingsColorTypeKeys = [
  "backgroundColor",
  "secondaryColor",
  "borderColor",
  "textColor",
  "primaryColor",
] as const

export const settingsDateTypeKeys = ["downloadedAt"] as const

export const settingsTypeKeys = [
  ...settingsColorTypeKeys,
  ...settingsDateTypeKeys,
]

export type SettingsColorTypeKeys = (typeof settingsColorTypeKeys)[number]
export type SettingsDateTypeKeys = (typeof settingsDateTypeKeys)[number]
export type SettingsTypeKeys = (typeof settingsTypeKeys)[number]

export type SettingsColorType = {
  [key in SettingsColorTypeKeys]: string
}

export type SettingsDateType = {
  [key in SettingsDateTypeKeys]: string
}

export type SettingsType = SettingsColorType & SettingsDateType

// ******************** default value ********************

export const settingsDefaultColorValues: SettingsColorType = {
  backgroundColor: "#ECECEC",
  secondaryColor: "#ffffff",
  borderColor: "#BCBCBC",
  primaryColor: "#0098C7",
  textColor: "#313131",
}

export const settingsDefaultDateValues: SettingsDateType = {
  /** 最新ダウンロード日時 */
  downloadedAt: "00000000000000000",
}

export const settingsDefaultValues: SettingsType = {
  ...settingsDefaultColorValues,
  ...settingsDefaultDateValues,
}
