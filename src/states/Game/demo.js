/* globals __DEV__ */
import Phaser from 'phaser'

import Background from './sprites/Background'
import { BGMontirovka, BGIcicle } from './sprites/bgevents'

import { DPS } from './sprites/events'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = Phaser.Color.RGBtoString(79, 72, 74) //  '#4f484'
  }

  preload () {
    DPS.getAssets().map(el => {
      this.game.load.atlasJSONHash(...el)
    })

    this.game.load.atlasJSONHash('montirovka-car', 'events/montirovka_car.png', 'events/montirovka_car.json')
    this.game.load.atlasJSONHash('montirovka-man', 'persons/montirovka.png', 'persons/montirovka.json')

    if (__DEV__) {
      this.game.time.advancedTiming = true
    }
  }

  create () {
    Background(this.game)

    // this.fx = this.game.add.audioSprite('sfx')
    // this.fx.allowMultiple = true

    // this.montirovka = new BGMontirovka(this.game, this.game.world.centerX, this.game.world.centerY)
    // this.montirovka.play()

    // // this.montirovka.x = this.game.width - 100
    // this.game.add.existing(this.montirovka)

    this.layer4 = this.game.add.group()
    this.layer4.y = this.game.world.height - 100

    this.eventObservers = []
    let _bgevents = [BGIcicle] //  Phaser.ArrayUtils.shuffle(BGEVENTS)
    const createBGEvent = () => {
      if (_bgevents.length <= 0) return false
      const Constructor = _bgevents.pop()
      const _ev = new Constructor(this.game, 0, 0)
      this.layer4.add(_ev)
      // _ev.x = this.game.width - 1
      _ev.onDestroyed.add(createBGEvent)
      this.eventObservers.push(_ev)
      _ev.play()
      return true
    }

    createBGEvent()

    this.dps = new DPS({game: this.game})
    this.dps.play()

    // this.dps = new DPS({ game: this.game })
    // this.dps.play()

    // this.music = this.game.add.audio('main-theme')
    // this.music.play()

    // this.sfx1 = this.game.add.audio('event1')
    // this.sfx1.allowMultiple = true
    // this.sfx1.play()

    // this.video = this.game.add.video('intro')
    // this.video.play(false)
    //  x, y, anchor x, anchor y, scale x, scale y
    // this.video.addToWorld()
    // const vid = this.video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.65, 1, 1)
    // this.video.onComplete.add(() => {
    //   vid.destroy()
    //   vid.removeVideoElement()
    // })
  }

  render () {
    this.game.debug.spriteInfo(this.layer4.getTop(), 20, 20)
  }
}
