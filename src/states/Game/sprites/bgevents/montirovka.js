import { Sprite, Easing } from 'phaser'
import Animated from '.././Animated'

export default class extends Sprite {
  constructor (props) {
    super(props)

    const car = new Animated({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'montirovka-car'
    })
    this.addChild(car)
    car.addAnimation({name: 'montirovka_car', offset: 0, length: 16, speed: 24})

    const man = new Animated({
      game: this.game,
      x: this.game.world.width,
      y: this.game.world.centerY,
      asset: 'montirovka-man'
    })
    this.addChild(man)

    man.addAnimation({name: 'go', length: 22, speed: 22, loop: true})
    man.addAnimation({name: 'hit', length: 14, speed: 24})
    man.addAnimation({name: 'goAfterHit', prefix: 'hit_', offset: 14, length: 24, speed: 24})

    const _t1 = this.startingPoint = this.game.add.tween(man)
      .to({'x': car.x + 50}, 4000, Easing.Linear.None, false)

    const _t2 = this.game.add.tween(man)
      .to({'x': -1000}, 10000, Easing.Linear.None, false)

    _t1.onComplete.add(() => {
      man.anim['hit'].play()
    }, this)

    man.anim['hit'].onComplete.add(() => {
      car.anim['montirovka_car'].play()
      man.anim['goAfterHit'].play()
    }, this)

    man.anim['goAfterHit'].onComplete.add(() => {
      man.anim['go'].play()
      _t2.start()
    }, this)

    this.game.add.existing(this)

    man.anim['go'].play()
  }

  play () {
    this.startingPoint.start()
  }
}
