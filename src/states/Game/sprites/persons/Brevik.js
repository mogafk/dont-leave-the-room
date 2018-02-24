import Animated from '.././Animated'

const ASSET_NAME = 'brevik'
const SPRITE_FILE = 'persons/brevik.png'
const FRAMES_FILE = 'persons/brevik.json'

export default class extends Animated {
  static getAsset () {
    return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE]
  }

  constructor ({game, x, y}) {
    super({game, x, y, asset: ASSET_NAME})

    this.addAnimation({
      name: 'go',
      length: 24,
      speed: 24,
      loop: true
    })

    this.addAnimation({
      name: 'hit',
      length: 27,
      speed: 27
    })
  }
}
