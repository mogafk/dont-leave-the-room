import { Sprite, Point, Easing } from 'phaser'
import Doctor from '.././persons/Doctor'
import Hero from '.././persons/Hero'

export default class extends Sprite {
  static getAssets () {
    return [
      Doctor.getAsset()
    ]
  }

  constructor ({ game, hero }) {
    super(game, 0, 0)

    this.pointOfAction = new Point(this.game.world.centerX, this.game.world.centerY)

    this.hero = hero || new Hero({ game: this.game, x: 0, y: this.game.world.centerY })
    // this.hero.anim['walk'].play()
    this.addChild(this.hero)

    this.doctor = new Doctor({ game: this.game, x: this.game.world.width, y: this.hero.y })
    this.doctor.anim['go'].play()

    this.hero.bringToTop()

    // const _dt = 0.8
    const _t01 = this.game.add.tween(this.doctor)
      // .to({
      //   'x': (this.doctor.x - this.hero.x * _dt),
      //   'y': (this.hero.y) }, 4000 * _dt, Easing.Linear.None, false)
      // .chain(this.game.add.tween(this.doctor)
      .to({
        'x': this.hero.x + 20
      }, 4000, Easing.Linear.None, false)

    // const _t02 = this.game.add.tween(this.hero)
      // .to({ 'x': this.pointOfAction.x - 50 }, 4000, Easing.Linear.None, false)

    const _t11 = this.game.add.tween(this.doctor)
      .to({ 'x': -100 }, 4000, Easing.Linear.None, false)

    _t01.onComplete.add(() => {
      this.doctor.anim['hit'].play()
      this.doctor.anim['hit'].onComplete.add(() => {
        this.doctor.anim['go'].play()
        _t11.start()
      }, this)
    })
    _t01.onComplete.add(() => { this.hero.anim['death'].play() })

    this.startingPoint = _t01
    // this.startingPoint.onStart.add(() => { _t02.start() })

    this.game.add.existing(this)
  }

  play () {
    this.startingPoint.start()
  }
}
