import { BoxProps, useToken } from '@chakra-ui/react'
import React from 'react'
import Col from './../Col'

const BoxScrollMini: React.FC<BoxProps> = ({ color = 'gray.900', ...rest }) => {
  const scrollColor = useToken('colors', color as string)
  const scrollColorHover = useToken('colors', color as string)
  const scrollPadding = '25px'

  const scrollGradient = (color: string) =>
    `linear-gradient(to bottom, transparent ${scrollPadding}, ${color} ${scrollPadding}, ${color} calc(100% - ${scrollPadding}), transparent ${scrollPadding})`

  return (
    <Col
      overflowY="auto"
      sx={{
        '&::-webkit-scrollbar': {
          width: 1,
          bg: 'transparent'
        },
        '&::-webkit-scrollbar-track': {
          width: 1,
          bg: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          background: scrollGradient(scrollColor),
          rounded: 'sm'
        },
        '&:hover': {
          '&::-webkit-scrollbar-thumb': {
            background: scrollGradient(scrollColorHover)
          }
        }
      }}
      {...rest}
    />
  )
}

export default BoxScrollMini
