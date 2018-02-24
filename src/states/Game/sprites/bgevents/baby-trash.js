import { Sprite, Easing } from 'phaser'

export default class extends Sprite {
  constructor (props) {
    super(props)

    //  синоним для X центра сцены
    const WXC = this.game.world.centerX
    //  синоним для высоты сцены
    const WYH = this.game.world.height

    //  добавляю мусорный бак
    this.trashCan = this.game.add.sprite(WXC, WYH + 100, 'houses', 'trashcan')
    this.trashCan.anchor.setTo(0.5, 1)
    this.trashCan.pivot.setTo(0.5)
    this.addChild(this.trashCan)
    this.game.add.existing(this)

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
  }

  play () {
    this.startPoint.start()
  }
}
