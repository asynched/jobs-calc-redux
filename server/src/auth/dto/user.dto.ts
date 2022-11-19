import { z } from 'zod'

export const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  profilePhoto: z.string().url(),
  password: z.string().min(8),
})

export type RegisterUserDto = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type LoginUserDto = z.infer<typeof loginUserSchema>
