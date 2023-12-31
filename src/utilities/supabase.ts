import "react-native-url-polyfill/auto"
import { createClient } from "@supabase/supabase-js"
import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store"
import { Constants } from "../statics/constants"
import { Database } from "../../supabase/schema"

export const supabase = createClient<Database>(
  Constants.SUPABASE_URL,
  Constants.SUPABASE_KEY,
  {
    auth: {
      storage: {
        getItem(key) {
          return getItemAsync(key)
        },
        setItem(key, value) {
          return setItemAsync(key, value)
        },
        removeItem(key) {
          return deleteItemAsync(key)
        },
      },
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
)
