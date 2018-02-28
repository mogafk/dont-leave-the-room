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
    // this.hero.anim['spit'].play()
    // this.hero.anim['spit'].onComplete.add(() => {
    //   this.hero.anim['stop'].play()
    // }, this)

    this.hero.anim['spit'].onComplete.add(() => {
      this.hero.anim['stand'].play()
    }, this)

    setTimeout(() => {
      this.hero.anim['spit'].play()
    }, 2000)

    this.doctor = new Doctor({ game: this.game, x: this.game.world.width, y: this.hero.y })
    this.doctor.anim['go'].play()

    this.story = {
      title: 'В Волгограде будут судить детского психолога, забившего до смерти прохожего за плевок',
      date: '13 января 2016',
      text: '27-летний Егор Андреев, работающий психологом в детском развивающем центре, в парке поссорился с 52-летним мужчиной, который вместе с семьей возвращался с прогулки. Как отмечает прокуратура, причиной конфликта стал плевок в сторону машины Андреева. «В ходе словесной перепалки Андреев ударил потерпевшего кулаком по голове, от чего последний упал на асфальт. От полученной черепно-мозговой травмы потерпевший через несколько дней скончался в больнице», —  приводит подробности ведомство.'
    }

    this.hero.bringToTop()

    // const _dt = 0.8
    const _t01 = this.game.add.tween(this.doctor)
      // .to({
      //   'x': (this.doctor.x - this.hero.x * _dt),
      //   'y': (this.hero.y) }, 4000 * _dt, Easing.Linear.None, false)
      // .chain(this.game.add.tween(this.doctor)
      .to({
        'x': this.hero.x + 55
      }, 4000, Easing.Linear.None, false)

    // const _t02 = this.game.add.tween(this.hero)
      // .to({ 'x': this.pointOfAction.x - 50 }, 4000, Easing.Linear.None, false)

    const _t11 = this.game.add.tween(this.doctor)
      .to({ 'x': -100 }, 4000, Easing.Linear.None, false)

    _t01.onComplete.add(() => {
      this.doctor.anim['hit'].play()
      this.doctor.anim['hit'].onComplete.add(() => {
        this.doctor.anim['go'].play()
        this.hero.anim['death'].play()
        _t11.start()
      }, this)
    })

    this.startingPoint = _t01
    // this.startingPoint.onStart.add(() => { _t02.start() })

    this.game.add.existing(this)
  }

  play () {
    this.startingPoint.start()
  }
}
