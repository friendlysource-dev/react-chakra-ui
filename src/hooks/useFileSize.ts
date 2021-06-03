import filesize from 'file-size'

export type SizeFormat =
  | 'Bytes'
  | 'KB'
  | 'MB'
  | 'GB'
  | 'TB'
  | 'PB'
  | 'EB'
  | 'ZB'
  | 'YB'

export function useFileSize(size: number | string, unit: SizeFormat = 'MB') {
  return filesize(Number(size), {
    fixed: 0
  }).to(unit as any)
}
