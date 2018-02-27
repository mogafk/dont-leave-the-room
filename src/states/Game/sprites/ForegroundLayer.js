import Phaser from 'phaser'

import Montirovka from './bgevents/montirovka'

export default class extends Phaser.Group {
  constructor (props) {
    super(props)

    this.montirovka = new Montirovka(this.game, 0, 0)
    this.montirovka.scale.setTo(1.33)
    this.montirovka.anchor.setTo(0.5, 0.5)
    this.montirovka.y = this.game.world.height - 425
    this.add(this.montirovka)
  }
}
