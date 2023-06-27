import {
  EpisodeListScreenProps,
  EpisodeScreenProps,
  HomeScreenProps,
  IndexScreenProps,
  SearchScreenProps,
  SettingScreenProps,
} from "./ScreenPropsTypes"

export type StackNavigationTypes = {
  IndexScreen: IndexScreenProps
  EpisodeListScreen: EpisodeListScreenProps
  EpisodeScreen: EpisodeScreenProps
}

export type DrawerNavigationTypes = {
  HomeScreen: HomeScreenProps
  SearchScreen: SearchScreenProps
  SettingScreen: SettingScreenProps
}
