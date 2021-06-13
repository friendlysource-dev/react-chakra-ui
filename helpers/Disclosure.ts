import { TypedEmitter } from 'tiny-typed-emitter'

interface DisclosureEvents {
  open: (name: App.Disclosures.Names, data: any) => void
  close: (name: App.Disclosures.Names) => void
}

class Disclosure extends TypedEmitter<DisclosureEvents> {
  public open<N extends App.Disclosures.Names>(name: N, data?: App.Disclosures[N]) {
    this.emit('open', name, {
      name,
      ...data
    })
  }

  public close(name: App.Disclosures.Names) {
    this.emit('close', name)
  }
}

export default new Disclosure()
