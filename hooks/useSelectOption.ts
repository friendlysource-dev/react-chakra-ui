import { useState, useEffect, useMemo } from 'react'
import { useField } from '@unform/core'

export interface SelectOptionProps {
  options: any[]
  name: string
  onChange?: (value: any) => void
  onInit?: (value: any) => void
  isMultiple?: boolean
}

export interface RenderProps {
  option: any
  value: any
  isChecked: boolean
  toggle: () => void
}

export type RenderFunction<T extends RenderProps = RenderProps> = (
  props: T
) => React.ReactNode

export function useSelectOption({
  name,
  options,
  onChange,
  isMultiple = false
}: SelectOptionProps) {
  const field = useField(name)

  const [keysItems, setKeys] = useState<number[]>([])
  const items = useMemo(() => {
    return keysItems?.map((key) => options[key])
  }, [keysItems])

  const isChecked = (index: number) => keysItems?.includes(index)

  const add = (index: number) => {
    if (isMultiple) {
      setKeys((oldKeys) => [...oldKeys, index])
    } else {
      setKeys(() => [index])
    }
  }
  const remove = (index: number) => {
    setKeys((oldKeys) => oldKeys.filter((currentKey) => currentKey !== index))
  }

  const getValue = (index: any) => items[index]

  const toggle = (index: number) => {
    if (isChecked(index)) {
      remove(index)
    } else {
      add(index)
    }
  }

  useEffect(() => {
    onChange?.(items)
  }, [keysItems])

  useEffect(() => {
    field.registerField({
      name: field.fieldName,
      ref: undefined,
      getValue: () => {
        if (isMultiple) {
          return items
        } else {
          return items[0]
        }
      },
      setValue: (_, value) => {
        if (value) {
          setKeys(() => value)
        }
      }
    })
  }, [field.registerField, keysItems, field.fieldName])

  return {
    toggle,
    add,
    remove,
    options,
    getValue,
    items,
    field,
    isChecked
  }
}
