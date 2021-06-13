import React from 'react'
import Row from '../Row'
import SquareCheck from '../SquareCheck'
import {
  SelectOptionProps,
  RenderFunction,
  useSelectOption
} from '../../hooks/useSelectOption'

export interface SelectOptionsFieldProps extends SelectOptionProps {
  render: RenderFunction
}

const SelectOptionsField: React.FC<SelectOptionsFieldProps> = ({
  render,
  ...props
}) => {
  const { options, getValue, isChecked, toggle, items, field } =
    useSelectOption(props)

  return (
    <>
      {options.map((option, keyOption) => (
        <React.Fragment key={`option${keyOption}`}>
          {render({
            option,
            isChecked: isChecked(keyOption),
            value: option,
            toggle: () => toggle(keyOption)
          })}
        </React.Fragment>
      ))}
    </>
  )
}

export default SelectOptionsField
