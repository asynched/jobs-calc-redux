import Result from '@/utils/functional/result'
import type { Job, JobStatistics } from '@/domain/entities'

export const getJobsStatistics = Result.safeAsyncFunction(
  async (token: string) => {
    const response = await fetch('http://localhost:3333/jobs/statistics', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Invalid token')
    }

    const stats: JobStatistics = await response.json()

    return stats
  }
)

export const getJobs = Result.safeAsyncFunction(async (token: string) => {
  const response = await fetch('http://localhost:3333/jobs', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Invalid token')
  }

  const jobs: Job[] = await response.json()

  return jobs
})
