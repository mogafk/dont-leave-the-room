import { Button } from 'phaser'

//  (game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
export default class extends Button {
  constructor (game) {
    super(
      game,
      game.camera.width - 30,
      30,
      'button-mute',
      () => { this.toggle() },
      'mute-0.png', 'mute-0.png', 'mute-0.png', 'mute-0.png'
    )
    this.anchor.setTo(0.5)
  }

  toggle () {
    this.game.sound.mute = !this.game.sound.mute
  }
}
