import { Button } from 'phaser'

//  (game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
export default class extends Button {
  constructor (game) {
    super(
      game,
      0,
      0,
      'button-restart',
      () => {},
      null
    )
    this.anchor.setTo(0.5)
  }
}
