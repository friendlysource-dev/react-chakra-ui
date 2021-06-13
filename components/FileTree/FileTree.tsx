import React from 'react'
import Col from '../Col'
import Folder from './Folder'
import File from './File'

interface FileTreeProps {}

const FileTree: React.FC<FileTreeProps> = ({ children }) => {
  return <Col>{children}</Col>
}

export default FileTree
