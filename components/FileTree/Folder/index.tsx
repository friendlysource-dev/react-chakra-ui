import React, { useEffect, useMemo } from 'react'
import Row from '../../Row'
import Col from '../../Col'
import { Heading, Square, useDisclosure, Spinner, BoxProps } from '@chakra-ui/react'
import { FolderIcon, FolderMinusIcon, FolderPlusIcon } from '../../../icons'
import { IconType } from 'react-icons'
import BoxOverlaySpinner from '../../BoxOverlaySpinner/index'

interface FolderProps extends BoxProps {
  name?: string
  isOpen?: boolean
  isLoading?: boolean
  LoaderComponent?: React.ReactNode
  IconComponentOpen?: IconType
  IconComponentClose?: IconType
}

const Folder: React.FC<FolderProps> = ({
  name,
  isOpen,
  isLoading,
  IconComponentOpen = FolderPlusIcon,
  IconComponentClose = FolderMinusIcon,
  LoaderComponent = <Spinner size="sm" color="primary.500" />,
  children,
  ...rest
}) => {
  const folderDisclosure = useDisclosure()

  const IconComponent = useMemo(() => {
    if (!children) return FolderIcon
    return folderDisclosure.isOpen ? IconComponentClose : IconComponentOpen
  }, [folderDisclosure.isOpen, children])

  useEffect(() => {
    if (isOpen === false || isOpen === true) {
      folderDisclosure.isOpen = isOpen
    } else {
      folderDisclosure.isOpen = false
    }
  }, [isOpen])

  return (
    <Col>
      <Row
        alignItems="center"
        cursor="pointer"
        userSelect="none"
        onClick={folderDisclosure.onToggle}
        _hover={{ color: 'GrayText' }}
        {...rest}
      >
        <Square size={10} mr={2} fontSize="xl">
          {IconComponent && <IconComponent />}
        </Square>
        <Heading size="xs" flex={1}>
          {name}
        </Heading>
        {isLoading && <Square size={10}>{LoaderComponent}</Square>}
      </Row>

      {children && folderDisclosure.isOpen && (
        <Row pos="relative">
          <Row opacity={isLoading ? 0.9 : 1} w="100%">
            <Col w={10} mr={2} alignItems="center">
              <Col
                h={folderDisclosure.isOpen ? '100%' : '0'}
                w="2px"
                bg="GrayText"
                transition="all 2s ease-in-out"
              />
            </Col>
            <Col flex={1}>{children}</Col>
          </Row>
        </Row>
      )}
    </Col>
  )
}

export default Folder
