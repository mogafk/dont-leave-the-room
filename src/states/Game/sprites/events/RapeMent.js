import Animated from '.././Animated'

export default class extends Animated {
  constructor ({game, x, y}) {
    super({game, x, y, asset: 'rape'})

    this.addAnimation({
      name: 'rape',
      length: 48,
      speed: 60
    })
  }
}
