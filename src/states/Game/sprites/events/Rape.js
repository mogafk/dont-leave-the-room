import Phaser from 'phaser'

// import Animated from '.././Animated'
import RapeMent from '.././events/RapeMent'

// const ASSET_NAME = 'rape'
// const SPRITE_FILE = 'events/rape.png'
// const FRAMES_FILE = 'events/rape.json'

export default class extends Phaser.Group {
  // static preload (game) {
  //   game.load.atlasJSONHash(...[ASSET_NAME, SPRITE_FILE, FRAMES_FILE])
  // }

  constructor (props) {
    super(props)
    const bg = this.create(-200, this.game.world.centerY + 50, 'foreground', 'sight-1.png')

    bg.scale.setTo(0.5)

    // bg.inputEnabled = true
    // bg.input.enableDrag(true)

    this.action = new RapeMent({
      game: this.game,
      x: -100,
      y: 75
    })

    this.action.scale.setTo(1.75)

    bg.addChild(this.action)

    this.action.x += 2000

    this.action.anim['rape'].play()
    this.action.anim['rape'].onComplete.add(() => this.action.anim['rape'].play())

    // this.action = new Animated({
    //   game: this.game,
    //   x: 100,
    //   y: 100
    // })
    // this.game.add.existing(this.action)

    // console.log(this.game.cache)
    // console.log(this.action)

    // this.action.addAnimation({
    //   name: 'rape',
    //   length: 20,
    //   speed: 24
    // })

    this.game.add.existing(this)
  }
}
