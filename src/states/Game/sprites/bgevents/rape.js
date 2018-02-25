import Phaser from 'phaser'
import Animated from '.././Animated'

export default class extends Phaser.Group {
  constructor (props) {
    super(props)
    const bg = this.create(0, 0, 'houses', 'sight-2')
    bg.anchor.setTo(0.5, 1)

    this.action = new Animated({
      game: this.game,
      x: -50,
      y: -280,
      asset: 'rape'
    })
    this.action.addAnimation({name: 'rape', length: 48, speed: 60, loop: true})
    this.action.anim['rape'].play()
    bg.addChild(this.action)

    this.game.add.existing(this)
  }
}
