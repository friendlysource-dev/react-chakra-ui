import { TypedEmitter } from 'tiny-typed-emitter'

type TypeLoader = {
  [key: string]: number
}

class Loaders extends TypedEmitter<{
  start: (name: string) => void
  finish: (name: string) => void
  forceUpdate: () => void
}> {
  private loaders: TypeLoader = {}

  public start(name: string) {
    if (this.isLoading(name)) {
      this.increment(name)
    } else {
      this.loaders[name] = 1
    }
    this.emit('start', name)
    this.emit('forceUpdate')
  }

  public finish(name: string) {
    this.decrement(name)
    this.emit('finish', name)
    this.emit('forceUpdate')
  }

  public isLoading(name: string) {
    for (const loaderName in this.loaders) {
      const loader = this.loaders[loaderName]
      if (loaderName === name) {
        return loader > 0
      }
    }

    return false
  }

  public intercept(fn: Promise<any>, name: string) {
    this.start(name)
    fn.finally(() => {
      this.finish(name)
    })
  }

  public isLoadingNamespace(name: '*' | string) {
    for (const loaderName in this.loaders) {
      const loader = this.loaders[loaderName]
      if ((loaderName.startsWith(name) || name === '*') && loader > 0) {
        return true
      }
    }

    return false
  }

  private increment(name: string) {
    this.loaders[name]++
  }

  private decrement(name: string) {
    this.loaders[name]--
  }
}

export default new Loaders()
