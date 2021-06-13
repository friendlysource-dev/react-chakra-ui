import { useEffect, useState } from 'react'
import { Disclosure } from '../helpers'

export function useDisclosure<N extends App.Disclosures.Names>(name: N) {
  const [isOpen, setOpen] = useState(false)
  const [data, setData] = useState<Partial<App.Disclosures[N]>>({})

  useEffect(() => {
    Disclosure.on('open', onOpenCallback as any)
    Disclosure.on('close', onCloseCallback as any)

    return () => {
      Disclosure.off('open', onOpenCallback as any)
      Disclosure.off('close', onCloseCallback as any)
    }
  }, [])

  const onOpenCallback = (nameDispatch: N, data: App.Disclosures[N]) => {
    if (name === nameDispatch) {
      setOpen(true)
      // @ts-ignore
      setData(() => data)
    }
  }

  const onCloseCallback = (nameDispatch: N) => {
    if (name === nameDispatch) {
      setOpen(false)
    }
  }

  const onClose = () => {
    Disclosure.close(name)
  }

  const onOpen = (data: App.Disclosures[N]) => {
    Disclosure.open(name, data)
  }

  return {
    isOpen,
    data,
    onOpen,
    onClose
  }
}
