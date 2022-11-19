import type { User } from '@/domain/entities'
import Result from '@/utils/functional/result'

type LoginDto = {
  email: string
  password: string
}

type LoginTokenDto = {
  token: string
}

export const login = Result.safeAsyncFunction(async (login: LoginDto) => {
  const response = await fetch('http://localhost:3333/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: login.email,
      password: login.password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error('Invalid credentials')
  }

  return data as LoginTokenDto
})

export const getProfile = Result.safeAsyncFunction(async (token: string) => {
  const response = await fetch('http://localhost:3333/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user: User = await response.json()

  if (!response.ok) {
    throw new Error('Invalid token')
  }

  return user
})
