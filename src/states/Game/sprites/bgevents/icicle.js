
import { Sprite, Point, Easing } from 'phaser'
import Animated from '.././Animated'

export default class extends Sprite {
  constructor (props) {
    super(props)
    this.activated = false

    //  добавляю задник
    this.back = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'houses', 'house-0')
    this.back.anchor.setTo(0.5, 1)
    this.addChild(this.back)

    this.faller = new Animated({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY - 800,
      asset: 'icicle',
      anchor: new Point(0.5, 0.5)
    })
    this.faller.addAnimation({name: 'sosulya', length: 13, loop: false})
    this.addChild(this.faller)

    this.men = new Animated({
      game: this.game,
      x: 0,
      y: this.game.world.centerY + 25,
      asset: 'men1',
      anchor: new Point(0.5, 0.5)
    })
    this.men.addAnimation({name: 'go', length: 22, loop: true})
    this.men.addAnimation({name: 'death', length: 26, loop: false})
    this.addChild(this.men)

    this.pointOfAction = new Point(this.game.world.centerX, this.game.world.centerY + 25)

    const _dt = 0.666
    const _t00 = this.startingPoint = this.game.add
      .tween(this.men)
      .to({ 'x': this.pointOfAction.x * _dt }, 2000 * _dt, Easing.Linear.None, false)
    const _t01 = this.game.add
      .tween(this.men)
      .to({ 'x': this.pointOfAction.x }, 2000 * (1 - _dt), Easing.Linear.None, false)
    const _t1 = this.game.add
      .tween(this.faller)
      .to({ 'y': this.pointOfAction.y * 0.95 }, 2000 * 0.95, Easing.Linear.None, false)
    const _t2 = this.game.add
      .tween(this.faller)
      .to({ 'y': this.pointOfAction.y + 25 }, 2000 * 0.05, Easing.Bounce.Out, false)

    _t00.onStart.add(() => {
      _t1.start()
    }, this)
    _t00.onComplete.add(() => {
      _t01.start()
      this.men.anim['death'].play()
    })
    _t1.onComplete.add(() => {
      _t2.start()
      this.faller.anim['sosulya'].play()
    }, this)

    this.game.add.existing(this)
  }

  play () {
    this.activated = true
    this.startingPoint.start()
    this.men.anim['go'].play()
  }
}
