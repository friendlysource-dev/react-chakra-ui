import { Box, BoxProps } from '@chakra-ui/layout'
import React from 'react'

const SlideUpGroupHover: React.FC<BoxProps> = (props) => {
  return (
    <Box
      opacity={0}
      transform="translateY(-10px)"
      _groupHover={{ opacity: 1, transform: 'translateY(0px)' }}
      {...props}
    />
  )
}

export default SlideUpGroupHover
