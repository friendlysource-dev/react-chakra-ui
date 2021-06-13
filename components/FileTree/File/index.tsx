import { Square, Heading } from '@chakra-ui/react'
import React from 'react'
import Row from '../../Row'
import { IconType } from 'react-icons'
import { FileIcon } from '../../../icons'
import { Text } from '@chakra-ui/layout'

interface FileProps {
  name?: string
  IconComponent?: IconType
}

const File: React.FC<FileProps> = ({ name, IconComponent = FileIcon }) => {
  return (
    <Row
      alignItems="center"
      cursor="pointer"
      userSelect="none"
      _hover={{ color: 'GrayText' }}
    >
      <Square size={10} mr={2} fontSize="xl">
        {IconComponent && <IconComponent />}
      </Square>
      <Text fontWeight="normal" fontSize="xs">
        {name}
      </Text>
    </Row>
  )
}

export default File
