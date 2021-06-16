import React from 'react'
import { Col } from '..'
import { BoxProps } from '@chakra-ui/layout'

interface BoxScrollProps extends BoxProps {
  bgScroll: string
  bgScrollHover: string
}

const BoxScroll: React.FC<BoxScrollProps> = ({
  bgScroll,
  bgScrollHover,
  ...rest
}) => {
  return (
    <Col
      overflowY="auto"
      sx={{
        '&::-webkit-scrollbar': {
          width: 4,
          bg: 'transparent'
        },
        '&::-webkit-scrollbar-track': {
          width: 4,
          bg: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          background: bgScroll,
          rounded: 'sm'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: bgScrollHover
        }
      }}
      {...rest}
    />
  )
}

export default BoxScroll
