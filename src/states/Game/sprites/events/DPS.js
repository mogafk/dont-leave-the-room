import { Sprite, Point, Easing } from 'phaser'
import Ment from '.././persons/Ment'
import Hero from '.././persons/Hero'
import Animated from '.././Animated'

export default class extends Sprite {
  static getAssets () {
    return [
      Ment.getAsset()
    ]
  }

  constructor ({ game, hero }) {
    super(game, 0, 0)

    this.pointOfAction = new Point(this.game.world.centerX - 100, this.game.world.centerY)

    this.story = {
      title: 'Сотрудники ДПС в Перми избили сфотографировавшего их автомобиль прохожего',
      date: '25 марта 2015',
      text: 'По словам Михаила Матросова, он решил сфотографировать на мобильный телефон стоящий за гаражами патрульный автомобиль ДПС. Сотрудник полиции попытался вырвать телефон, а когда это сделать не удалось, потребовал удалить снимки и позвал своего напарника, вместе с которым они начали избивать Матросова. В результате тот был госпитализирован с диагнозом «сотрясение головного мозга».'
    }

    const subject = hero || new Hero({ game: this.game, x: 0, y: this.game.world.centerY })
    this.toDebug = subject
    // subject.anim['walk'].play()
    this.addChild(subject)

    const dps = new Animated({
      game: this.game,
      x: this.game.world.width,
      y: subject.y,
      asset: 'dps',
      anchor: new Point(0, 0.5),
      scale: 1.33
    })
    dps.addAnimation({name: 'siren', length: 12, speed: 12, loop: true})
    dps.anim['siren'].play()

    const ment1 = new Ment({ game: this.game, x: dps.x, y: dps.y })
    ment1.scale.setTo(1.35)
    ment1.turn.rotate()
    this.addChild(ment1)
    ment1.alpha = 0

    const ment2 = new Ment({ game: this.game, x: dps.x - 50, y: dps.y })
    ment2.scale.setTo(1.33)
    ment2.turn.rotate()
    this.addChild(ment2)
    ment2.alpha = 0

    this.addChild(dps)

    subject.bringToTop()

    const _t01 = this.game.add.tween(ment1)
      .to({
        'x': subject.x + 75,
        'y': subject.y
      }, 3000, Easing.Linear.None, false)
    const _t02 = this.game.add.tween(ment1.scale)
      .to({ 'x': -1.175, 'y': 1.175 }, 3000, Easing.Linear.None, false)

    const _t03 = this.game.add.tween(ment2)
      .to({
        'x': subject.x + 75,
        'y': subject.y + 15
      }, 3300, Easing.Linear.None, false)
    const _t04 = this.game.add.tween(ment2.scale)
      .to({
        'x': -1,
        'y': 1
      }, 3200, Easing.Linear.None, false)

    const _t00 = this.game.add.tween(dps)
      .to({
        'x': this.pointOfAction.x,
        'y': subject.y
      }, 3000, Easing.Linear.None, false)

    _t00.onComplete.add(() => {
      subject.anim['photo'].play()
    }, this)
    subject.anim['photo'].onComplete.add(() => {
      ment1.alpha = 1
      // ment2.alpha = 1
      subject.anim['stand'].play()
      _t01.start()
    }, this)

    _t01.onStart.add(() => {
      _t02.start()
      _t03.start()
      ment1.anim['go'].play()
      ment1.anim['go'].play()
    })
    _t03.onStart.add(() => {
      _t04.start()
    })
    _t01.onComplete.add(() => {
      ment1.anim['hit'].play()
    }, this)
    _t03.onComplete.add(() => {
      ment2.anim['hit'].play()
    }, this)

    ment2.anim['hit'].onComplete.add(() => {
      subject.anim['death'].play()
      ment1.anim['stand'].play()
    })

    this.startingPoint = _t00

    this.game.add.existing(this)
  }

  play () {
    this.startingPoint.start()
  }

  update () {
    // this.game.debug.spriteInfo(this.toDebug, 20, 20)
  }
}
