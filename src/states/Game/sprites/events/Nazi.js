import Phaser from 'phaser'
import Neo from './../persons/Neo'

export default class extends Phaser.Group {
  constructor (props) {
    super(props)

    this.playerInteraction = new Phaser.Signal()

    this.target1 = new Phaser.Point(this.game.world.centerX + 10, this.game.world.height - 100)
    this.target2 = new Phaser.Point(this.game.world.centerX - 10, this.game.world.height - 100)

    this.neo1 = new Neo({
      game: this.game,
      x: this.game.world.width + 10,
      y: this.game.world.height - 100,
      type: 1
    })

    this.neo1.turn.rotate()

    this.neo2 = new Neo({
      game: this.game,
      x: this.game.world.width - 10,
      y: this.game.world.height - 100,
      type: 2
    })
    this.neo2.turn.rotate()

    const test2 = (subj, target, time) => {
      const _t1 = this.game.add.tween(subj).to({x: target.x * 0.95}, time * 0.95, Phaser.Easing.Linear.None, false)
      const _t2 = this.game.add.tween(subj).to({ x: target.x }, time * 0.05, Phaser.Easing.Circular.Out, false)
      const _t3 = this.game.add.tween(subj).to({ x: -50 }, 2880, Phaser.Easing.Linear.None, false)
      const _a3 = subj.anim['hit']
      _t1.start()
      subj.anim['go'].play()
      _t1.onComplete.add(() => { _t2.start(); subj.anim['stop_hit'].play() })
      _t2.onComplete.add(() => { _a3.play(); this.playerInteraction.dispatch() })
      _a3.onComplete.add(() => { _t3.start(); subj.anim['go'].play() })
    }

    test2(this.neo1, this.target1, 3600 + 240)
    test2(this.neo2, this.target1, 3600)
    // const killAnimation = (neo, target, time) => {
    //   neo.anim['go'].play()
    //   const tween = this.game.add.tween(neo).to(target, time, Phaser.Easing.Sinusoidal.Out, true)
    //   const onGoEnd = () => {
    //     const _a = neo.anim['go'].play()
    //     const _t = this.game.add.tween(_a).to({speed: 0}, 500, Phaser.Easing.Sinusoidal.Out, true)
    //     _t.start()
    //   }
    //   neo.anim['go'].onComplete.add(() => onGoEnd())
    //   neo.anim['stop_hit'].onComplete.add(() => {
    //     this.playerInteraction.dispatch()
    //     neo.anim['hit'].play()
    //   }
    //   )
    //   const targetOtOf = new Phaser.Point(-100, this.game.world.centerY + 10)
    //   const tween2 = this.game.add.tween(neo).to(targetOtOf, 4000, Phaser.Easing.Sinusoidal.In, false)
    //   neo.anim['hit'].onComplete.add(() => {
    //     neo.anim['go'].play();
    //     console.log('DISPATCH')
    //     tween2.start()
    //   }, this)
    //   tween.onComplete.add(() => neo.anim['stop_hit'].play())
    //   // goComplete = true
    // }

    // killAnimation(this.neo1, this.target1, 4100)
    // killAnimation(this.neo2, this.target2, 3900)

    //  let goComplete = false
    // const onGoEnd = () => {
    //   // if (goComplete) {
    //   //   this.neo1.anim['stop_hit'].play()
    //   // } else {
    //   this.neo1.anim['go'].play()
    //   // }
    // }
    // this.neo1.anim['go'].onComplete.add(() => onGoEnd())
    // this.neo1.anim['stop_hit'].onComplete.add(() => this.neo1.anim['hit'].play())
    // this.neo1.anim['hit'].onComplete.add(() => this.neo1.anim['hit'].play())
    // teween1.onComplete.add(() =>
    //   // goComplete = true
    //   this.neo1.anim['stop_hit'].play()
    // )
  }
}
