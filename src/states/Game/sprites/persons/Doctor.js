import Animated from '.././Animated'

const ASSET_NAME = 'doctor'
const SPRITE_FILE = 'persons/doctor.png'
const FRAMES_FILE = 'persons/doctor.json'

export default class extends Animated {
  static getAsset () { return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE] }

  constructor ({game, x, y}) {
    super({ game, x, y, asset: ASSET_NAME })

    this.addAnimation({ name: 'go', prefix: `go_`, length: 24, speed: 24, loop: true })
    this.addAnimation({ name: 'hit', prefix: `hit_`, length: 20, speed: 20 })
  }
}
