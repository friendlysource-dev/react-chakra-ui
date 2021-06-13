import React, { useRef } from 'react'
import { Box, BoxProps, Input, InputProps } from '@chakra-ui/react'

export interface BoxFileProps extends BoxProps {
  input?: InputProps
}

const BoxFile: React.FC<BoxFileProps> = ({ input, children, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      pos="relative"
      ref={boxRef}
      onClick={(e) => {
        inputRef.current?.click()
      }}
      {...rest}
    >
      <Input
        type="file"
        left={0}
        top={0}
        pos="absolute"
        w="0"
        h="0"
        userSelect="none"
        cursor="pointer"
        ref={inputRef}
        opacity={0}
        overflow="hidden"
        {...input}
      />
      <>{children}</>
    </Box>
  )
}

export default BoxFile
