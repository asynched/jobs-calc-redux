declare namespace Express {
  interface Request {
    user: {
      id: number
      name: string
      email: string
      password: string
      profilePhoto: string
      planning: {
        id: number
        userId: number
        name: string
        earnPerMonth: number
        workHoursPerDay: number
        workDaysPerWeek: number
        vacationWeeksPerYear: number
        hourlyValue: number
        createdAt: Date
        updatedAt: Date
      }
      createdAt: Date
      updatedAt: Date
    }
  }
}
