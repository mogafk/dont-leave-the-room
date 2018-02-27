import Animated from '.././Animated'

const ASSET_NAME = 'form'
const SPRITE_FILE = 'persons/form.png'
const FRAMES_FILE = 'persons/form.json'

export default class extends Animated {
  static getAsset () { return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE] }

  constructor ({game, x, y}) {
    super({ game, x, y, asset: ASSET_NAME })

    this.addAnimation({name: 'go', prefix: 'drunk_', length: 24, speed: 24, loop: true})
    this.addAnimation({name: 'hit', length: 24, speed: 24})
    this.addAnimation({name: 'hit_knife', length: 24, speed: 24})
  }
}
