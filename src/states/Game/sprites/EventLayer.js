import Phaser from 'phaser'
import ExploseEvent from './bgevents/house-explose'
import TrashCanEvent from './bgevents/baby-trash'
import PoliceEvent from './bgevents/police'
import CrocEvent from './bgevents/croc'
import RapeEvent from './bgevents/rape'
import IcicleEvent from './bgevents/icicle'

export default class extends Phaser.Group {
  constructor (props) {
    super(props)

    const houseExplose = new ExploseEvent(this.game)
    this.add(houseExplose)
    houseExplose.x += 400
    houseExplose.y = this.game.world.height - 400
    houseExplose.play()

    const trashCanEvent = new TrashCanEvent(this.game, 0, 0)
    this.add(trashCanEvent)

    const police = this._police = new PoliceEvent(this.game)
    this.add(police)
    police.x += 600
    police.y = this.game.world.height - 25
    police.anchor.setTo(0.5, 1)

    const croc = this._croc = new CrocEvent(this.game)
    this.add(croc)
    croc.x += 1500
    croc.y = this.game.world.height - 25
    croc.anchor.setTo(0.5, 1)

    const rape = new RapeEvent(this.game)
    this.add(rape)
    rape.x = 2500
    rape.y = this.game.world.height * 1.25

    this.icicle = new IcicleEvent(this.game, 0, 0)
    this.add(this.icicle)
    this.icicle.anchor.setTo(0.5, 1)
    this.icicle.y += 100
  }
}
