import { Sprite, Point, Easing } from 'phaser'
import Form from '.././persons/Form'
import Hero from '.././persons/Hero'

export default class extends Sprite {
  static getAssets () {
    return [
      Form.getAsset()
    ]
  }

  constructor ({ game, hero }) {
    super(game, 0, 0)

    this.pointOfAction = new Point(this.game.world.centerX, this.game.world.centerY)

    const subject = hero || new Hero({ game: this.game, x: 0, y: this.game.world.centerY })
    // subject.anim['walk'].play()

    const sk = new Form({ game: this.game, x: this.game.world.width, y: subject.y })
    sk.anim['go'].play()

    subject.bringToTop()

    const _dt = 0.93
    const _t01 = this.game.add.tween(sk)
      .to({ 'x': (sk.x - this.subject.x * _dt) }, 4000 * _dt, Easing.Linear.None, false)
      .chain(this.game.add.tween(sk)
        .to({ 'x': this.subject.x }, 4000 * (1 - _dt), Easing.Linear.None, false))

    // const _t02 = this.game.add.tween(subject)
      // .to({ 'x': this.pointOfAction.x - 50 }, 4000, Easing.Linear.None, false)

    const _t11 = this.game.add.tween(sk)
      .to({ 'x': -100 }, 4000, Easing.Linear.None, false)

    _t01.onComplete.add(() => {
      sk.anim['hit'].play()
      sk.anim['hit'].onComplete.add(() => {
        sk.anim['go'].play()
        _t11.start()
      }, this)
    })
    _t01.onComplete.add(() => { subject.anim['brokenleg'].play() })

    this.startingPoint = _t01
    // this.startingPoint.onStart.add(() => { _t02.start() })
  }

  play () {
    this.startingPoint.start()
  }
}
