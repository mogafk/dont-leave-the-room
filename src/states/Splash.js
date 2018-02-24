import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {
    this.createNewButton = this.createNewButton.bind(this)
    this.runGame = this.runGame.bind(this)
  }

  preload () {

    

    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    // this.menuBack = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menuBack')
    // this.menuBack.anchor.setTo(0.5)
    // this.menuBack.scale.setTo(0.5)

    // this.button1 = this.createNewButton({
    //   text: 'Не выходи',
    //   onClick: () => this.runGame('Game'),
    //   x: this.game.world.centerX,
    //   y: this.game.world.centerY - 80
    // })

    this.load.setPreloadSprite(this.loaderBar)
  }

  create () {
    this.state.start('Game')
  }

  runGame (name) {
    this.state.start(name)
  }

  createNewButton ({x, y, text, onClick}) {
    const button = this.add.button(x, y, 'buttonGreen', onClick)
    // button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
    button.anchor.setTo(0.5)
    button.scale.setTo(0.75)

    const banner = this.add.text(0, 2, text, {
      // font: '40px Bangers',
      // fill: '#77BFA3',
      // font: '30px PT Sans',
      font: '30px Arial',
      fill: '#FFFFFF',
      stroke: 'green',
      strokeThickness: 7,
      smoothed: true
    })
    banner.anchor.setTo(0.5)
    button.addChild(banner)
  }
}
