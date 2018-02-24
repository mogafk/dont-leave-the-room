import Animated from '.././Animated'
// import { Point } from 'phaser'

const ASSET_NAME = 'men5'
const SPRITE_FILE = 'persons/men5.png'
const FRAMES_FILE = 'persons/men5.json'

export default class extends Animated {
  static getAsset () {
    return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE]
  }

  constructor ({game, x, y}) {
    super({game, x, y, asset: ASSET_NAME})

    this.addAnimation({name: 'go', length: 24, speed: 24})
  }
}
