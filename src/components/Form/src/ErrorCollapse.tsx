import React from 'react'
import { useField } from '@unform/core'
import { Collapse } from '@chakra-ui/transition'
import { Text, Square } from '@chakra-ui/layout'
import { ExclamationIcon } from '../../../icons'
import Row from '../../Row'

interface ErrorCollapseProps extends ReturnType<typeof useField> {}

const ErrorCollapse: React.FC<ErrorCollapseProps> = ({
  error,
  clearError,
  fieldName
}) => {
  return (
    <>
      <Collapse in={!!error}>
        <Row fontSize="xs" color="red.500" alignItems="center">
          <Text>{error}</Text>
          <Square
            size={5}
            bg="red.500"
            rounded="sm"
            shadow="lg"
            ml="auto"
            color="white"
            fontSize="lg"
          >
            <ExclamationIcon />
          </Square>
        </Row>
      </Collapse>
    </>
  )
}

export default ErrorCollapse
