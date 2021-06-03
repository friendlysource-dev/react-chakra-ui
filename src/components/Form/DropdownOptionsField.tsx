import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  MenuItemProps,
  ButtonProps,
  MenuProps
} from '@chakra-ui/react'
import { SelectOptionProps, useSelectOption } from '../../hooks/useSelectOption'
import SquareCheck from '../SquareCheck'

export interface DropdownOptionsInputProps extends SelectOptionProps {
  withCheck?: boolean
  _container?: ButtonProps
  _item?: MenuItemProps
  _menu?: Partial<MenuProps>
}

const DropdownOptionsInput: React.FC<DropdownOptionsInputProps> = ({
  withCheck = true,
  _item,
  _menu,
  _container,
  children,
  ...props
}) => {
  const { options, getLabel, isItemSelected, toggleItem, field } =
    useSelectOption(props)
  return (
    <Box pos="relative" zIndex={95} h="100%" w="100%">
      <Menu closeOnSelect={false} matchWidth placement="bottom" {..._menu}>
        <MenuButton userSelect="none" cursor="pointer" as={Box} {..._container}>
          {children}
        </MenuButton>
        <MenuList border={0} rounded="sm" shadow="lg">
          {options.map((option, keyOption) => (
            <MenuItem
              onClick={() => toggleItem(option)}
              key={`options${keyOption}`}
              rounded="none"
              // @ts-ignore
              bg={isItemSelected(option) ? 'gray.600' : undefined}
              // @ts-ignore
              color={isItemSelected(option) ? 'white' : undefined}
              // @ts-ignore
              _hover={isItemSelected(option) ? { bg: 'gray.600' } : undefined}
              // @ts-ignore
              _focus={isItemSelected(option) ? { bg: 'gray.600' } : undefined}
              {..._item}
            >
              {withCheck && (
                <SquareCheck mr={4} isChecked={isItemSelected(option)} />
              )}
              {getLabel(option)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default DropdownOptionsInput
