import Animated from '.././Animated'

const ASSET_NAME = 'men4'
const SPRITE_FILE = 'persons/men4.png'
const FRAMES_FILE = 'persons/men4.json'

export default class extends Animated {
  static getAsset () { return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE] }

  constructor ({game, x, y}) {
    super({ game, x, y, asset: ASSET_NAME })

    this.addAnimation({name: 'go', length: 24, speed: 24})
    this.addAnimation({name: 'death', length: 18, speed: 24})
  }
}
