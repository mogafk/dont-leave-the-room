import { Sprite, Point, Easing } from 'phaser'
import Ment from '.././persons/Ment'
import Hero from '.././persons/Hero'

export default class extends Sprite {
  static getAssets () {
    return [
      Ment.getAsset()
    ]
  }

  constructor ({ game, hero }) {
    super(game, 0, 0)

    this.pointOfAction = new Point(this.game.world.centerX, this.game.world.centerY)

    this.story = {
      title: 'В Чите будут судить полицейского, расстрелявшего из пистолета-пулемета прохожего, которого он принял за подозреваемого в убийстве',
      date: '13 апреля 2016',
      text: 'Получив по рации ориентировку на подозреваемых в убийстве, полицейский принял гражданина Узбекистана за одного из злоумышленников и попытался его задержать. Тот испугался и забежал в кафе «Солнечный остров». Полицейский трижды выстрелил «с расстояния не более семи метров»: в поясницу, левую руку и живот. Мужчина упал на пол, не сопротивляясь, тогда полицейский ударил его ногой в грудь.'
    }

    this.sfx = this.game.add.audio('machine-gun')
    this.sfx.allowMultiple = true

    const subject = hero || new Hero({ game: this.game, x: 0, y: this.game.world.centerY })
    this.toDebug = subject
    // subject.anim['walk'].play()
    this.addChild(subject)

    const fsb = new Ment({ game: this.game, x: this.game.camera.width + 80, y: subject.y })
    fsb.turn.rotate()
    fsb.anim['go_gun'].play()
    this.addChild(fsb)

    this.game.world.bringToTop(subject)

    const _t01 = this.game.add.tween(fsb)
      .to(
        { 'x': (fsb.x - this.pointOfAction.x / 2) },
        2000, Easing.Linear.None, false)

    // const _t02 = this.game.add.tween(subject)
      // .to({ 'x': this.pointOfAction.x / 2 }, 2500, Easing.Linear.None, false)

    const _t11 = this.game.add.tween(fsb)
      .to({ 'x': -100 }, 8000, Easing.Linear.None, false)

    _t01.onComplete.add(() => {
      fsb.anim['gun'].play()
      setTimeout(() => { this.sfx.play('', 0, 1, false) }, 900)
      fsb.anim['gun'].onComplete.add(() => {
        fsb.anim['go_gun'].play()
        subject.anim['death'].play()
        _t11.start()
      }, this)
    })
    // _t02.onComplete.add(() => { subject.anim['death'].play() })

    this.startingPoint = _t01
    // this.startingPoint.onStart.add(() => { _t02.start() })

    this.game.add.existing(this)
  }

  play () {
    this.startingPoint.start()
  }

  update () {
    // this.game.debug.spriteInfo(this.toDebug, 20, 20)
  }
}
