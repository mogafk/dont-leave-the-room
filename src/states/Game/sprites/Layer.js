import {Group} from 'phaser'

export default class extends Group {
  constructor ({
    game,
    asset,
    tiles,
    speed = 1,
    scale = 1,
    anchor = 0
  }) {
    super(game)

    this.data = {
      asset: asset,
      tiles: tiles
    }

    this.custom = {
      speed: speed,
      scale: scale,
      anchor: anchor
    }

    this.ganerateTile = this.ganerateTile.bind(this)
    this.addTiles = this.addTiles.bind(this)
    this.setSpeed = this.setSpeed.bind(this)
    this.move = this.move.bind(this)
    this.getWidth = this.getWidth.bind(this)
  }

  getWidth () {
    let width = 0
    if (this.getBottom()) {
      width = this.getBottom().x
    }
    this.forEach(el => {
      width += el.width
    })
    return width
  }

  ganerateTile (x = this.getWidth()) {
    const { asset, tiles } = this.data
    const { scale, anchor } = this.custom
    const spriteName = this.game.rnd.pick(tiles)
    console.log(spriteName)
    const sprite = this.create(x, 0, asset, spriteName)
    sprite.scale.setTo(scale)
    sprite.anchor.setTo(anchor)
    sprite.checkWorldBounds = true
    sprite.events.onOutOfBounds.add(() => {
      if (sprite.x < 0) {
        sprite.destroy()
        this.ganerateTile()
      }
    })
  }

  addTiles (tiles) {
    this.data.tiles = [...this.data.tiles, ...tiles]
    console.log(this.data.tiles)
  }

  setSpeed (value) {
    this.speed = value
  }

  move (velocity = 1) {
    const { speed } = this.custom
    this.addAll('x', speed * velocity)
  }

  // createBatch (offset = 0) {

  //   const last = this.getTop()
  //   const toConsole = this.create(
  //     last
  //       ? Math.min(last.x + last.width, this.game.world.width)
  //       : 0,
  //     0, `${this.assetName}${1 + Math.ceil(Math.random() * this.assetLength - 1)}`)
  //   toConsole.anchor.setTo(0.5, 1, 1)


  //   toConsole.checkWorldBounds = true
  //   toConsole.events.onOutOfBounds.add(
  //     () => {

  //       this.createBatch()
  //       // toConsole.destroy()
  //     }, this)
  //   toConsole.events.onDestroy.add(() => {

  //   })
  // }
}
