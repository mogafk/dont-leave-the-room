import Phaser from 'phaser'
import Animated from '.././Animated'

export default class extends Phaser.Sprite {
  constructor (props) {
    super(props)

    this.onDestroyed = new Phaser.Signal()
    this.storyMessage = 'Пермяки задержали сотрудника полиции, насиловавшего женщину у скульптуры «Счастье не за горами»'
    this.activated = false

    const bg = this.game.add.sprite(0, 0, 'houses', 'sight-2')
    bg.anchor.setTo(0, 1)
    bg.outOfCameraBoundsKill = true
    bg.autoCull = true
    bg.events.onKilled.add(() => {
      this.onDestroyed.dispatch()
      this.destroy()
    }, this)
    this.addChild(bg)

    this.action = new Animated({
      game: this.game,
      x: 425,
      y: -55,
      asset: 'rape'
    })
    this.action.addAnimation({name: 'rape', length: 48, speed: 60, loop: true})
    this.action.anim['rape'].play()
    bg.addChild(this.action)

    this.addChild(bg)

    this.game.add.existing(this)
  }

  play () {
    this.activated = true
  }
}
