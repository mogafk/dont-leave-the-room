import Animated from '.././Animated'

const ASSET_NAME = 'hero'
const SPRITE_FILE = 'persons/hero.png'
const FRAMES_FILE = 'persons/hero.json'

export default class extends Animated {
  static getAsset () { return [ASSET_NAME, SPRITE_FILE, FRAMES_FILE] }

  constructor ({game, x, y}) {
    super({ game, x, y, asset: ASSET_NAME })

    this.addAnimation({name: 'brokenleg', length: 15, speed: 12})
    this.addAnimation({name: 'death', length: 11, speed: 24})
    this.addAnimation({name: 'go', length: 21, speed: 24})
    this.addAnimation({name: 'walk', prefix: `go_`, offset: 3, length: 14, speed: 24, loop: true})
    this.addAnimation({name: 'stop', prefix: `go_`, offset: 14, length: 21, speed: 24})
    this.addAnimation({name: 'photo', length: 12, speed: 12})
    this.addAnimation({name: 'spit', length: 9, speed: 12})
    this.addAnimation({name: 'stand', prefix: `go_`, offset: 20, length: 21, speed: 12})
  }
}
