import { NavigationContainer, useTheme } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { StatusBar } from "expo-status-bar"
import React, { useContext, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { DrawerNavigationTypes } from "./src/types/NavigationTypes"
import HomeScreen from "./src/screens/HomeScreen"
import SearchScreen from "./src/screens/SearchScreen"
import FaIcon from "./src/components/atoms/FaIcon"
import SettingScreen from "./src/screens/SettingScreen"
import { SettingContext } from "./src/contexts/settingContext"

const Drawer = createDrawerNavigator<DrawerNavigationTypes>()

export default function App() {
  return (
    <SettingContext>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='HomeScreen'>
          <Drawer.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
              title: "小説",
              drawerIcon({ color, size }) {
                return <FaIcon name='home' size={size} color={color} />
              },
              headerStyle: {
                // backgroundColor: getSetting("secondaryColor"),
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
      </NavigationContainer>
    </SettingContext>
  )
}

const styles = StyleSheet.create({
  container: {},
})
