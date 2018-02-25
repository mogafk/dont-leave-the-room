import Animated from '.././Animated'
import { Point } from 'phaser'

const ASSET_NAME = 'men1'
const SPRITE_FILE = 'persons/men1.png'
const FRAMES_FILE = 'persons/men1.json'

export default class extends Animated {
  static getAsset () { return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE] }

  constructor ({game, x, y}) {
    super({ game, x, y, asset: ASSET_NAME, anchor: new Point(0.5, 1) })

    this.addAnimation({ name: 'go', length: 22, speed: 24 })
    this.addAnimation({ name: 'death', length: 13, speed: 13 })
  }
}
