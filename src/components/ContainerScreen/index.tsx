import { Box, BoxProps } from '@chakra-ui/layout'
import React from 'react'

const ContainerScreen: React.FC<BoxProps> = (props) => {
  return <Box width="100vw" height="100vh" overflow="hidden" {...props} />
}

export default ContainerScreen
