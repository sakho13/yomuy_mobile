import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackNavigationTypes } from "../types/NavigationTypes"

export const ncodeContext = createContext<string>("")
export const setNcodeContext = createContext<Dispatch<SetStateAction<string>>>(
  () => undefined,
)

export const episodeContext = createContext<number>(0)
export const setEpisodeContext = createContext<
  Dispatch<SetStateAction<number>>
>(() => undefined)
export const useNcodeValue = () => useContext(ncodeContext)
export const useNcodeSet = () => useContext(setNcodeContext)

export const useEpisodeValue = () => useContext(episodeContext)
export const useEpisodeSet = () => useContext(setEpisodeContext)

export const NovelContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigationTypes>>()

  const [ncode, setNcode] = useState("")
  const [episode, setEpisode] = useState(0)

  const changeNcode = (value: SetStateAction<string>) => {
    const newNcode = value as string

    setNcode(newNcode)
    navigation.navigate("EpisodeListScreen", {})
  }

  const changeEpisode = (value: SetStateAction<number>) => {
    const newEpisode = value as number

    setEpisode(newEpisode)
    navigation.navigate("EpisodeScreen", {})
  }

  return (
    <ncodeContext.Provider value={ncode}>
      <setNcodeContext.Provider value={changeNcode}>
        <episodeContext.Provider value={episode}>
          <setEpisodeContext.Provider value={changeEpisode}>
            {children}
          </setEpisodeContext.Provider>
        </episodeContext.Provider>
      </setNcodeContext.Provider>
    </ncodeContext.Provider>
  )
}
