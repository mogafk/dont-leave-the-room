import { Sprite, Point, Easing } from 'phaser'
import Ment from '.././persons/Ment'
import Hero from '.././persons/Hero'
import Animated from '.././Animated'

export default class extends Sprite {
  static getAssets () {
    return [
      Ment.getAsset()
    ]
  }

  constructor ({ game, hero }) {
    super(game, 0, 0)

    this.pointOfAction = new Point(this.game.world.centerX - 100, this.game.world.centerY)

    const subject = hero || new Hero({ game: this.game, x: 0, y: this.game.world.centerY })
    this.toDebug = subject
    subject.anim['walk'].play()
    this.addChild(subject)

    const dps = new Animated({
      game: this.game,
      x: this.game.world.width,
      y: subject.y,
      asset: 'dps',
      anchor: new Point(0, 0.5),
      scale: 1.33
    })
    dps.addAnimation({name: 'siren', length: 12, speed: 12, loop: true})
    dps.anim['siren'].play()

    const ment1 = new Ment({ game: this.game, x: dps.x, y: dps.y })
    ment1.scale.setTo(1.33)
    ment1.turn.rotate()

    this.addChild(ment1)

    const ment2 = new Ment({ game: this.game, x: dps.x - 50, y: dps.y })
    ment2.scale.setTo(1.33)
    ment2.turn.rotate()

    this.addChild(ment2)
    this.addChild(dps)

    subject.bringToTop()

    const _t01 = this.game.add.tween(ment1)
      .to({
        'x': subject.x + 50,
        'y': subject.y
      }, 3000, Easing.Linear.None, false)
    const _t02 = this.game.add.tween(ment1.scale)
      .to({ 'x': -1, 'y': 1 }, 3000, Easing.Linear.None, false)

    const _t03 = this.game.add.tween(ment2)
      .to({
        'x': subject.x + 60,
        'y': subject.y + 5
      }, 3300, Easing.Linear.None, false)
    const _t04 = this.game.add.tween(ment2.scale)
      .to({
        'x': -1,
        'y': 1
      }, 3200, Easing.Linear.None, false)

    const _t00 = this.game.add.tween(dps)
      .to({
        'x': this.pointOfAction.x,
        'y': subject.y
      }, 3000, Easing.Linear.None, false)

    _t00.onComplete.add(() => {
      subject.anim['photo'].play()
    }, this)
    subject.anim['photo'].onComplete.add(() => {
      _t01.start()
    }, this)

    _t01.onStart.add(() => {
      _t02.start()
      _t03.start()
      ment1.anim['go'].play()
      ment1.anim['go'].play()
    })
    _t03.onStart.add(() => {
      _t04.start()
    })
    _t01.onComplete.add(() => {
      ment1.anim['hit'].play()
    }, this)
    _t03.onComplete.add(() => {
      ment2.anim['hit'].play()
    }, this)

    ment2.anim['hit'].onComplete.add(() => {
      subject.anim['death'].play()
    })

    this.startingPoint = _t00

    this.game.add.existing(this)
  }

  play () {
    this.startingPoint.start()
  }

  update () {
    // this.game.debug.spriteInfo(this.toDebug, 20, 20)
  }
}
