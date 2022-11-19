import { chain } from '@/utils/functional'
import { authTokenKey, authUserKey } from '@/globals/symbols'

const setAuthCookie = (token: string) => {
  document.cookie = `${authTokenKey}=${token}`
}

const setProfileInfo = async (token: string) => {
  const response = await fetch('http://localhost:3333/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()
  localStorage.setItem(authUserKey, JSON.stringify(data))
}

const clearAuthCookie = () => {
  document.cookie = `${authTokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

const clearProfileInfo = () => {
  localStorage.removeItem(authUserKey)
}

export const signInSetup = chain(setAuthCookie, setProfileInfo)
export const signOutSetup = chain<void>(clearAuthCookie, clearProfileInfo)
