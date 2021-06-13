import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  Box,
  MenuItemProps,
  ButtonProps,
  MenuProps
} from '@chakra-ui/react'
import {
  SelectOptionProps,
  useSelectOption,
  RenderFunction
} from '../../hooks/useSelectOption'

type ChildrenProps = {
  items: any[]
}

export interface DropdownOptionsFieldProps extends SelectOptionProps {
  _container?: ButtonProps
  _item?: MenuItemProps
  _menu?: Partial<MenuProps>
  render: RenderFunction
  children: (data: ChildrenProps) => React.ReactNode
}

const DropdownOptionsField: React.FC<DropdownOptionsFieldProps> = ({
  _item,
  _menu,
  _container,
  children,
  render,
  ...props
}) => {
  const { options, isChecked, toggle, items, field } = useSelectOption(props)

  return (
    <Box pos="relative" zIndex={95} h="100%" w="100%">
      <Menu
        closeOnSelect={!props.isMultiple}
        matchWidth
        placement="bottom"
        {..._menu}
      >
        <MenuButton userSelect="none" cursor="pointer" as={Box} {..._container}>
          {children({ items })}
        </MenuButton>
        <MenuList border={0} rounded="sm" shadow="lg">
          {options.map((option, keyOption) => {
            return (
              <React.Fragment key={`optionDrop${keyOption}`}>
                {render({
                  option,
                  isChecked: isChecked(keyOption),
                  value: option,
                  toggle: () => toggle(keyOption)
                })}
              </React.Fragment>
            )
          })}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default DropdownOptionsField
