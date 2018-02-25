import Animated from '.././Animated'

const ASSET_NAME = 'neo'
const SPRITE_FILE = 'persons/neo.png'
const FRAMES_FILE = 'persons/neo.json'

export default class extends Animated {
  static getAsset () { return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE] }

  constructor ({game, x, y, type = 1}) {
    super({ game, x, y, asset: ASSET_NAME })

    if (type === 2) this.frame = 49
    this.addAnimation({ name: 'go', prefix: `neo${type}_go_`, length: 24, speed: 24, loop: true })
    this.addAnimation({ name: 'stop_hit', prefix: `neo${type}_hit_`, length: 24, speed: 24 })
    this.addAnimation({ name: 'hit', prefix: `neo${type}_hit_`, length: 24, speed: 24, offset: 13 })
  }
}
