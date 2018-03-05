import { Sprite, Point, Easing } from 'phaser'
import Nazi from '.././persons/Neo'
import Hero from '.././persons/Hero'

export default class extends Sprite {
  static getAssets () {
    return [
      Nazi.getAsset()
    ]
  }

  constructor ({ game, hero }) {
    super(game, 0, 0)

    this.pointOfAction = new Point(this.game.world.centerX, this.game.world.centerY)

    this.story = {
      title: 'Дело астраханских неонацистов, избивавших прохожих за неславянскую внешность, передано в суд',
      date: '27 апреля 2015',
      text: 'Согласно материалам дела, 20-летний житель Астрахани по имени Александр создал группировку в июне 2012 года. Ее участники — в основном студенты — вели здоровый образ жизни, занимались спортом, изучали ножевой бой. Нападения совершали небольшими группами по два-три человека, выбирая жертв среди «нерусских».'
    }

    const subject = hero || new Hero({ game: this.game, x: 0, y: this.game.world.centerY })
    this.toDebug = subject
    // subject.anim['walk'].play()
    this.addChild(subject)

    const fsb = new Nazi({ game: this.game, x: this.game.world.width, y: subject.y })
    fsb.anim['go'].play()
    this.addChild(fsb)
    fsb.turn.rotate()

    subject.bringToTop()

    const _t01 = this.game.add.tween(fsb)
      .to(
        { 'x': subject.x + 55 },
        4000,
        Easing.Linear.None,
        false)

    // const _t02 = this.game.add.tween(subject)
      // .to({ 'x': this.pointOfAction.x - 50 }, 2000, Easing.Linear.None, false)

    const _t11 = this.game.add.tween(fsb)
      .to({ 'x': -100 }, 4000, Easing.Linear.None, false)

    _t01.onComplete.add(() => {
      fsb.anim['hit'].play()
      fsb.anim['hit'].onComplete.add(() => {
        subject.anim['death'].play()
        fsb.anim['go'].play()
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
