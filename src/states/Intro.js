import { State, Animation, Easing, ArrayUtils } from 'phaser'
import show from './Modal'
import Mute from './Game/sprites/Mute'

export default class extends State {
  init () { }

  preload () {
    this.game.load.images(
      Animation.generateFrameNames('intro_', 1, 22, ''),
      Animation.generateFrameNames('intro/intro_', 1, 22, '.png', 5)
    )
    this.game.load.images(
      Animation.generateFrameNames('go2_', 1, 7, ''),
      Animation.generateFrameNames('intro-go/go2_', 1, 7, '.png', 5)
    )
    this.game.load.atlasJSONHash('buttons', 'ui/intro-buttons.png', 'ui/intro-buttons.json')
    this.game.load.audio('stay-home-sound', ['sound/DOMA-button.mp3', 'sound/DOMA-button.ogg'])
    this.game.load.audio('let-go-sound', ['sound/OUT-button.mp3', 'sound/OUT-button.ogg'])
    this.game.load.audio('shag-intro', ['sound/shag-intro.mp3', 'sound/shag-intro.ogg'])
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
    const _t1 = this.game.add.tween(_sprite.scale).to({ x: '+0', y: '+0' }, duration, Easing.Linear.None, false)
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
    // video({
    //   cb: () => {}
    // })
    this.music = this.game.add.audio('shag-intro')
    this.music.play('', 0, 1, false)

    this.letGoSFX = this.game.add.audio('let-go-sound')
    this.stayHomeSFX = this.game.add.audio('stay-home-sound')

    this.game.camera.flash(0x000000, 3000)

    this.back = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, `intro_22`)
    this.back.anchor.setTo(0.5)
    const _scaleW = this.game.width / this.back.width
    const _scaleH = this.game.height / this.back.height
    this.back.scale.setTo(Math.max(_scaleW, _scaleH))

    const generateButtons = () => {
      const button1 = this.game.add.button(
        this.game.world.centerX,
        this.game.world.centerY - 50,
        'buttons', () => {
          this.letGoSFX.play('', 0, 1, false)
          this.framesGo()
          this.disableButtons()
        },
        this,
        'let-go-0.png', 'let-go-0.png', 'let-go-1.png', 'let-go-0.png')
      button1.anchor.setTo(0.5, 1)
      button1.scale.setTo(0.25)

      const button2 = this.game.add.button(
        this.game.world.centerX,
        this.game.world.centerY + 50, 'buttons',
        () => {
          this.stayHomeSFX.play('', 0, 1, false)
          show({
            step: 0,
            cb: () => { this.state.start('Intro') }
          })
        },
        this,
        'dont-go-0.png', 'dont-go-0.png', 'dont-go-1.png', 'dont-go-0.png')
      button2.anchor.setTo(0.5, 1)
      button2.scale.setTo(0.25)

      this.disableButtons = () => {
        button1.destroy()
        button2.destroy()
      }
    }

    const _arr = ArrayUtils.numberArray(1, 22)
    this._frame = undefined
    do {
      this._frame = this.createAnim(_arr.pop(), this._frame)
      if (_arr.length === 21) {
        this._frame.onComplete.add(generateButtons, this)
      }
    } while (_arr.length > 0)
    this._frame.start()

    this.game.add.existing(new Mute(this.game))
  }
}
