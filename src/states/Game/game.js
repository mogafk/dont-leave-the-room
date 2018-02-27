/* globals __DEV__ */
import Phaser from 'phaser'
import Chance from './sprites/Chance'

// import Layer from './sprites/Layer'
import Hero from './sprites/persons/Hero'
import Background from './sprites/Background'

import showModal from '.././Modal'

import { Brevik, Doctor, DPS, FSB, Nazi, Rifle, SK } from './sprites/events'
import { BGBaby, BGCroc, BGExplose, BGIcicle, BGMontirovka, BGPolice, BGRape } from './sprites/bgevents'

const EVENTS = [DPS, Doctor, FSB, Rifle, SK, Brevik, Nazi]
// const EVENTS = [Doctor]
const BGEVENTS = [BGIcicle, BGMontirovka, BGPolice, BGRape, BGCroc, BGBaby, BGExplose]

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = 0x000000
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
    this.stage.backgroundColor = Phaser.Color.RGBtoString(79, 72, 74) //  '#4f484'

    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR)

    this.isMove = false
    this.block = true

    this.music = this.game.add.audio('main-theme')
    this.music.play()

    this.game.camera.flash(0x000000, 4000)
    this.game.camera.onFlashComplete.add(() => {
      this.block = false
    }, this)

    this.background = new Background(this.game)

    this.layer4 = this.game.add.group()
    this.layer4.y = this.game.world.height - 100

    this.eventObservers = []
    let _bgevents = [] //  Phaser.ArrayUtils.shuffle(BGEVENTS)
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
      this.game.time.events.add(Phaser.Timer.SECOND * 3, showDeathImage, this)
    }

    const showDeathImage = () => {
      showModal(
        this.chance.getSteps(),
        () => this.state.start('Game')
      )
      // const _img = this.game.add.sprite(
      //   this.game.camera.width / 2,
      //   this.game.camera.height / 2,
      //   'ui-death'
      // )
      // const _scaleW = this.game.width / _img.width
      // const _scaleH = this.game.height / _img.height
      // _img.scale.setTo(Math.max(_scaleW, _scaleH))
      // _img.anchor.setTo(0.5)
      // _img.alpha = 0
      // const _t0 = this.game.add.tween(_img)
      //   .to({ 'alpha': 1 }, 1000, Phaser.Easing.Linear.None, false)
      // _t0.start()
      // _t0.onComplete.add(() => {
      //   this.buttonReplay = this.game.add.button(
      //     this.game.world.width - 150,
      //     50,
      //     'buttonReplay',
      //     () => {
      //       this.music.destroy()
      //       this.state.start('Game')
      //     })
      //   this.buttonReplay.scale.setTo(0.5)
      // }, this)
    }

    const shitHappensEvent = () => {
      // this.hero.anim['stop'].play()

      // this.game.time.events.add(
      //   Phaser.Timer.SECOND * 1,
      //   () => {
      //     this.hero.animation.stop()
      //     this.isMove = false
      //   },
      //   this
      // )
      this.block = true
      this.isMove = false
      this.game.rnd.pick(scenarios)()
      this.isMove = true
      this.hero.anim['stop'].onComplete.add(() => {
        this.isMove = false
      }, this)
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

    this.layer4.y += 30
  }
  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.trashCanEvent)
    // }
  }

  update () {
    if (this.isMove) {
      this.background.move()
      this.layer4.addAll('x', -1.1)

      this.eventObservers.map(el => {
        if (el) {
          if (!el.activated) {
            if (el.x < this.game.camera.width / 2) { //  this.game.world.centerX
              el.play()
            }
          }
        }
      })
    }
  }
}
