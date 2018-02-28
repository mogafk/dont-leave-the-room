import { State } from 'phaser'
// import { centerGameObjects } from '../utils'
import Mute from './Game/sprites/Mute'

export default class extends State {
  init () {}

  preload () {
    // centerGameObjects([this.loaderBg, this.loaderBar])
    // this.load.setPreloadSprite(this.loaderBar)
    this.game.load.baseURL = './assets/'
    this.game.load.image('splash-screen', './splash.png')
    this.game.load.atlasJSONArray('splash-button', './ui/splash-button.png', './ui/splash-button.json')
    this.game.load.atlasJSONArray('button-mute', './ui/button-mute.png', './ui/button-mute.json')
  }

  create () {
    this.splash = this.game.add.sprite(this.game.camera.width / 2, this.game.camera.height / 2, 'splash-screen')
    this.splash.anchor.setTo(0.5)
    const _scaleW = this.game.camera.width / this.splash.width
    const _scaleH = this.game.camera.height / this.splash.height
    this.splash.scale.setTo(Math.max(_scaleW, _scaleH))

    const button1 = this.game.add.button(
      this.game.camera.width * 0.5,
      this.game.camera.height * 0.75,
      'splash-button',
      () => { this.state.start('Boot') },
      this,
      'button-start-0.png', 'button-start-0.png', 'button-start-1.png', 'button-start-0.png')
    button1.anchor.setTo(0.5, 0.5)
    const _scaleBW = this.game.camera.width / button1.width
    const _scaleBH = this.game.camera.height / button1.height
    button1.scale.setTo(Math.max(_scaleBW, _scaleBH) * 0.15)
    // button1.scale.setTo(0.25)

    this.game.add.existing(new Mute(this.game))
  }
}
