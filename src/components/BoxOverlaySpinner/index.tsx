import { BoxProps, Spinner } from '@chakra-ui/react'
import React from 'react'
import BoxOverlay from './../BoxOverlay'

const BoxOverlaySpinner: React.FC<BoxProps> = (props) => {
  return (
    <BoxOverlay
      alignItems="center"
      justifyContent="center"
      d="flex"
      rounded="sm"
      {...props}
    >
      <Spinner color="primary.500" size="lg" />
    </BoxOverlay>
  )
}

export default BoxOverlaySpinner
