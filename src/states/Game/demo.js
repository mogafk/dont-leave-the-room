/* globals __DEV__ */
import Phaser from 'phaser'

import Background from './sprites/Background'
// import Animated from './sprites/Animated'
// import CrocEvent from './sprites/bgevents/croc'
// import PoliceEvent from './sprites/bgevents/police'
import TrashCan from './sprites/bgevents/baby-trash'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = Phaser.Color.RGBtoString(79, 72, 74) //  '#4f484'
  }

  preload () {
    this.game.load.atlasJSONHash('croc', 'events/croc.png', 'events/croc.json')
    this.game.load.atlasJSONHash('men2', 'persons/men2.png', 'persons/men2.json')
    this.game.load.atlasJSONHash('men3', 'persons/men3.png', 'persons/men3.json')
    if (__DEV__) {
      this.game.time.advancedTiming = true
    }
  }

  create () {
    // рисую фон
    Background(this.game)

    // this.crocEvent = new PoliceEvent(this.game, 0, 0)
    // this.crocEvent.play()

    // this.policeEvent = new PoliceEvent(this.game, 0, 0)
    // this.policeEvent.play()

    this.TrashCan = new TrashCan(this.game, 0, 0)
    this.TrashCan.play()
  }

  render () {
    // if (this.croc.alive) { this.game.debug.spriteInfo(this.croc, 20, 20) }
  }
}
