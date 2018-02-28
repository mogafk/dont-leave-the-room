import { Sprite, Point, Easing, Signal } from 'phaser'
import Animated from '.././Animated'

export default class extends Sprite {
  constructor (props) {
    super(props)
    this.activated = false

    //  добавляю задник
    this.back = this.game.add.sprite(0, 0, 'houses', 'house-1')

    this.onDestroyed = new Signal()

    this.sfx = this.game.add.audio('croc')
    this.sfx.allowMultiple = true

    this.anchor.setTo(0, 1)
    this.addChild(this.back)
    this.back.anchor.setTo(0, 1)
    this.back.outOfCameraBoundsKill = true
    this.back.autoCull = true
    this.back.events.onKilled.add(() => {
      this.onDestroyed.dispatch()
      this.destroy()
    }, this)

    //  добавляю анимированного крокодила с анимациями lie и fly
    this.croc = new Animated({
      game: this.game,
      x: 0,
      y: -600,
      asset: 'croc',
      anchor: new Point(0.5, 0.5)
    })
    this.croc.addAnimation({name: 'lie', prefix: 'croc_', length: 7, loop: true})
    this.croc.addAnimation({name: 'fly', prefix: 'croc_', length: 15, offset: 8, loop: true})
    //  привязываю крокодила к заднику
    this.back.addChild(this.croc)

    //  добавляю владельца крокодила с анимациями go и croc
    this.men = new Animated({
      game: this.game,
      x: 350,
      y: -50,
      asset: 'men3',
      anchor: new Point(0.5, 0.5),
      scale: 0.6
    })
    this.men.addAnimation({name: 'croc', length: 13, loop: true})
    this.men.addAnimation({name: 'go', length: 13, loop: true})
    //  изначально владельца не видно, он потом проявится
    this.men.alpha = 0
    //  добавляю владельца крокодила к заднику
    this.back.addChild(this.men)
    //  !!!!!! Перепутал анимации !!!!!!!!
    // go - идти с крокодилом
    // croc - идти без крокодила
    this.men.anim['croc'].play()

    //  Крокодил падает с крыши
    const _p0 = this.startPoint = this.game.add
      .tween(this.croc)
      .to({
        'y': 0
      },
      1000,
      Easing.Back.In,
      false
      )
    _p0.onStart.add(() => {
      setTimeout(() => {this.sfx.play('', 0, 1, false)}, 800)
    }, this)

    //  Человек выходит из подъезда
    const _p01 = this.game.add
      .tween(this.men)
      .to({
        'alpha': 1,
        'x': '-80',
        'y': '0'
      },
      1000,
      Easing.Linear.None,
      false
      )

      //  Увеличение человека
    const _p02 = this.game.add
      .tween(this.men.scale)
      .to({
        x: 1,
        y: 1
      },
      1000,
      Easing.Linear.None,
      false
      )

      //  Человек идёт к крокодилу
    const _p1 = this.game.add
      .tween(this.men)
      .to({ 'x': this.croc.x },
        2000,
        Easing.Linear.None,
        false
      )

      //  Человек с крокодилом уходят за сцену
    const _p2 = this.game.add
      .tween(this.men)
      .to({ 'x': -1 * this.game.world.width },
        3000,
        Easing.Linear.None,
        false
      )

      // После того как крокодил упал, выходит человек
    _p0.onComplete.add(() => {
      this.croc.anim['lie'].play()
      this.men.alpha = 0.3
      _p02.start()
      _p01.start().chain(_p1)
    })

    // После того как человек дошёл до крокодила, привязываю крокодила к человеку
    // запускаю человека за сцену и добавляю обработчик видимости.
    // Когда человек с крокодилом покинули сцену - уничтожаю.
    _p1.onComplete.add(() => {
      this.men.addChild(this.croc)
      this.croc.x = 0
      this.croc.y = 0
      this.croc.angle += 15
      this.men.anim['go'].play()
      _p2.start()
    })
  }

  //  Запуск крокодила
  play () {
    this.activated = true
    this.startPoint.start()
    this.croc.anim['fly'].play()
  }
}
