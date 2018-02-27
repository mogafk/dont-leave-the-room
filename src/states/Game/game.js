/* globals __DEV__ */
import Phaser from 'phaser'
import Chance from './sprites/Chance'

// import Layer from './sprites/Layer'
import Hero from './sprites/persons/Hero'
import Background from './sprites/Background'

import { Brevik, Doctor, DPS, FSB, Nazi, Rifle, SK } from './sprites/events'
import { BGBaby, BGCroc, BGExplose, BGIcicle, BGMontirovka, BGPolice, BGRape } from './sprites/bgevents'

const EVENTS = [DPS, Doctor, FSB, Rifle, SK, Brevik, Nazi]
const BGEVENTS = [BGIcicle, BGMontirovka, BGPolice, BGRape, BGCroc, BGBaby, BGExplose]

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = Phaser.Color.RGBtoString(79, 72, 74) //  '#4f484'
  }

  preload () {
    if (__DEV__) {
      this.game.time.advancedTiming = true
    }
    EVENTS.map(ev => {
      ev.getAssets().map(el => {
        this.game.load.atlasJSONHash(...el)
      })
    })
  }

  create () {
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR)

    this.isMove = false
    this.block = false

    this.background = new Background(this.game)

    this.layer4 = this.game.add.group()
    this.layer4.y = this.game.world.height - 100

    this.eventObservers = []
    let _bgevents = [BGRape] //  Phaser.ArrayUtils.shuffle(BGEVENTS)
    const createBGEvent = () => {
      if (_bgevents.length <= 0) _bgevents = Phaser.ArrayUtils.shuffle([...BGEVENTS])
      const Constructor = _bgevents.pop()
      const _ev = new Constructor(this.game, 0, 0)
      this.layer4.add(_ev)
      _ev.x = this.game.width - 1
      _ev.onDestroyed.add(createBGEvent)
      this.eventObservers.push(_ev)
      return true
    }

    createBGEvent()

    this.hero = new Hero({game: this.game, x: 70, y: this.game.world.height - 100})
    this.hero.anim['go'].onComplete.add(() => { this.isMove = false })

    this.layer5 = this.game.add.group()

    const scenarios = []
    EVENTS.map(Ev => {
      scenarios.push(() => {
        this.doctor = new Ev({game: this.game, hero: this.hero})
        this.doctor.play()
      })
    })

    // let _houseArray = [
    //   ...Phaser.Animation.generateFrameNames('house-1-', 1, 9, '.png'),
    //   ...Phaser.Animation.generateFrameNames('sight-', 1, 8, '.png')
    // ]
    // _houseArray = Phaser.ArrayUtils.shuffle(_houseArray)
    // const _y = this.game.height - 100

    this.chance = this.game.add.existing(
      new Chance(this.game)
    )

    const endSession = () => {
      this.buttonReplay = this.game.add.button(
        this.game.world.width - 150,
        50,
        'buttonReplay',
        () => this.state.start('Game'))
      this.buttonReplay.scale.setTo(0.5)
    }

    const shitHappensEvent = () => {
      this.block = true
      this.isMove = false
      this.game.rnd.pick(scenarios)()
      this.game.world.bringToTop(this.layer5)
      this.hero.anim['death'].onComplete.add(endSession, this)
      this.hero.anim['brokenleg'].onComplete.add(endSession, this)
    }

    this.chance.onEvent.add(shitHappensEvent, this)

    const onClick = () => {
      if (this.isMove || this.block) return
      this.hero.anim['go'].play()
      this.isMove = true
      this.chance.increment()
    }
    this.spaceKey.onDown.add(onClick, this)
    this.game.input.onDown.add(() => { onClick() }, this)
  }
  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.trashCanEvent)
    // }
  }

  update () {
    if (this.isMove) {
      this.background.move()
      this.layer4.addAll('x', -4)

      this.eventObservers.map(el => {
        if (el) {
          if (!el.activated) {
            if (el.x < this.hero.x) { //  this.game.world.centerX
              el.play()
            }
          }
        }
      })
    }
  }
}
