import Animated from '.././Animated'
// import { Point } from 'phaser'

const ASSET_NAME = 'gaster'
const SPRITE_FILE = 'persons/gaster.png'
const FRAMES_FILE = 'persons/gaster.json'

export default class extends Animated {
  static getAsset () {
    return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE]
  }

  constructor ({game, x, y}) {
    super({game, x, y, asset: ASSET_NAME})

    this.addAnimation({name: 'go', length: 24, speed: 24})
    this.addAnimation({name: 'go2', length: 24, speed: 24})
    this.addAnimation({name: 'stop', length: 9, speed: 24})
  }
}
