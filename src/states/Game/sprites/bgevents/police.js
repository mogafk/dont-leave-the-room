
import { Sprite, Point, Easing } from 'phaser'
import Animated from '.././Animated'

export default class extends Sprite {
  constructor (props) {
    super(props)
    this.activated = false
    //  синоним для X центра сцены
    const WXC = this.game.world.centerX
    //  синоним для высоты сцены
    const WYH = this.game.world.height

    //  добавляю задник
    this.back = this.game.add.sprite(WXC, 0, 'houses', 'police')
    this.back.anchor.setTo(0.5, 1)

    this.addChild(this.back)

    //  добавляю падающего человека с анимациями fall и fall_death
    this.faller = new Animated({
      game: this.game,
      x: +150,
      y: -800,
      asset: 'men2',
      anchor: new Point(0.5, 0.5)
    })
    this.faller.addAnimation({name: 'fall', length: 24, loop: true})
    this.faller.addAnimation({name: 'fall_death', length: 21, speed: 90, loop: false})
    //  привязываю падающего человека к заднику
    this.back.addChild(this.faller)

    //  человек падает с крыши
    const _p0 = this.startPoint = this.game.add
      .tween(this.faller)
      .to({
        'y': -130
      },
      2000,
      Easing.Linear.None,
      false
      )

    //  когда человек закончил лететь,
    //  включаю анимацию смерти от падения
    _p0.onComplete.add(() => {
      this.faller.anim['fall_death'].play()
    })
  }
  //  Запуск падающего
  play () {
    this.activated = true
    this.startPoint.start()
    this.faller.anim['fall'].play()
  }
}
