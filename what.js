// I'm to lazy to code this rn, I'll leave it here.

const planning = {
  earnPerMonth: 2000,
  workHoursPerDay: 8,
  workDaysPerWeek: 5,
  vacationWeeksPerYear: 2,
}

const calculateHourlyValue = (planning) => {
  const { earnPerMonth, workHoursPerDay, workDaysPerWeek } = planning
  const workHoursPerYear = workHoursPerDay * workDaysPerWeek
  const hourlyValue = earnPerMonth / workHoursPerYear
  return hourlyValue
}

console.log(calculateHourlyValue(planning))
