import { Sprite, Point, Easing } from 'phaser'
import Ment from '.././persons/Ment'
import Hero from '.././persons/Hero'

export default class extends Sprite {
  static getAssets () {
    return [
      Ment.getAsset()
    ]
  }

  constructor ({ game, hero }) {
    super(game, 0, 0)

    this.pointOfAction = new Point(this.game.world.centerX, this.game.world.centerY)

    const subject = hero || new Hero({ game: this.game, x: 0, y: this.game.world.centerY })
    this.toDebug = subject
    subject.anim['walk'].play()
    this.addChild(subject)

    const fsb = new Ment({ game: this.game, x: this.game.world.width, y: subject.y })
    fsb.turn.rotate()
    fsb.anim['go_gun'].play()
    this.addChild(fsb)

    this.game.world.bringToTop(subject)

    const _dt = 0.85
    const _t01 = this.game.add.tween(fsb)
      .to({ 'x': (fsb.x - this.pointOfAction.x / 2 * _dt) }, 2000 * _dt, Easing.Linear.None, false)
      .chain(this.game.add.tween(fsb)
        .to({ 'x': (fsb.x - this.pointOfAction.x / 2) }, 2000 * (1 - _dt), Easing.Linear.None, false))

    const _t02 = this.game.add.tween(subject)
      .to({ 'x': this.pointOfAction.x / 2 }, 2500, Easing.Linear.None, false)

    const _t11 = this.game.add.tween(fsb)
      .to({ 'x': -100 }, 8000, Easing.Linear.None, false)

    _t01.onComplete.add(() => {
      fsb.anim['gun'].play()
      fsb.anim['gun'].onComplete.add(() => {
        fsb.anim['go_gun'].play()
        _t11.start()
      }, this)
    })
    _t02.onComplete.add(() => { subject.anim['death'].play() })

    this.startingPoint = _t01
    this.startingPoint.onStart.add(() => { _t02.start() })

    this.game.add.existing(this)
  }

  play () {
    this.startingPoint.start()
  }

  update () {
    // this.game.debug.spriteInfo(this.toDebug, 20, 20)
  }
}
