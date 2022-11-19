export const chain = <T>(...fns: ((arg: T) => void)[]) => {
  return (arg: T) => {
    fns.forEach((fn) => fn(arg))
  }
}
