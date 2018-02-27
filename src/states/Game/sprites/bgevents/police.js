
import { Sprite, Point, Easing, Signal } from 'phaser'
import Animated from '.././Animated'

export default class extends Sprite {
  constructor (props) {
    super(props)
    this.activated = false
    this.onDestroyed = new Signal()

    this.sfx = this.game.add.audio('fall-with-impact')
    this.sfx.allowMultiple = true

    //  добавляю задник
    this.back = this.game.add.sprite(0, 0, 'house-police')
    this.back.anchor.setTo(0, 1)
    this.back.outOfCameraBoundsKill = true
    this.back.autoCull = true
    this.back.events.onKilled.add(() => {
      this.onDestroyed.dispatch()
      this.destroy()
    }, this)
    this.addChild(this.back)

    //  добавляю падающего человека с анимациями fall и fall_death
    this.faller = new Animated({
      game: this.game,
      x: +150,
      y: -800,
      asset: 'men2',
      anchor: new Point(0.5, 1)
    })
    this.faller.addAnimation({name: 'fall', length: 24, loop: true})
    this.faller.addAnimation({name: 'fall_death', length: 21, speed: 90, loop: false})
    //  привязываю падающего человека к заднику
    this.back.addChild(this.faller)

    //  человек падает с крыши
    const _p0 = this.startPoint = this.game.add
      .tween(this.faller)
      .to({
        'y': 80
      },
      1700,
      Easing.Linear.None,
      false
      )

    //  когда человек закончил лететь,
    //  включаю анимацию смерти от падения
    _p0.onComplete.add(() => {
      this.faller.anim['fall_death'].play()
    })

    this.game.add.existing(this)
  }
  //  Запуск падающего
  play () {
    this.activated = true
    this.sfx.play('', 0, 1, false)
    this.startPoint.start()
    this.faller.anim['fall'].play()
  }
}
