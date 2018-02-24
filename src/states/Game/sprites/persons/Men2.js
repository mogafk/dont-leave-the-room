import Animated from '.././Animated'
// import { Point } from 'phaser'

const ASSET_NAME = 'men2'
const SPRITE_FILE = 'persons/men2.png'
const FRAMES_FILE = 'persons/men2.json'

export default class extends Animated {
  static getAsset () {
    return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE]
  }

  constructor ({game, x, y}) {
    super({game, x, y, asset: ASSET_NAME})

    this.addAnimation({name: 'go', length: 17, speed: 24})
    this.addAnimation({name: 'fall_death', length: 21, speed: 24})
    this.addAnimation({name: 'fall', length: 24, speed: 24})
    this.addAnimation({name: 'death', length: 10, speed: 10})
  }
}
