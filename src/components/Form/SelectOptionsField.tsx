import React from 'react'
import Row from '../Row'
import SquareCheck from '../SquareCheck'
import { SelectOptionProps, useSelectOption } from '../../hooks/useSelectOption'

interface RenderProps {
  option: any
  label: any
  isChecked: boolean
  toggle: () => void
}

export interface SelectOptionsFieldProps extends SelectOptionProps {
  render: (props: RenderProps) => React.ReactNode
}

const SelectOptionsField: React.FC<SelectOptionsFieldProps> = ({
  render,
  ...props
}) => {
  const { options, getLabel, isItemSelected, toggleItem, items, field } =
    useSelectOption(props)

  return (
    <>
      {options.map((option, keyOption) => (
        <React.Fragment key={`option${keyOption}`}>
          {render({
            option,
            isChecked: isItemSelected(option),
            label: getLabel(option),
            toggle: () => toggleItem(option)
          })}
        </React.Fragment>
      ))}
    </>
  )
}

export default SelectOptionsField
