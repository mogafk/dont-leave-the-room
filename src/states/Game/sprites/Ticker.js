import { Sprite, TileSprite, Text, Easing } from 'phaser'

const FONT_STYLE = {
  font: '20pt Arial',
  fill: 'white',
  align: 'right'
}

export default class extends Sprite {
  constructor (props) {
    super(props)

    this.textQueue = []
    this.addMessage = (msg) => {
      this.textQueue.push(msg)
    }
    this.bg = new TileSprite(this.game, 0, 20, this.game.camera.width, 60, 'ui-tiker')
    this.addChild(this.bg)
    this.bg.scale.setTo(1, 0.7)
    this.bg.anchor.setTo(0, 1)

    this.generateText = (text) => {
      this.text = new Text(this.game, this.game.camera.width, 17, text, FONT_STYLE)
      this.addChild(this.text)
      this.text.anchor.setTo(0, 1)
      this.anchor.setTo(0, 1)
    }

    this.y += 75

    this.close = this.game.add.tween(this)
      .to({ 'y': '+40' }, 500, Easing.Cubic.InOut, false)
    this.open = this.game.add.tween(this)
      .to({ 'y': '-40' }, 500, Easing.Cubic.InOut, false)
  }

  update () {
    if (this.text) {
      this.text.x -= 3
      if (this.text.right < 0) {
        console.log('Destroy')
        this.text.destroy()
        this.text = undefined
        console.log(this.text)
        this.close.start()
      }
    } else if (this.textQueue.length > 0) {
      this.generateText(this.textQueue.shift())
      this.open.start()
    }
  }
}
