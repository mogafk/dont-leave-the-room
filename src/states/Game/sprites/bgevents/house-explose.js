import { Sprite, Point, Signal } from 'phaser'
import Animated from '.././Animated'

export default class extends Sprite {
  constructor (props) {
    super(props)
    this.activated = false

    this.onDestroyed = new Signal()
    this.sfx = this.game.add.audio('explosion')
    this.sfx.allowMultiple = true

    this.anchor.setTo(0, 1)
    this.house0 = new Sprite(this.game, 0, 0, 'explosed-0')
    this.house0.scale.setTo(0.5)
    this.house0.anchor.setTo(0, 1)
    this.addChild(this.house0)

    this.explose = new Animated({
      game: this.game,
      x: -150,
      y: 215,
      asset: 'explose',
      anchor: new Point(0, 1),
      scale: 1.8
    })

    this.explose.alpha = 0

    this.y = 0
  }

  play () {
    this.house0.destroy()
    this.activated = true
    this.sfx.play('', 0, 0.75, false)

    this.explose.alpha = 1
    this.explose.addAnimation({name: 'vzryv_2', offset: 0, length: 20, speed: 12, loop: false})
    this.addChild(this.explose)
    this.explose.anim['vzryv_2'].onComplete.add(() => {
      this.explose.destroy()
      this.house1 = new Sprite(this.game, 0, 0, 'explosed-1')
      this.house1.scale.setTo(0.5)
      this.house1.anchor.setTo(0, 1)
      this.house1.y += 10
      this.house1.outOfCameraBoundsKill = true
      this.house1.autoCull = true
      this.house1.events.onKilled.add(() => {
        this.onDestroyed.dispatch()
        this.destroy()
      }, this)
      this.addChild(this.house1)
    })

    this.explose.anim['vzryv_2'].play()
    this.game.camera.shake(0.075, 2000)
  }
}
