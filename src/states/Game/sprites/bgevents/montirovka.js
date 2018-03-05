import { Sprite, Easing, Signal, Point } from 'phaser'
import Animated from '.././Animated'

export default class extends Sprite {
  constructor (props) {
    super(props)

    this.activated = false
    this.onDestroyed = new Signal()
    this.storyMessage = 'Прохожий выместил злобу на чужом автомобиле монтировкой'
    this.walkaway = false

    this.sfx = this.game.add.audio('glass-smash')
    this.sfx.allowMultiple = true

    const car = new Animated({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'montirovka-car',
      anchor: new Point(0, 1)
    })
    this.addChild(car)
    car.addAnimation({name: 'montirovka_car', offset: 0, length: 16, speed: 24})

    car.outOfCameraBoundsKill = true
    car.autoCull = true
    car.events.onKilled.add(() => {
      this.onDestroyed.dispatch()
      this.destroy()
    }, this)

    const man = new Animated({
      game: this.game,
      x: 0,
      y: -75,
      asset: 'montirovka-man',
      anchor: new Point(0.5, 0.5)
    })
    man.addAnimation({name: 'go', length: 22, speed: 22, loop: true})
    man.addAnimation({name: 'hit', length: 14, speed: 24})
    man.addAnimation({name: 'goAfterHit', prefix: 'hit_', offset: 14, length: 24, speed: 24})
    this.addChild(man)
    man.x += this.game.world.width + 50

    const _t1 = this.startingPoint = this.game.add.tween(man)
      .to({'x': (car.x + 200)}, 4000, Easing.Linear.None, false)

    // const _t2 = this.game.add.tween(man)
    //   .to({'x': -100}, 1000, Easing.Linear.None, false)

    _t1.onComplete.add(() => {
      man.anim['hit'].play()
    }, this)

    man.anim['hit'].onComplete.add(() => {
      setTimeout(() => { this.sfx.play() }, 300)
      car.anim['montirovka_car'].play()
      man.anim['goAfterHit'].play()
    }, this)

    man.anim['goAfterHit'].onComplete.add(() => {
      man.anim['go'].play()
      this.walkaway = true
      // _t2.start()
    }, this)

    this.game.add.existing(this)
    this.y += 50

    man.anim['go'].play()

    this.man = man
  }

  play () {
    this.startingPoint.start()
    this.activated = true
  }

  update () {
    if (this.walkaway) {
      this.man.x -= 1
    }
  }
}
