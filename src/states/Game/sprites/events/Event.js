import Phaser from 'phaser'
import Doctor from './../persons/Doctor'

export default class extends Phaser.Group {
  constructor (props) {
    super(props)

    this.background = this.create(this.game.world.width, 450, 'houses', 'hospital')
    this.background.anchor.setTo(0.5, 1)

    this.doctor = new Doctor({
      game: this.game,
      x: this.game.world.width,
      y: this.game.world.centerY
    })

    //  Point of Action
    this.PoA = new Phaser.Point(this.game.world.centerX, this.game.world.centerY)

    this.game.add.existing(this)
  }

  appendHero (hero) {
    this.hero = this.add(hero)
  }

  start () {
    this.hero.anim['walk'].play()

    const _t0 = this.game.add.tween(this.background).to({ 'x': '-100' }, 2000, Phaser.Easing.Linear.None)
    const _t01 = this.game.add.tween(this.doctor).to({ 'x': '-200' }, 2000, Phaser.Easing.Linear.None)

    const _t1 = this.game.add.tween(this.doctor).to({ 'x': this.PoA.x - this.doctor.width }, 3000, Phaser.Easing.Linear.None)
    const _t2 = this.game.add.tween(this.hero).to({ 'x': this.PoA.x }, 3000, Phaser.Easing.Linear.None)

    const _t3 = this.game.add.tween(this.doctor).to({ 'x': -100 }, 3000, Phaser.Easing.Linear.None)

    _t0.start()
    this.doctor.anim['go'].play()
    _t01.start()

    _t0.onComplete.add(() => {
      _t1.start()
      _t2.start()
    })

    _t1.onComplete.add(() => {
      this.doctor.anim['hit'].play()
      this.hero.anim['stop'].play()
    })

    this.doctor.anim['hit'].onComplete.add(() => {
      this.doctor.anim['go'].play()
      this.hero.anim['death'].play()
      _t3.start()
    })

    // this.hero.anim['death'].onComplete.add(() => {
    //   this.doctor.anim['go'].play()
      
    // })
  }
}
