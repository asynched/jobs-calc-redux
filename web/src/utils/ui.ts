interface IPrevent {
  preventDefault: () => void
}

export const preventDefault = <Event extends IPrevent>(
  fn?: (event: Event) => void
) => {
  return (event: Event) => {
    event.preventDefault()

    if (fn) {
      fn(event)
    }
  }
}
