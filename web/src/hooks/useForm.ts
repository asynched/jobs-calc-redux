import { useState } from 'react'

type ChangeEvent = {
  target: {
    name: string
    value: string
  }
}

type InputFilter = (value: string) => string

export const numberFilter: InputFilter = (value: string) =>
  value.replace(/[^\d]/g, '')
export const wordFilter: InputFilter = (value: string) =>
  value.replace(/[\d]/g, '')
export const patternFilter = (pattern: RegExp): InputFilter => {
  return (value) => {
    return value.replace(pattern, '')
  }
}

export default function useForm<Form extends Record<string, string>>(
  initialForm: Form
) {
  const [form, setForm] = useState<Form>(initialForm)

  const register = <Entry extends keyof Form>(
    entry: Entry,
    filter?: InputFilter
  ) => {
    const onChange = <Event extends ChangeEvent>(event: Event) => {
      const value = filter ? filter(event.target.value) : event.target.value

      setForm({
        ...form,
        [entry]: value,
      })
    }

    return {
      name: entry,
      value: form[entry],
      onChange,
    }
  }

  return {
    form,
    register,
  }
}
