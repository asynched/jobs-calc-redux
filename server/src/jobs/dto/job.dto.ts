import { z } from 'zod'

export const createJobSchema = z.object({
  name: z.string(),
  hoursPerDay: z.number().min(1).max(24),
  estimatedHours: z.number().min(1),
})

export type CreateJobDto = z.infer<typeof createJobSchema>

export const updateJobSchema = z
  .object({
    name: z.string().optional(),
    hoursPerDay: z.number().min(1).max(24).optional(),
    estimatedHours: z.number().min(1).optional(),
    completed: z.boolean(),
  })
  .partial()

export type UpdateJobDto = z.infer<typeof updateJobSchema>
