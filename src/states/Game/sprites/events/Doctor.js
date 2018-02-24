import Phaser from 'phaser'
import Doctor from './../persons/Doctor'

export default class extends Phaser.Group {
  constructor (props) {
    super(props)

    this.playerInteraction = new Phaser.Signal()

    this.target1 = new Phaser.Point(this.game.world.centerX + 10, this.game.world.centerY - 10)

    this.doc = new Doctor({
      game: this.game,
      x: this.game.world.width + 10,
      y: this.game.world.centerY - 10,
      type: 1
    })

    const xC = this.game.world.centerX
    const yC = this.game.world.centerY

    const bg = this.game.add.sprite(xC, yC, 'houses', 'hospital')
    bg.anchor.setTo(0.5, 0.6)

    // this.doc.turn.rotate()

    const test2 = (subj, target, time) => {
      const _t1 = this.game.add.tween(subj).to({x: target.x * 0.95}, time * 0.95, Phaser.Easing.Linear.None, false)
      const _t2 = this.game.add.tween(subj).to({ x: target.x }, time * 0.05, Phaser.Easing.Circular.Out, false)
      const _t3 = this.game.add.tween(subj).to({ x: -50 }, 2880, Phaser.Easing.Linear.None, false)
      const _a3 = subj.anim['hit']
      _t1.start()
      subj.anim['go'].play()
      _t1.onComplete.add(() => { _t2.start(); subj.anim['hit'].play() })
      _t2.onComplete.add(() => { _a3.play(); this.playerInteraction.dispatch() })
      _a3.onComplete.add(() => { _t3.start(); subj.anim['go'].play() })
    }

    test2(this.doc, this.target1, 3600 + 240)
  }
}
