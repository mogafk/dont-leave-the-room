import { State } from 'phaser'
// import { centerGameObjects } from '../utils'

export default class extends State {
  init () {}

  preload () {
    // centerGameObjects([this.loaderBg, this.loaderBar])
    // this.load.setPreloadSprite(this.loaderBar)
  }

  create () {
    this.state.start('Game')
  }
}
