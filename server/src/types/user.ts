import type { Planning, User } from '@prisma/client'

export type UserWithPlanning = User & {
  planning: Planning
}
