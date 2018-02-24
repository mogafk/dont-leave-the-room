/* globals __DEV__ */
import Phaser from 'phaser'
import Button from './sprites/Button'
import Chance from './sprites/Chance'

import Layer from './sprites/Layer'
import Hero from './sprites/persons/Hero'

import Rape from './sprites/events/Rape'
// import Doctor from './sprites/events/Doctor'
import Brevik from './sprites/events/Brevik'
import Nazi from './sprites/events/Nazi'

import Event from './sprites/events/Event'

import AllPersons from './sprites/AllPersons'
const DEBUG_X_POS = 14
const DEBUG_Y_POS = 14
const DEBUG_COLOR = '#00ff00'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = Phaser.Color.RGBtoString(79, 72, 74) //  '#4f484'
  }

  preload () {
    if (__DEV__) {
      this.game.time.advancedTiming = true
    }
    AllPersons.preload(this.game)
    // for (let src of [Neo, Brevik, Doctor, Montirovka, Hero, Men1, Men2, Men3, Men4, Men5, Ment, Gaster]) {
    //   this.game.load.atlasJSONHash(...src.getAsset())
    // }
  }

  create () {
    this.foreground = this.game.add.tileSprite(
      0,
      this.game.height - 66,
      this.game.world.width,
      this.game.height,
      'asphalt'
    )
    this.foreground.tileScale.setTo(0.5)

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

    this.layer3 = new Layer({
      game: this.game,
      asset: 'foreground',
      tiles: Phaser.Animation.generateFrameNames('house-2-', 1, 9, '.png'),
      speed: -1.75,
      scale: 0.4,
      anchor: (0.5, 1)
    })
    this.layer3.addTiles(Phaser.Animation.generateFrameNames('snowdrift-', 1, 4, '.png'))
    this.layer3.y = this.game.world.centerY + 75
    for (let i = 0; i < 10; i++) {
      this.layer3.ganerateTile()
    }

    this.layer4 = this.game.add.group()

    for (var ii = 0; ii < 2; ii++) {
      const _sprite = this.layer4.create(650 * ii, this.game.world.centerY + 100, 'foreground', 'house-1-' + this.game.rnd.integerInRange(1, 8) + '.png')
      _sprite.scale.setTo(0.5)
      _sprite.anchor.setTo(0.5, 1)
    //   create(_houseArray.pop())
    }

    const rape = new Rape(this.game)
    this.layer4.add(rape)

    this.hero = new Hero({
      game: this.game,
      x: 70,
      y: this.game.world.centerY + 100
    })

    const heroTarget = new Phaser.Point(this.game.world.centerX - 50, this.game.world.centerY + 100)
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
      this.nazi.addAll('x', 100)
      this.nazi.addAll('y', 100)

      this.nazi.playerInteraction.add(() => {
        this.heroAlive = false
        this.hero.anim['stop'].play()
          .add(() => this.hero.anim['death'].play())
      })
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
      this.hero.anim['death'].onComplete.add(() => {
        this.buttonReplay = this.game.add.button(
          this.game.world.width - 150,
          50,
          'buttonReplay',
          () => this.state.start('EndlessWalk'))
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
    if (__DEV__) {
      this.game.debug.text(this.game.time.fps || '--', DEBUG_X_POS, DEBUG_Y_POS, DEBUG_COLOR)
      // this.NPCGroup.callAll('debug')
    }
  }

  update () {
    if (this.isMove) {
      this.layer1.move()
      this.layer2.move()
      this.layer3.move()
      // this.layer4.move()
      this.layer4.addAll('x', -2)
      this.foreground.tilePosition.x -= 4
      this.zabor.tilePosition.x -= 5
    }
  }
}
