import React, { useState } from 'react'
import { useFieldState } from '../../hooks'
import BoxFile from '../BoxFile'
import { BoxProps } from '@chakra-ui/layout'

interface RenderProps {
  files: FileList | undefined
}

// @ts-ignore
export interface BoxFileFieldProps extends BoxProps {
  name: string
  isMultiple?: boolean
  render: (props: RenderProps) => React.ReactNode
  onChange?: (files: FileList) => void
}

const BoxFileField: React.FC<BoxFileFieldProps> = ({
  name,
  isMultiple,
  onChange,
  render,
  ...rest
}) => {
  const [value, setValue, field] = useFieldState(name)
  const [files, setFiles] = useState<FileList>()

  return (
    <BoxFile
      input={{
        multiple: isMultiple || false,
        onChange: (e) => {
          if (!e.target.files) return

          onChange?.(e.target.files)
          setFiles(e.target.files)

          if (isMultiple) {
            // @ts-ignore
            setValue(() => e.target.files)
          } else {
            // @ts-ignore
            setValue(() => e.target.files.item(0))
          }
        }
      }}
      {...rest}
    >
      {render({ files })}
    </BoxFile>
  )
}

export default BoxFileField
