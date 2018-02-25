import { Sprite, Point } from 'phaser'
import Animated from '.././Animated'

export default class extends Sprite {
  constructor (props) {
    super(props)

    this.anchor.setTo(0.5, 1)
    this.explose = new Animated({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'explose',
      anchor: new Point(0.5, 0.5),
      scale: 2
    })
    this.addChild(this.explose)
    this.explose.addAnimation({name: 'vzryv_2', offset: 0, length: 20, speed: 12, loop: false})

    this.game.add.existing(this)
  }

  play () {
    setTimeout(() => {
      this.explose.anim['vzryv_2'].play()
      this.game.camera.shake()
    }, 2000)
  }
}
