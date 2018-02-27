
import { Sprite, Point, Easing, Signal } from 'phaser'
import Animated from '.././Animated'

export default class extends Sprite {
  constructor (props) {
    super(props)
    this.activated = false

    this.onDestroyed = new Signal()

    //  добавляю задник
    this.back = this.game.add.sprite(0, 0, 'house-0')
    this.back.anchor.setTo(0, 1)
    this.back.outOfCameraBoundsKill = true
    this.back.autoCull = true
    this.back.events.onKilled.add(() => {
      this.onDestroyed.dispatch()
      this.destroy()
    }, this)
    this.addChild(this.back)

    this.faller = new Animated({
      game: this.game,
      x: this.back.width / 2,
      y: this.back.top,
      asset: 'icicle',
      anchor: new Point(0.5, 1)
    })
    this.faller.addAnimation({name: 'sosulya', length: 13, loop: false})
    this.addChild(this.faller)

    this.men = new Animated({
      game: this.game,
      x: this.back.right,
      y: 50,
      asset: 'men1',
      anchor: new Point(0.5, 1)
    })
    this.men.addAnimation({name: 'go', length: 22, loop: true})
    this.men.addAnimation({name: 'death', length: 26, loop: false})
    this.men.turn.rotate()
    this.addChild(this.men)

    this.pointOfAction = new Point(0, 0)

    const _dt = 0.8
    const _t00 = this.startingPoint = this.game.add
      .tween(this.men)
      .to({ 'x': this.men.x - ((this.men.x - this.faller.x) * _dt) }, 4000 * _dt, Easing.Linear.None, false)
    const _t01 = this.game.add
      .tween(this.men)
      .to({ 'x': this.faller.x }, 4000 * (1 - _dt), Easing.Linear.None, false)
    const _t1 = this.game.add
      .tween(this.faller)
      .to({ 'y': this.pointOfAction.y * 0.99 }, 500 * 0.99, Easing.Linear.None, false, 3000)
    const _t2 = this.game.add
      .tween(this.faller)
      .to({ 'y': this.pointOfAction.y + 50 }, 500 * 0.01, Easing.Bounce.Out, false)

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
