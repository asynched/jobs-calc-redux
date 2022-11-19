export type User = {
  name: string
  email: string
  profilePhoto: string
  planning: {
    earnPerMonth: number
    workHoursPerDay: number
    workDaysPerWeek: number
    vacationWeeksPerYear: number
    hourlyValue: number
    createdAt: string
    updatedAt: string
  }
  createdAt: string
  updatedAt: string
}

export type Job = {
  id: number
  name: string
  completed: boolean
  hoursPerDay: number
  estimatedHours: number
  userId: number
  createdAt: string
  updatedAt: string
}

export type JobStatistics = {
  total: number
  inProgress: number
  finished: number
}
