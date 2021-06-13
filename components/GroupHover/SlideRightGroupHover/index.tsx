import { Box, BoxProps } from '@chakra-ui/layout'
import React from 'react'

const SlideRightGroupHover: React.FC<BoxProps> = (props) => {
  return (
    <Box
      opacity={0}
      transform="translateX(-10px)"
      _groupHover={{ opacity: 1, transform: 'translateX(0px)' }}
      {...props}
    />
  )
}

export default SlideRightGroupHover
