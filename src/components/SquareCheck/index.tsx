import React from 'react'
import { Square, Box } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '../../icons'
import { SquareProps } from '@chakra-ui/layout'

interface SquareCheckProps extends SquareProps {
  isChecked?: boolean
}

const SquareCheck: React.FC<SquareCheckProps> = ({ isChecked, ...rest }) => {
  return (
    <Square
      size={10}
      color={isChecked ? 'green.500' : 'red.500'}
      pos="relative"
      transition="color .1s ease-in-out"
      rounded="md"
      {...rest}
    >
      <Box
        transition="all .15s ease-in-out"
        opacity={isChecked ? 1 : 0}
        pos="absolute"
        transform={isChecked ? 'rotate(0deg)' : 'rotate(30deg)'}
      >
        <CheckIcon size={20} />
      </Box>
      <Box
        transition="all .15s ease-in-out"
        opacity={isChecked ? 0 : 1}
        pos="absolute"
        transform={isChecked ? 'rotate(180deg)' : 'rotate(0deg)'}
      >
        <CloseIcon size={20} />
      </Box>
    </Square>
  )
}

export default SquareCheck
