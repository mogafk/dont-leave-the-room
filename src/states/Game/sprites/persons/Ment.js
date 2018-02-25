import Animated from '.././Animated'

const ASSET_NAME = 'ment'
const SPRITE_FILE = 'persons/ment.png'
const FRAMES_FILE = 'persons/ment.json'

export default class extends Animated {
  static getAsset () { return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE] }

  constructor ({game, x, y}) {
    super({ game, x, y, asset: ASSET_NAME })

    this.addAnimation({ name: 'go', length: 24, speed: 24 })
    this.addAnimation({ name: 'go_gun', length: 24, speed: 24 })
    this.addAnimation({ name: 'gun', length: 24, speed: 24 })
    this.addAnimation({ name: 'gaz', length: 37, speed: 24 })
    this.addAnimation({ name: 'hit', length: 24, speed: 24 })
    this.addAnimation({ name: 'naruchniki', length: 40, speed: 24 })
    this.addAnimation({ name: 'stop', length: 12, speed: 24 })
  }
}
