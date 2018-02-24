import { Button } from 'phaser'

export default class extends Button {
  constructor (game, callback, callbackContext) {
    super(
      game,
      game.world.centerX,
      game.world.height - 35,
      'button',
      callback,
      callbackContext,
      1, 0, 2, 0
    )

    this.anchor.setTo(0.5)
  }
}
