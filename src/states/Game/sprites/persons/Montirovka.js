import Animated from '.././Animated'

const ASSET_NAME = 'montirovka'
const SPRITE_FILE = 'persons/montirovka.png'
const FRAMES_FILE = 'persons/montirovka.json'

export default class extends Animated {
  static getAsset () {
    return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE]
  }

  constructor ({game, x, y}) {
    const params = {
      game,
      x,
      y,
      asset: ASSET_NAME
    }
    super(params)

    this.addAnimation({
      name: 'go',
      prefix: `go_`,
      length: 22,
      speed: 22
    })

    this.addAnimation({
      name: 'hit',
      prefix: `hit_`,
      length: 24,
      speed: 24
    })
  }
}
