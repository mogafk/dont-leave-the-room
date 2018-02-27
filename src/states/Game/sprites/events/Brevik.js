import Phaser from 'phaser'
import Brevik from './../persons/Brevik'
import Hero from '.././persons/Hero'

export default class extends Phaser.Sprite {
  static getAssets () {
    return [
      Brevik.getAsset()
    ]
  }

  constructor ({ game, hero }) {
    super(game, 0, 0)
    this.target1 = new Phaser.Point(this.game.world.centerX + 10, this.game.world.height - 100)

    const subject = hero || new Hero({ game: this.game, x: 0, y: this.game.world.centerY })
    this.toDebug = subject
    // subject.anim['walk'].play()
    this.addChild(subject)

    this.brevik = new Brevik({
      game: this.game,
      x: this.game.world.width + 10,
      y: this.game.world.height - 100,
      type: 1
    })
    this.addChild(this.brevik)

    this.brevik.turn.rotate()
    const test2 = (_obj, target, time) => {
      const _t1 = this.game.add
        .tween(_obj)
        .to({x: (subject.x + 50) * 0.95},
          time * 0.95,
          Phaser.Easing.Linear.None,
          false
        )
      const _t3 = this.game.add.tween(_obj).to({ x: -50 }, 2880, Phaser.Easing.Linear.None, false)
      const _a3 = _obj.anim['hit']
      _t1.start()
      _obj.anim['go'].play()
      _t1.onComplete.add(() => { _a3.play() })
      _a3.onComplete.add(() => {
        _t3.start()
        _obj.anim['go'].play()
        subject.anim['death'].play()
      })
    }

    this._play = () => {
      test2(this.brevik, subject, 3600 + 240)
    }
    this.game.add.existing(this)
  }

  play () {
    this._play()
  }
}
