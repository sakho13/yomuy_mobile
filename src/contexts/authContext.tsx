import React, { createContext, useState, useEffect, useContext } from "react"
import { User } from "@supabase/supabase-js"
import jwtDecode from "jwt-decode"
import { supabase } from "../utilities/supabase"

interface AuthContextType {
  user: User | null
  token: string | null
}

export const authContext = createContext<AuthContextType>({
  user: null,
  token: null,
})

export const useAuthValue = () => useContext(authContext)

const AuthContext: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const _ = supabase.auth.getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("> onAuthStateChange", event, session?.user.id)
        if (session && session.user && session.access_token) {
          setUser(session.user)
          setToken(session.access_token)
        }
      },
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const checkTokenExpiration = () => {
      console.log("> checkTokenExpiration", user?.id, token)
      if (user && token) {
        const decodedToken: { exp?: number } = jwtDecode(token)
        const currentTime = Math.floor(Date.now() / 1000)

        if (decodedToken.exp && decodedToken.exp < currentTime) {
          supabase.auth.signOut()
        }
      }
    }

    const tokenExpirationInterval = setInterval(checkTokenExpiration, 60 * 1000)

    return () => {
      clearInterval(tokenExpirationInterval)
    }
  }, [user, token])

  return (
    <authContext.Provider
      value={{
        user,
        token,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthContext
