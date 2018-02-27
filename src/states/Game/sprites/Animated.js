import { Sprite, Signal, Animation, Point } from 'phaser'

export default class extends Sprite {
  constructor ({
    game,
    x,
    y,
    asset,
    anchor = new Point(0.5, 0.5),
    scale = 1
  }) {
    super(game, x, y, asset)
    this.asset = asset
    this.anchor.setTo(anchor.x, anchor.y)
    this.scale.setTo(scale)
    this.anim = {}
    this.turn = {
      right: () => {},
      left: () => {},
      rotate: () => { this.scale.x *= -1; return this.scale.x }
    }

    this.addAnimation = this.addAnimation.bind(this)
    game.add.existing(this)
  }

  addAnimation ({
    name,
    length,
    speed = 24,
    prefix = `${name}_`,
    offset = 1,
    postfix = '',
    loop = false
  }) {
    const _frames = Animation.generateFrameNames(prefix, offset, length, postfix, 5)
    const _anim = this.animations.add(name, _frames, speed, loop)
    const _completion = new Signal()
    _anim.onComplete.add(() => _completion.dispatch())
    this.anim[name] = {
      getAnimation: () => _anim,
      onComplete: _completion,
      play: () => { this.animations.play(name); return _completion }
    }
    // this.inputEnabled = true
    // this.input.enableDrag(true)
  }

  debug () {
    this.game.debug.spriteBounds(this)
  }
}
