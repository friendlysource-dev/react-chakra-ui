import React from 'react'
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'

export interface BoxColorModeProps extends BoxProps {
  dark?: BoxProps
  light?: BoxProps
}

const BoxColorMode: React.FC<BoxColorModeProps> = ({
  dark,
  light,
  children,
  ...rest
}) => {
  const props = useColorModeValue(light, dark)

  return (
    <Box {...rest} {...props}>
      {children}
    </Box>
  )
}

export default BoxColorMode
