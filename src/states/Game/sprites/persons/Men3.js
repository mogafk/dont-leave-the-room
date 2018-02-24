import Animated from '.././Animated'
// import { Point } from 'phaser'

const ASSET_NAME = 'men3'
const SPRITE_FILE = 'persons/men3.png'
const FRAMES_FILE = 'persons/men3.json'

export default class extends Animated {
  static getAsset () {
    return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE]
  }

  constructor ({game, x, y}) {
    super({game, x, y, asset: ASSET_NAME})

    this.addAnimation({name: 'go', length: 13, speed: 24})
    this.addAnimation({name: 'croc', length: 13, speed: 24})
  }
}
