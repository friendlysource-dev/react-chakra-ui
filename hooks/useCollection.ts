import { useEffect, useMemo, useState } from 'react'
import { Collection } from '../helpers/Collection'
import { useDebounce } from './helpers/useDebounce'
import { Collection as Collect } from 'collect.js'

export function useCollection<T>(
  collection: Collection<T>,
  fn?: (collect: Collect<T>) => T[]
) {
  const [lastUpdate, setLastUpdate] = useState<number>(0)
  const lastUpdateDebounce = useDebounce(lastUpdate, 500)

  const data = useMemo(() => {
    const all = collection.all()

    return fn ? fn(new Collect(all)) : all
  }, [lastUpdateDebounce])

  const onForceUpdate = () => {
    setLastUpdate(Date.now())
  }

  useEffect(() => {
    collection.on('forceUpdate', onForceUpdate)
    return () => {
      collection.off('forceUpdate', onForceUpdate)
    }
  }, [])

  return { data }
}
