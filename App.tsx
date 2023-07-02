import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import {
  DrawerNavigationTypes,
  StackNavigationTypes,
} from "./src/types/NavigationTypes"
import HomeScreen from "./src/screens/HomeScreen"
import SearchScreen from "./src/screens/SearchScreen"
import FaIcon from "./src/components/atoms/FaIcon"
import SettingScreen from "./src/screens/SettingScreen"
import { SettingContext, useSettingsValue } from "./src/contexts/settingContext"
import { NovelContext } from "./src/contexts/novelContext"
import EpisodeListScreen from "./src/screens/EpisodeListScreen"
import EpisodeScreen from "./src/screens/EpisodeScreen"
import PlainText from "./src/components/atoms/PlainText"

const Drawer = createDrawerNavigator<DrawerNavigationTypes>()
const Stack = createNativeStackNavigator<StackNavigationTypes>()

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SettingContext>
      <NavigationContainer>
        <NovelContext>{children}</NovelContext>
      </NavigationContainer>
    </SettingContext>
  )
}

const Index: React.FC = () => {
  const { secondaryColor } = useSettingsValue()

  return (
    <Drawer.Navigator
      initialRouteName='SearchScreen'
      screenOptions={{
        headerStyle: {
          backgroundColor: secondaryColor,
        },
      }}
    >
      <Drawer.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          title: "本棚",
          drawerIcon({ color, size }) {
            return <FaIcon name='home' size={size} color={color} />
          },
        }}
      />
      <Drawer.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={{
          title: "小説を検索",
          drawerIcon({ color, size }) {
            return <FaIcon name='search' size={size} color={color} />
          },
        }}
      />
      <Drawer.Screen
        name='SettingScreen'
        component={SettingScreen}
        options={{
          title: "設定",
          drawerIcon({ color, size }) {
            return <FaIcon name='cog' size={size} color={color} />
          },
        }}
      />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <AppWrapper>
      <Stack.Navigator
        initialRouteName='IndexScreen'
        screenOptions={{ animation: "slide_from_right" }}
      >
        <Stack.Screen
          name='IndexScreen'
          component={Index}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='EpisodeListScreen'
          options={{ title: "" }}
          component={EpisodeListScreen}
        />
        <Stack.Screen
          name='EpisodeScreen'
          options={{ title: "" }}
          component={EpisodeScreen}
        />
      </Stack.Navigator>
    </AppWrapper>
  )
}
