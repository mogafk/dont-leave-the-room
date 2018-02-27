import { State, Animation, Easing, ArrayUtils } from 'phaser'

import show from './Modal'

export default class extends State {
  init () {}

  preload () {
    this.game.load.images(
      Animation.generateFrameNames('intro_', 1, 22, ''),
      Animation.generateFrameNames('intro/intro_', 1, 22, '.png', 5)
    )
    this.game.load.images(
      Animation.generateFrameNames('go2_', 1, 22, ''),
      Animation.generateFrameNames('intro-go/go2_', 1, 7, '.png', 5)
    )
    this.game.load.atlasJSONHash('buttons', 'ui/intro-buttons.png', 'ui/intro-buttons.json')
  }

  framesGo () {
    this.back.destroy()
    this.back = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, `go2_7`)
    this.back.anchor.setTo(0.5)
    const _scaleW = this.game.width / this.back.width
    const _scaleH = this.game.height / this.back.height
    this.back.scale.setTo(Math.max(_scaleW, _scaleH))

    this._frame.stop()
    const _arr2 = ArrayUtils.numberArray(1, 7)
    let _frameGo
    do {
      _frameGo = this.createAnim(_arr2.pop(), _frameGo, 'go2_')
      if (_arr2.length === 6) {
        _frameGo.onComplete.add(() => {
          this.startGame()
        }, this)
      }
    } while (_arr2.length > 0)
    _frameGo.start()
  }

  createSprite (index, duration, prev, prefix) {
    const _sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, `${prefix}${index}`)
    _sprite.anchor.setTo(0.5)
    const _scaleW = this.game.width / _sprite.width
    const _scaleH = this.game.height / _sprite.height
    _sprite.scale.setTo(Math.max(_scaleW, _scaleH))
    const _t1 = this.game.add.tween(_sprite.scale).to({x: '+0', y: '+0'}, duration, Easing.Linear.None, false)
    _t1.onComplete.add(() => { _sprite.destroy(); if (prev) prev.start() }, true)
    return _t1
  }

  createAnim (index, prev, prefix = 'intro_') {
    const frame = this.createSprite(index, 500, prev, prefix)
    return frame
  }

  startGame () {
    this.camera.fade(0x000000, 2000)
    this.camera.onFadeComplete.add(() => { this.state.start('Game') }, this)
  }

  create () {
    this.music = this.game.add.audio('shag-intro')
    this.music.play()

    this.back = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, `intro_22`)
    this.back.anchor.setTo(0.5)
    const _scaleW = this.game.width / this.back.width
    const _scaleH = this.game.height / this.back.height
    this.back.scale.setTo(Math.max(_scaleW, _scaleH))

    const button1 = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 50, 'buttons', () => { this.framesGo() }, this, 'exit-0.png', 'exit-0.png', 'exit-1.png', 'exit-0.png')
    button1.anchor.setTo(0.5, 1)
    button1.scale.setTo(0.25)

    const button2 = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 50, 'buttons',
      () => { show(0) },
      this, 'stay-0.png', 'stay-0.png', 'stay-1.png', 'stay-0.png')
    button2.anchor.setTo(0.5, 1)
    button2.scale.setTo(0.25)

    const _arr = ArrayUtils.numberArray(1, 22)
    this._frame = undefined
    do {
      this._frame = this.createAnim(_arr.pop(), this._frame)
    } while (_arr.length > 0)
    this._frame.start()
  }
}
