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
    const bg = this.create(0, 0, 'houses', 'sight-2')
    bg.anchor.setTo(0.5, 1)


    // bg.inputEnabled = true
    // bg.input.enableDrag(true)

    this.action = new RapeMent({
      game: this.game,
      x: -50,
      y: -280
    })
    bg.addChild(this.action)

    // this.action.x += 2000

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
