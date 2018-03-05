import { Sprite, Point, Easing } from 'phaser'
import Form from '.././persons/Form'
import Hero from '.././persons/Hero'

export default class extends Sprite {
  static getAssets () {
    return [
      Form.getAsset()
    ]
  }

  constructor ({ game, hero }) {
    super(game, 0, 0)

    this.pointOfAction = new Point(this.game.world.centerX, this.game.world.centerY)

    this.story = {
      title: 'Пьяный следователь СК по особо важным делам сломал ногу прохожему в центре Москвы',
      date: '26 октября 2015',
      text: 'В Москве возле пруда в Шмитовском проезде пьяный мужчина, представившись полицейским, жестоко избил прохожего, в результате чего тот был госпитализирован со сломанной ногой. Обидчик же показал прибывшим на место сотрудникам полиции удостоверение старшего следователя первого следственного отдела Управления по расследованию особо важных дел ГСУ СК по Москве.'
    }

    const subject = hero || new Hero({ game: this.game, x: 0, y: this.game.world.centerY })
    // subject.anim['walk'].play()

    const sk = new Form({ game: this.game, x: this.game.world.width, y: subject.y })
    sk.anim['go'].play()

    subject.bringToTop()

    const _t01 = this.game.add.tween(sk)
      .to({ 'x': subject.x + 40 }, 4000, Easing.Linear.None, false)

    // const _t02 = this.game.add.tween(subject)
      // .to({ 'x': this.pointOfAction.x - 50 }, 4000, Easing.Linear.None, false)

    const _t11 = this.game.add.tween(sk)
      .to({ 'x': -100 }, 4000, Easing.Linear.None, false)

    _t01.onComplete.add(() => {
      sk.anim['hit'].play()
      sk.anim['hit'].onComplete.add(() => {
        sk.anim['go'].play()
        _t11.start()
      }, this)
    })
    _t01.onComplete.add(() => { subject.anim['brokenleg'].play() })

    this.startingPoint = _t01
    // this.startingPoint.onStart.add(() => { _t02.start() })
  }

  play () {
    this.startingPoint.start()
  }
}
