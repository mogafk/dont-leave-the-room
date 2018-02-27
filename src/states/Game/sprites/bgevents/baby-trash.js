import { Sprite, Easing, Signal } from 'phaser'

export default class extends Sprite {
  constructor (props) {
    super(props)

    this.onDestroyed = new Signal()
    this.sfx = this.game.add.audio('crying-baby')
    this.sfx.allowMultiple = true

    //  добавляю мусорный бак
    this.trashCan = new Sprite(this.game, this.x, this.y, 'trashcan')
    this.trashCan.anchor.setTo(0, 1)
    this.trashCan.pivot.setTo(1, 0.5)
    this.addChild(this.trashCan)
    this.anchor.setTo(0.5, 1)
    this.pivot.setTo(1, 0.5)

    this.trashCan.outOfCameraBoundsKill = true
    this.trashCan.autoCull = true
    this.trashCan.events.onKilled.add(() => {
      this.onDestroyed.dispatch()
      this.destroy()
      this.sfx.fadeTo(500, 0)
    }, this)

    // Цикл тряски бака
    const _p00 = this.startPoint = this.game.add
      .tween(this.trashCan)
      .to({ angle: '+2' }, 50, Easing.Linear.None, true, 1000)
    const _p0 = this.startPoint = this.game.add
      .tween(this.trashCan)
      .to({ angle: '-2' }, 50, Easing.Linear.None, false)
    const _p1 = this.game.add
      .tween(this.trashCan)
      .to({ angle: '+1' }, 50, Easing.Linear.InOut)
    const _p2 = this.game.add
      .tween(this.trashCan)
      .to({ angle: '-1' }, 50, Easing.Linear.InOut)
    // const _p3 = _p1
    // const _p5 = _p1
    // const _p7 = _p1
    // const _p4 = _p2
    // const _p6 = _p2
    // const _p8 = _p2
    _p00.chain(
      _p0.chain(
        _p1.chain(
          _p2.chain(
            _p00
          )
        )
      )
    )

    // _p0.onComplete.add(() => {
    //   this.sfx.play('', 0, 1, true)
    // }, this)

    this.sfx.play('', 0, 0.1, true)

    this.game.add.existing(this)
  }

  play () {}
}
