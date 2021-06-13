import { useMemo, useState, useEffect } from 'react'
import { Loaders } from '../helpers'

export function useLoaders(name: '*' | string) {
  const [lastUpdate, setLastUpdate] = useState(0)

  const onForceUpdate = () => {
    setLastUpdate(() => Date.now())
  }

  const isLoading = useMemo(() => {
    return Loaders.isLoading(name)
  }, [name, lastUpdate])

  const isLoadingNamespace = useMemo(() => {
    return Loaders.isLoadingNamespace(name)
  }, [name, lastUpdate])

  useEffect(() => {
    Loaders.on('forceUpdate', onForceUpdate)

    return () => {
      Loaders.off('forceUpdate', onForceUpdate)
    }
  }, [])

  return {
    isLoading,
    isLoadingNamespace
  }
}
