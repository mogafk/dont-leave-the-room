/* globals __DEV__ */
import Phaser from 'phaser'
import Chance from './sprites/Chance'
import Hero from './sprites/persons/Hero'
import Background from './sprites/Background'
import showModal from '.././Modal'
import Mute from './sprites/Mute'
import { GAGameStart, GAGameEnd, GAGameReset } from '.././Analit'
import { Brevik, Doctor, DPS, FSB, Nazi, Rifle, SK } from './sprites/events'
import { BGBaby, BGCroc, BGExplose, BGIcicle, BGMontirovka, BGPolice, BGRape } from './sprites/bgevents'

const EVENTS = [DPS, Doctor, FSB, Rifle, SK, Brevik, Nazi]
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
    GAGameStart()
    this.stage.backgroundColor = Phaser.Color.RGBtoString(79, 72, 74) //  '#4f484'

    this.sessionStartTimestamp = this.game.time.totalElapsedSeconds()
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR)

    this.isMove = false
    this.block = true

    this.game.sound.stopAll()
    this.music = this.game.add.audio('main-theme')
    this.music.play('', 0, 1, true)

    this.eventSFX = this.game.add.audio('event')
    this.eventSFX.allowMultiple = true

    this.game.camera.onFadeComplete.removeAll()
    this.game.camera.flash(0x000000, 2000)
    this.game.camera.onFlashComplete.add(() => {
      this.block = false
    }, this)

    this.background = new Background(this.game)

    this.layer4 = this.game.add.group()
    this.layer4.y = this.game.world.height - 100

    this.eventObservers = []
    let _bgevents = Phaser.ArrayUtils.shuffle([...BGEVENTS])
    const createBGEvent = () => {
      if (_bgevents.length <= 0) {
        _bgevents = Phaser.ArrayUtils.shuffle([...BGEVENTS])
      }
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
        const ev = new Ev({game: this.game, hero: this.hero})
        ev.play()
        return ev
      })
    })

    this.chance = this.game.add.existing(
      new Chance(this.game)
    )

    const endSession = () => {
      this.game.time.events.add(Phaser.Timer.SECOND * 3, showDeathImage, this)
    }

    const showDeathImage = () => {
      const _val = this.chance.steps.getValue()
      GAGameEnd(
        Math.round(this.game.time.totalElapsedSeconds() - this.sessionStartTimestamp, 1),
        Math.round(this.game.time.totalElapsedSeconds(), 1),
        _val
      )
      showModal({
        step: _val,
        story: this.deathEvent.story,
        cb: () => { this.state.start('Game'); GAGameReset() }
      })
      this.game.camera.fade(0x000000, 4000)
    }

    const shitHappensEvent = () => {
      this.eventSFX.play('', 0, 1, false)
      this.block = true
      this.isMove = false
      this.deathEvent = this.game.rnd.pick(scenarios)()
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

    this.game.add.existing(new Mute(this.game))
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
            if (el.x < this.game.camera.width / 2) {
              el.play()
            }
          }
        }
      })
    }
  }
}
