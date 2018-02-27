import { Sprite, Easing, Signal } from 'phaser'

export default class extends Sprite {
  constructor (props) {
    super(props)

    this.onDestroyed = new Signal()

    //  добавляю мусорный бак
    this.trashCan = new Sprite(this.game, this.x, this.y, 'trashcan')
    this.trashCan.anchor.setTo(0, 1)
    this.trashCan.pivot.setTo(0.5, 1)
    this.addChild(this.trashCan)
    this.anchor.setTo(0.5, 1)

    this.trashCan.outOfCameraBoundsKill = true
    this.trashCan.autoCull = true
    this.trashCan.events.onKilled.add(() => {
      this.onDestroyed.dispatch()
      this.destroy()
    }, this)

    // Цикл тряски бака
    const _p0 = this.startPoint = this.game.add
      .tween(this.trashCan)
      .to({ angle: '+2' }, 50, Easing.Elastic.InOut, true, 1000)
    const _p1 = this.game.add
      .tween(this.trashCan)
      .to({ angle: '-4' }, 100, Easing.Elastic.InOut)
    const _p2 = this.game.add
      .tween(this.trashCan)
      .to({ angle: '+2' }, 50, Easing.Elastic.InOut)
    _p0.chain(_p1.chain(_p2.chain(_p0)))

    this.game.add.existing(this)
  }

  play () {}
}
