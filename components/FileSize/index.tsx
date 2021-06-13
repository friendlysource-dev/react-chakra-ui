import React from 'react'
import { SizeFormat, useFileSize } from '../../hooks/useFileSize'

interface FileSizeProps {
  sizeFormat?: SizeFormat
}

const FileSize: React.FC<FileSizeProps> = ({ sizeFormat = 'GB', children }) => {
  const fileSize = useFileSize(children as number, sizeFormat)

  return <>{fileSize}</>
}

export default FileSize
