import Phaser from 'phaser'
import Neo from './../persons/Brevik'

export default class extends Phaser.Group {
  constructor (props) {
    super(props)

    this.playerInteraction = new Phaser.Signal()

    this.target1 = new Phaser.Point(this.game.world.centerX + 10, this.game.world.height - 100)

    this.neo1 = new Neo({
      game: this.game,
      x: this.game.world.width + 10,
      y: this.game.world.height - 100,
      type: 1
    })

    this.neo1.turn.rotate()
    const test2 = (subj, target, time) => {
      const _t1 = this.game.add.tween(subj).to({x: target.x * 0.95}, time * 0.95, Phaser.Easing.Linear.None, false)
      const _t3 = this.game.add.tween(subj).to({ x: -50 }, 2880, Phaser.Easing.Linear.None, false)
      const _a3 = subj.anim['hit']
      _t1.start()
      subj.anim['go'].play()
      _t1.onComplete.add(() => { _a3.play() })
      _a3.onComplete.add(() => { _t3.start(); subj.anim['go'].play(); this.playerInteraction.dispatch() })
    }

    test2(this.neo1, this.target1, 3600 + 240)
  }
}
