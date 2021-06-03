import { useState, useEffect } from 'react'
import { useField } from '@unform/core'

export interface SelectOptionProps {
  options: any[]
  index: string
  label: string
  name: string
  defaultValue?: any
  onChange?: (value: any) => void
  onInit?: (value: any) => void
  isMultiple?: boolean
  isToggle?: boolean
}

export function useSelectOption({
  index,
  label,
  name,
  options,
  defaultValue,
  onChange,
  onInit,
  isMultiple = false,
  isToggle = false
}: SelectOptionProps) {
  const [item, setItem] = useState<any>()
  const [isInit, setInit] = useState(false)
  const field = useField(name)

  const initialize = () => {
    setTimeout(() => {
      setInit(true)
    }, 0)
  }

  const getOptionByIndex = (indexValue: string) => {
    return options.find((option) => option[index] === indexValue)
  }

  const isItemSelected = (option: any) => {
    if (isMultiple) {
      return (
        item && item?.find((itemValue: any) => itemValue[index] === option[index])
      )
    } else {
      return item && item?.[index] === option[index]
    }
  }

  const getLabel = (option: any) => option[label]

  const getIndex = (option: any) => option[index]

  const toggleItem = (option: any) => {
    if (isItemSelected(option)) {
      removeItem(option)
    } else {
      selectItem(option)
    }
  }

  const fetchDefaultValue = (_defaultValue: any) => {
    setTimeout(() => {
      if (isMultiple) {
        selectMultipleItems(_defaultValue)
      } else {
        selectItem(getOptionByIndex(_defaultValue))
      }
    }, 0)
  }

  const selectMultipleItems = (options: any[]) => {
    if (!Array.isArray(options)) return

    const newValues = options.map((val) => getOptionByIndex(val))

    if (!item) {
      setItem(() => newValues)
    } else {
      // @ts-ignore
      setItem((oldItems) => [...oldItems, ...newValues])
    }
  }

  const selectItem = (option: any) => {
    if (isMultiple) {
      if (!item) {
        setTimeout(() => {
          setItem([option])
        }, 0)
      } else {
        setItem((oldItems: any) => [...oldItems, option])
      }
    } else {
      setItem(() => option)
    }
  }

  const removeItem = (option: any) => {
    if (isMultiple) {
      setItem((oldItems: any) =>
        oldItems.filter((oldItem: any) => oldItem[index] !== option[index])
      )
    } else {
      if (isToggle && isItemSelected(option)) {
        setItem(() => undefined)
      }
    }
  }

  useEffect(() => {
    if (defaultValue) {
      fetchDefaultValue(defaultValue)
    } else {
      if (isMultiple) {
        setItem(() => [])
      }
    }
    initialize()
  }, [])

  useEffect(() => {
    if (item === undefined && isMultiple) {
      setItem(() => [])
    }
  }, [item])

  useEffect(() => {
    if (isInit) {
      onChange?.(item)
    }
  }, [item])

  useEffect(() => {
    if (isInit) {
      onInit?.(item)
    }
  }, [isInit])

  useEffect(() => {
    field.registerField({
      name: field.fieldName,
      ref: undefined,
      getValue: () => {
        if (item) {
          if (isMultiple) {
            return item.map((itemValue: any) => itemValue?.[index])
          } else {
            return item[index]
          }
        }
      },
      setValue: (_, value) => {
        fetchDefaultValue(value)
        initialize()
      }
    })
  }, [field.registerField, item, field.fieldName])

  return {
    isItemSelected,
    toggleItem,
    options,
    getLabel,
    getIndex,
    items: item,
    field
  }
}
