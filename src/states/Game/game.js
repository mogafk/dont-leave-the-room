/* globals __DEV__ */
import Phaser from 'phaser'
import Chance from './sprites/Chance'

import Layer from './sprites/Layer'
import Hero from './sprites/persons/Hero'

import Brevik from './sprites/events/Brevik'
import Nazi from './sprites/events/Nazi'

import TrashCanEvent from './sprites/bgevents/baby-trash'
import CrocEvent from './sprites/bgevents/croc'
import PoliceEvent from './sprites/bgevents/police'
import ExploseEvent from './sprites/bgevents/house-explose'
import Montirovka from './sprites/bgevents/montirovka'
import IcicleEvent from './sprites/bgevents/icicle'
import RapeEvent from './sprites/bgevents/rape'
// import AllPersons from './sprites/AllPersons'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = Phaser.Color.RGBtoString(79, 72, 74) //  '#4f484'
  }

  preload () {
    if (__DEV__) {
      this.game.time.advancedTiming = true
    }
    // AllPersons.preload(this.game)
    // for (let src of [Neo, Brevik, Doctor, Montirovka, Hero, Men1, Men2, Men3, Men4, Men5, Ment, Gaster]) {
    //   this.game.load.atlasJSONHash(...src.getAsset())
    // }
  }

  create () {
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR)

    this.layer1 = new Layer({
      game: this.game,
      asset: 'background',
      tiles: Phaser.Animation.generateFrameNames('parallax-2-', 1, 5, '.png'),
      speed: -0.5,
      scale: 0.5,
      anchor: (0.5, 0)
    })
    for (let i = 0; i < 10; i++) {
      this.layer1.ganerateTile()
    }

    this.layer2 = new Layer({
      game: this.game,
      asset: 'background',
      tiles: Phaser.Animation.generateFrameNames('parallax-1-', 1, 5, '.png'),
      speed: -1,
      scale: 0.75,
      anchor: (0.5, 0)
    })
    for (let i = 0; i < 10; i++) {
      this.layer2.ganerateTile()
    }

    this.zabor = this.game.add.tileSprite(
      0,
      190,
      this.game.world.width,
      350 / 4,
      'background',
      'parallax-0-1.png'
    )
    this.zabor.tileScale.setTo(0.25)

    // this.layer3 = new Layer({
    //   game: this.game,
    //   asset: 'foreground',
    //   tiles: Phaser.Animation.generateFrameNames('house-2-', 1, 9, '.png'),
    //   speed: -1.75,
    //   scale: 0.4,
    //   anchor: (0.5, 1)
    // })
    // this.layer3.addTiles(Phaser.Animation.generateFrameNames('snowdrift-', 1, 4, '.png'))
    // this.layer3.y = this.game.world.centerY + 75
    // for (let i = 0; i < 10; i++) {
    //   this.layer3.ganerateTile()
    // }

    this.layer4 = this.game.add.group()

    // for (var ii = 0; ii < 2; ii++) {
    //   const _sprite = this.layer4.create(650 * ii, this.game.world.centerY + 100, 'foreground', 'house-1-' + this.game.rnd.integerInRange(1, 8) + '.png')
    //   _sprite.scale.setTo(0.5)
    //   _sprite.anchor.setTo(0.5, 1)
    // //   create(_houseArray.pop())
    // }
    // rape.x += 1700

    const houseExplose = new ExploseEvent(this.game)
    this.layer4.add(houseExplose)
    houseExplose.x += 400
    houseExplose.y = this.game.world.height - 400
    houseExplose.play()

    const trashCanEvent = new TrashCanEvent(this.game, 0, 0)
    this.layer4.add(trashCanEvent)

    const police = this._police = new PoliceEvent(this.game)
    this.layer4.add(police)
    police.x += 600
    police.y = this.game.world.height - 25
    police.anchor.setTo(0.5, 1)

    const croc = this._croc = new CrocEvent(this.game)
    this.layer4.add(croc)
    croc.x += 1500
    croc.y = this.game.world.height - 25
    croc.anchor.setTo(0.5, 1)

    const rape = new RapeEvent(this.game)
    this.layer4.add(rape)
    rape.x = 2500
    rape.y = this.game.world.height * 1.25

    this.icicle = new IcicleEvent(this.game, 0, 0)
    this.layer4.add(this.icicle)
    this.icicle.anchor.setTo(0.5, 1)
    this.icicle.y += 100

    this.hero = new Hero({
      game: this.game,
      x: 70,
      y: this.game.world.height - 100
    })

    this.layer5 = this.game.add.group()

    this.montirovka = new Montirovka(this.game, 0, 0)
    this.montirovka.scale.setTo(1.33)
    this.montirovka.anchor.setTo(0.5, 0.5)
    this.montirovka.y = this.game.world.height - 425
    this.layer5.add(this.montirovka)

    const heroTarget = new Phaser.Point(this.game.world.centerX - 50, this.game.world.height - 100)
    // this.hero.anim['walk'].play()

    // const calculateTime = (speed, srcX, trgtX) => {
    //   const dx = trgtX - srcX
    //   const t = dx / speed
    //   return t * 100
    // }

    const scenarios = []

    scenarios.push(() => {
      this.hero.anim['walk'].play()
      this.heroAlive = true
      const onGoEnd = () => {
        console.log(this.heroAlive)
        if (this.heroAlive) { this.hero.anim['walk'].play() }
      }
      this.hero.anim['walk'].onComplete.add(() => onGoEnd())

      this.game.add.tween(this.hero).to(heroTarget, 4000, Phaser.Easing.Linear.None, true)

      this.nazi = new Nazi(this.game)
      this.nazi.y = this.game.world.height - 25

      this.nazi.playerInteraction.add(() => {
        this.heroAlive = false
        this.hero.anim['stop'].play()
          .add(() => this.hero.anim['death'].play())
      })

      this.hero.bringToTop()
    })

    scenarios.push(() => {
      this.hero.anim['walk'].play()
      this.heroAlive = true
      const onGoEnd = () => {
        if (this.heroAlive) { this.hero.anim['walk'].play() }
      }
      this.hero.anim['walk'].onComplete.add(() => onGoEnd())

      this.game.add.tween(this.hero).to(heroTarget, 4000, Phaser.Easing.Linear.None, true)

      this.brevik = new Brevik(this.game)
      this.brevik.playerInteraction.add(() => {
        this.heroAlive = false
        this.hero.anim['death'].play()
      })

      this.hero.bringToTop()
    })

    // let _houseArray = [
    //   ...Phaser.Animation.generateFrameNames('house-1-', 1, 9, '.png'),
    //   ...Phaser.Animation.generateFrameNames('sight-', 1, 8, '.png')
    // ]
    // _houseArray = Phaser.ArrayUtils.shuffle(_houseArray)
    // const _y = this.game.height - 100

    // const sprite1 = this.layer4.create(0, _y, 'foreground', _houseArray.pop())
    // sprite1.anchor.setTo(0, 1)
    // sprite1.scale.setTo(0.5)
    // console.log(_houseArray)

    // const create = (name) => {
    //   const _top = this.layer4.getTop()
    //   const _x = _top ? _top.x + _top.width : 0
    //   const sprite2 = this.layer4.create(_x, _y, 'foreground', name)
    //   sprite2.anchor.setTo(0, 1)
    //   sprite2.scale.setTo(0.5)
    // }
    // for (var ii = 0; ii < 2; ii++) {
    //   create(_houseArray.pop())
    // }

    // create(_houseArray.pop())
    // create(_houseArray.pop())
    // create(_houseArray.pop())
    // do {
    //   create(_houseArray.pop())
    // } while (_houseArray)

    // this.bot = this.game.add.existing(
    //   new Policeman(
    //     this.game,
    //     50,
    //     this.game.height - 99
    //   )
    // )
    // this.allPersons = new AllPersons(this.game, 0, 0)
    // this.game.add.existing(this.allPersons)
    this.isMove = false
    this.block = false

    this.chance = this.game.add.existing(
      new Chance(this.game)
    )

    this.chance.onEvent.add(() => {
      this.block = true
      this.isMove = false
      this.game.rnd.pick(scenarios)()
      this.game.world.bringToTop(this.layer5)
      this.hero.anim['death'].onComplete.add(() => {
        this.buttonReplay = this.game.add.button(
          this.game.world.width - 150,
          50,
          'buttonReplay',
          () => this.state.start('Game'))
        this.buttonReplay.scale.setTo(0.5)
      })
    })

    const onClick = () => {
      if (this.isMove || this.block) return
      this.hero.anim['go'].play()
      // this.button.inputEnabled = false
      this.isMove = true
      this.chance.increment()
      this.hero.anim['go'].onComplete.add(() => {
        // this.button.inputEnabled = true
        this.isMove = false
        // this.button.alpha = 1
      })
    }

    this.spaceKey.onDown.add(() => {
      onClick()
    }, this)

    this.game.input.onDown.add(() => {
      onClick()
    }, this)
    // this.button = this.game.add.existing(
    //   new Button(this.game, onClick, this)
    // )
  }
  render () {
    // if (__DEV__) {
    //   this.game.debug.text(this.game.time.fps || '--', DEBUG_X_POS, DEBUG_Y_POS, DEBUG_COLOR)
    //   // this.NPCGroup.callAll('debug')
    //   if (this._police.alive) this.game.debug.spriteInfo(this._police, 20, 20)
    // }
  }

  update () {
    if (this.isMove) {
      this.layer1.move()
      this.layer2.move()
      // this.layer3.move()
      // this.layer4.move()
      this.layer4.addAll('x', -2)
      this.layer5.addAll('x', -3)
      this.zabor.tilePosition.x -= 5
      if (!this._police.activated && (this._police.x + 200) < this.game.world.centerX) {
        this._police.play()
      }
      // console.log(this._croc.x)
      if (!this._croc.activated && this._croc.x < this.game.world.centerX) {
        this._croc.play()
      }
      if (!this.icicle.activated && this.icicle.x < this.game.world.centerX + 100) {
        this.icicle.play()
      }
    }
  }
}
