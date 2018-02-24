/* globals __DEV__ */
import Phaser from 'phaser'

import GameState from './game.js'
import Walker from './sprites/Walker'

const CAMERA_FADE_OUT_TIME = 4000
const CAMERA_FADE_OUT_COLOR = 0x000000

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = 'black'
  }

  preload () {
    this.game.state.add('EndlessWalkGame', GameState)
    this.game.load.baseURL = './assets/EndlessWalk/'
    this.game.load.image('room-bg', 'backgrounds/room-bg.png')
    this.game.load.image('walk-bg-d0', 'backgrounds/parallax-industrial-background/depth-0.png')
    this.game.load.image('walk-bg-d1', 'backgrounds/parallax-industrial-background/city-2.png')
    this.game.load.image('walk-bg-d2', 'backgrounds/parallax-industrial-background/city-1.png')
    this.game.load.image('walk-bg-d3', 'backgrounds/parallax-industrial-background/city-3.png')
    this.game.load.image('asphalt', 'backgrounds/asphalt1.png')
    this.game.load.image('clouds', 'backgrounds/clouds/parallax-2-1.png')
    this.game.load.spritesheet('button', 'PowerButtonsAsset.png', 62, 70, 3)
    // this.game.load.spritesheet('animated', 'https://i.imgur.com/fq7c7bP.png', 84, 84, 38)
    this.game.load.spritesheet('animated', 'person.png', 133, 255, 4)

    if (__DEV__) {
      this.game.time.advancedTiming = true
    }
  }

  create () {
    const room = this.background = this.game.add.sprite(0, 0, 'room-bg')
    room.scale.setTo(0.5)

    this.player = this.game.add.existing(new Walker(
      this.game,
      this.world.centerX,
      this.world.centerY
    ))

    this.player.animations.play('idle', 1, true)

    const goToDoor = this.game.add.tween(this.player).to(
      {x: 0},
      2000,
      Phaser.Easing.Sinusoidal.InOut,
      false
    )

    goToDoor.onComplete.add(() => {
      this.game.camera.fade(CAMERA_FADE_OUT_COLOR, CAMERA_FADE_OUT_TIME)
      this.player.animations.play('idle-back', 3, true)
    }, this)

    const goForAWalkAnimation = () => {
      goToDoor.start()
      this.player.animations.play('run-left', 3, true)
    }

    const goToBad = this.game.add.tween(this.player).to(
      {x: this.camera.width},
      2000,
      Phaser.Easing.Sinusoidal.InOut,
      false
    )

    goToBad.onComplete.add(() => {
      this.game.camera.fade(CAMERA_FADE_OUT_COLOR, CAMERA_FADE_OUT_TIME)
    }, this)

    const doNotGoForAWalk = () => {
      goToBad.start()
      this.player.animations.play('run-right', 5, true)
    }

    this.game.add.button(100, 100, 'button', goForAWalkAnimation, this)
    this.game.add.button(250, 100, 'button', doNotGoForAWalk, this)

    this.camera.onFadeComplete.add(
      () => {
        this.game.state.start('EndlessWalkGame')
      }
    )
  }
}
