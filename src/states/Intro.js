import { State, Animation, Easing, ArrayUtils } from 'phaser'

export default class extends State {
  init () {}

  preload () {
    this.game.load.images(
      Animation.generateFrameNames('intro_', 1, 22, ''),
      Animation.generateFrameNames('intro/intro_', 1, 22, '.png', 5)
    )
    this.game.load.atlasJSONHash('buttons', 'ui/intro-buttons.png', 'ui/intro-buttons.json')
  }

  startGame () {
    this.camera.fade(0x000000, 2000)
    this.camera.onFadeComplete.add(() => { this.state.start('Splash') }, this)
  }

  create () {
    const _sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, `intro_22`)
    _sprite.anchor.setTo(0.5)
    const _scale = -250 / ((this.game.width) - (_sprite.width))
    _sprite.scale.setTo(_scale)

    const button1 = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 50, 'buttons', () => { this.startGame() }, this, 'exit-0.png', 'exit-0.png', 'exit-1.png', 'exit-0.png')
    button1.anchor.setTo(0.5, 1)
    button1.scale.setTo(0.25)

    const button2 = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 50, 'buttons', () => {}, this, 'stay-0.png', 'stay-0.png', 'stay-1.png', 'stay-0.png')
    button2.anchor.setTo(0.5, 1)
    button2.scale.setTo(0.25)

    const createSprite = (index, duration, prev) => {
      const _sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, `intro_${index}`)
      _sprite.anchor.setTo(0.5)
      const _scale_w = this.game.width / _sprite.width
      const _scale_h = this.game.height / _sprite.height
      _sprite.scale.setTo(Math.max(_scale_w, _scale_h))
      const _t1 = this.game.add.tween(_sprite.scale).to({x: '+0', y: '+0'}, duration, Easing.Linear.None, false)
      _t1.onComplete.add(() => { _sprite.destroy(); if (prev) prev.start() }, true)
      return _t1
    }

    const createAnim = (index, prev) => {
      const frame = createSprite(index, 500, prev)
      return frame
    }
    const _arr = ArrayUtils.numberArray(1, 22)
    let _frame
    do {
      _frame = createAnim(_arr.pop(), _frame)
    } while (_arr.length > 0)

    _frame.start()
  }
}
